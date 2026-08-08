export class Avatar {
    public static render(name: string, color: string): string {
        const initial = name.charAt(0).toUpperCase();
        return `<div class="ai-avatar" style="background-color: ${color}">${initial}</div>`;
    }
}
