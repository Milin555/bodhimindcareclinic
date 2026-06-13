import { exec } from 'child_process';

console.log('Running rebranding script (pathA.js)...');
exec('node pathA.js', (err, stdout, stderr) => {
    if (err) {
        console.error('Error running rebranding script:', err);
        return;
    }
    console.log(stdout);
});
