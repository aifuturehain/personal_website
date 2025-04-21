const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.cyan}Starting portfolio website setup...${colors.reset}\n`);

try {
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`${colors.green}✓ Created images directory${colors.reset}`);
  }

  // Install dependencies
  console.log(`\n${colors.yellow}Installing dependencies...${colors.reset}`);
  execSync('npm install --no-fund', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Dependencies installed successfully${colors.reset}`);

  // Success message
  console.log(`\n${colors.magenta}Setup completed successfully!${colors.reset}`);
  console.log(`\n${colors.blue}To start the development server, run:${colors.reset}`);
  console.log(`${colors.cyan}npm run dev${colors.reset}`);
  console.log(`\n${colors.blue}Then open http://localhost:3000 in your browser.${colors.reset}`);
  console.log(`\n${colors.green}Happy coding!${colors.reset}`);
} catch (error) {
  console.error(`\n${colors.red}Error during setup:${colors.reset}`, error);
  process.exit(1);
}