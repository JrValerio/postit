# Post-it Share App 📝

![Screenshot](https://github.com/JrValerio/postit/blob/main/public/postit.png?raw=true)

> Uma aplicação web minimalista para criar, compartilhar e visualizar notas em um estilo de post-it.

[Live Demo do App](https://postit-8nii.onrender.com/)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do ESLint e Prettier](#configuração-do-eslint-e-prettier)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Sobre o Projeto

O **Post-it Share App** é uma aplicação simples que permite aos usuários criar notas curtas e compartilhar links únicos para cada uma delas. A interface imita o visual de post-its e permite copiar facilmente o link de compartilhamento. Este projeto foi iniciado em uma **live coding** com o **Maik Brito**, CEO da **Rocketseat**, que ensinou conceitos práticos de desenvolvimento full stack. O vídeo da live está disponível no [YouTube](https://www.youtube.com/watch?v=ixKkaWClWBE).

Após a live, finalizei o código com aprimoramentos próprios, incluindo a adição de **ESLint e Prettier** para padronização do código e a criação de um **botão de cópia** para facilitar o compartilhamento do link. Essas contribuições ajudam a manter o código mais limpo e a melhorar a experiência do usuário.

## Recursos

- Criação e armazenamento de notas.
- Interface minimalista e responsiva com estilo de post-it.
- Compartilhamento de links únicos para cada nota.
- **Botão de cópia para facilitar o compartilhamento do link** (contribuição de Júnior Valério).
- Expiração automática de notas para segurança e limpeza de dados.
- **Configuração e padronização de código com ESLint e Prettier** (contribuição de Júnior Valério).

## Tecnologias Utilizadas

- **Frontend**:
  - HTML5, CSS3 (design responsivo e interativo)
  - JavaScript (para interações dinâmicas com a DOM)
  - [HTMX](https://htmx.org/) (para interações assíncronas com o servidor)
- **Backend**:
  - Node.js (ambiente de execução)
  - Express.js (framework para criação de APIs e rotas)
  - SQLite (banco de dados leve para armazenamento de notas)
- **Ferramentas de Qualidade de Código**:
  - ESLint e Prettier (para padronização e formatação do código) - Contribuição de Júnior Valério

## Pré-requisitos

Antes de iniciar, você precisa ter o [Node.js](https://nodejs.org/en/) instalado na sua máquina.

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/JrValerio/postit.git
   cd postit
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   node index.js
   ```

4. Abra o navegador e acesse `http://localhost:3000` para ver o app em funcionamento.

## Configuração do ESLint e Prettier

Para garantir a qualidade do código e a consistência de formatação, este projeto utiliza **ESLint** e **Prettier**. Siga as etapas abaixo para configurar o ESLint e o Prettier:

1. Instale o ESLint e o Prettier:

   ```bash
   npm install eslint prettier eslint-plugin-prettier eslint-config-prettier --save-dev
   ```

2. Adicione as configurações no arquivo `eslint.config.mjs`:

   ```javascript
   import pkg from "@eslint/js";
   const { configs: eslintRecommended } = pkg;
   import prettierPlugin from "eslint-plugin-prettier";

   /** @type {import('eslint').Linter.FlatConfig[]} */
   export default [
     {
       ignores: ["node_modules/", "public/", "*.config.js"],
     },
     {
       files: ["**/*.js"],
       languageOptions: {
         ecmaVersion: 2021,
         sourceType: "module",
         globals: {
           require: "readonly",
           module: "readonly",
           __dirname: "readonly",
           window: "readonly",
           document: "readonly",
           console: "readonly",
           process: "readonly",
         },
       },
       plugins: {
         prettier: prettierPlugin,
       },
       ...eslintRecommended.recommended,
       rules: {
         ...eslintRecommended.recommended.rules,
         "prettier/prettier": "error",
       },
     },
   ];
   ```

3. Para formatar o código automaticamente, execute o comando:

   ```bash
   npx eslint . --fix
   ```

## Estrutura do Projeto

```bash
postit/
├── public/                 # Arquivos estáticos e frontend
│   ├── htmx.min.js         # Biblioteca HTMX para interações
│   ├── index.html          # Página inicial com campo de nota
│   ├── note.html           # Página para exibir uma nota específica
│   └── style.css           # Arquivo de estilos CSS
├── db.js                   # Configuração e operações do banco de dados SQLite
├── index.js                # Servidor principal Express e configuração de rotas
├── package.json            # Dependências do Node.js e scripts
└── README.md               # Documentação do projeto
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Add nova feature'`)
4. Envie para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Amaro Júnior 
[GitHub](https://github.com/JrValerio/postit)  
[LinkedIn](https://www.linkedin.com/in/jrvalerio/)  

