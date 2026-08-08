export interface Category {
    id: string;
    name: string;
    color?: string;
}

export interface CustomAI {
    id: string;
    name: string;
    url: string;
    color: string;
    iconBase64?: string;
    categoryId?: string;
}

export class AIModel {
    private customIAs: CustomAI[] = [];
    private deletedDefaultAIs: string[] = [];
    private categories: Category[] = [];

    constructor() {
        this.load();
    }

    public load(): CustomAI[] {
        const stored = localStorage.getItem('custom_ias');
        if (stored) {
            try {
                this.customIAs = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading custom IAs from localStorage', e);
                this.customIAs = [];
            }
        } else {
            this.customIAs = [];
        }

        const storedDeleted = localStorage.getItem('deleted_default_ias');
        if (storedDeleted) {
            try {
                this.deletedDefaultAIs = JSON.parse(storedDeleted);
            } catch (e) {
                this.deletedDefaultAIs = [];
            }
        } else {
            this.deletedDefaultAIs = [];
        }

        const storedCategories = localStorage.getItem('ai_categories');
        if (storedCategories) {
            try {
                this.categories = JSON.parse(storedCategories);
            } catch (e) {
                this.categories = [];
            }
        } else {
            this.categories = [];
        }

        return this.customIAs;
    }

    public save(): void {
        localStorage.setItem('custom_ias', JSON.stringify(this.customIAs));
        localStorage.setItem('deleted_default_ias', JSON.stringify(this.deletedDefaultAIs));
        localStorage.setItem('ai_categories', JSON.stringify(this.categories));
    }

    public getAll(): CustomAI[] {
        return this.customIAs;
    }

    public getById(id: string): CustomAI | undefined {
        return this.customIAs.find(item => item.id === id);
    }

    public add(name: string, url: string, color: string, iconBase64?: string, categoryId?: string): CustomAI {
        const id = `custom-${Date.now()}`;
        const newAI: CustomAI = { id, name, url, color, iconBase64, categoryId };
        this.customIAs.push(newAI);
        this.save();
        return newAI;
    }

    public edit(id: string, name: string, url: string, color: string, iconBase64?: string, categoryId?: string): CustomAI | undefined {
        const index = this.customIAs.findIndex(item => item.id === id);
        if (index !== -1) {
            this.customIAs[index] = { 
                ...this.customIAs[index], 
                name, 
                url, 
                color, 
                iconBase64: iconBase64 !== undefined ? iconBase64 : this.customIAs[index].iconBase64,
                categoryId 
            };
            this.save();
            return this.customIAs[index];
        }
        return undefined;
    }

    public delete(id: string): boolean {
        const index = this.customIAs.findIndex(item => item.id === id);
        if (index !== -1) {
            this.customIAs.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    public deleteDefault(id: string): void {
        if (!this.deletedDefaultAIs.includes(id)) {
            this.deletedDefaultAIs.push(id);
            this.save();
        }
    }

    public isDefaultDeleted(id: string): boolean {
        return this.deletedDefaultAIs.includes(id);
    }

    // --- Category Management ---
    public getCategories(): Category[] {
        return this.categories;
    }

    public getCategoryById(id: string): Category | undefined {
        return this.categories.find(c => c.id === id);
    }

    public addCategory(name: string, color?: string): Category {
        const id = `cat-${Date.now()}`;
        const newCat: Category = { id, name, color };
        this.categories.push(newCat);
        this.save();
        return newCat;
    }

    public editCategory(id: string, name: string, color?: string): boolean {
        const cat = this.categories.find(c => c.id === id);
        if (cat) {
            cat.name = name;
            if (color) cat.color = color;
            this.save();
            return true;
        }
        return false;
    }

    public isCategoryInUse(id: string): boolean {
        return this.customIAs.some(ai => ai.categoryId === id);
    }

    public deleteCategory(id: string): boolean {
        if (this.isCategoryInUse(id)) {
            return false;
        }
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
            this.categories.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }
}
