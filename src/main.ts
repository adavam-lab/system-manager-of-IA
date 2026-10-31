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

// ─── Compatibilidad con "Iniciar sesión con Google" ────────────────────────────
// Google bloquea el login en navegadores embebidos ("Este navegador o aplicación
// puede no ser seguro") detectando el User-Agent por defecto de Electron, que
// contiene "Electron/x.y.z" y el nombre de la app, y los client hints Sec-CH-UA.
//  1. Para todos los sitios usamos un User-Agent de Chrome limpio (sin "Electron").
//  2. Solo para accounts.google.com usamos un User-Agent de Firefox y quitamos los
//     headers Sec-CH-UA*, que es la combinación que Google acepta en apps embebidas.
// Así funciona el login con Google en ChatGPT, Claude, Canva, Gemini, VenturiKit, etc.

function platformToken(): string {
    if (process.platform === 'darwin') return 'Macintosh; Intel Mac OS X 10_15_7';
    if (process.platform === 'win32') return 'Windows NT 10.0; Win64; x64';
    return 'X11; Linux x86_64';
}

function firefoxPlatformToken(): string {
    if (process.platform === 'darwin') return 'Macintosh; Intel Mac OS X 10.15';
    if (process.platform === 'win32') return 'Windows NT 10.0; Win64; x64';
    return 'X11; Linux x86_64';
}

const CHROME_MAJOR = (process.versions.chrome || '140').split('.')[0];
const CHROME_UA = `Mozilla/5.0 (${platformToken()}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME_MAJOR}.0.0.0 Safari/537.36`;
const FIREFOX_UA = `Mozilla/5.0 (${firefoxPlatformToken()}; rv:140.0) Gecko/20100101 Firefox/140.0`;

const GOOGLE_AUTH_HOSTS = ['accounts.google.com', 'accounts.youtube.com'];

function isGoogleAuthUrl(rawUrl: string): boolean {
    try {
        const host = new URL(rawUrl).hostname;
        return GOOGLE_AUTH_HOSTS.includes(host);
    } catch {
        return false;
    }
}

// User-Agent por defecto para cualquier sesión/partición (persist:chatgpt, persist:claude, ...)
app.userAgentFallback = CHROME_UA;

const patchedSessions = new WeakSet<Electron.Session>();

function patchSessionForGoogleLogin(ses: Electron.Session) {
    if (patchedSessions.has(ses)) return;
    patchedSessions.add(ses);

    ses.setUserAgent(CHROME_UA);

    ses.webRequest.onBeforeSendHeaders(
        { urls: GOOGLE_AUTH_HOSTS.map(h => `*://${h}/*`) },
        (details, callback) => {
            const headers = details.requestHeaders;
            for (const key of Object.keys(headers)) {
                if (key.toLowerCase().startsWith('sec-ch-ua')) delete headers[key];
            }
            headers['User-Agent'] = FIREFOX_UA;
            callback({ requestHeaders: headers });
        }
    );
}

// Cada <webview> con partition="persist:..." crea su propia sesión: la parcheamos al crearse.
app.on('session-created', (ses) => patchSessionForGoogleLogin(ses));

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
        } else {
            createMainWindow();
        }
    });

    app.on('ready', () => {
    // Asegura el parche también en la sesión por defecto (ver patchSessionForGoogleLogin).
    patchSessionForGoogleLogin(session.defaultSession);

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
    // navigator.userAgent también debe coincidir con el header: Firefox en
    // accounts.google.com y Chrome limpio en el resto de páginas.
    contents.setUserAgent(CHROME_UA);
    contents.on('did-start-navigation', (details) => {
        if (!details.isMainFrame) return;
        const desired = isGoogleAuthUrl(details.url) ? FIREFOX_UA : CHROME_UA;
        if (contents.getUserAgent() !== desired) contents.setUserAgent(desired);
    });

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
