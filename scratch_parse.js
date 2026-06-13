import fs from 'fs';

const content = fs.readFileSync('./pathA.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('const modalHtml =') || line.includes('Booking Modal Styling') || line.includes('modalRoot.innerHTML')) {
        console.log(`${idx + 1}: ${line}`);
    }
});
