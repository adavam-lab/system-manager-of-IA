# Adam IA 🚀

<div align="center">
  <b>Español</b> | <a href="README_EN.md">English</a>
  <br><br>
  <img src="public/img-github/slide.gif" alt="Adam IA en acción: Inicio, ChatGPT, Gemini y Claude" width="900">
</div>

**Adam IA** es una aplicación de escritorio multiplataforma (Windows, macOS y Linux) que agrupa tus herramientas de Inteligencia Artificial favoritas en un único panel local y seguro. Cada plataforma corre en su propia sesión aislada, así que puedes tener abiertos ChatGPT, Gemini, Claude y más al mismo tiempo, cada uno con su cuenta, sin que se mezclen.

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
| VenturiKit IA | https://venturikit.com/ |
| Perplexity AI | https://www.perplexity.ai/ |

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

Mira la sección [Para desarrolladores](#-para-desarrolladores).

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
Todo se queda en tu equipo; Adam IA no envía nada a servidores propios.

| Dato | Ubicación |
|---|---|
| IAs personalizadas, categorías e IAs ocultas | `localStorage` de la app (`custom_ias`, `ai_categories`, `deleted_default_ias`) |
| Iconos personalizados | `<userData>/icons/<id>.webp` |
| Cookies y sesiones de cada plataforma | Particiones `persist:<id>` dentro de `<userData>` |

`<userData>` es (en la app instalada):
- **Windows**: `%APPDATA%\Adam IA`
- **macOS**: `~/Library/Application Support/Adam IA`
- **Linux**: `~/.config/Adam IA`

> Al ejecutar con `npm start`, la carpeta se llama `adam-ia` en lugar de `Adam IA`.

Para empezar de cero (cerrar todas las sesiones y borrar tus IAs personalizadas), cierra la app y elimina esa carpeta.

---

## 👩‍💻 Para desarrolladores

### Requisitos previos
- **[Node.js](https://nodejs.org/)** 20 o superior (incluye `npm`)
- **[Git](https://git-scm.com/)**

### Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/edaniel-valencia/Adam-IA.git
cd Adam-IA

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm start
```

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm start` | Compila TypeScript y abre la app con Electron (vía `scripts/start.cjs`). |
| `npm run build-ts` | Solo compila TypeScript (`src/` → `dist-js/`). |
| `npm run build` | Compila y genera el instalador para tu sistema con `electron-builder` en `dist/`. |
| `npm run clean` | Borra las carpetas `dist/` y `dist-js/`. |

> **¿Por qué `scripts/start.cjs` y no `electron .`?** Los terminales integrados de editores basados en Electron (VS Code, Cursor, Antigravity…) definen `ELECTRON_RUN_AS_NODE=1`. Con esa variable, `electron .` se ejecuta como Node y la ventana nunca aparece. El script la elimina antes de lanzar Electron.

### Generar instaladores

`npm run build` genera el instalador del sistema en el que estás:

| Sistema anfitrión | Resultado en `dist/` |
|---|---|
| Windows | Instalador NSIS `.exe` (x64) |
| macOS | `.dmg` para x64 y arm64 |
| Linux | `.AppImage` (x64) |

Para generar un objetivo concreto puedes pasar flags a `electron-builder`:

```bash
npx tsc && npx electron-builder --win
npx tsc && npx electron-builder --mac
npx tsc && npx electron-builder --linux
```

> Compilar para macOS solo es posible desde un Mac. Desde macOS o Linux, compilar para Windows requiere Wine.

### Publicar una nueva versión
1. Sube la versión en `package.json` (`"version"`).
2. Ejecuta `npm run build` en cada sistema operativo.
3. Crea un *Release* en GitHub con la etiqueta de la versión y adjunta los archivos de `dist/` (`.exe`, `.dmg`, `.AppImage`).

---

## 🏗️ Arquitectura del proyecto

Adam IA está hecho con **Electron + TypeScript** sin frameworks de UI. El *renderer* sigue un patrón **MVC** y los componentes visuales siguen **Atomic Design**.

```
Adam-IA/
├── src/
│   ├── main.ts                  # Proceso principal: ventana, sesiones, User-Agent, IPC, popups
│   ├── preload.cts              # Puente seguro (contextBridge) → window.electronAPI
│   ├── model/
│   │   └── AIModel.ts           # Datos: IAs personalizadas, categorías, persistencia en localStorage
│   ├── view/
│   │   ├── AIView.ts            # Manipulación del DOM, modales, webviews, barra lateral
│   │   └── components/
│   │       ├── atoms/           # Avatar, DeleteBtn
│   │       ├── molecules/       # AICard
│   │       └── organisms/       # AICardGrid
│   └── controller/
│       └── AIController.ts      # Lógica: eventos, navegación, alta/edición/borrado, drag & drop
├── scripts/
│   └── start.cjs                # Lanzador de Electron sin ELECTRON_RUN_AS_NODE
├── public/
│   ├── icon.png, logo.png       # Iconos de la app
│   ├── icons/                   # Logos de las plataformas incluidas
│   └── img-github/              # Capturas para este README (no se incluyen en el instalador)
├── index.html                   # Interfaz principal con los <webview> de cada plataforma
├── index.css                    # Estilos (tema oscuro)
├── installer.nsh                # Personalización del instalador NSIS de Windows
├── tsconfig.json                # TypeScript → dist-js/ (ES2022, NodeNext, strict)
└── package.json                 # Dependencias, scripts y configuración de electron-builder
```

### Tecnologías

| Pieza | Versión |
|---|---|
| Electron | 43.x |
| TypeScript | 7.x |
| electron-builder | 26.x |

---

## ⚙️ Cómo funciona por dentro

### Sesiones aisladas
Cada plataforma se carga en un `<webview>` con `partition="persist:<id>"`. Electron crea un almacenamiento independiente (cookies, localStorage, caché) para cada partición, y el prefijo `persist:` hace que se guarde en disco.

### Compatibilidad con "Iniciar sesión con Google"
Google bloquea el login en navegadores embebidos cuando detecta `Electron/x.y.z` en el User-Agent o en los *client hints* `Sec-CH-UA`. Para evitarlo, `src/main.ts`:
1. Usa un **User-Agent de Chrome limpio** (sin "Electron") en todas las sesiones (`app.userAgentFallback` y `session.setUserAgent`).
2. Solo en `accounts.google.com` y `accounts.youtube.com` usa un **User-Agent de Firefox** y **elimina los headers `Sec-CH-UA*`**, que es la combinación que Google acepta.
3. Ajusta también `navigator.userAgent` en cada navegación para que coincida con el header enviado.

### Ventanas emergentes y enlaces
`setWindowOpenHandler` decide qué hacer con cada `window.open`:
- Si la URL es de autenticación (Google, Microsoft, Apple, GitHub, Facebook, Auth0, o contiene `oauth`, `auth`, `signin`, `login`), se abre una ventana hija **dentro de la app** que comparte la sesión de la plataforma.
- Cualquier otro enlace se abre en tu **navegador predeterminado**.

### Seguridad
- `nodeIntegration: false` y `contextIsolation: true` en todas las ventanas.
- El renderer solo accede al sistema de archivos a través de 3 canales IPC expuestos en `preload.cts`:

| API (`window.electronAPI`) | Canal IPC | Función |
|---|---|---|
| `saveIcon(id, base64)` | `save-icon` | Guarda el icono como `<userData>/icons/<id>.webp` |
| `getIconPath(id)` | `get-icon-path` | Devuelve la ruta `file://` del icono si existe |
| `deleteIcon(id)` | `delete-icon` | Elimina el icono |

---

## 🛠️ Solución de problemas

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

## 💻 Requisitos del sistema

| Sistema | Requisito |
|---|---|
| Windows | Windows 10 o posterior (64 bits) |
| macOS | macOS 12 Monterey o posterior (Intel o Apple Silicon) |
| Linux | Distribución de 64 bits compatible con AppImage |

Necesitas conexión a internet para usar las plataformas de IA.

---

## 📜 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  Hecho con ❤️ por <b>Edaniel Valencia & Adavam</b> 🚀
</div>
