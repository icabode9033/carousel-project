import React from 'react';
import { Link } from 'react-router-dom';
import Theme from '../../components/Tema/tema';
import './sobre-index.css'; // Arquivo CSS para estilização

const SobrePage = () => {
  return (
    <div className="home-page-container">
      {/* Home Content Box */}
      <div className="home-content-box">
        {/* Header com navegação (igual ao da Home) */}
       
        
        <Theme />
        
        {/* Conteúdo principal da página SOBRE */}
        <div className="main-content">
          
          <section className="sobre-section">
            <p>
              Bem-vindo ao <strong>NursingTools</strong>, uma iniciativa desenvolvida pela turma <strong> 016.2024.0014 | Técnico em Informática  </strong> 
              como parte do <strong>Projeto Integrador do Senac</strong>, voltado para a área da <strong>Enfermagem</strong>.
            </p>
            <p>
              Nosso objetivo é oferecer uma ferramenta prática e inovadora para auxiliar alunos e profissionais 
              da saúde, facilitando o acesso a informações e recursos essenciais para sua formação.
            </p>
          </section>

          <section className="sobre-section">
            <h2>Tecnologias Utilizadas</h2>
            <p>
              Para garantir eficiência e usabilidade, desenvolvemos este projeto utilizando:
            </p>
            <ul className="tech-list">
              <li><strong>React</strong> como linguagem principal.</li>
              <li><strong>Visual Studio Code (VSCode)</strong> como ambiente de desenvolvimento.</li>
              <li>Bibliotecas como <strong>React Router</strong> para navegação e <strong>jsPDF</strong> para geração de documentos em PDF.</li>
            </ul>
          </section>

          <section className="sobre-section">
            <h2>Nossa Missão</h2>
            <p>
              Acreditamos que a tecnologia pode transformar a educação em saúde, e por isso criamos esta plataforma 
              pensando nas necessidades dos alunos de <strong>Enfermagem</strong>. Queremos contribuir para um aprendizado 
              mais dinâmico e acessível.
            </p>
          </section>

          <section className="sobre-section">
            <h2>Equipe</h2>
            <div className="equipe-container">
              <div className="membro">
                <h3>Leo</h3>
                <p>Desenvolvedor Front-end</p>
              </div>
              <div className="membro">
                <h3>Vitor</h3>
                <p>Desenvolvedor Front-end</p>
              </div>
              <div className="membro">
                <h3>Jonathan</h3>
                <p>Desenvolvedor Front-end</p>
              </div>
            </div>
        
          </section>


          <section className="sobre-section">
            <h2>Versão</h2>
            <p>
              1.0.0
              
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;