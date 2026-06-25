const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

// Recursively find and replace string in files
function replaceInDir(dir, findStr, replaceStr) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      replaceInDir(filePath, findStr, replaceStr);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(findStr)) {
        content = content.split(findStr).join(replaceStr);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced in: ${filePath}`);
      }
    }
  });
}

// Main execution
function main() {
  if (process.env.VERCEL === '1' || process.env.NETLIFY === 'true' || process.env.NOW_BUILDER === '1') {
    console.log('Skipping rename-next.js post-build processing because we are building on Vercel/Netlify.');
    return;
  }

  console.log('Starting post-build processing to fix cPanel assets folder issue...');
  
  // 1. Replace all "/_next" with "/assets" in HTML, JS, CSS files inside the out folder
  replaceInDir(outDir, '/_next', '/assets');
  replaceInDir(outDir, '\\/_next', '\\/assets');
  replaceInDir(outDir, '%2F_next', '%2Fassets');
  
  // 2. Rename "_next" directory to "assets"
  const oldNextDir = path.join(outDir, '_next');
  const newNextDir = path.join(outDir, 'assets');
  
  if (fs.existsSync(oldNextDir)) {
    if (fs.existsSync(newNextDir)) {
      // If assets folder already exists (e.g. from copy), merge or delete it first
      fs.rmSync(newNextDir, { recursive: true, force: true });
    }
    fs.renameSync(oldNextDir, newNextDir);
    console.log('Renamed _next folder to assets successfully.');
  } else {
    console.log('Warning: _next folder not found in out directory.');
  }
  
  console.log('Post-build processing completed successfully!');
}

main();
