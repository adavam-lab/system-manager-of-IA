import { AIModel } from '../model/AIModel.js';
import { AIView } from '../view/AIView.js';

export class AIController {
    private model: AIModel;
    private view: AIView;

    constructor() {
        this.model = new AIModel();
        this.view = new AIView();

        this.init();
    }

    private init(): void {
        // Load custom IAs on startup
        const customList = this.model.getAll();
        customList.forEach(item => {
            this.view.injectCustomAI(
                { id: item.id, name: item.name, color: item.color },
                item.url
            );
        });

        const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'kimi'];
        staticAIs.forEach(id => {
            if (this.model.isDefaultDeleted(id)) {
                this.view.hideDefaultAI(id);
            } else {
                const wv = document.getElementById(`wv-${id}`) as any;
                if (wv) this.bindWebviewListeners(id, wv);
            }
        });

        // Bind custom webviews too
        customList.forEach(item => {
            const wv = document.getElementById(`wv-${item.id}`) as any;
            if (wv) this.bindWebviewListeners(item.id, wv);
        });

        // Setup DOM event listeners
        this.setupEventListeners();

        // Default screen
        this.view.showScreen('home', this.model.getAll());
        
        // Initial Renders
    }

    private bindWebviewListeners(id: string, wv: any): void {
        if (!wv) return;

        wv.addEventListener('did-start-loading', () => {
            if (this.view.getCurrentAI() === id) {
                this.view.showLoader();
            }
        });

        wv.addEventListener('did-stop-loading', () => {
            if (this.view.getCurrentAI() === id) {
                this.view.hideLoader();
                this.view.updateNavButtons(wv);
            }
        });

        wv.addEventListener('dom-ready', () => {
            if (this.view.getCurrentAI() === id) {
                this.view.hideLoader();
                this.view.updateNavButtons(wv);
            }
        });

        wv.addEventListener('did-navigate', () => {
            if (this.view.getCurrentAI() === id) {
                this.view.updateNavButtons(wv);
            }
        });

        wv.addEventListener('did-navigate-in-page', () => {
            if (this.view.getCurrentAI() === id) {
                this.view.updateNavButtons(wv);
            }
        });
    }

    private setupEventListeners(): void {
        // --- Toolbar Actions ---
        this.view.toolbarBack?.addEventListener('click', () => {
            const currentId = this.view.getCurrentAI();
            if (currentId) {
                const wv = document.getElementById(`wv-${currentId}`) as any;
                if (wv && wv.canGoBack()) wv.goBack();
            }
        });

        this.view.toolbarForward?.addEventListener('click', () => {
            const currentId = this.view.getCurrentAI();
            if (currentId) {
                const wv = document.getElementById(`wv-${currentId}`) as any;
                if (wv && wv.canGoForward()) wv.goForward();
            }
        });

        this.view.toolbarRefresh?.addEventListener('click', () => {
            const currentId = this.view.getCurrentAI();
            if (currentId) {
                const wv = document.getElementById(`wv-${currentId}`) as any;
                if (wv) wv.reload();
            }
        });

        this.view.toolbarHome?.addEventListener('click', () => {
            this.view.showScreen('home', this.model.getAll());
        });

        document.getElementById('close-soporte-btn')?.addEventListener('click', () => {
            this.view.showScreen('home', this.model.getAll());
        });

        // --- Sidebar Menu Click ---
        this.view.sidebarMenu?.addEventListener('click', (e) => {
            const item = (e.target as HTMLElement).closest('.menu-item');
            if (item) {
                const target = item.getAttribute('data-target');
                if (target) {
                    this.view.showScreen(target, this.model.getAll());
                }
            }
        });

        // --- Dashboard Grid Click (Navigation & Delete Card) ---
        this.view.aiGrid?.addEventListener('click', (e) => {
            const deleteBtn = (e.target as HTMLElement).closest('.card-delete-btn');
            if (deleteBtn) {
                e.stopPropagation();
                const id = deleteBtn.getAttribute('data-id');
                if (id) this.deleteAI(id);
                return;
            }

            const editBtn = (e.target as HTMLElement).closest('.card-edit-btn');
            if (editBtn) {
                e.stopPropagation();
                const id = editBtn.getAttribute('data-id');
                if (id) this.openEditModal(id);
                return;
            }

            const card = (e.target as HTMLElement).closest('.ai-card');
            if (card && card.id !== 'add-ai-btn') {
                const target = card.getAttribute('data-target');
                if (target) {
                    this.view.showScreen(target, this.model.getAll());
                }
            }
        });

        // --- Search and Sort Events ---
        this.view.searchInput?.addEventListener('input', () => this.renderGroupedGrid());
        this.view.sortSelect?.addEventListener('change', () => this.renderGroupedGrid());

        // --- Category Management Events ---
        this.view.manageCategoriesBtn?.addEventListener('click', () => {
            this.view.openCategoriesModal(this.model.getCategories());
        });
        
        this.view.closeCategoriesModalBtn?.addEventListener('click', () => {
            this.view.closeCategoriesModal();
            this.renderGroupedGrid(); // Refresh grid in case categories changed
        });

        this.view.doneCategoriesBtn?.addEventListener('click', () => {
            this.view.closeCategoriesModal();
            this.renderGroupedGrid();
        });

        this.view.addCategoryForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = this.view.catNameInput.value.trim();
            const color = this.view.catColorInput.value;
            if (name) {
                this.model.addCategory(name, color);
                this.view.catNameInput.value = '';
                this.view.renderCategoriesList(this.model.getCategories(), this.model);
                this.view.updateCategorySelects(this.model.getCategories());
            }
        });

        // Delete category event delegation
        this.view.categoriesList?.addEventListener('click', (e) => {
            const deleteBtn = (e.target as HTMLElement).closest('.cat-delete-btn');
            if (deleteBtn) {
                const id = deleteBtn.getAttribute('data-id');
                if (id) {
                    this.model.deleteCategory(id);
                    this.view.renderCategoriesList(this.model.getCategories(), this.model);
                    this.view.updateCategorySelects(this.model.getCategories());
                }
            }
        });

        // --- Modal Events ---
        this.view.addAiBtn?.addEventListener('click', () => {
            this.view.openModal(undefined, this.model.getCategories());
        });

        this.view.closeModalBtn?.addEventListener('click', () => {
            this.view.closeModal();
        });

        this.view.cancelAiBtn?.addEventListener('click', () => {
            this.view.closeModal();
        });

        // --- Donate Modal Events ---
        this.view.sidebarDonateBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.view.openDonateModal();
        });

        this.view.closeDonateModalBtn?.addEventListener('click', () => {
            this.view.closeDonateModal();
        });

        this.view.closeDonateModalBtn2?.addEventListener('click', () => {
            this.view.closeDonateModal();
        });

        // Submit add AI form
        this.view.addAiForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNewAI();
        });



        // Initialize drag and drop logic
        this.initDragAndDrop();
    }

    private draggedImageUrl: string | null = null;

    private initDragAndDrop(): void {
        const dropZone = this.view.dropZone;
        const iconInput = this.view.aiIconInput;

        if (!dropZone || !iconInput) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e: Event) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.style.borderColor = '#a78bfa', false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.style.borderColor = 'var(--border-glass)', false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (!dt) return;

            const files = dt.files;
            if (files && files.length > 0) {
                iconInput.files = files;
                this.handleIconPreview(files[0]);
                this.draggedImageUrl = null;
            } else {
                // Try to get URL if dragged from web
                const html = dt.getData('text/html');
                const url = dt.getData('text/uri-list');
                
                let imgSrc = '';
                if (html) {
                    const match = html.match(/src\s*=\s*"([^"]+)"/);
                    if (match) imgSrc = match[1];
                }
                if (!imgSrc && url) {
                    imgSrc = url;
                }
                
                if (imgSrc) {
                    this.draggedImageUrl = imgSrc;
                    this.view.showIconPreview(imgSrc, 'Imagen web');
                    iconInput.value = '';
                }
            }
        }, false);

        iconInput.addEventListener('change', () => {
            if (iconInput.files && iconInput.files.length > 0) {
                this.handleIconPreview(iconInput.files[0]);
                this.draggedImageUrl = null;
            } else {
                this.view.clearIconPreview();
                this.draggedImageUrl = null;
            }
        });
    }

    private handleIconPreview(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.view.showIconPreview(e.target?.result as string, file.name);
        };
        reader.readAsDataURL(file);
    }

    private compressImage(fileOrUrl: File | string, callback: (base64: string) => void): void {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const maxW = 128;
            const maxH = 128;
            let w = img.width;
            let h = img.height;
            if (w > maxW || h > maxH) {
                if (w > h) {
                    h = Math.round((h * maxW) / w);
                    w = maxW;
                } else {
                    w = Math.round((w * maxH) / h);
                    h = maxH;
                }
            }
            canvas.width = w;
            canvas.height = h;
            ctx?.drawImage(img, 0, 0, w, h);
            try {
                const dataUrl = canvas.toDataURL('image/webp', 0.8);
                callback(dataUrl);
            } catch (e) {
                // Handle CORS tainted canvas
                callback(img.src); 
            }
        };

        img.onerror = () => {
            console.error("Failed to load image for compression", fileOrUrl);
            // Fallback to the original URL if it's a string, or empty if it's a file that failed
            if (typeof fileOrUrl === 'string') {
                callback(fileOrUrl);
            } else {
                callback(''); // Return empty so it doesn't hang
            }
        };

        if (typeof fileOrUrl === 'string') {
            img.src = fileOrUrl;
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(fileOrUrl);
        }
    }


    private saveNewAI(): void {
        const editId = this.view.editAiIdInput?.value || '';
        const name = this.view.aiNameInput.value.trim();
        const url = this.view.aiUrlInput.value.trim();
        const color = this.view.aiColorInput.value;
        const categoryId = this.view.aiCategorySelect?.value || undefined;
        const iconFile = this.view.aiIconInput?.files?.[0];

        if (!name || !url) return;

        if (iconFile) {
            this.compressImage(iconFile, (base64) => {
                this.finishSavingAI(name, url, color, categoryId, editId, base64);
            });
        } else if (this.draggedImageUrl) {
            this.compressImage(this.draggedImageUrl, (base64) => {
                this.finishSavingAI(name, url, color, categoryId, editId, base64);
            });
        } else {
            this.finishSavingAI(name, url, color, categoryId, editId);
        }
    }

    private finishSavingAI(name: string, url: string, color: string, categoryId?: string, editId?: string, iconBase64?: string): void {
        let finalId = '';
        if (editId) {
            // Edit mode
            const updated = this.model.edit(editId, name, url, color, iconBase64, categoryId);
            if (updated) {
                this.view.removeCustomAIDOM(editId);
                this.view.injectCustomAI(
                    { id: updated.id, name: updated.name, color: updated.color, iconBase64: updated.iconBase64 },
                    updated.url
                );
                finalId = updated.id;
            }
        } else {
            // Add mode
            const newAI = this.model.add(name, url, color, iconBase64, categoryId);
            this.view.injectCustomAI(
                { id: newAI.id, name: newAI.name, color: newAI.color, iconBase64: newAI.iconBase64 },
                newAI.url
            );
            finalId = newAI.id;
        }

        // Bind Webview Listeners
        setTimeout(() => {
            const wv = document.getElementById(`wv-${finalId}`) as any;
            if (wv) this.bindWebviewListeners(finalId, wv);
        }, 100);

        this.view.closeModal();
        
        // Refresh grid layout so the newly added or edited card gets sorted correctly
        this.renderGroupedGrid();
        
        this.view.showScreen(finalId, this.model.getAll());
    }

    private deleteAI(id: string): void {
        const staticAIs = ['deepseek', 'chatgpt', 'gemini', 'claude', 'kimi'];
        
        if (staticAIs.includes(id)) {
            if (!confirm(`¿Estás seguro de que quieres eliminar la plataforma por defecto "${id}"?`)) {
                return;
            }
            this.model.deleteDefault(id);
            this.view.hideDefaultAI(id);
            this.renderGroupedGrid();
        } else {
            const item = this.model.getById(id);
            if (!item) return;

            if (!confirm(`¿Estás seguro de que quieres eliminar la plataforma "${item.name}"?`)) {
                return;
            }

            // Remove from Model & LocalStorage
            this.model.delete(id);

            // Remove from DOM
            this.view.removeCustomAIDOM(id);
            this.renderGroupedGrid();
        }

        // If the current active screen was the deleted AI, navigate to home
        if (this.view.getCurrentAI() === id) {
            this.view.showScreen('home', this.model.getAll());
        }
    }

    private openEditModal(id: string): void {
        const ai = this.model.getById(id);
        if (ai) {
            this.view.openModal(ai, this.model.getCategories());
        }
    }

    private renderGroupedGrid(): void {
        const query = this.view.searchInput?.value.toLowerCase().trim() || '';
        const sort = this.view.sortSelect?.value || 'category';
        this.view.renderGrid(this.model.getAll(), this.model.getCategories(), this.model.isDefaultDeleted.bind(this.model), query, sort);
    }
}

// Instantiate Controller on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    new AIController();
});
