# 🚀 Gerador de Ideias de Negócios com IA

Um projeto Full-Stack que utiliza a API do Google Gemini para gerar ideias de negócios inovadoras a partir de um problema ou nicho de mercado descrito pelo usuário. A interface é construída com React e a resposta da IA é renderizada em um formato elegante e legível.

---

## ✨ Funcionalidades

- **Interface Reativa:** Frontend construído com React para uma experiência de usuário fluida e dinâmica.
- **Geração por IA:** Utiliza o poder do Google Gemini para criar listas de ideias de negócios criativas e relevantes.
- **Comunicação via API:** Frontend e backend se comunicam através de uma API REST simples e eficiente.
- **Renderização de Markdown:** As respostas da IA são formatadas em Markdown e elegantemente renderizadas no frontend, preservando títulos, listas e negrito.
- **Design customizável:** A estrutura do CSS permite a fácil implementação de diferentes temas (ex: Minimalista, Dark Mode, etc.).

---

## 🛠️ Tecnologias Utilizadas

Este projeto é dividido em duas partes principais:

#### **Frontend**
- [**React**](https://reactjs.org/)
- [**Axios**](https://axios-http.com/) para as requisições HTTP.
- [**React-Markdown**](https://github.com/remarkjs/react-markdown) para renderizar o conteúdo da IA.

#### **Backend**
- [**Node.js**](https://nodejs.org/)
- [**Express.js**](https://expressjs.com/) para criar o servidor e a API.
- [**Google Generative AI SDK**](https://www.npmjs.com/package/@google/generative-ai) para interagir com a API do Gemini.
- [**Dotenv**](https://www.npmjs.com/package/dotenv) para gerenciar as variáveis de ambiente.
- [**CORS**](https://www.npmjs.com/package/cors) para habilitar requisições entre o frontend e o backend.

---

## 🏁 Como Executar o Projeto

Para rodar este projeto em sua máquina local, siga os passos abaixo.

### **Pré-requisitos**

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma chave de API do Google Gemini. Você pode obter uma gratuitamente no [Google AI Studio](https://aistudio.google.com/app/apikey).

### **1. Clone o Repositório**

```bash
git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
cd nome-do-repositorio
