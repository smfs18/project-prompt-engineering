// Importa o dotenv para carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const GEMINI_API_KEY = 'SUA CHAVE DA API'
// Importa o framework Express para criar e gerenciar o servidor web
const express = require('express');

// Importa o módulo CORS para permitir requisições de origens diferentes (essencial para o frontend)
const cors = require('cors');

// Importa a biblioteca oficial do Google para interagir com a API do Gemini
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor irá rodar.
// Ele tenta usar a porta definida na variável de ambiente PORT (para ambientes de produção),
// ou usa a porta 3001 como padrão (para desenvolvimento local).
const port = process.env.PORT || 3001;

// --- Configuração de Middlewares ---

// Configura o CORS (Cross-Origin Resource Sharing).
// Isso é crucial porque seu frontend (React) estará rodando em uma porta (ex: 3000)
// e seu backend em outra (ex: 3001). Sem CORS, o navegador bloquearia as requisições.
app.use(cors({
    origin: 'http://localhost:3000' // Permite requisições apenas da origem do seu frontend React.
                                   // Se for usar outra porta ou domínio para o React, altere aqui.
}));

// Habilita o Express a parsear requisições com corpo no formato JSON.
// Isso é necessário para que você possa receber dados (como o 'topic')
// enviados pelo frontend no formato JSON.
app.use(express.json());

// --- Inicialização da API do Gemini ---

// Cria uma nova instância da classe GoogleGenerativeAI, passando a chave da API.
// A chave é acessada através de `process.env.GEMINI_API_KEY`, que vem do seu arquivo .env.
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Função de Engenharia de Prompt ---
// Esta função é a chave para guiar o Gemini a gerar as respostas desejadas.
// Ela constrói um prompt detalhado com base na entrada do usuário e opções adicionais.
function buildPrompt(userInput, options = {}) {
    let prompt = `Gere 3 ideias de negócios inovadoras e detalhadas com base no seguinte tópico: "${userInput}".`;

    // Adiciona foco específico se a opção 'focus' for fornecida
    if (options.focus) {
        prompt += ` Com foco especial em ${options.focus}.`;
    }

    // Adiciona instruções detalhadas sobre o formato e conteúdo esperado para cada ideia
    prompt += `
Para cada ideia, inclua:
- **Nome da Ideia:**
- **Descrição Resumida:**
- **Problema Resolvido/Oportunidade:**
- **Público-Alvo:**
- **Modelo de Negócios (como gera receita):**
- **Diferenciais/Inovação:**
- **Tecnologias Envolvidas (se aplicável):**
- **Desafios Potenciais:**
Forneça as informações de forma clara e organizada, utilizando marcadores ou quebras de linha para separar as seções de cada ideia.`;
    return prompt;
}

// --- Definição da Rota da API ---
// Esta é a rota que o frontend irá chamar para solicitar a geração de ideias.
// É uma rota POST porque o frontend estará enviando dados (o tópico) para o backend.
app.post('/api/generate-idea', async (req, res) => {
    // Extrai o 'topic' e 'options' do corpo da requisição JSON enviada pelo frontend.
    const { topic, options } = req.body;

    // Validação básica: verifica se o tópico foi fornecido.
    if (!topic) {
        return res.status(400).json({ error: 'O tópico é obrigatório para gerar ideias.' });
    }

    try {
        // Seleciona o modelo do Gemini a ser usado. "gemini-pro" é um modelo de propósito geral.
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Constrói o prompt completo utilizando a função de engenharia de prompt.
        const prompt = buildPrompt(topic, options);

        // Faz a chamada assíncrona para a API do Gemini com o prompt construído.
        const result = await model.generateContent(prompt);
        // Obtém a resposta do resultado da geração.
        const response = await result.response;
        // Extrai o texto puro gerado pelo Gemini.
        const text = response.text();

        // Envia o texto gerado de volta para o frontend como uma resposta JSON.
        // O frontend receberá isso como `response.data.ideaText`.
        res.json({ ideaText: text });
    } catch (error) {
        // Em caso de erro (ex: problema de conexão com a API do Gemini, chave inválida, etc.)
        console.error('Erro ao gerar ideia com a API do Gemini:', error);
        // Envia uma mensagem de erro genérica para o frontend, ocultando detalhes internos.
        res.status(500).json({ error: 'Ocorreu um erro ao gerar a ideia. Por favor, tente novamente mais tarde.' });
    }
});

// --- Início do Servidor ---
// O servidor começa a "escutar" por requisições na porta definida.
app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
    console.log(`Aguardando requisições do frontend React em http://localhost:3000`);
});
