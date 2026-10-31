// Lanza Electron sin ELECTRON_RUN_AS_NODE.
// Los terminales integrados de editores basados en Electron (VS Code, Cursor,
// Antigravity...) definen ELECTRON_RUN_AS_NODE=1, lo que hace que `electron .`
// se ejecute como Node y la ventana nunca aparezca.
const { spawn } = require('child_process');
const electronPath = require('electron');

const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronPath, ['.', ...process.argv.slice(2)], {
    stdio: 'inherit',
    env,
});

child.on('close', (code) => process.exit(code ?? 0));
