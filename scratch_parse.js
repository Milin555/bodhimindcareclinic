import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

// Find occurrences of "badge" or "Made in Framer" or "Get Template"
const searchTerms = ["badge", "Made in Framer", "Get Template", "framer-badge"];

searchTerms.forEach(term => {
    let index = 0;
    console.log(`=== Matches for "${term}" ===`);
    while ((index = html.indexOf(term, index)) !== -1) {
        console.log(`Found at index ${index}:`);
        console.log(html.substring(index - 150, index + 150));
        index += term.length;
    }
});
