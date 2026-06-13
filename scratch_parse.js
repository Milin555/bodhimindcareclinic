import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

const searchTerms = [
    "Harvee", "Amy", "doctor", "specializing", "specializes"
];

searchTerms.forEach(term => {
    let index = 0;
    console.log(`=== Matches for "${term}" ===`);
    while ((index = html.indexOf(term, index)) !== -1) {
        const precedingSection = html.lastIndexOf('<section', index);
        if (precedingSection !== -1) {
            const sectionTag = html.substring(precedingSection, html.indexOf('>', precedingSection) + 1);
            console.log(`Found "${term}" in section: ${sectionTag}`);
        }
        index += term.length;
    }
});
