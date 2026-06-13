import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

const regex = new RegExp(`[^}]*framer-v-w7do1a[^{]*{[^}]*}`, 'g');
let match;
console.log("=== w7do1a rules ===");
while ((match = regex.exec(html)) !== null) {
    console.log(match[0].trim());
}
