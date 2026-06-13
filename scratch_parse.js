import fs from 'fs';

const filepath = './pathA.js';
let content = fs.readFileSync(filepath, 'utf8');

// Find boundary of clientFixScript template literal content
const startMarker = 'const clientFixScript = `';
const endMarker = 'html = html.replace(\'</body>\', clientFixScript);';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find start or end marker");
    process.exit(1);
}

const before = content.substring(0, startIndex + startMarker.length);
const scriptContent = content.substring(startIndex + startMarker.length, endIndex);
const after = content.substring(endIndex);

// Escape backticks in scriptContent
let escapedScript = '';
for (let i = 0; i < scriptContent.length; i++) {
    const char = scriptContent[i];
    if (char === '`') {
        // Check if already escaped
        if (i > 0 && scriptContent[i - 1] === '\\') {
            escapedScript += char;
        } else {
            escapedScript += '\\`';
        }
    } else {
        escapedScript += char;
    }
}

fs.writeFileSync(filepath, before + escapedScript + after);
console.log("Successfully escaped all backticks in pathA.js clientFixScript!");
