import { AICardGrid } from './components/organisms/AICardGrid.js';
import { CardData } from './components/molecules/AICard.js';

export class AIView {
    // DOM Elements
    public sidebar = document.getElementById('sidebar') as HTMLElement;
    public toggleSidebarBtn = document.getElementById('toggle-sidebar') as HTMLElement;
    public viewHome = document.getElementById('view-home') as HTMLElement;
    public viewChat = document.getElementById('view-chat') as HTMLElement;
    public viewSoporte = document.getElementById('view-soporte') as HTMLElement;
    public webviewContainer = document.getElementById('webview-container') as HTMLElement;
    public loadingOverlay = document.getElementById('loading-overlay') as HTMLElement;
    public toolbarStatus = document.getElementById('toolbar-status') as HTMLElement;
    public activeAiNameLabel = document.getElementById('active-ai-name') as HTMLElement;
    public toolbarBack = document.getElementById('toolbar-back') as HTMLButtonElement;
    public toolbarForward = document.getElementById('toolbar-forward') as HTMLButtonElement;
    public toolbarRefresh = document.getElementById('toolbar-refresh') as HTMLButtonElement;
    public toolbarHome = document.getElementById('toolbar-home') as HTMLButtonElement;
    public sidebarMenu = document.getElementById('sidebar-menu') as HTMLElement;
    public aiGrid = document.getElementById('ai-grid') as HTMLElement;
    public addAiBtn = document.getElementById('add-ai-btn') as HTMLElement;
    public addAiModal = document.getElementById('add-ai-modal') as HTMLElement;
    public closeModalBtn = document.getElementById('close-modal-btn') as HTMLElement;
    public cancelAiBtn = document.getElementById('cancel-ai-btn') as HTMLElement;
    public addAiForm = document.getElementById('add-ai-form') as HTMLFormElement;
    public aiNameInput = document.getElementById('ai-name') as HTMLInputElement;
    public aiUrlInput = document.getElementById('ai-url') as HTMLInputElement;
    public aiIconInput = document.getElementById('ai-icon') as HTMLInputElement;
    public aiColorInput = document.getElementById('ai-color') as HTMLInputElement;
    public yearEl = document.getElementById('copyright-year') as HTMLElement;
    public startupLoader = document.getElementById('app-startup-loader') as HTMLElement;
    public startupLoaderText = document.getElementById('startup-loader-text') as HTMLElement;
    public progressPercentage = document.getElementById('progress-percentage') as HTMLElement;
    
    // Donate Modal Elements
    public donateModal = document.getElementById('donate-modal') as HTMLElement;
    public closeDonateModalBtn = document.getElementById('close-donate-modal-btn') as HTMLElement;
    public closeDonateModalBtn2 = document.getElementById('close-donate-modal-btn2') as HTMLElement;
    public sidebarDonateBtn = document.getElementById('sidebar-donate-btn') as HTMLElement;

    // Category and Search Elements
    public searchInput = document.getElementById('search-ai-input') as HTMLInputElement;
    public sortSelect = document.getElementById('sort-ai-select') as HTMLSelectElement;
    public manageCategoriesBtn = document.getElementById('manage-categories-btn') as HTMLButtonElement;
    public categoriesModal = document.getElementById('categories-modal') as HTMLElement;
    public closeCategoriesModalBtn = document.getElementById('close-categories-modal-btn') as HTMLButtonElement;
    public doneCategoriesBtn = document.getElementById('done-categories-btn') as HTMLButtonElement;
    public addCategoryForm = document.getElementById('add-category-form') as HTMLFormElement;
    public catNameInput = document.getElementById('cat-name') as HTMLInputElement;
    public catColorInput = document.getElementById('cat-color') as HTMLInputElement;
    public categoriesList = document.getElementById('categories-list') as HTMLElement;
    public editAiIdInput = document.getElementById('edit-ai-id') as HTMLInputElement;
    public aiCategorySelect = document.getElementById('ai-category') as HTMLSelectElement;
    public addAiModalTitle = document.getElementById('add-ai-modal-title') as HTMLElement;
    public dropZone = document.getElementById('icon-drop-zone') as HTMLElement;
    public dropZoneText = document.getElementById('drop-zone-text') as HTMLElement;
    public dropZonePreview = document.getElementById('drop-zone-preview') as HTMLElement;
    public iconPreviewImg = document.getElementById('icon-preview-img') as HTMLImageElement;
    public iconPreviewName = document.getElementById('icon-preview-name') as HTMLElement;


