# Sistema de Doações

Um sistema web para gerenciamento de doações, permitindo contribuições via PIX e doação de alimentos.

## Funcionalidades

- Sistema de login e registro de usuários
- Doação via PIX com informações pré-cadastradas
- Doação de alimentos com registro de quantidade
- Painel administrativo para visualização de usuários e doações
- Interface responsiva e moderna
- Armazenamento local dos dados

## Requisitos

- Navegador web moderno com suporte a JavaScript
- Conexão com a internet (para carregar fontes e estilos)

## Instalação

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em um navegador web
3. Para acessar o painel administrativo, use as credenciais:
   - Email: admin@admin.com
   - Senha: admin123

## Estrutura do Projeto

```
.
├── index.html          # Página principal
├── styles.css         # Estilos da aplicação
├── js/
│   ├── auth.js       # Autenticação e gerenciamento de usuários
│   ├── donations.js  # Gerenciamento de doações
│   ├── admin.js      # Painel administrativo
│   └── main.js       # Inicialização e funções globais
└── README.md         # Este arquivo
```

## Segurança

- As credenciais de administrador são definidas no código
- Os dados são armazenados localmente no navegador
- Recomenda-se implementar um backend para produção

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. 