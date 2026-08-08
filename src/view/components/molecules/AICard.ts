import { Avatar } from '../atoms/Avatar.js';
import { DeleteBtn } from '../atoms/DeleteBtn.js';

export interface CardData {
    id: string;
    name: string;
    color: string;
    iconBase64?: string;
}

export class AICard {
    public static render(data: CardData): string {
        const actionBtnsHtml = `
            <div class="card-action-btns">
                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="${data.id}">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="${data.id}">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
        
        let avatarHtml = '';
        if (data.iconBase64) {
            avatarHtml = `<div class="ai-icon-container" style="background-color: transparent; border: none; padding: 0;">
                <img src="${data.iconBase64}" alt="${data.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            </div>`;
        } else {
            avatarHtml = Avatar.render(data.name, data.color);
        }

        return `
            <div class="ai-card custom-ai" data-target="${data.id}" id="card-${data.id}">
                ${actionBtnsHtml}
                ${avatarHtml}
                <h3>${data.name}</h3>
                <p>Plataforma personalizada vinculada mediante URL.</p>
            </div>
        `;
    }
}
