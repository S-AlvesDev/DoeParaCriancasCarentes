// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o usuário está logado
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
    
    // Adicionar evento para atualizar o painel admin quando exibido
    const adminPanel = document.getElementById('adminPanel');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                if (adminPanel.style.display === 'block') {
                    adminPanel.dispatchEvent(new Event('display'));
                }
            }
        });
    });
    
    observer.observe(adminPanel, { attributes: true });
}); 