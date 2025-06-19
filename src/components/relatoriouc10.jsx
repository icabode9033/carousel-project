import React from "react";
import "../components/relatoriouc.css"

const habilidades = [
  "Higienizar as mãos conforme a OMS",
  "Utilizar equipamentos de proteção",
  "Comunicar-se de maneira assertiva",
  "Selecionar materiais, equipamentos e instrumental",
  "Utilizar técnicas assépticas",
  "Orientar gestante e puérpera conforme protocolos",
  "Admitir o cliente cirúrgico",
  "Preparar o cliente no pré-operatório conforme protocolos",
  "Posicionar o cliente para cirurgias e exames",
  "Transportar o cliente entre períodos cirúrgicos com segurança",
  "Circular sala de parto/cirúrgica conforme protocolos",
  "Prestar cuidados no pós-operatório conforme condição clínica",
  "Monitorar parâmetros na recuperação anestésica",
  "Manusear equipamentos no berçário e centro obstétrico",
  "Recepcionar o recém-nascido com segurança",
  "Prestar cuidados ao RN no parto e berçário",
  "Prestar cuidados à mulher no pré-parto, parto e pós-parto",
  "Auxiliar no aleitamento materno",
  "Realizar cuidados de higiene e conforto",
  "Executar desinfecção e esterilização de artigos e superfícies",
  "Identificar e adotar medidas de prevenção de doenças",
  "Adotar boas práticas na promoção e recuperação da saúde",
  "Identificar prioridades no atendimento",
  "Identificar reações e sintomas do cliente",
  "Monitorar débitos de sondas e drenos",
  "Reconhecer e atender intercorrências cirúrgico-anestésicas",
  "Identificar sinais do binômio mãe-bebê",
  "Realizar reanimação neonatal",
  "Interpretar documentos técnicos",
  "Utilizar termos técnicos",
  "Operar recursos tecnológicos aplicados à saúde",
  "Organizar processos de trabalho",
  "Realizar registros de enfermagem",
  "Identificar os aspectos do próprio trabalho",
  "Mediar conflitos"
];

const atitudes = [
  "Zelo na apresentação pessoal e postura profissional",
  "Comprometimento com o atendimento humanizado",
  "Responsabilidade no uso dos recursos organizacionais",
  "Colaboração, flexibilidade e iniciativa no trabalho em equipe",
  "Proatividade na resolução de problemas",
  "Respeito à diversidade e aos valores culturais e religiosos",
  "Respeito ao limite da atuação profissional",
  "Responsabilidade no descarte de resíduos",
  "Sigilo no tratamento de dados e informações",
  "Responsabilidade no cumprimento das normas de segurança",
  "Respeito às normas técnicas e legislações vigentes"
];

const opcoes = ["Sim", "Não", "Parcialmente", "N/A"];

export default function RelatorioUC10({ uc, dados, setDados }) {
  const handleChange = (campo, valor) => {
    setDados({ ...dados, [campo]: valor });
  };

  const handleOpcao = (habilidade, opcao) => {
    setDados({
      ...dados,
      habilidades: {
        ...(dados.habilidades || {}),
        [habilidade]: opcao,
      },
    });
  };

  return (
    <div className="relatorio-uc">
      <h3>Relatório da {uc}</h3>

      <label>Nome do Aluno:</label>
      <input
        type="text"
        value={dados.nome || ""}
        onChange={(e) => handleChange("nome", e.target.value)}
        placeholder="Digite seu nome"
      />

      <label>Introdução:</label>
      <textarea
        rows={4}
        value={dados.introducao || ""}
        onChange={(e) => handleChange("introducao", e.target.value)}
        placeholder="Descreva a instituição e contexto do estágio..."
      />

      <label>Atividades desenvolvidas:</label>
      <textarea
        rows={5}
        value={dados.atividades || ""}
        onChange={(e) => handleChange("atividades", e.target.value)}
        placeholder="Liste as atividades realizadas durante o estágio..."
      />

      <label>Conclusão:</label>
      <textarea
        rows={4}
        value={dados.conclusao || ""}
        onChange={(e) => handleChange("conclusao", e.target.value)}
        placeholder="Relate o aprendizado e avaliação do estágio..."
      />

      <h4>Habilidades Desenvolvidas</h4>
      <div className="tabela-habilidades">
        {habilidades.map((hab, idx) => (
          <div key={idx} className="linha-hab">
            <span className="hab-nome">{hab}</span>
            {opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name={`hab-${idx}`}
                  value={opcao}
                  checked={(dados.habilidades?.[hab] || "") === opcao}
                  onChange={() => handleOpcao(hab, opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>
        ))}
      </div>

      <h4>Atitudes e Valores</h4>
      <div className="tabela-habilidades">
        {atitudes.map((att, idx) => (
          <div key={`att-${idx}`} className="linha-hab">
            <span className="hab-nome">{att}</span>
            {opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name={`att-${idx}`}
                  value={opcao}
                  checked={(dados.habilidades?.[att] || "") === opcao}
                  onChange={() => handleOpcao(att, opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
