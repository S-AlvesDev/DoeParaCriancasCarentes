// Configuração do administrador
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin123';

// Armazenamento local
const USERS_KEY = 'donation_users';
const CURRENT_USER_KEY = 'current_user';

// Elementos do DOM
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Funções de utilidade
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Funções de autenticação
function login(email, password) {
    // Verificar primeiro se é o admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser = {
            name: 'Administrador',
            email: ADMIN_EMAIL,
            isAdmin: true
        };
        setCurrentUser(adminUser);
        updateUIForLoggedInUser(adminUser);
        return true;
    }

    // Se não for admin, verificar usuários normais
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        setCurrentUser(user);
        updateUIForLoggedInUser(user);
        return true;
    }
    return false;
}

function register(name, email, password) {
    // Não permitir registro com email do admin
    if (email === ADMIN_EMAIL) {
        alert('Este email não pode ser utilizado.');
        return false;
    }

    const users = getUsers();
    
    if (users.some(u => u.email === email)) {
        return false;
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    updateUIForLoggedInUser(newUser);
    return true;
}

function logout() {
    clearCurrentUser();
    updateUIForLoggedOutUser();
}

// Funções de UI
function updateUIForLoggedInUser(user) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userInfo.style.display = 'block';
    userInfo.textContent = `Bem-vindo, ${user.name}`;
    
    // Mostrar painel admin apenas se for o admin
    const adminPanel = document.getElementById('adminPanel');
    if (user.email === ADMIN_EMAIL || user.isAdmin) {
        adminPanel.style.display = 'block';
    } else {
        adminPanel.style.display = 'none';
    }
}

function updateUIForLoggedOutUser() {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    userInfo.style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
}

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

logoutBtn.addEventListener('click', logout);

// Fechar modais
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
});

// Form submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (login(email, password)) {
        loginModal.style.display = 'none';
        loginForm.reset();
    } else {
        alert('Email ou senha inválidos!');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (register(name, email, password)) {
        registerModal.style.display = 'none';
        registerForm.reset();
    } else {
        alert('Email já cadastrado!');
    }
});

// Verificar usuário logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
}); 