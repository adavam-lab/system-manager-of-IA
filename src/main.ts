import { app, BrowserWindow, shell, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let isQuiting = false;

import { session } from 'electron';

// Disable security warnings in dev mode (they don't show in prod anyway)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// We dynamically generate the User-Agent in app.on('ready') instead of hardcoding Firefox.

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minHeight: 700,
        minWidth: 1000,
        backgroundColor: '#0a0a0c', // Prevents white flash before rendering HTML
        show: false, // Don't show the window until it is ready
        icon: path.join(__dirname, '..', 'public', 'icon.png'), // Point to public/icon.png
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true, // Enable <webview> tag usage
            preload: path.join(__dirname, 'preload.cjs'), // preload.cjs compiled from preload.cts
            backgroundThrottling: true, // Reduce CPU/RAM usage when the app is in background
        },
        autoHideMenuBar: true,
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'index.html')); // index.html is in root folder

    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
        // mainWindow?.webContents.openDevTools();
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Si el usuario intenta abrir una segunda instancia, enfocamos la principal
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.on('ready', () => {
    // Hemos eliminado la modificación del User-Agent en TODAS las IAs.
    // Esto asegura que el inicio de sesión de Google (y otros métodos de auth)
    // funcionen de manera nativa sin desencadenar bloqueos de seguridad o Passkeys
    // en ninguna plataforma, tal como funcionaba en deepseek-desktop.

    if (process.platform === 'darwin' && app.dock) {
        app.dock.setIcon(path.join(__dirname, '..', 'public', 'icon.png'));
    }

    const iconsPath = path.join(app.getPath('userData'), 'icons');
    if (!fs.existsSync(iconsPath)) {
        fs.mkdirSync(iconsPath, { recursive: true });
    }

    ipcMain.handle('save-icon', async (event, id, base64Data) => {
        try {
            const filePath = path.join(iconsPath, `${id}.webp`);
            const base64Image = base64Data.split(';base64,').pop();
            if (base64Image) {
                fs.writeFileSync(filePath, base64Image, { encoding: 'base64' });
            }
            return `file://${filePath}`;
        } catch (e) {
            console.error('Failed to save icon', e);
            return null;
        }
    });

    ipcMain.handle('delete-icon', async (event, id) => {
        try {
            const filePath = path.join(iconsPath, `${id}.webp`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return true;
        } catch (e) {
            console.error('Failed to delete icon', e);
            return false;
        }
    });

    ipcMain.handle('get-icon-path', async (event, id) => {
        try {
            const filePath = path.join(iconsPath, `${id}.webp`);
            if (fs.existsSync(filePath)) {
                return `file://${filePath}`;
            }
            return null;
        } catch (e) {
            console.error('Failed to get icon path', e);
            return null;
        }
    });

    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow) {
        mainWindow.show();
    } else {
        createMainWindow();
    }
});

app.on('before-quit', () => {
    isQuiting = true;
});

// Intercept window open requests in webviews and main window and redirect them to default browser, EXCEPT auth popups
app.on('web-contents-created', (event, contents) => {
    contents.setWindowOpenHandler((details) => {
        const url = details.url.toLowerCase();
        
        // Allow authentication and login popups to open inside the app so the session is captured
        if (url.includes('accounts.google.com') || 
            url.includes('auth0.com') || 
            url.includes('appleid.apple.com') || 
            url.includes('microsoftonline.com') ||
            url.includes('github.com/login') ||
            url.includes('facebook.com/login') ||
            url.includes('facebook.com/v') ||
            url.includes('login.live.com') ||
            url.includes('oauth') ||
            url.includes('auth') ||
            url.includes('signin') ||
            url.includes('login')) {
            return { 
                action: 'allow',
                overrideBrowserWindowOptions: {
                    width: 600,
                    height: 750,
                    autoHideMenuBar: true,
                    parent: mainWindow || undefined, // Attach as child to main window if possible
                    modal: false,
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                        session: contents.session
                    }
                }
            };
        }
        
        // Everything else (normal links) opens in the user's default browser
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
});
} // Closing brace for the single instance lock else block
