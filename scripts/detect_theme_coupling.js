/**
 * Static Analysis Script to Detect Theme Background Coupling
 * Run with: node scripts/detect_theme_coupling.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientSrcDir = path.join(__dirname, '../client_fixed/src');

function walk(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            walk(path.join(dir, file), fileList);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const files = walk(clientSrcDir);
let warnings = 0;

console.log('🔍 Running Theme Background Coupling Detection...');

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');

    const noComments = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    if (noComments.includes('<ThemeBackground') && !file.includes('ThemeBackground.js')) {
        // Check if bgColor prop is provided
        if (!noComments.includes('bgColor=')) {
            console.warn(`[WARNING] High Coupling Detected in: ${file.replace(clientSrcDir, '')}`);
            console.warn(`          <ThemeBackground> is used without an explicit 'bgColor' prop.`);
            console.warn(`          This tightly couples the component to the default background color.`);
            console.warn(`          Consider passing a dynamic bgColor (e.g., bgColor="bg-[#ddeeff]") to decouple styling.\n`);
            warnings++;
        }
    }
});

if (warnings > 0) {
    console.log(`⚠️  Found ${warnings} potential coupling warnings. Please review the components above.`);
    process.exit(0);
} else {
    console.log(`✅ Success: No high theme coupling detected in <ThemeBackground> usage!`);
}
