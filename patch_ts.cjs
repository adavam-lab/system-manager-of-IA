const fs = require('fs');
const path = require('path');

// --- Patch AIController.ts ---
const controllerPath = path.join(__dirname, 'src', 'controller', 'AIController.ts');
let controllerData = fs.readFileSync(controllerPath, 'utf-8');

// 1. Update staticAIs array in init()
controllerData = controllerData.replace(
    /const staticAIs = \['deepseek', 'chatgpt', 'gemini', 'kimi'\];/,
    "const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'canva', 'venturikit', 'perplexity'];"
);

// 2. Update staticAIs array in deleteAI()
controllerData = controllerData.replace(
    /const staticAIs = \['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi'\];/,
    "const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'canva', 'venturikit', 'perplexity'];"
);

// 3. Update openEditModal()
const oldOpenEditModal = `    private openEditModal(id: string): void {
        const ai = this.model.getById(id);
        if (ai) {
            this.view.openModal(ai, this.model.getCategories());
        }
    }`;

const newOpenEditModal = `    private openEditModal(id: string): void {
        let ai = this.model.getById(id);
        if (!ai) {
            const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'canva', 'venturikit', 'perplexity'];
            if (staticAIs.includes(id)) {
                const card = document.querySelector(\`.ai-card[data-target="\${id}"]\`);
                const name = card ? (card.querySelector('h3')?.textContent || id) : id;
                const wv = document.getElementById(\`wv-\${id}\`);
                const url = wv ? wv.getAttribute('src') : '';
                ai = { id, name, url: url || '', color: '#8b5cf6' } as any;
            }
        }
        if (ai) {
            this.view.openModal(ai, this.model.getCategories());
        }
    }`;

controllerData = controllerData.replace(oldOpenEditModal, newOpenEditModal);

fs.writeFileSync(controllerPath, controllerData);

// --- Patch AIView.ts ---
const viewPath = path.join(__dirname, 'src', 'view', 'AIView.ts');
let viewData = fs.readFileSync(viewPath, 'utf-8');

const oldInject = `    public injectCustomAI(data: CardData, url: string): void {
        // 1. Add sidebar menu item`;

const newInject = `    public injectCustomAI(data: CardData, url: string): void {
        const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'canva', 'venturikit', 'perplexity'];
        if (staticAIs.includes(data.id)) {
            // Update sidebar item
            const li = document.getElementById(\`menu-\${data.id}\`) || document.querySelector(\`.menu-item[data-target="\${data.id}"]\`);
            if (li) {
                const span = li.querySelector('.menu-label');
                if (span) span.textContent = data.name;
                
                if (data.iconBase64) {
                    const oldSvg = li.querySelector('svg');
                    if (oldSvg) oldSvg.style.display = 'none';
                    const oldImg = li.querySelector('img.custom-icon');
                    if (oldImg) oldImg.remove();
                    
                    const img = document.createElement('img');
                    img.src = data.iconBase64;
                    img.alt = data.name;
                    img.className = 'custom-icon';
                    img.style.width = '24px';
                    img.style.height = '24px';
                    img.style.borderRadius = '50%';
                    img.style.objectFit = 'contain';
                    if (span) li.insertBefore(img, span);
                }
            }

            // Update webview URL
            const webview = document.getElementById(\`wv-\${data.id}\`);
            if (webview && webview.getAttribute('src') !== url) {
                webview.setAttribute('src', url);
            }

            // Update Card
            const card = document.querySelector(\`.ai-card[data-target="\${data.id}"]\`);
            if (card) {
                const h3 = card.querySelector('h3');
                if (h3) h3.textContent = data.name;
                
                if (data.iconBase64) {
                    const iconContainer = card.querySelector('.ai-icon-container');
                    if (iconContainer) {
                        iconContainer.innerHTML = \`<img src="\${data.iconBase64}" alt="\${data.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">\`;
                        (iconContainer as HTMLElement).style.backgroundColor = 'transparent';
                        (iconContainer as HTMLElement).style.border = 'none';
                    }
                }
                
                // Ensure edit/delete buttons have correct data-id
                card.querySelectorAll('.card-action-btn').forEach(btn => btn.setAttribute('data-id', data.id));
            }

            // Inject styles
            const style = document.createElement('style');
            style.innerHTML = \`
                .menu-item[data-target="\${data.id}"]:hover,
                .menu-item[data-target="\${data.id}"].active {
                    background-color: \${data.color}20 !important;
                    color: \${data.color} !important;
                }
                .ai-card[data-target="\${data.id}"]:hover {
                    border-color: \${data.color}60 !important;
                    box-shadow: 0 10px 30px \${data.color}15 !important;
                }
                .ai-card[data-target="\${data.id}"]::before {
                    background-color: \${data.color} !important;
                }
            \`;
            document.head.appendChild(style);

            return;
        }

        // 1. Add sidebar menu item`;

viewData = viewData.replace(oldInject, newInject);

fs.writeFileSync(viewPath, viewData);
