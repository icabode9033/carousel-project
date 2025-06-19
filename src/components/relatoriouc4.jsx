import React from "react";
import "../components/relatoriouc.css"

const habilidades = [
  "Higienizar as mãos conforme a OMS",
  "Utilizar equipamentos de proteção",
  "Comunicar-se de maneira assertiva",
  "Selecionar materiais, equipamentos e instrumental",
  "Utilizar técnicas assépticas",
  "Monitorar parâmetros clínicos dos clientes",
  "Identificar reações, sinais e sintomas do cliente",
  "Identificar prioridades durante o atendimento",
  "Identificar situações de emergência e de risco",
  "Executar manobras de suporte básico de vida",
  "Realizar punção venosa periférica",
  "Realizar cálculos farmacológicos",
  "Administrar medicamentos VO, SL, ID, inalatória, EV",
  "Administrar alimentação por via oral",
  "Realizar bandagens e curativos",
  "Adotar boas práticas na promoção da saúde e prevenção de doenças",
  "Realizar visitas domiciliares",
  "Identificar aspectos socioeconômicos e de saúde dos grupos atendidos",
  "Identificar situações de vulnerabilidade",
  "Identificar sinais de violência",
  "Participar de atividade de acompanhamento a Grupos de Hiperdia",
  "Participar de atividade de acompanhamento da rotina de cuidados a idosos",
  "Participar de atividade de acompanhamento de consulta ginecológica",
  "Coletar dados para subsidiar ações educativas (Planejamento Familiar, DST etc.)",
  "Participar de atividades de grupos de gestantes",
  "Participar de atividade de acompanhamento de puericultura",
  "Acompanhar o manuseio, armazenamento, conservação e transporte de imunobiológicos",
  "Acompanhar o preenchimento do cartão de vacina",
  "Participar de campanhas de vacinação",
  "Interpretar documentos técnicos",
  "Utilizar termos técnicos na rotina de trabalho",
  "Operar recursos tecnológicos aplicados à saúde",
  "Realizar registros de enfermagem",
  "Preencher formulários de notificação compulsória",
  "Identificar os aspectos do próprio trabalho que interferem no serviço",
  "Mediar conflitos nas situações de trabalho"
];

const atitudes = [
  "Comprometimento com o atendimento humanizado",
  "Responsabilidade no uso dos recursos organizacionais",
  "Colaboração, flexibilidade e iniciativa no desenvolvimento do trabalho em equipe",
  "Proatividade na resolução de problemas",
  "Respeito à diversidade e aos valores morais, culturais e religiosos do cliente e da família",
  "Respeito ao limite da atuação profissional",
  "Responsabilidade no descarte de resíduos",
  "Sigilo no tratamento de dados e informações",
  "Zelo na apresentação pessoal e postura profissional",
  "Responsabilidade no cumprimento das normas de segurança",
  "Respeito às normas técnicas e legislações vigentes"
];

const opcoes = ["Sim", "Não", "Parcialmente", "N/A"];

export default function RelatorioUC4({ uc, dados, setDados }) {
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
