const fs = require('fs');

// Fix presence post
let f = 'src/content/posts/en/presence-the-power-of-now.md';
let c = fs.readFileSync(f, 'utf-8');
c = c.replace('"The Power of Presence \\u2014 Why \\\\"Having No Time\\\\" Is an Excuse"', "'The Power of Presence - Why Having No Time Is an Excuse'");
fs.writeFileSync(f, c, 'utf-8');
console.log('Fixed presence');

// Fix hilbert complete chronicle
f = 'src/content/posts/en/hilberts-tenth-problem-complete-chronicle.md';
c = fs.readFileSync(f, 'utf-8');
c = c.replace(/^title: .+$/m, "title: 'Hilberts Tenth Problem - Complete Chronicle'");
fs.writeFileSync(f, c, 'utf-8');
console.log('Fixed hilbert');
