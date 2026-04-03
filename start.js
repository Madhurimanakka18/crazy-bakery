/**
 * CRAZY BAKERY - Single Command Launcher
 * Starts both backend (Express) and frontend (React) together
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const log = (color, prefix, msg) =>
  console.log(`${color}${colors.bright}[${prefix}]${colors.reset} ${msg}`);

console.log(`
${colors.magenta}${colors.bright}
  ██████╗██████╗  █████╗ ███████╗██╗   ██╗
 ██╔════╝██╔══██╗██╔══██╗╚══███╔╝╚██╗ ██╔╝
 ██║     ██████╔╝███████║  ███╔╝  ╚████╔╝ 
 ██║     ██╔══██╗██╔══██║ ███╔╝    ╚██╔╝  
 ╚██████╗██║  ██║██║  ██║███████╗   ██║   
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝  
  ██████╗  █████╗ ██╗  ██╗███████╗██████╗ ██╗   ██╗
  ██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██╔══██╗╚██╗ ██╔╝
  ██████╔╝███████║█████╔╝ █████╗  ██████╔╝ ╚████╔╝ 
  ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗  ╚██╔╝  
  ██████╔╝██║  ██║██║  ██╗███████╗██║  ██║   ██║   
  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝  
${colors.reset}
  ${colors.yellow}🥐 Freshly Baked Happiness — Kompally, Hyderabad${colors.reset}
`);

// Check if node_modules exist
const serverModules = path.join(__dirname, 'server', 'node_modules');
const clientModules = path.join(__dirname, 'client', 'node_modules');

if (!fs.existsSync(serverModules) || !fs.existsSync(clientModules)) {
  log(colors.yellow, 'SETUP', 'Installing dependencies first...\n');

  const install = spawn('npm', ['run', 'install-all'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
  });

  install.on('close', (code) => {
    if (code === 0) {
      startAll();
    } else {
      log(colors.red, 'ERROR', 'Failed to install dependencies. Please run: npm run install-all');
    }
  });
} else {
  startAll();
}

function startAll() {
  log(colors.green, 'LAUNCH', 'Starting CRAZY BAKERY...\n');

  // Start backend
  const server = spawn('node', ['index.js'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'pipe',
    shell: process.platform === 'win32',
  });

  server.stdout.on('data', (data) => {
    log(colors.cyan, 'SERVER', data.toString().trim());
  });

  server.stderr.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg) log(colors.yellow, 'SERVER', msg);
  });

  server.on('error', (err) => {
    log(colors.red, 'SERVER', `Failed to start: ${err.message}`);
  });

  // Start frontend (wait 1s for server to init)
  setTimeout(() => {
    log(colors.magenta, 'CLIENT', 'Starting React app...');

    const client = spawn('npm', ['start'], {
      cwd: path.join(__dirname, 'client'),
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, BROWSER: 'none', PORT: '3000' },
    });

    client.stdout.on('data', (data) => {
      const msg = data.toString().trim();
      if (msg && !msg.includes('webpack') && !msg.includes('Compiled')) {
        log(colors.magenta, 'CLIENT', msg);
      }
      if (msg.includes('Compiled successfully') || msg.includes('Local:')) {
        console.log(`
${colors.green}${colors.bright}
  ✅ CRAZY BAKERY IS LIVE!
  
  🌐 Frontend:  http://localhost:3000
  🔧 Backend:   http://localhost:5000
  📡 API:       http://localhost:5000/products

  📞 WhatsApp:  https://wa.me/919876543210
  ✉️  Email:     crazybakery@gmail.com
  📍 Address:   Kompally, Hyderabad

  ${colors.yellow}Press Ctrl+C to stop${colors.reset}
`);
      }
    });

    client.stderr.on('data', (data) => {
      const msg = data.toString().trim();
      if (msg && !msg.includes('Warning') && !msg.includes('DeprecationWarning')) {
        log(colors.yellow, 'CLIENT', msg);
      }
    });

    client.on('error', (err) => {
      log(colors.red, 'CLIENT', `Failed to start: ${err.message}`);
    });

    // Handle shutdown
    process.on('SIGINT', () => {
      console.log(`\n${colors.yellow}Shutting down CRAZY BAKERY...${colors.reset}`);
      server.kill();
      client.kill();
      process.exit(0);
    });
  }, 1500);
}
