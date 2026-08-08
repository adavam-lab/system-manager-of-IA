import { AICard, CardData } from '../molecules/AICard.js';

export class AICardGrid {
    public static addCustomCard(container: HTMLElement, addBtn: HTMLElement, data: CardData): void {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = AICard.render(data).trim();
        const cardElement = tempDiv.firstElementChild as HTMLElement;
        
        if (cardElement) {
            container.insertBefore(cardElement, addBtn);
        }
    }
}
