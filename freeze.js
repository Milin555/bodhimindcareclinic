import fs from 'fs';

console.log('Freezing current rebranded website state...');
try {
    fs.copyFileSync('./index.html', './frozen-index.html');
    console.log('Successfully froze index.html as frozen-index.html!');
} catch (e) {
    console.error('Failed to freeze index.html:', e.message);
}
