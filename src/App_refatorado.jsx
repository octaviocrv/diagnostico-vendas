import { useState } from "react";
import { Card } from "@/components/ui/card";
import fundoCard from "./assets/imagem0-fundo.png";
import "./select-animations.css";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CaptureForm from "./components/capture/CaptureForm";
import QuizContainer from "./components/quiz/QuizContainer";
import ResultsContainer from "./components/results/ResultsContainer";
import StrategicReport from "./components/results/StrategicReport";

// Data and utilities
import { quizQuestions } from "./data/quizQuestions";
import { calculateResults } from "./utils/calculateResults";
import {
  trackLeadStarted,
  trackQuizCompleted,
  trackResultCtaClicked,
  resetSessionControl,
} from "./utils/webhookService";

export default function App() {
  const [screen, setScreen] = useState("capture");
  const [quizStep, setQuizStep] = useState(1);
  const [captureData, setCaptureData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    cargo: "",
  });
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showStrategic, setShowStrategic] = useState(false);
  const [leadId, setLeadId] = useState(null);

  // Event handlers
  const handleCaptureSubmit = async (e) => {
    e.preventDefault();
    
    // Validação antes do envio
    if (!captureData.nome || !captureData.email) {
      alert('Por favor, preencha nome e email para continuar.');
      return;
    }
    
    // Enviar evento: lead_started e gerar lead_id
    const generatedLeadId = await trackLeadStarted(captureData);
    
    if (generatedLeadId) {
      setLeadId(generatedLeadId);
      setScreen("quiz");
    } else {
      console.error('Falha ao iniciar diagnóstico - lead_id não gerado');
      alert('Erro interno. Tente novamente.');
    }
  };

  const handleAnswerSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [quizStep]: value }));

    // Se for a última pergunta, não avança automaticamente
    if (quizStep >= quizQuestions.length) {
      return;
    }

    setTimeout(() => {
      setQuizStep((prev) => prev + 1);
    }, 450);
  };

  const handlePrevQuestion = () => {
    if (quizStep > 1) setQuizStep(quizStep - 1);
  };

  const handleFinishQuiz = async () => {
    // Validação de integridade antes de calcular
    if (Object.keys(answers).length === 0) {
      console.error('Nenhuma resposta encontrada');
      return;
    }

    const calculatedResults = calculateResults(answers);
    
    // Validação dos resultados calculados - CORREÇÃO DA LÓGICA
    if (!calculatedResults || calculatedResults.totalScore === undefined) {
      console.error('Falha no cálculo dos resultados');
      return;
    }
    
    setResults(calculatedResults);
    
    // Enviar evento: quiz_completed com validação
    await trackQuizCompleted(captureData, answers, calculatedResults, quizQuestions, leadId);
    
    setScreen("result");

    // Transição automática para o Raio-X Estratégico após 3.5s
    setTimeout(() => {
      setShowStrategic(true);
    }, 3500);
  };

  const handleContactClick = async () => {
    // Validação antes do envio do CTA
    if (!results || !leadId) {
      console.error('Dados insuficientes para envio do CTA');
      return;
    }
    
    // Enviar evento: result_cta_clicked
    await trackResultCtaClicked(captureData, results, leadId);
    
    // TODO: Integrar com WhatsApp
    console.log("Dados para WhatsApp:", {
      captureData,
      results,
      leadId,
    });
    alert(
      "Em breve! Redirecionamento para WhatsApp será implementado.",
    );
  };

  const handleRestartDiagnosis = () => {
    setScreen("capture");
    setQuizStep(1);
    setAnswers({});
    setResults(null);
    setShowStrategic(false);
    setLeadId(null);
    
    // Reset do controle de sessão para permitir novo lead_started
    resetSessionControl();
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#5A002B] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1400px] flex-col lg:flex-row">
          {/* Seção Esquerda - Conteúdo principal */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-16 xl:p-24">
            <div className="mb-10 max-w-xl">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#FF2D8D] font-bold">
                Diagnóstico Estratégico de Crescimento
              </p>

              <h1 className="text-3xl leading-tight sm:text-4xl lg:text-5xl font-black text-[#5A002B]">
                O que está travando <br />
                o crescimento <br />
                <span className="relative mt-2 inline-block text-[#FF2D8D]">
                  da sua empresa hoje?
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-[#5A002B]/80 font-normal">
                Mapeie o nível de maturidade da sua operação, identifique
                gargalos invisíveis e descubra onde sua empresa está perdendo
                crescimento em menos de 3 minutos.
              </p>
            </div>

            <div className="hidden max-w-md grid-cols-2 gap-4 lg:grid">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
                alt="Escritório premium"
                className="h-40 w-full rounded-2xl object-cover shadow-sm opacity-90"
              />
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop"
                alt="Reunião estratégica"
                className="-mt-8 h-48 w-full rounded-2xl object-cover shadow-sm opacity-90"
              />
            </div>
          </div>

          {/* Seção Direita - Formulários e Quiz */}
          <div
            className="relative flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12"
            style={{
              backgroundColor: "#5A002B",
              backgroundImage: `url(${fundoCard})`,
              backgroundRepeat: "repeat",
              backgroundSize: "220px auto",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#5A002B]/40 mix-blend-multiply" />

            <Card className="relative z-10 w-full max-w-xl rounded-[24px] border border-white/10 bg-[#6A0A36]/95 text-white shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Logo */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 rotate-12">
                <img
                  src="/logoo.jpeg"
                  alt="Logo"
                  className="w-full h-full object-contain filter brightness-200"
                />
              </div>

              {/* Renderização condicional das telas */}
              {screen === "capture" && (
                <CaptureForm 
                  captureData={captureData}
                  setCaptureData={setCaptureData}
                  onSubmit={handleCaptureSubmit}
                />
              )}

              {screen === "quiz" && (
                <QuizContainer
                  quizStep={quizStep}
                  answers={answers}
                  onAnswerSelect={handleAnswerSelect}
                  onPrevQuestion={handlePrevQuestion}
                  onFinishQuiz={handleFinishQuiz}
                />
              )}

              {screen === "result" && (
                <ResultsContainer 
                  results={results}
                  showStrategic={showStrategic}
                />
              )}
            </Card>

            {/* Relatório Estratégico */}
            {showStrategic && (
              <StrategicReport 
                captureData={captureData}
                results={results}
                onContactClick={handleContactClick}
                onRestartClick={handleRestartDiagnosis}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}