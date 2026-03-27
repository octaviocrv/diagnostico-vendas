// Serviço para integração com webhook do n8n
const WEBHOOK_URL = 'https://n8n-n8n.bgsl0m.easypanel.host/webhook/671d8498-8095-4440-8f48-4527df18211c';

/*
 * SISTEMA DE SCORES - DOCUMENTAÇÃO RÁPIDA
 * =====================================
 * 
 * score: Pontuação bruta (0-80) - soma das 8 perguntas
 * score_percent: Porcentagem de maturidade (0-100%) - (score/80)*100
 * score_nota: Nota escolar (0.0-10.0) - score_percent/10
 * gap_crescimento: Potencial não explorado (0-100%) - 100-score_percent
 * 
 * INTENT LEVELS:
 * - high_intent: score ≥ 60 (prioridade alta)
 * - medium_intent: score 30-59 (prioridade média) 
 * - low_intent: score < 30 (prioridade baixa)
 * 
 * Documentação completa: docs/SISTEMA_SCORES.md
 */

/**
 * Função auxiliar para enviar dados ao webhook
 */
const sendToWebhook = async (eventData) => {
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Webhook response não foi ok:', response.status);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('Webhook request timeout - continuing anyway');
    } else {
      console.error('Erro ao enviar dados para webhook:', error);
    }
  }
};

/**
 * Gera um identificador único para o lead
 */
const generateLeadId = (email) => {
  const timestamp = Date.now();
  const emailPrefix = email ? email.split('@')[0] : 'anonymous';
  return `${emailPrefix}_${timestamp}`;
};

/**
 * Formata dados do usuário no padrão consistente
 */
const formatUserData = (captureData, leadId = null) => ({
  lead_id: leadId,
  name: captureData.nome || '',
  email: captureData.email || '',
  whatsapp: captureData.whatsapp || '',
  company: captureData.empresa || '',
  role: captureData.cargo || '',
  faturamento_mensal: captureData.faturamento || '',
});

/**
 * Valida se os dados obrigatórios estão presentes
 */
const validateRequiredData = (data, requiredFields) => {
  const missing = requiredFields.filter(field => !data[field]);
  if (missing.length > 0) {
    console.warn('Campos obrigatórios ausentes:', missing);
    return false;
  }
  return true;
};

/**
 * Valida integridade dos resultados do quiz
 */
const validateQuizResults = (results, answers) => {
  const requiredFields = ['totalScore', 'maturityTitle', 'potentialPercent', 'bottleneck'];
  
  if (!results || !answers) {
    console.error('Resultados ou respostas ausentes');
    return false;
  }

  const isValid = requiredFields.every(field => results[field] !== undefined && results[field] !== null);
  
  if (!isValid) {
    console.error('Campos obrigatórios ausentes nos resultados:', 
      requiredFields.filter(field => results[field] === undefined || results[field] === null)
    );
  }
  
  return isValid && Object.keys(answers).length > 0;
};

/**
 * Extrai informações da página atual (preparado para UTMs futuras)
 */
const getPageInfo = () => {
  const url = new URL(window.location.href);
  
  return {
    pagina_origem: 'funil_captacao_sensehouse', // Identificador consistente do funil
    url_completa: url.href,
    // 👇 Preparado para fase 2 - UTMs
    // utm_source: url.searchParams.get('utm_source') || null,
    // utm_medium: url.searchParams.get('utm_medium') || null,
    // utm_campaign: url.searchParams.get('utm_campaign') || null,
  };
};

/**
 * Converte respostas do quiz para o formato de array com pergunta/resposta
 */
const formatQuizAnswers = (answers, quizQuestions) => {
  return Object.entries(answers).map(([questionId, answer]) => {
    const questionData = quizQuestions[parseInt(questionId) - 1];
    const selectedOption = questionData?.options?.find(opt => opt.value === answer);
    
    return {
      pergunta: questionData?.question || '',
      resposta: selectedOption?.label || answer,
    };
  });
};

// Controle de sessão para evitar duplicação de eventos
let sessionControl = {
  leadStartedSent: false,
  currentLeadId: null,
};

/**
 * Reset do controle de sessão (usado em reinicialização)
 */
export const resetSessionControl = () => {
  sessionControl = {
    leadStartedSent: false,
    currentLeadId: null,
  };
};

/**
 * Evento: Início do diagnóstico
 * Disparado quando usuário submete formulário de captura
 */
