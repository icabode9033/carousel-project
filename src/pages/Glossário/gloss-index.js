import { Link } from "react-router-dom";
import "../Glossário/gloss-index.css";
import Theme from "../../components/Tema/tema";
import { useState, useEffect } from "react";
import glossaryData from "../../components/glossarioData";

export default function Glossário() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Atualizar sugestões quando o input muda
  useEffect(() => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matchedTerms = glossaryData.filter(item =>
      item.term.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5); // Limita a 5 sugestões

    setSuggestions(matchedTerms);
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;

    const termEntry = glossaryData.find(item =>
      item.term.toLowerCase() === input.toLowerCase()
    );

    setMessages(prev => [
      ...prev,
      { sender: "user", text: input },
      {
        sender: "bot",
        text: termEntry
          ? `${termEntry.term}: ${termEntry.definition}`
          : "Termo não encontrado no glossário."
      }
    ]);

    setInput("");
    setShowSuggestions(false);
  };

  const handleTermClick = (term) => {
    setInput(term);
    setShowSuggestions(false);
    
    const termEntry = glossaryData.find(item =>
      item.term.toLowerCase() === term.toLowerCase()
    );

    setMessages(prev => [
      ...prev,
      { sender: "user", text: term },
      {
        sender: "bot",
        text: termEntry
          ? `${termEntry.term}: ${termEntry.definition}`
          : "Termo não encontrado no glossário."
      }
    ]);
  };

  const handleSuggestionClick = (term) => {
    setInput(term);
    setShowSuggestions(false);
    handleTermClick(term);
  };

  // Função para limpar a pesquisa e mensagens
  const handleClear = () => {
    setInput("");
    setMessages([]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <main className="home">
          <div className='home-content-box'>
          
    
            <Theme />
        <div className="glossario-box">
          <div className="glossario-chat">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="input-area">
              <div className="suggestion-wrapper">
                <input
                  type="text"
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Digite um termo..."
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((item, index) => (
                      <li 
                        key={index}
                        onClick={() => handleSuggestionClick(item.term)}
                        onMouseDown={(e) => e.preventDefault()} // Evita perder o foco do input
                      >
                        {item.term}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
                  <button onClick={handleClear} className="clear-button">Limpar</button>
              <button onClick={handleSend}>Buscar</button>
          
            </div>
          </div>
        </div>
        <Theme />
      </div>
    </main>
  );
}