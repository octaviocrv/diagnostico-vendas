import { quizQuestions } from "../data/quizQuestions";

export const calculateResults = (answers) => {
  let totalScore = 0;
  let maxScore = 80;
  let bottleneck = "";

  // Calcula pontuação baseada nas 8 perguntas
  for (let i = 1; i <= 8; i++) {
    const answer = answers[i];
    if (answer) {
      const question = quizQuestions[i - 1];
      const optionIndex = question.options.findIndex(
        (opt) => opt.value === answer,
      );
      if (optionIndex === 0) totalScore += 10;
      else if (optionIndex === 1) totalScore += 7;
      else if (optionIndex === 2) totalScore += 3;
      else totalScore += 0;
    }
  }

  // Determina o gargalo principal baseado na pergunta 6
  const bottleneckAnswer = answers[6];
  const bottleneckMap = {
    "falta-posicionamento": "Falta de posicionamento claro",
    "baixa-geracao": "Baixa geração de demanda qualificada",
    "comunicacao-nao-conecta": "Comunicação não conecta",
    "ja-investimos": "Retorno insatisfatório em investimentos"
  };
  bottleneck = bottleneckMap[bottleneckAnswer] || "Posicionamento e percepção no mercado";

  const scorePercent = Math.round((totalScore / maxScore) * 100);
  const potentialPercent = 100 - scorePercent;
  const scoreNota = (scorePercent / 10).toFixed(1);

  let maturityBand = "";
  let maturityTitle = "";
  let maturityDescription = "";

  if (scorePercent <= 35) {
    maturityBand = "critica";
    maturityTitle = "Posicionamento Crítico";
    maturityDescription =
      "Sua empresa não está travada por falta de esforço — mas por posicionamento, percepção e estratégia. A marca não traduz o nível da empresa e a comunicação não gera autoridade.";
  } else if (scorePercent <= 60) {
    maturityBand = "desenvolvimento";
    maturityTitle = "Em Desenvolvimento";
    maturityDescription =
      "Você já tem uma base, mas ainda há muito potencial inexplorado em posicionamento e autoridade no mercado. Pequenos ajustes estratégicos podem gerar grandes resultados.";
  } else if (scorePercent <= 80) {
    maturityBand = "consolidada";
    maturityTitle = "Posição Consolidada";
    maturityDescription =
      "Sua empresa já demonstra boa percepção no mercado, mas ainda existem oportunidades para fortalecer autoridade e acelerar o crescimento através do posicionamento.";
  } else {
    maturityBand = "referencia";
    maturityTitle = "Referência no Mercado";
    maturityDescription =
      "Sua empresa já possui forte reconhecimento e autoridade. O foco agora deve ser manter e expandir essa posição de liderança no mercado.";
  }

  return {
    totalScore,
    maxScore,
    scorePercent,
    potentialPercent,
    scoreNota,
    bottleneck,
    maturityBand,
    maturityTitle,
    maturityDescription,
  };
};