    private currentAI: string | null = null;
    constructor() {
        this.initSidebarToggle();
        this.initCopyrightYear();
        this.initStartupLoader();
    }

    private initSidebarToggle(): void {
        this.toggleSidebarBtn?.addEventListener('click', () => {
            this.sidebar?.classList.toggle('expanded');
        });
    }

    private initCopyrightYear(): void {
        if (this.yearEl) {
            this.yearEl.textContent = new Date().getFullYear().toString();
        }
    }

    private initStartupLoader(): void {
        // Start counter
        if (this.progressPercentage) {
            let progress = 0;
            const duration = 800;
            const intervalTime = 30;
            const steps = duration / intervalTime;
            const increment = 100 / steps;
            
            const interval = setInterval(() => {
                progress += increment;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                this.progressPercentage.textContent = `${Math.floor(progress)}%`;
            }, intervalTime);
        }

        window.addEventListener('load', () => {
            if (this.startupLoaderText) {
                setTimeout(() => {
                    this.startupLoaderText.textContent = "¡Listo para ti!";
                }, 300);
            }

            setTimeout(() => {
                if (this.startupLoader) {
                    this.startupLoader.style.opacity = '0';
                    this.startupLoader.style.pointerEvents = 'none';
                    setTimeout(() => {
                        this.startupLoader.remove();
                    }, 500);
                }
            }, 800);
        });
    }

