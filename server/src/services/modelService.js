// server/src/services/modelService.js
//
// Handles Ollama model detection and selection.
// Guarantees graceful degradation: if the large model is not installed,
// every call silently falls back to the small model — no errors, no
// difference on the frontend.

import ollama from 'ollama';

export const SMALL_MODEL = 'qwen2.5:1.5b';
export const LARGE_MODEL = 'qwen2.5:7b';

// Cache: null = not probed yet, true/false = result
let _largeAvailable = null;

/**
 * Probes the local Ollama instance once and caches the result.
 * Safe to call on every request — subsequent calls are instant.
 */
export async function probeModels() {
    if (_largeAvailable !== null) return;

    try {
        const { models } = await ollama.list();
        const names = models.map(m => m.name);
        _largeAvailable = names.some(n => n.startsWith('qwen2.5:7b'));

        if (_largeAvailable) {
            console.log('[ModelService] Large model detected — dual-model routing ACTIVE');
        } else {
            console.log('[ModelService] Large model not found — routing all queries to small model');
        }
    } catch (err) {
        // Ollama unreachable — default to small-only mode
        _largeAvailable = false;
        console.warn('[ModelService] Could not probe Ollama models:', err.message);
    }
}

/** Returns true only when the large model has been confirmed available. */
export function isLargeAvailable() {
    return _largeAvailable === true;
}

/**
 * Select the actual model name to use.
 * @param {'small' | 'large'} tier - desired tier from queryClassifier
 * @returns {string} Ollama model identifier
 */
export function pickModel(tier) {
    if (tier === 'large' && isLargeAvailable()) {
        return LARGE_MODEL;
    }
    return SMALL_MODEL;
}

/** Exposed for testing only — resets the cached probe result. */
export function _resetProbeCache() {
    _largeAvailable = null;
}
