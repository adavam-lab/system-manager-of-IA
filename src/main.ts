import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let isQuiting = false;

import { session } from 'electron';

// Optimizar consumo (Se eliminaron flags de GPU porque rompían los menús desplegables <select> nativos de Windows)
app.commandLine.appendSwitch('enable-low-end-device-mode');

// We dynamically generate the User-Agent in app.on('ready') instead of hardcoding Firefox.

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minHeight: 700,
        minWidth: 1000,
        backgroundColor: '#0a0a0c', // Prevents white flash before rendering HTML
        show: false, // Don't show the window until it is ready
        icon: path.join(__dirname, '..', 'public', 'app-logo.png'), // Point to public/app-logo.png
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true, // Enable <webview> tag usage
            preload: path.join(__dirname, 'preload.js'), // preload.js compiles to the same dist-js/ folder
            backgroundThrottling: true, // Reduce CPU/RAM usage when the app is in background
        },
        autoHideMenuBar: true,
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'index.html')); // index.html is in root folder

    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });

    mainWindow.on('close', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    // Hemos eliminado la modificación del User-Agent en TODAS las IAs.
    // Esto asegura que el inicio de sesión de Google (y otros métodos de auth)
    // funcionen de manera nativa sin desencadenar bloqueos de seguridad o Passkeys
    // en ninguna plataforma, tal como funcionaba en deepseek-desktop.

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
