# Adam IA 🚀

<div align="center">
  <b>Español</b> | <a href="README_EN.md">English</a>
  <br><br>
  <img src="public/img-github/slide.gif" alt="Adam IA en acción: Inicio, ChatGPT, Gemini y Claude" width="900">
</div>

**Adam IA** es una aplicación de escritorio multiplataforma (Windows, macOS y Linux) que agrupa tus herramientas de Inteligencia Artificial favoritas en un único panel local y seguro. Cada plataforma corre en su propia sesión aislada, así que puedes tener abiertos ChatGPT, Gemini, Claude y más al mismo tiempo, cada uno con su cuenta, sin que se mezclen.

## 📑 Índice

**Para usuarios**
- [Características](#-características)
- [Plataformas incluidas](#-plataformas-incluidas)
- [Cómo instalar](#-cómo-instalar)
- [Guía de uso](#-guía-de-uso)
- [Requisitos del sistema](#-requisitos-del-sistema)

**Para desarrolladores (guía para juniors)**
1. [Requisitos previos](#1-requisitos-previos)
2. [Instalación paso a paso](#2-instalación-paso-a-paso-primera-vez)
3. [Versiones del proyecto](#3-versiones-del-proyecto)
4. [Scripts de npm](#4-scripts-de-npm)
5. [Estructura de carpetas](#5-estructura-de-carpetas)
6. [Archivos de configuración explicados](#6-archivos-de-configuración-explicados)
7. [Cómo funciona por dentro](#7-cómo-funciona-por-dentro-arquitectura)
8. [Tarea típica: añadir una plataforma](#8-tarea-típica-añadir-una-plataforma-incluida-por-defecto)
9. [Flujo de trabajo con Git](#9-flujo-de-trabajo-con-git)
10. [Publicar una versión](#10-publicar-una-versión-release)
11. [Solución de problemas](#11-solución-de-problemas)
12. [Cosas raras del proyecto](#12-cosas-raras-que-vas-a-encontrar-y-que-no-son-culpa-tuya)
13. [Glosario](#13-glosario)
14. [Checklist del primer día](#14-checklist-del-primer-día)

---

## 🌟 Características

- **Todas tus IAs en una sola ventana**: interfaz de escritorio con tema oscuro y barra lateral para cambiar de plataforma con un clic.
- **Sesiones aisladas y persistentes**: cada herramienta usa su propia partición (`persist:<id>`). Tus inicios de sesión se guardan entre reinicios y no se cruzan entre plataformas.
- **Inicio de sesión con Google compatible**: la app se identifica como un navegador estándar para que Google no bloquee el login con el mensaje *"Este navegador o aplicación puede no ser seguro"*.
- **IAs personalizadas**: añade cualquier sitio web (Mistral, HuggingChat, Poe, etc.) con nombre, URL, color e icono propio (arrastra una imagen o elígela del disco).
- **Categorías**: agrupa tus IAs en categorías con nombre y color para organizar el panel de inicio.
- **Editar y eliminar**: puedes editar o quitar tanto las IAs personalizadas como las que vienen incluidas.
- **Navegación integrada**: botones de Atrás, Adelante, Recargar e Inicio en la barra superior.
- **Enlaces seguros**: los enlaces normales se abren en tu navegador predeterminado; solo las ventanas de inicio de sesión (Google, Microsoft, Apple, GitHub, Facebook, OAuth…) se abren dentro de la app para capturar la sesión.
- **Instancia única**: si abres la app otra vez, se enfoca la ventana que ya estaba abierta en lugar de crear otra.
- **Ligera en segundo plano**: reduce el uso de CPU y RAM cuando la ventana no está activa.

---

## 🤖 Plataformas incluidas

| Plataforma | URL |
|---|---|
| DeepSeek | https://chat.deepseek.com/ |
| ChatGPT | https://chatgpt.com/ |
| Gemini | https://gemini.google.com/ |
| Kimi | https://kimi.moonshot.cn/ |
| GitHub Copilot | https://github.com/copilot |
| Claude | https://claude.ai/ |
| Canva | https://www.canva.com/ |
| VenturiKit IA | https://venturekit.ai/ |
| Perplexity AI | https://www.perplexity.ai/ |
| Facebook | https://www.facebook.com/ |
| TikTok | https://www.tiktok.com/ |
| Instagram | https://www.instagram.com/ |
| X (Twitter) | https://x.com/ |

¿Te falta alguna? Añádela tú mismo desde **Inicio → Añadir IA** (ver [Guía de uso](#-guía-de-uso)).

---

## 📥 Cómo instalar

### Opción 1: Descargar el instalador (recomendado)

Ve a la página de **[Releases](https://github.com/edaniel-valencia/Adam-IA/releases/latest)** y descarga el archivo de tu sistema:

| Sistema | Archivo |
|---|---|
| 🪟 Windows 10/11 (x64) | `Adam.IA.Setup.<versión>.exe` |
| 🍎 macOS Apple Silicon (M1/M2/M3/M4) | `Adam.IA-<versión>-arm64.dmg` |
| 🍏 macOS Intel | `Adam.IA-<versión>.dmg` |
| 🐧 Linux (x64) | `Adam.IA-<versión>.AppImage` |

**Notas por sistema:**

- **Windows**: el instalador te deja elegir la carpeta de instalación. Si SmartScreen muestra un aviso, pulsa *Más información → Ejecutar de todas formas* (la app no está firmada con un certificado comercial).
- **macOS**: abre el `.dmg` y arrastra **Adam IA** a *Aplicaciones*. La primera vez, si macOS dice que no puede verificar al desarrollador, haz clic derecho sobre la app → **Abrir**, o ve a *Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente*.
- **Linux**: dale permisos de ejecución y ábrelo:
  ```bash
  chmod +x Adam.IA-*.AppImage
  ./Adam.IA-*.AppImage
  ```

### Opción 2: Compilar desde el código fuente

Sigue la [guía para desarrolladores](#guía-para-desarrolladores).

---

## 🧭 Guía de uso

### Cambiar entre IAs
Haz clic en cualquier plataforma de la barra lateral izquierda. Cada una mantiene su propia pestaña cargada, así que al volver encontrarás tu conversación donde la dejaste. El botón ☰ colapsa o expande la barra lateral.

### Iniciar sesión
Inicia sesión normalmente dentro de cada plataforma. Si eliges *"Continuar con Google"* (u otro proveedor), se abrirá una ventana emergente dentro de la app. Al terminar, la sesión queda guardada para esa plataforma.

### Añadir una IA personalizada
1. Ve a **Inicio**.
2. Pulsa **Añadir IA**.
3. Escribe el **nombre** y la **URL** (por ejemplo `https://chat.mistral.ai/`).
4. Elige un **color** y, si quieres, un **icono** (arrastra una imagen al recuadro o selecciónala del disco; se comprime automáticamente).
5. Opcional: asígnale una **categoría**.
6. Guarda. Aparecerá en la barra lateral y en el panel de inicio.

### Editar o eliminar una IA
En el panel de **Inicio**, pasa el cursor por la tarjeta de la IA y usa el botón ✏️ para editar o 🗑️ para eliminar. También funciona con las plataformas incluidas.

### Gestionar categorías
Desde **Inicio → Gestionar categorías** puedes crear, renombrar, cambiar el color o eliminar categorías. Una categoría que todavía tiene IAs asignadas no se puede eliminar.

### Barra de navegación
Arriba tienes **← Atrás**, **→ Adelante**, **⟳ Recargar** y **⌂ Inicio**, que actúan sobre la plataforma que estás viendo.

### ¿Dónde se guardan mis datos?
Todo se queda en tu equipo; Adam IA no envía nada a servidores propios. El detalle técnico está en [§7.7](#77-dónde-se-guardan-los-datos-del-usuario). Para empezar de cero (cerrar todas las sesiones y borrar tus IAs personalizadas), cierra la app y elimina la carpeta de datos:

- **Windows**: `%APPDATA%\Adam IA`
- **macOS**: `~/Library/Application Support/Adam IA`
- **Linux**: `~/.config/Adam IA`

---

## 💻 Requisitos del sistema

| Sistema | Requisito |
|---|---|
| Windows | Windows 10 o posterior (64 bits) |
| macOS | macOS 12 Monterey o posterior (Intel o Apple Silicon) |
| Linux | Distribución de 64 bits compatible con AppImage |

Necesitas conexión a internet para usar las plataformas de IA.

---

# Guía para desarrolladores

> **Objetivo:** que en tu primer día puedas **instalar, ejecutar, entender y modificar** el proyecto sin depender de nadie.
> Lee las secciones en orden. Muchas terminan con un ✅ que te dice cómo comprobar que lo hiciste bien.

**¿Qué es Adam IA en una frase?** Una **app de escritorio** hecha con **Electron + TypeScript** que muestra varias webs de IA dentro de una sola ventana, **cada una con su propia sesión aislada**. No hay backend, ni base de datos, ni framework de UI (nada de React/Vue): es HTML + CSS + TypeScript “puro”.

---

## 1. Requisitos previos

| Herramienta | Versión mínima | Cómo comprobarla | Para qué sirve |
|---|---|---|---|
| **Node.js** | 20 (probado con **24.15.0**) | `node -v` | Ejecutar TypeScript, Electron y los scripts |
| **npm** | La que trae Node | `npm -v` | Instalar dependencias |
| **Git** | Cualquiera reciente | `git --version` | Control de versiones |
| **Editor** | VS Code recomendado | — | Editar el código |

> 💡 Si no tienes Node, instálalo desde https://nodejs.org (versión LTS). En Mac también puedes usar `brew install node`.

✅ Los tres comandos de la tabla devuelven una versión sin error.

---

## 2. Instalación paso a paso (primera vez)

```bash
# 1. Clonar el repositorio
git clone https://github.com/adavam-lab/Adam-IA.git
cd Adam-IA

# 2. Instalar dependencias (crea la carpeta node_modules/)
npm install

# 3. Compilar y abrir la app
npm start
```

**¿Qué pasa por dentro al hacer `npm start`?**

1. `tsc` compila todo lo de `src/` (TypeScript) a `dist-js/` (JavaScript).
2. `node scripts/start.cjs` lanza Electron.
3. Electron lee `"main": "dist-js/main.js"` de `package.json` y arranca el **proceso principal**.
4. El proceso principal abre una ventana y carga `index.html`.
5. `index.html` carga `dist-js/controller/AIController.js`, que arranca la interfaz.

✅ Se abre una ventana oscura con el panel de inicio y las tarjetas de las IAs.

Si algo falla en este paso, mira [§11 Solución de problemas](#11-solución-de-problemas).

---

## 3. Versiones del proyecto

### 3.1 Versión de la app
Está en [package.json](package.json), campo `"version"`. Actualmente: **1.0.8**.
Seguimos **SemVer** (`MAYOR.MENOR.PARCHE`):

| Cambio | Ejemplo | Qué subir |
|---|---|---|
| Arreglo de un bug | Fix del login con Google | PARCHE → `1.0.9` |
| Nueva funcionalidad compatible | Añadir búsqueda de IAs | MENOR → `1.1.0` |
| Cambio que rompe datos/compatibilidad | Cambiar el formato de `localStorage` | MAYOR → `2.0.0` |

### 3.2 Versiones de las dependencias
Todas son `devDependencies` (la app no tiene dependencias de runtime: Electron ya lo incluye todo).

| Paquete | Declarado en `package.json` | Instalado (`npm ls`) | Para qué |
|---|---|---|---|
| `electron` | `^43.3.0` | 43.8.6 | Motor de la app (Chromium + Node) |
| `electron-builder` | `^26.15.3` | 26.18.0 | Genera los instaladores `.exe` / `.dmg` / `.AppImage` |
| `typescript` | `^7.0.2` | 7.0.2 | Compilador `tsc` |
| `@types/node` | `^26.2.0` | 26.6.6 | Tipos de Node para TypeScript |
| `concurrently` | `^10.0.4` | 10.0.6 | Ejecuta dos comandos a la vez (`npm run dev`) |
| `nodemon` | `^3.1.14` | 3.1.14 | Reinicia la app al detectar cambios (`npm run dev`) |

> 💡 El `^` significa “acepta cualquier versión compatible hacia arriba sin cambiar el número MAYOR”. La versión **exacta** que se instala queda fijada en `package-lock.json`: **siempre súbelo al repo** junto a `package.json`.

Para ver las versiones instaladas en tu máquina: `npm ls --depth=0`.

---

## 4. Scripts de npm

| Comando | Qué hace | Cuándo usarlo |
|---|---|---|
| `npm start` | Compila TS y abre la app (vía `scripts/start.cjs`) | Uso normal en desarrollo |
| `npm run dev` | Compila en modo *watch* y reinicia la app al guardar `.ts`, `index.html` o `index.css` | Cuando vas a hacer muchos cambios seguidos |
| `npm run build-ts` | Solo compila `src/` → `dist-js/` | Para revisar errores de tipos sin abrir la app |
| `npm run build` | Compila y genera el instalador de **tu** sistema en `dist/` | Para publicar una versión |
| `npm run clean` | Borra `dist/` y `dist-js/` | Cuando algo “raro” queda compilado (usa `rm -rf`: en Windows ejecútalo desde Git Bash) |
| `npm test` | No hay tests todavía (falla a propósito) | — |

> **¿Por qué `scripts/start.cjs` y no `electron .`?** Los terminales integrados de editores basados en Electron (VS Code, Cursor, Antigravity…) definen `ELECTRON_RUN_AS_NODE=1`. Con esa variable, `electron .` se ejecuta como Node y la ventana nunca aparece. El script la elimina antes de lanzar Electron. **Nunca uses `npx electron .`**.

---

## 5. Estructura de carpetas

```
Adam-IA/
├── src/                          ← TODO el código TypeScript (lo que editas)
│   ├── main.ts                   ← Proceso principal de Electron (ventana, sesiones, IPC, popups)
│   ├── preload.cts               ← Puente seguro entre la ventana y el sistema (window.electronAPI)
│   ├── model/
│   │   └── AIModel.ts            ← DATOS: IAs personalizadas, categorías, guardado en localStorage
│   ├── view/
│   │   ├── AIView.ts             ← VISTA: todo lo que toca el DOM (pantallas, modales, sidebar)
│   │   └── components/           ← Piezas de HTML reutilizables (Atomic Design)
│   │       ├── atoms/            ←   Avatar.ts, DeleteBtn.ts (lo más pequeño)
│   │       ├── molecules/        ←   AICard.ts (tarjeta = varios átomos)
│   │       └── organisms/        ←   AICardGrid.ts (rejilla de tarjetas)
│   └── controller/
│       └── AIController.ts       ← CONTROLADOR: eventos, lógica, conecta Modelo y Vista
│
├── dist-js/                      ← (generado, NO editar, está en .gitignore) JS compilado
├── dist/                         ← (generado, en .gitignore) instaladores
├── node_modules/                 ← (generado, en .gitignore) dependencias
│
├── index.html                    ← La interfaz: sidebar, panel de inicio y los <webview> de cada IA
├── index.css                     ← Estilos (tema oscuro)
├── public/                       ← Imágenes que SÍ van dentro del instalador
│   ├── icon.png, logo.png        ←   Iconos de la app
│   ├── icons/                    ←   Logos de las plataformas
│   └── img-github/               ←   Capturas del README (excluidas del instalador)
├── icons/                        ← Copia antigua de logos (la app usa public/icons/)
├── scripts/start.cjs             ← Lanzador de Electron (quita ELECTRON_RUN_AS_NODE)
├── patch_html.cjs, patch_ts.cjs  ← Scripts de migración de un solo uso (históricos, NO ejecutar)
├── installer.nsh                 ← Personalización del instalador de Windows (enlaces de donación)
├── tsconfig.json                 ← Configuración de TypeScript
├── package.json                  ← Scripts, dependencias y configuración de electron-builder
├── package-lock.json             ← Versiones exactas instaladas
├── README.md / README_EN.md      ← Documentación
└── LICENSE                       ← Licencia MIT
```

> 📌 Regla de oro: **edita en `src/`, nunca en `dist-js/`**. `dist-js/` se regenera cada vez que compilas.

---

## 6. Archivos de configuración explicados

### 6.1 [tsconfig.json](tsconfig.json)

| Opción | Valor | Qué significa |
|---|---|---|
| `target` | `ES2022` | JavaScript moderno de salida |
| `module` / `moduleResolution` | `NodeNext` | Módulos ES de Node. **Por eso los imports llevan `.js`** aunque el archivo sea `.ts` (ej.: `import { AIModel } from '../model/AIModel.js'`) |
| `rootDir` → `outDir` | `./src` → `./dist-js` | De dónde lee y dónde escribe |
| `strict` | `true` | TypeScript estricto: no ignores los errores de tipos |
| `skipLibCheck` | `true` | No revisa los tipos dentro de `node_modules` (compila más rápido) |

### 6.2 [package.json](package.json)

- `"type": "module"` → los `.js` se tratan como módulos ES (`import`/`export`).
  Los archivos que necesitan `require()` usan extensión **`.cjs`** (`scripts/start.cjs`) o **`.cts`** (`preload.cts`, que compila a `preload.cjs`). El preload tiene que ser CommonJS para Electron.
- `"main": "dist-js/main.js"` → punto de entrada de Electron.
- `"build"` → configuración de **electron-builder**:

| Clave | Valor | Significado |
|---|---|---|
| `appId` | `com.adavam.edaniel_valencia` | Identificador único de la app (no cambiarlo: rompe actualizaciones) |
| `productName` | `Adam IA` | Nombre visible y nombre de la carpeta de datos |
| `files` | `dist-js`, `index.html`, `index.css`, `public` (sin `img-github`) | Lo que entra en el instalador. **Si creas un archivo nuevo fuera de estas rutas, no llegará al instalador** |
| `win` | NSIS x64, instalador no “one-click”, con licencia e `installer.nsh` | Instalador de Windows |
| `mac` | DMG x64 + arm64 | Intel y Apple Silicon |
| `linux` | AppImage x64 | Linux |

### 6.3 [.gitignore](.gitignore)
Excluye `node_modules/`, `dist-js/`, `dist/`, logs, `.vscode/`, `.DS_Store` y `.env*`. Si un archivo generado aparece en `git status`, probablemente falta aquí.

---

## 7. Cómo funciona por dentro (arquitectura)

### 7.1 Los 3 “mundos” de Electron

```
┌──────────────────────────────┐
│  PROCESO PRINCIPAL (Node)     │  src/main.ts
│  - crea la ventana            │  Tiene acceso al disco y al sistema.
│  - User-Agent / login Google  │
│  - IPC: save/get/delete icon  │
│  - decide qué popups se abren │
└──────────────┬───────────────┘
               │ IPC (ipcMain.handle / ipcRenderer.invoke)
┌──────────────┴───────────────┐
│  PRELOAD (puente)             │  src/preload.cts
│  window.electronAPI = {       │  Expone SOLO 3 funciones seguras.
│    saveIcon, getIconPath,     │
│    deleteIcon }               │
└──────────────┬───────────────┘
               │
┌──────────────┴───────────────┐
│  RENDERER (la ventana / DOM)  │  index.html + Controller/Model/View
│  - sin acceso a Node          │  nodeIntegration: false
│  - <webview> por cada IA      │  contextIsolation: true
└──────────────────────────────┘
```

**Por qué así:** las webs de IA son código de terceros. Si el renderer tuviera acceso a Node, una web podría leer tu disco. Por eso solo se expone lo mínimo a través del preload:

| API (`window.electronAPI`) | Canal IPC | Función |
|---|---|---|
| `saveIcon(id, base64)` | `save-icon` | Guarda el icono como `<userData>/icons/<id>.webp` |
| `getIconPath(id)` | `get-icon-path` | Devuelve la ruta `file://` del icono si existe |
| `deleteIcon(id)` | `delete-icon` | Elimina el icono |

### 7.2 Patrón MVC en el renderer

| Capa | Archivo | Responsabilidad | NO debe… |
|---|---|---|---|
| **Model** | `AIModel.ts` | Guardar/leer datos (`localStorage`) | tocar el DOM |
| **View** | `AIView.ts` + `components/` | Pintar y modificar el DOM | guardar datos |
| **Controller** | `AIController.ts` | Escuchar eventos y coordinar Model ↔ View | construir HTML a mano |

**Ejemplo de flujo: el usuario añade una IA personalizada**

1. Click en “Añadir IA” → `AIController` (listener) → `AIView.openModal()`.
2. El usuario rellena el formulario y guarda → `AIController.saveNewAI()`.
3. Si hay icono → `compressImage()` lo pasa a WebP base64 → `window.electronAPI.saveIcon()` → `main.ts` lo escribe en `<userData>/icons/<id>.webp`.
4. `AIModel.add()` crea el objeto `{ id: 'custom-<timestamp>', name, url, color, ... }` y lo guarda en `localStorage`.
5. `AIView.injectCustomAI()` crea el item del sidebar, la tarjeta y el `<webview>` con `partition="persist:<id>"`.

**Arranque de la interfaz** (`AIController.init()`):
1. Carga las IAs personalizadas del modelo y las inyecta en la vista.
2. Recorre la lista `staticAIs`: oculta las que el usuario borró y conecta eventos (`did-start-loading`, etc.) a las demás.
3. Registra todos los listeners y muestra la pantalla `home`.

### 7.3 Atomic Design (componentes)
- **Átomo**: pieza mínima → `Avatar` (círculo con la inicial), `DeleteBtn`.
- **Molécula**: combinación de átomos → `AICard` (tarjeta con avatar, nombre y botones).
- **Organismo**: bloque completo → `AICardGrid` (inserta tarjetas en la rejilla).

Los componentes son clases con un método `static render()` que devuelve un **string de HTML**.

### 7.4 Sesiones aisladas
Cada IA vive en un `<webview id="wv-<id>" partition="persist:<id>">`. Electron crea un almacenamiento independiente (cookies, localStorage, caché) para cada partición, y el prefijo `persist:` hace que se guarde en disco y no se mezcle entre plataformas.

### 7.5 Login con Google
Google bloquea el login en navegadores embebidos cuando detecta `Electron/x.y.z` en el User-Agent o en los *client hints* `Sec-CH-UA`. `src/main.ts` lo evita así:
1. User-Agent de **Chrome limpio** (sin la palabra “Electron”) en todas las sesiones (`app.userAgentFallback` y `session.setUserAgent`).
2. Solo en `accounts.google.com` / `accounts.youtube.com`: User-Agent de **Firefox** y elimina las cabeceras `Sec-CH-UA*`.
3. Ajusta `navigator.userAgent` en cada navegación para que coincida con el header enviado.

> ⚠️ Si tocas esta parte, prueba el login con Google en ChatGPT, Claude y Gemini antes de subir el cambio.

### 7.6 Popups y enlaces
`setWindowOpenHandler` en `main.ts`:
- URL de login (Google, Microsoft, Apple, GitHub, Facebook, Auth0, o que contenga `oauth`, `auth`, `signin`, `login`) → se abre **dentro** de la app compartiendo la sesión.
- Cualquier otro enlace → se abre en el **navegador del sistema**.

### 7.7 ¿Dónde se guardan los datos del usuario?

| Dato | Dónde |
|---|---|
| IAs personalizadas | `localStorage` → clave `custom_ias` |
| Categorías | `localStorage` → clave `ai_categories` |
| IAs por defecto ocultadas | `localStorage` → clave `deleted_default_ias` |
| Iconos | `<userData>/icons/<id>.webp` |
| Cookies/sesiones | `<userData>/Partitions/<id>` |

`<userData>`: macOS `~/Library/Application Support/Adam IA`, Windows `%APPDATA%\Adam IA`, Linux `~/.config/Adam IA`.
En desarrollo (`npm start`) la carpeta se llama **`adam-ia`**. Bórrala para “empezar de cero”.

**Abrir DevTools para depurar:** descomenta `mainWindow?.webContents.openDevTools();` en `createMainWindow()` de `main.ts` (no lo subas descomentado). En la consola puedes inspeccionar `localStorage.getItem('custom_ias')`.

---

## 8. Tarea típica: añadir una plataforma incluida por defecto

Las plataformas por defecto están **escritas a mano en varios sitios**. Si olvidas uno, la plataforma funcionará a medias. Checklist (ejemplo con id `mistral`):

1. **`index.html` – sidebar**: añade `<li class="menu-item mistral-btn" data-target="mistral" data-tooltip="Mistral">…</li>` antes del item `soporte-btn`.
2. **`index.html` – panel de inicio**: añade la tarjeta `<div class="ai-card mistral" data-target="mistral">…</div>` (copia una existente, incluidos los botones editar/eliminar con `data-id="mistral"`).
3. **`index.html` – webview**: `<webview id="wv-mistral" src="https://chat.mistral.ai/" partition="persist:mistral" allowpopups></webview>`.
4. **Lista `staticAIs`**: añade `'mistral'` en **todas** sus copias:
   - `src/controller/AIController.ts` → `init()`, `deleteAI()`, `openEditModal()`
   - `src/model/AIModel.ts` → `edit()`
   - `src/view/AIView.ts` → `injectCustomAI()` y `removeCustomAIDOM()`
   - Son **6 copias** en total; compruébalo con `grep -rn "staticAIs = " src`
5. **`index.css`**: colores de hover/activo para `.mistral-btn` y `.ai-card.mistral` (copia los de otra plataforma).
6. **Logo** (opcional): en `public/icons/`.
7. **README.md y README_EN.md**: añade la fila en la tabla de [plataformas incluidas](#-plataformas-incluidas).
8. `npm start` y comprueba: aparece en sidebar, abre la web, se puede editar, eliminar y la sesión persiste al reiniciar.

> 💡 Mejora pendiente ideal para practicar: centralizar `staticAIs` en una única constante exportada (por ejemplo en `src/model/defaults.ts`) para que solo haya un sitio que tocar.

---

## 9. Flujo de trabajo con Git

```bash
git checkout main && git pull            # 1. Parte de main actualizado
git checkout -b feat/buscador-ias        # 2. Crea tu rama
# ... cambios ...
npm run build-ts                         # 3. Sin errores de TypeScript
npm start                                # 4. Pruébalo a mano
git add <archivos>                       # 5. Nunca subas dist-js/, dist/ ni node_modules/
git commit -m "feat: añade buscador de IAs en el inicio"
git push -u origin feat/buscador-ias     # 6. Abre un Pull Request hacia main
```

**Nombres de rama:** `feat/…` (funcionalidad), `fix/…` (bug), `docs/…` (documentación), `chore/…` (mantenimiento).
**Mensajes de commit:** describe *qué* cambia. Evita `no message` o `cambios`.

---

## 10. Publicar una versión (release)

1. Sube `"version"` en `package.json` (ver [§3.1](#31-versión-de-la-app)) y haz commit.
2. Genera el instalador en **cada sistema operativo** con `npm run build`. Resultado en `dist/`:

   | Sistema anfitrión | Resultado |
   |---|---|
   | Windows | Instalador NSIS `.exe` (x64) |
   | macOS | `.dmg` para x64 y arm64 |
   | Linux | `.AppImage` (x64) |

   Para un objetivo concreto: `npx tsc && npx electron-builder --win` (o `--mac`, `--linux`).
   - macOS solo se compila desde un Mac.
   - Windows desde Mac/Linux requiere Wine.
3. En GitHub → *Releases* → nueva release con tag `v1.0.9` y adjunta `.exe`, `.dmg` y `.AppImage` de `dist/`.

---

## 11. Solución de problemas

### `npm start` no abre ninguna ventana
Seguramente tu terminal define `ELECTRON_RUN_AS_NODE`. Usa `npm start` (que ya lo corrige) en lugar de `npx electron .`. Si aun así falla, ejecútalo desde un terminal externo (Terminal, iTerm, PowerShell).

### Google dice "Este navegador o aplicación puede no ser seguro"
Asegúrate de usar la versión 1.0.8 o posterior. Si persiste, borra la sesión de esa plataforma eliminando la carpeta `Partitions/<id>` dentro de `<userData>` y vuelve a iniciar sesión.

### macOS: "No se puede abrir porque no se puede verificar al desarrollador"
Haz clic derecho sobre la app → **Abrir**, o ve a *Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente*. También puedes quitar la cuarentena desde Terminal:
```bash
xattr -dr com.apple.quarantine "/Applications/Adam IA.app"
```

### Windows: error de enlace simbólico al compilar
Si `npm run build` muestra:
`ERROR: Cannot create symbolic link : A required privilege is not held by the client.`

`electron-builder` descarga un paquete de firma de código que contiene enlaces simbólicos de macOS. Soluciones:
- **Activar el Modo de desarrollador (recomendado)**: *Configuración → Sistema → Para programadores → Modo de desarrollador*.
- **Ejecutar como administrador** el terminal o VS Code y repetir el build.
- **Extracción manual de la caché**: extrae el `.7z` de `C:\Users\<TuUsuario>\AppData\Local\electron-builder\Cache\winCodeSign` en una carpeta llamada `winCodeSign-2.6.0`, excluyendo la carpeta `darwin`.

### Aviso de `install-scripts` al ejecutar `npm install`
```
npm warn install-scripts electron-winstaller@5.4.0 (install: node ./script/select-7z-arch.js)
```
`electron-winstaller` necesita su script de instalación para crear instaladores de Windows. Si vas a compilar para Windows, apruébalo:
```bash
npm install-scripts approve electron-winstaller
```

### Vulnerabilidades moderadas en `npm audit`
Vienen de `minimatch` dentro de las dependencias de `electron-builder` y solo afectan al proceso de compilación, no a la app instalada. **No ejecutes `npm audit fix --force`**: bajaría `electron-builder` a una versión antigua y rompería el build.

---

## 12. Cosas raras que vas a encontrar (y que no son culpa tuya)

| Qué | Detalle |
|---|---|
| URL del repositorio | El remoto real es `github.com/adavam-lab/Adam-IA`; el enlace de *Releases* apunta a `edaniel-valencia/Adam-IA` y `package.json` dice `adavam/adam-ia` |
| `staticAIs` duplicado | La misma lista aparece en 6 sitios (ver [§8](#8-tarea-típica-añadir-una-plataforma-incluida-por-defecto)) |
| Licencia | `LICENSE` es MIT, pero `package.json` dice `"license": "ISC"` |
| `patch_html.cjs` / `patch_ts.cjs` | Migraciones antiguas de un solo uso. **No las ejecutes**: ya están aplicadas y romperían el código |
| Carpeta `icons/` en la raíz | Duplicado de `public/icons/`; la app usa la de `public/` |
| Sin tests | `npm test` no hace nada todavía; las pruebas son manuales |
| HTML inyectado como string | Los componentes construyen HTML con template strings; ten cuidado con insertar texto del usuario sin escaparlo |

Si arreglas alguna, ¡es un buen primer Pull Request!

---

## 13. Glosario

- **Electron**: framework para hacer apps de escritorio con tecnologías web (Chromium + Node.js).
- **Proceso principal (main)**: el “backend” local de la app; tiene acceso al sistema.
- **Renderer**: la ventana (HTML/CSS/JS); equivalente a una pestaña de navegador.
- **Preload**: script que corre antes del renderer y expone funciones seguras con `contextBridge`.
- **IPC**: mensajes entre renderer y main (`ipcRenderer.invoke` → `ipcMain.handle`).
- **`<webview>`**: etiqueta de Electron que incrusta una web externa en su propio proceso.
- **Partition**: almacén de sesión independiente; `persist:` lo guarda en disco.
- **User-Agent**: texto que el navegador envía para identificarse.
- **electron-builder**: herramienta que empaqueta la app en instaladores.
- **SemVer**: versionado `MAYOR.MENOR.PARCHE`.

---

## 14. Checklist del primer día

- [ ] Instalé Node, npm y Git ([§1](#1-requisitos-previos))
- [ ] Cloné, hice `npm install` y `npm start` abre la app ([§2](#2-instalación-paso-a-paso-primera-vez))
- [ ] Sé dónde se edita el código (`src/`) y qué carpetas son generadas ([§5](#5-estructura-de-carpetas))
- [ ] Entiendo main / preload / renderer ([§7.1](#71-los-3-mundos-de-electron)) y MVC ([§7.2](#72-patrón-mvc-en-el-renderer))
- [ ] Añadí una IA personalizada desde la app y la encontré en `localStorage` con DevTools ([§7.7](#77-dónde-se-guardan-los-datos-del-usuario))
- [ ] Creé una rama, hice un cambio pequeño y abrí un Pull Request ([§9](#9-flujo-de-trabajo-con-git))

---

## 📜 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  Hecho con ❤️ por <b>Edaniel Valencia & Adavam</b> 🚀
</div>