export const trackLeadStarted = async (captureData) => {
  // Previne múltiplos envios na mesma sessão
  if (sessionControl.leadStartedSent && sessionControl.currentLeadId) {
    console.log('Lead started já enviado nesta sessão, retornando lead_id existente');
    return sessionControl.currentLeadId;
  }

  // Validação de dados obrigatórios
  if (!validateRequiredData(captureData, ['nome', 'email'])) {
    console.error('Dados obrigatórios ausentes para lead_started');
    return null;
  }

  const leadId = generateLeadId(captureData.email);
  const pageInfo = getPageInfo();
  
  const eventData = {
    event: 'lead_started',
    ...formatUserData(captureData, leadId),
    ...pageInfo,
    lead_status: 'started',
    data_hora_inicio: new Date().toISOString(),
  };

  await sendToWebhook(eventData);
  
  // Atualiza controle de sessão
  sessionControl.leadStartedSent = true;
  sessionControl.currentLeadId = leadId;
  
  return leadId;
};

/**
 * Evento: Quiz completo
 * Disparado quando usuário finaliza o quiz
 */
export const trackQuizCompleted = async (captureData, answers, results, quizQuestions, leadId) => {
  // Usa o lead_id da sessão se não foi fornecido
  const finalLeadId = leadId || sessionControl.currentLeadId;
  
  if (!finalLeadId) {
    console.error('Lead ID não encontrado para quiz_completed');
    return;
  }

  // Validação de integridade dos dados
  if (!validateQuizResults(results, answers)) {
    console.error('Falha na validação de integridade dos resultados do quiz');
    return;
  }

  // Validação de dados do usuário
  if (!validateRequiredData(captureData, ['nome', 'email'])) {
    console.error('Dados do usuário ausentes para quiz_completed');
    return;
  }

  const pageInfo = getPageInfo();

  const eventData = {
    event: 'quiz_completed',
    ...formatUserData(captureData, finalLeadId),
    ...pageInfo, // Inclui pagina_origem para consistência
    answers: formatQuizAnswers(answers, quizQuestions),
    score: results.totalScore || 0,                    // Score bruto (0-80)
    score_percent: results.scorePercent || 0,         // Score em porcentagem (0-100%)
    score_nota: results.scoreNota || '0.0',           // Score em nota (0.0-10.0) 
    maturidade: results.maturityTitle || '',
    maturidade_banda: results.maturityBand || '',
    gap_crescimento: results.potentialPercent || 0,
    gargalo_principal: results.bottleneck || '',
    lead_status: 'quiz_completed',
    total_perguntas: Object.keys(answers).length,
    data_hora_conclusao: new Date().toISOString(),
  };

  await sendToWebhook(eventData);
};

/**
 * Determina o status do lead baseado na pontuação
 */
const getLeadStatus = (score, maturityBand) => {
  if (score >= 60) return 'high_intent';
  if (score >= 30) return 'medium_intent';
  return 'low_intent';
};

/**
 * Evento: CTA clicado
 * Disparado quando usuário clica no botão final (WhatsApp)
 */
export const trackResultCtaClicked = async (captureData, results, leadId) => {
  // Usa o lead_id da sessão se não foi fornecido
  const finalLeadId = leadId || sessionControl.currentLeadId;
  
  if (!finalLeadId) {
    console.error('Lead ID não encontrado para result_cta_clicked');
    return;
  }

  // Validação de dados mínimos obrigatórios
  if (!results || !captureData.email) {
    console.error('Dados insuficientes para result_cta_clicked');
    return;
  }

  // Validação adicional de integridade dos resultados
  if (results.totalScore === undefined || results.totalScore === null) {
    console.error('Score inválido para result_cta_clicked');
    return;
  }

  const leadStatus = getLeadStatus(results.totalScore, results.maturityBand);
  const pageInfo = getPageInfo();
  
  const eventData = {
    event: 'result_cta_clicked',
    lead_id: finalLeadId,
    name: captureData.nome || '',
    email: captureData.email || '',
    company: captureData.empresa || '',
    whatsapp: captureData.whatsapp || '',
    role: captureData.cargo || '',
    ...pageInfo, // Consistência com outros eventos
    score: results.totalScore || 0,                    // Score bruto (0-80)
    score_percent: results.scorePercent || 0,         // Score em porcentagem (0-100%)
    score_nota: results.scoreNota || '0.0',           // Score em nota (0.0-10.0)
    maturidade: results.maturityTitle || '',
    maturidade_banda: results.maturityBand || '',
    gargalo_principal: results.bottleneck || '',
    gap_crescimento: results.potentialPercent || 0,
    tipo_cta: 'whatsapp',
    lead_status: leadStatus,
    intent_level: leadStatus, // Alias para facilitar automação
    data_hora_clique: new Date().toISOString(),
  };

  await sendToWebhook(eventData);
};