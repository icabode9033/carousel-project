import { useEffect, useState } from "react";
import "../Home/index.css";
import Theme from "../../components/Tema/tema";
import tela_site from "../../assets/Images/Tela_home.png";

const Home = () => {
  return (
    <main
      className="home"
      style={{
        position: "relative",
        backgroundImage: `url(${tela_site})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // preto com 50% de opacidade
          zIndex: 1,
        }}
      />

      {/* Conteúdo acima do overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          className="bg-white bg-opacity-90 shadow-xl rounded-xl p-8 max-w-4xl mx-4 md:mx-auto"
          style={{ backdropFilter: "blur(4px)" }}
        >
          <h1 className="text-4xl font-bold mb-6 text-blue-700">Sobre o Projeto</h1>
          <p className="mb-4 text-lg">
            Este aplicativo foi desenvolvido como <strong>Projeto Integrador</strong> pela turma <strong>016.2024.0014</strong> do curso <strong>Técnico em Informática</strong> do <strong>Senac Poços de Caldas</strong>.
          </p>
          <p className="mb-4 text-lg">
            A iniciativa tem como objetivo principal apoiar os estudantes do curso <strong>Técnico em Enfermagem</strong>, oferecendo uma ferramenta prática e acessível para o aprimoramento dos estudos.
          </p>
          <p className="mb-4 text-lg">
            O aplicativo disponibiliza recursos voltados para o reforço das disciplinas da área da saúde, com ênfase em <strong>cálculos médicos</strong>, <strong>realização de pesquisas</strong> e <strong>revisão de conteúdos essenciais</strong>.
          </p>
          <p className="text-lg">
            Além disso, conta com <strong>quizzes interativos</strong> que possibilitam a fixação do conhecimento de forma dinâmica e eficiente.
          </p>
        </div>
      </div>

      <Theme />
    </main>
  );
};

export default Home;
