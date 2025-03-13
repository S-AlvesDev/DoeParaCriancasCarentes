// Elementos do DOM
const usersList = document.getElementById('usersList');
const donationsList = document.getElementById('donationsList');

// Funções de utilidade
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para verificar doação
window.handleDonationAction = function(donationId, action) {
    try {
        const donations = getDonations();
        const donationIndex = donations.findIndex(d => d.id === donationId);
        
        if (donationIndex !== -1) {
            donations[donationIndex].verified = action === 'verify';
            saveDonations(donations);
            renderDonationsList();
            
            const message = action === 'verify' ? 'Doação verificada com sucesso!' : 'Doação rejeitada.';
            alert(message);
        }
    } catch (error) {
        console.error('Erro ao processar doação:', error);
        alert('Erro ao processar a ação. Por favor, tente novamente.');
    }
}

// Funções de renderização
function renderUsersList() {
    const users = getUsers();
    usersList.innerHTML = '';
    
    if (users.length === 0) {
        usersList.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        return;
    }
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            ${users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    usersList.appendChild(table);
}

function getStatusBadge(verified) {
    if (verified === true) {
        return '<span class="status-badge verified">Verificada</span>';
    } else if (verified === false) {
        return '<span class="status-badge rejected">Rejeitada</span>';
    }
    return '<span class="status-badge pending">Pendente</span>';
}

function getActionButtons(donation) {
    if (donation.verified === true || donation.verified === false) {
        return '';
    }

    return `
        <div class="action-buttons">
            <button class="btn btn-small btn-success" onclick="handleDonationAction('${donation.id}', 'verify')">
                Verificar
            </button>
            <button class="btn btn-small btn-danger" onclick="handleDonationAction('${donation.id}', 'reject')">
                Rejeitar
            </button>
        </div>
    `;
}

function renderDonationsList() {
    const donations = getDonations();
    donationsList.innerHTML = '';
    
    if (!Array.isArray(donations) || donations.length === 0) {
        donationsList.innerHTML = '<p>Nenhuma doação registrada ainda.</p>';
        return;
    }
    
    // Adiciona IDs para doações que não têm
    const validDonations = donations.map(donation => {
        if (!donation.id) {
            return {
                ...donation,
                id: `donation_${Date.now()}_${Math.random().toString(36).substr(2)}`
            };
        }
        return donation;
    });
    
    // Salva as doações atualizadas
    if (JSON.stringify(donations) !== JSON.stringify(validDonations)) {
        saveDonations(validDonations);
    }
    
    const table = document.createElement('table');
    table.className = 'donations-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Doador</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${validDonations.map(donation => `
                <tr data-donation-id="${donation.id}">
                    <td>${donation.type === 'food' ? 'Alimentos' : 'PIX'}</td>
                    <td>${donation.type === 'food' ? `${donation.amount} kg` : '-'}</td>
                    <td>${donation.user}</td>
                    <td>${formatDate(donation.date)}</td>
                    <td>${getStatusBadge(donation.verified)}</td>
                    <td>${getActionButtons(donation)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    donationsList.appendChild(table);
}

// Atualizar listas quando o painel é exibido
const adminPanel = document.getElementById('adminPanel');

// Observer para detectar quando o painel admin fica visível
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            if (adminPanel.style.display === 'block') {
                renderUsersList();
                renderDonationsList();
            }
        }
    });
});

observer.observe(adminPanel, { attributes: true });

// Também atualizar quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    if (adminPanel.style.display === 'block') {
        renderUsersList();
        renderDonationsList();
    }
});

// Adicionar estilos para as tabelas e badges
const style = document.createElement('style');
style.textContent = `
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }
    
    th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    
    th {
        background-color: #f8f9fa;
        font-weight: 500;
    }
    
    tr:hover {
        background-color: #f5f5f5;
    }
    
    .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .status-badge.verified {
        background-color: #28a745;
        color: white;
    }
    
    .status-badge.rejected {
        background-color: #dc3545;
        color: white;
    }
    
    .status-badge.pending {
        background-color: #ffc107;
        color: #000;
    }
    
    .btn-small {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        margin: 0 0.25rem;
    }
    
    .btn-success {
        background-color: #28a745;
    }
    
    .btn-success:hover {
        background-color: #218838;
    }
    
    .btn-danger {
        background-color: #dc3545;
    }
    
    .btn-danger:hover {
        background-color: #c82333;
    }
    
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    @media (max-width: 768px) {
        table {
            display: block;
            overflow-x: auto;
        }
    }
`;
document.head.appendChild(style); 