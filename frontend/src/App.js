// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // 1. IMPORTAR A BIBLIOTECA
import './App.css'; 

function App() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIdeas('');

    try {
      const response = await axios.post('http://localhost:3001/api/generate-idea', {
        topic: topic,
      });

      // Dica: Peça ao seu backend para instruir o Gemini a sempre responder em Markdown!
      setIdeas(response.data.ideaText);
    } catch (err) {
      console.error('Erro na requisição ao backend:', err);
      setError('Não foi possível gerar as ideias. Verifique a conexão com o backend.');
      if (err.response) {
        setError(err.response.data.error || 'Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerador de Ideias de Negócios</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="topic-input">
            Descreva um problema, nicho de mercado ou tendência:
          </label>
          <textarea
            id="topic-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows="5"
            cols="50"
            placeholder="Ex: Longas filas em supermercados, Desperdício de alimentos em restaurantes, Metaverso na educação..."
            disabled={loading}
          ></textarea>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Gerando...' : 'Gerar Ideias'}
          </button>
        </form>

        {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}

        {ideas && (
          <div className="ideas-output">
            <h2>Ideias Geradas:</h2>
            {/* 2. SUBSTITUIR <pre> por <ReactMarkdown> */}
            <div className="markdown-content">
              <ReactMarkdown>{ideas}</ReactMarkdown>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;