    public showScreen(screen: string, customIAs: CardData[]): void {
        // Hide all screens
        this.viewHome?.classList.remove('active');
        this.viewChat?.classList.remove('active');
        this.viewSoporte?.classList.remove('active');

        
        // Remove active state from all sidebar menu items
        document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));

        // Hide all webviews to ensure they don't overlay other screens
        const allWebviews = this.webviewContainer?.querySelectorAll('webview') as NodeListOf<any>;
        allWebviews?.forEach(wv => wv.classList.remove('active'));

        if (screen === 'home') {
            this.viewHome?.classList.add('active');
            this.currentAI = null;
            document.querySelector('.home-btn')?.classList.add('active');

        } else if (screen === 'soporte') {
            this.viewSoporte?.classList.add('active');
            this.currentAI = null;
            const activeMenuItem = document.querySelector(`.menu-item[data-target="${screen}"]`);
            if (activeMenuItem) activeMenuItem.classList.add('active');
        } else {
            this.viewChat?.classList.add('active');
            this.currentAI = screen;
            
            // Dynamic selector for both static and custom sidebar items
            const activeMenuItem = document.querySelector(`.menu-item[data-target="${screen}"]`);
            if (activeMenuItem) activeMenuItem.classList.add('active');

            // Set Title Label
            const staticNames: Record<string, string> = {
                deepseek: 'DeepSeek',
                chatgpt: 'ChatGPT',
                gemini: 'Gemini',
                kimi: 'Kimi',
                copilot: 'GitHub Copilot',
                claude: 'Claude',
                canva: 'Canva',
                venturikit: 'Venturikit',
                perplexity: 'Perplexity',
                facebook: 'Facebook',
                tiktok: 'TikTok',
                instagram: 'Instagram',
                x: 'X'
            };
            const customItem = customIAs.find(item => item.id === screen);
            if (this.activeAiNameLabel) {
                const labelSpan = this.activeAiNameLabel.querySelector('span:not(.status-indicator)');
                if (labelSpan) {
                    labelSpan.textContent = customItem ? customItem.name : (staticNames[screen] || 'IA');
                }
            }

            // Show active webview, hide others
            const allWebviews = this.webviewContainer?.querySelectorAll('webview') as NodeListOf<any>;
            allWebviews?.forEach(wv => {
                if (wv.id === `wv-${screen}`) {
                    wv.classList.add('active');
                    if (wv.isLoading()) {
                        this.showLoader();
                    } else {
                        this.hideLoader();
                    }
                    this.updateNavButtons(wv);
                } else {
                    wv.classList.remove('active');
                }
            });
        }
    }

    public showLoader(): void {
        // Se ha desactivado el overlay gigante porque bloquea interacciones de inicio de sesión
        // if (this.loadingOverlay) {
        //     this.loadingOverlay.style.opacity = '1';
        //     this.loadingOverlay.style.pointerEvents = 'all';
        // }
        this.toolbarStatus?.classList.add('loading');
    }

    public hideLoader(): void {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.opacity = '0';
            this.loadingOverlay.style.pointerEvents = 'none';
        }
        this.toolbarStatus?.classList.remove('loading');
    }

    public updateNavButtons(wv: any): void {
        if (!wv) return;
        if (this.toolbarBack) this.toolbarBack.disabled = !wv.canGoBack();
        if (this.toolbarForward) this.toolbarForward.disabled = !wv.canGoForward();
    }

    // Modal Controls
    public openModal(ai?: any, categories: any[] = []): void {
        this.updateCategorySelects(categories);
        if (ai) {
            this.addAiModalTitle.textContent = "Editar Plataforma";
            this.editAiIdInput.value = ai.id;
            this.aiNameInput.value = ai.name;
            this.aiUrlInput.value = ai.url;
            this.aiColorInput.value = ai.color || '#8b5cf6';
            this.aiCategorySelect.value = ai.categoryId || '';
            if (ai.iconBase64) {
                this.showIconPreview(ai.iconBase64, 'Icono actual');
            } else {
                this.clearIconPreview();
            }
        } else {
            this.addAiModalTitle.textContent = "Agregar Nueva Plataforma";
            this.editAiIdInput.value = '';
            this.addAiForm?.reset();
            this.aiColorInput.value = '#8b5cf6';
            this.clearIconPreview();
        }
        this.addAiModal?.classList.add('active');
        this.aiNameInput?.focus();
    }

    public closeModal(): void {
        this.addAiModal?.classList.remove('active');
        this.editAiIdInput.value = '';
        this.addAiForm?.reset();
        if (this.aiIconInput) {
            this.aiIconInput.value = '';
        }
        this.clearIconPreview();
    }

    public showIconPreview(src: string, name: string): void {
        if (this.iconPreviewImg && this.iconPreviewName && this.dropZoneText && this.dropZonePreview) {
            this.iconPreviewImg.src = src;
            this.iconPreviewName.textContent = name;
            this.dropZoneText.style.display = 'none';
            this.dropZonePreview.style.display = 'block';
        }
    }

    public clearIconPreview(): void {
        if (this.iconPreviewImg && this.iconPreviewName && this.dropZoneText && this.dropZonePreview) {
            this.iconPreviewImg.src = '';
            this.iconPreviewName.textContent = '';
            this.dropZoneText.style.display = 'block';
            this.dropZonePreview.style.display = 'none';
        }
    }

    // Categories Modal
    public openCategoriesModal(categories: any[]): void {
        this.updateCategorySelects(categories);
        this.renderCategoriesList(categories);
        this.categoriesModal?.classList.add('active');
        this.catNameInput?.focus();
    }

    public closeCategoriesModal(): void {
        this.categoriesModal?.classList.remove('active');
        this.addCategoryForm?.reset();
    }

    public updateCategorySelects(categories: any[]): void {
        if (!this.aiCategorySelect) return;
        
        // Preserve current value if possible
        const currentValue = this.aiCategorySelect.value;
        
        let html = '<option value="" style="background: var(--bg-surface);">Sin categoría</option>';
        categories.forEach(cat => {
            html += `<option value="${cat.id}" style="background: var(--bg-surface);">${cat.name}</option>`;
        });
        
        this.aiCategorySelect.innerHTML = html;
        if (categories.some(c => c.id === currentValue)) {
            this.aiCategorySelect.value = currentValue;
        }
    }

    public renderCategoriesList(categories: any[], model?: any): void {
        if (!this.categoriesList) return;
        
        if (categories.length === 0) {
            this.categoriesList.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem;">No hay categorías creadas.</p>';
            return;
        }

        let html = '';
        categories.forEach(cat => {
            html += `
                <div class="category-item">
                    <div class="category-item-info">
                        <div class="category-badge" style="background-color: ${cat.color || '#a78bfa'};"></div>
                        <span>${cat.name}</span>
                    </div>
                    <button type="button" class="cat-delete-btn" data-id="${cat.id}" title="Eliminar categoría">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            `;
        });
        
        this.categoriesList.innerHTML = html;
    }



    // Donate Modal Controls
    public openDonateModal(): void {
        this.donateModal?.classList.add('active');
    }

    public closeDonateModal(): void {
        this.donateModal?.classList.remove('active');
    }

    // Custom AI Webview & Sidebar Injection
    public injectCustomAI(data: CardData, url: string): void {
        const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'copilot', 'canva', 'venturikit', 'perplexity', 'facebook', 'tiktok', 'instagram', 'x'];
        if (staticAIs.includes(data.id)) {
            // Update sidebar item
            const li = document.getElementById(`menu-${data.id}`) || document.querySelector(`.menu-item[data-target="${data.id}"]`);
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
            const webview = document.getElementById(`wv-${data.id}`);
            if (webview && webview.getAttribute('src') !== url) {
                webview.setAttribute('src', url);
            }

            // Update Card
            const card = document.querySelector(`.ai-card[data-target="${data.id}"]`);
            if (card) {
                const h3 = card.querySelector('h3');
                if (h3) h3.textContent = data.name;
                
                if (data.iconBase64) {
                    const iconContainer = card.querySelector('.ai-icon-container');
                    if (iconContainer) {
                        iconContainer.innerHTML = `<img src="${data.iconBase64}" alt="${data.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                        (iconContainer as HTMLElement).style.backgroundColor = 'transparent';
                        (iconContainer as HTMLElement).style.border = 'none';
                    }
                }
                
                // Ensure edit/delete buttons have correct data-id
                card.querySelectorAll('.card-action-btn').forEach(btn => btn.setAttribute('data-id', data.id));
            }

            // Inject styles
            const style = document.createElement('style');
            style.innerHTML = `
                .menu-item[data-target="${data.id}"]:hover,
                .menu-item[data-target="${data.id}"].active {
                    background-color: ${data.color}20 !important;
                    color: ${data.color} !important;
                }
                .ai-card[data-target="${data.id}"]:hover {
                    border-color: ${data.color}60 !important;
                    box-shadow: 0 10px 30px ${data.color}15 !important;
                }
                .ai-card[data-target="${data.id}"]::before {
                    background-color: ${data.color} !important;
                }
            `;
            document.head.appendChild(style);

            return;
        }

        // 1. Add sidebar menu item
        const menuList = this.sidebarMenu;
        const soporteItem = menuList?.querySelector('.soporte-btn');

        const li = document.createElement('li');
        li.className = 'menu-item custom-btn';
        li.id = `menu-${data.id}`;
        li.setAttribute('data-target', data.id);
        li.setAttribute('data-tooltip', data.name);
        
        let avatarContent = '';
        if (data.iconBase64) {
            avatarContent = `<img src="${data.iconBase64}" alt="${data.name}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: contain;">`;
        } else {
            avatarContent = `<div class="menu-avatar" style="background-color: ${data.color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;">
                ${data.name.charAt(0).toUpperCase()}
            </div>`;
        }
        
        li.innerHTML = `
            ${avatarContent}
            <span class="menu-label">${data.name}</span>
        `;

        // Insert before "Soporte" button
        if (soporteItem) {
            menuList.insertBefore(li, soporteItem);
        } else {
            menuList.appendChild(li);
        }

        // 2. Add webview
        const webview = document.createElement('webview');
        webview.id = `wv-${data.id}`;
        webview.setAttribute('src', url);
        webview.setAttribute('partition', `persist:${data.id}`);
        webview.setAttribute('allowpopups', '');

        this.webviewContainer?.appendChild(webview);

        // 3. Inject dynamic color styles for the hover and active states of this new custom AI
        const style = document.createElement('style');
        style.innerHTML = `
            .menu-item[data-target="${data.id}"]:hover,
            .menu-item[data-target="${data.id}"].active {
                background-color: ${data.color}20 !important;
                color: ${data.color} !important;
            }
            .ai-card[data-target="${data.id}"]:hover {
                border-color: ${data.color}60 !important;
                box-shadow: 0 10px 30px ${data.color}15 !important;
            }
        `;
        document.head.appendChild(style);

        // 4. Add dynamic card to the grid
        if (this.aiGrid && this.addAiBtn) {
            AICardGrid.addCustomCard(this.aiGrid, this.addAiBtn, data);
        }
    }

    public removeCustomAIDOM(id: string): void {
        const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi', 'copilot', 'canva', 'venturikit', 'perplexity', 'facebook', 'tiktok', 'instagram', 'x'];
        if (staticAIs.includes(id)) {
            return;
        }
        
        const webview = document.getElementById(`wv-${id}`);
        const sidebarItem = document.getElementById(`menu-${id}`);
        const card = document.getElementById(`card-${id}`);

        webview?.remove();
        sidebarItem?.remove();
        card?.remove();
    }

    public hideDefaultAI(id: string): void {
        const card = document.querySelector(`.ai-card.${id}`);
        const menu = document.querySelector(`.menu-item[data-target="${id}"]`);
        
        if (card) (card as HTMLElement).style.display = 'none';
        if (menu) (menu as HTMLElement).style.display = 'none';
    }

    public renderGrid(customAIs: any[], categories: any[], isDefaultDeleted: (id: string) => boolean, query: string, sort: string): void {
        if (!this.aiGrid) return;
        
        // 1. Gather all existing cards
        const allCards = Array.from(this.aiGrid.querySelectorAll('.ai-card'));
        const addCard = allCards.find(c => c.id === 'add-ai-btn');
        const aiCards = allCards.filter(c => c.id !== 'add-ai-btn');
        
        // 2. Hide/Show based on query and deleted defaults
        aiCards.forEach(card => {
            const id = card.getAttribute('data-target') || '';
            const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
            let isVisible = name.includes(query);
            
            // Check if default is deleted
            if (!card.classList.contains('custom-ai') && isDefaultDeleted(id)) {
                isVisible = false;
            }
            
            (card as HTMLElement).style.display = isVisible ? 'flex' : 'none';
        });
        
        // 3. DocumentFragment for zero-flicker atomic rendering
        const fragment = document.createDocumentFragment();

        if (sort === 'category') {
            const groups: { [key: string]: HTMLElement[] } = {};
            const categoryNames: { [key: string]: string } = {};
            categories.forEach(c => {
                groups[c.id] = [];
                categoryNames[c.id] = c.name;
            });
            groups['base'] = [];
            categoryNames['base'] = "Modelos Base";
            groups['uncategorized'] = [];
            categoryNames['uncategorized'] = "Sin Categoría";
            
            aiCards.forEach(card => {
                if ((card as HTMLElement).style.display === 'none') return;
                
                const id = card.getAttribute('data-target');
                const aiData = customAIs.find(ai => ai.id === id);

                if (aiData && aiData.categoryId && groups[aiData.categoryId]) {
                    groups[aiData.categoryId].push(card as HTMLElement);
                } else if (!card.classList.contains('custom-ai')) {
                    groups['base'].push(card as HTMLElement);
                } else {
                    groups['uncategorized'].push(card as HTMLElement);
                }
            });
            
            const appendGroup = (id: string) => {
                if (groups[id] && groups[id].length > 0) {
                    const header = document.createElement('div');
                    header.className = 'category-group-header';
                    header.innerHTML = `<h2>${categoryNames[id]}</h2>`;
                    fragment.appendChild(header);
                    groups[id].forEach(c => fragment.appendChild(c));
                }
            };
            
            appendGroup('base');
            categories.forEach(c => appendGroup(c.id));
            appendGroup('uncategorized');
            
            if (addCard) fragment.appendChild(addCard);
            
        } else {
            // Sort by name
            const visibleCards = aiCards.filter(c => (c as HTMLElement).style.display !== 'none');
            visibleCards.sort((a, b) => {
                const nameA = a.querySelector('h3')?.textContent || '';
                const nameB = b.querySelector('h3')?.textContent || '';
                return nameA.localeCompare(nameB);
            });
            
            visibleCards.forEach(c => fragment.appendChild(c));
            if (addCard) fragment.appendChild(addCard);
        }

        // Single atomic DOM replacement: eliminates black frame flickers
        this.aiGrid.replaceChildren(fragment);
    }

    public getCurrentAI(): string | null {
        return this.currentAI;
    }
}
