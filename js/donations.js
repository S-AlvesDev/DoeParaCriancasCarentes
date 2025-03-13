// Armazenamento local para doações
const DONATIONS_KEY = 'donations';

// Elementos do DOM
const foodDonationForm = document.getElementById('foodDonationForm');
const pixCard = document.getElementById('pixCard');

// Funções de utilidade
function getDonations() {
    return JSON.parse(localStorage.getItem(DONATIONS_KEY) || '[]');
}

function saveDonations(donations) {
    localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function addDonation(donation) {
    const donations = getDonations();
    donation.id = generateId(); // Adicionar ID único
    donation.verified = null;   // Status inicial: pendente
    donations.push(donation);
    saveDonations(donations);
}

// Funções de doação
function handleFoodDonation(amount) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Por favor, faça login para realizar uma doação!');
        return false;
    }

    const donation = {
        type: 'food',
        amount: amount,
        user: currentUser.name,
        userEmail: currentUser.email,
        date: new Date().toISOString()
    };

    addDonation(donation);
    return true;
}

// Event Listeners
foodDonationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('foodAmount').value;
    
    if (handleFoodDonation(amount)) {
        alert('Doação registrada com sucesso! Aguarde a verificação do administrador.');
        foodDonationForm.reset();
    }
});

// Copiar informações do PIX
function copyPixInfo(type) {
    if (type === 'cpf') {
        navigator.clipboard.writeText('130.744.324-97').then(() => {
            alert('CPF copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    }
}

// Adicionar botões de copiar nas informações do PIX
document.addEventListener('DOMContentLoaded', () => {
    const pixInfo = pixCard.querySelector('.pix-info');
    const qrCodeDiv = pixInfo.querySelector('.qr-code'); // Salvar a div do QR code
    
    // Criar os elementos de informação do PIX
    const cpfElement = document.createElement('p');
    cpfElement.innerHTML = `Chave PIX (CPF): <strong>130.744.324-97</strong> <button onclick="copyPixInfo('cpf')" class="btn">Copiar CPF</button>`;
    
    const nameElement = document.createElement('p');
    nameElement.innerHTML = `Nome: <strong>Jamile Lais Viana Bezerra</strong>`;
    
    // Limpar e readicionar os elementos mantendo o QR code
    pixInfo.innerHTML = '';
    pixInfo.appendChild(cpfElement);
    pixInfo.appendChild(nameElement);
    pixInfo.appendChild(qrCodeDiv); // Readicionar o QR code
}); 