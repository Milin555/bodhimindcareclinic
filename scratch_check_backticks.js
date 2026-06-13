import fs from 'fs';

const content = fs.readFileSync('./pathA.js', 'utf8');
const lines = content.split('\n');

const lineNumbers = [784, 788, 907, 915, 928, 1075];
lineNumbers.forEach(num => {
    const idx = num - 1;
    const line = lines[idx];
    console.log(`--- Line ${num} ---`);
    console.log('Text:', line);
    for (let i = 0; i < line.length; i++) {
        console.log(`  ${i}: ${line[i]} (${line.charCodeAt(i)})`);
    }
});
