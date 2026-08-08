const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// 1. Replace delete button with edit+delete for existing AIs
const aisToPatch = ['deepseek', 'chatgpt', 'gemini', 'kimi'];
for (const ai of aisToPatch) {
    const oldBtnRegex = new RegExp(`\\s*<button class="card-delete-btn"[^>]*data-id="${ai}">[\\s\\S]*?<\\/button>`);
    
    const newBtns = `
                            <div class="card-action-btns">
                                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="${ai}">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </button>
                                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="${ai}">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>`;
                            
    html = html.replace(oldBtnRegex, newBtns);
}

// 2. Add new AIs to sidebar
const newAIsSidebar = `
                <li class="menu-item claude-btn" data-target="claude" data-tooltip="Claude">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
                    <span class="menu-label">Claude</span>
                </li>
                
                <li class="menu-item canva-btn" data-target="canva" data-tooltip="Canva">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <span class="menu-label">Canva</span>
                </li>

                <li class="menu-item venturikit-btn" data-target="venturikit" data-tooltip="VenturiKit IA">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    <span class="menu-label">VenturiKit IA</span>
                </li>

                <li class="menu-item perplexity-btn" data-target="perplexity" data-tooltip="Perplexity AI">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <span class="menu-label">Perplexity AI</span>
                </li>
`;

html = html.replace('                <li class="menu-item soporte-btn"', newAIsSidebar + '\n                <li class="menu-item soporte-btn"');

// 3. Add new AIs to dashboard grid
const newAIsGrid = `
                        <div class="ai-card claude" data-target="claude">
                            <div class="card-action-btns">
                                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="claude">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="claude">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                            <div class="ai-icon-container">
                                <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
                            </div>
                            <h3>Claude</h3>
                            <p>Asistente seguro e inteligente de Anthropic, excelente para tareas complejas y escritura.</p>
                        </div>

                        <div class="ai-card canva" data-target="canva">
                            <div class="card-action-btns">
                                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="canva">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="canva">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                            <div class="ai-icon-container">
                                <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            </div>
                            <h3>Canva</h3>
                            <p>Plataforma de diseño gráfico y comunicación visual apoyada en potentes herramientas de IA.</p>
                        </div>

                        <div class="ai-card venturikit" data-target="venturikit">
                            <div class="card-action-btns">
                                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="venturikit">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="venturikit">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                            <div class="ai-icon-container">
                                <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </div>
                            <h3>VenturiKit IA</h3>
                            <p>Kit de herramientas de Inteligencia Artificial para potenciar la productividad y el desarrollo.</p>
                        </div>

                        <div class="ai-card perplexity" data-target="perplexity">
                            <div class="card-action-btns">
                                <button class="card-action-btn card-edit-btn" title="Editar IA" data-id="perplexity">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </button>
                                <button class="card-action-btn card-delete-btn" title="Eliminar IA" data-id="perplexity">
                                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                            <div class="ai-icon-container">
                                <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <h3>Perplexity AI</h3>
                            <p>Motor de búsqueda conversacional impulsado por IA, que proporciona respuestas precisas y citadas.</p>
                        </div>
`;

html = html.replace('                        <!-- Botón para agregar nueva IA -->', newAIsGrid + '\n                        <!-- Botón para agregar nueva IA -->');

// 4. Add webviews
const newWebviews = `
                    <webview id="wv-claude" src="https://claude.ai/" partition="persist:claude" allowpopups></webview>
                    <webview id="wv-canva" src="https://www.canva.com/" partition="persist:canva" allowpopups></webview>
                    <webview id="wv-venturikit" src="https://venturikit.com/" partition="persist:venturikit" allowpopups></webview>
                    <webview id="wv-perplexity" src="https://www.perplexity.ai/" partition="persist:perplexity" allowpopups></webview>
`;

html = html.replace('                </div>\n            </section>', newWebviews + '\n                </div>\n            </section>');

fs.writeFileSync(indexPath, html);
