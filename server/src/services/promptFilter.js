// server/src/services/promptFilter.js
//
// First stage of the AI pipeline.
// Rejects prompts that are clearly off-topic for a SOC security assistant
// (essays, homework, creative writing, math, etc.) before any model call.

const VIOLATION_MESSAGE =
    'Powered by Ollama, Always Verify Results\n\n' +
    '[ACCESS RESTRICTED]\n' +
    'This assistant is dedicated to Security Operations Center (SOC) queries only.';

// Phrases that strongly indicate off-topic requests
const BLOCKED_PATTERNS = [
    /\bwrite (me )?(an? )?(essay|story|poem|letter|article|blog|report|speech|thesis|dissertation)\b/i,
    /\bhelp (me )?(with )?(my )?(math|homework|assignment|coursework|exam|test|quiz)\b/i,
    /\bsolve (this )?(math|equation|problem|question)\b/i,
    /\bwhat is \d+\s*[+\-*/]\s*\d+/i,          // basic arithmetic
    /\bcalculate\b.*\b(percentage|area|volume|speed|distance|mass)\b/i,
    /\btranslate (this|the following) (text|sentence|paragraph|passage)\b/i,
    /\bwrite (me )?(some )?(code|a function|a class|a script) (for|to|that)\b/i,
    /\bcan you (be|act|pretend|roleplay|play).*(character|role|person|villain|hero)\b/i,
    /\bignore (your )?(previous |all )?(instructions|system prompt|rules)\b/i,
    /\bforget.*(you are|your role|being a)\b/i,
    /\brecipe (for|to make)\b/i,
    /\bbook (recommendation|summary|review)\b/i,
    /\b(life|relationship|career|financial) advice\b/i,
];

// Words that, in context, suggest clearly non-security intent
const BLOCKED_KEYWORDS = [
    'french revolution',
    'world war',
    'history essay',
    'creative writing',
    'write a song',
    'write a poem',
    'write a story',
    'homework help',
    'do my homework',
    'algebra',
    'calculus',
    'trigonometry',
    'write an email to my boss',
    'cover letter',
    'resignation letter',
];

/**
 * Check whether a prompt is allowed through to the AI models.
 * @param {string} prompt
 * @returns {{ allowed: boolean, message?: string }}
 */
export function filterPrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') {
        return { allowed: true }; // let the model handle empty/null
    }

    const lower = prompt.toLowerCase();

    // Keyword check
    for (const keyword of BLOCKED_KEYWORDS) {
        if (lower.includes(keyword)) {
            return { allowed: false, message: VIOLATION_MESSAGE };
        }
    }

    // Pattern check
    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(prompt)) {
            return { allowed: false, message: VIOLATION_MESSAGE };
        }
    }

    return { allowed: true };
}
