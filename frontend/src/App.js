// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Opcional, para estilização

function App() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState(''); // Armazenará o texto das ideias
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIdeas('');

    try {
      // Faz a requisição para o backend
      const response = await axios.post('http://localhost:3001/api/generate-idea', {
        topic: topic,
        // Você pode adicionar mais opções aqui, ex: options: { focus: 'tecnologia' }
      });
      setIdeas(response.data.ideaText); // Pega o texto gerado
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
        <h1>Gerador de Ideias de Negócios Inovadoras</h1>
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
            {/* Renderiza o texto puro. Para um parser mais robusto,
                você precisaria processar o texto do Gemini no backend
                ou usar uma biblioteca de markdown no frontend. */}
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{ideas}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;