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
  const [isSubmittingCapture, setIsSubmittingCapture] = useState(false);

  const handleCaptureSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmittingCapture) return;

    if (!captureData.nome || !captureData.email) {
      alert("Por favor, preencha nome e email para continuar.");
      return;
    }

    setIsSubmittingCapture(true);

    try {
      // Navigate immediately for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
      setScreen("quiz");
      
      // Send webhook in background (fire-and-forget)
      trackLeadStarted(captureData)
        .then((generatedLeadId) => {
          if (generatedLeadId) {
            setLeadId(generatedLeadId);
            console.log('Lead started tracked successfully:', generatedLeadId);
          } else {
            console.warn('Lead tracking failed, but continuing with quiz');
          }
        })
        .catch((error) => {
          console.error('Webhook error (non-blocking):', error);
        })
        .finally(() => {
          setIsSubmittingCapture(false);
        });
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmittingCapture(false);
    }
  };

  const handleAnswerSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [quizStep]: value }));

    if (quizStep >= quizQuestions.length) {
      return;
    }

    setTimeout(() => {
      setQuizStep((prev) => prev + 1);
    }, 450);
  };

  const handlePrevQuestion = () => {
    if (quizStep > 1) {
      setQuizStep(quizStep - 1);
    }
  };

  const handleFinishQuiz = async () => {
    if (Object.keys(answers).length === 0) {
      console.error("Nenhuma resposta encontrada");
      return;
    }

    const calculatedResults = calculateResults(answers);

    if (!calculatedResults || calculatedResults.totalScore === undefined) {
      console.error("Falha no cálculo dos resultados");
      return;
    }

    setResults(calculatedResults);

    await trackQuizCompleted(
      captureData,
      answers,
      calculatedResults,
      quizQuestions,
      leadId,
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
    setScreen("result");

    setTimeout(() => {
      setShowStrategic(true);
    }, 3500);
  };

  const handleContactClick = async () => {
    if (!results || !leadId) {
      console.error("Dados insuficientes para envio do CTA");
      return;
    }

    await trackResultCtaClicked(captureData, results, leadId);

    console.log("Dados para WhatsApp:", {
      captureData,
      results,
      leadId,
    });

    alert("Em breve! Redirecionamento para WhatsApp será implementado.");
  };

  const handleRestartDiagnosis = () => {
    setScreen("capture");
    setQuizStep(1);
    setAnswers({});
    setResults(null);
    setShowStrategic(false);
    setLeadId(null);

    resetSessionControl();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isResultScreen = screen === "result";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F9F6F0] font-sans text-[#5A002B]">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="mx-auto flex w-full flex-1 flex-col lg:flex-row max-w-[1400px]">
          
          {/* Seção Esquerda - Ajustada para ocupar menos altura no mobile */}
          <div className="flex w-full flex-col justify-center px-5 py-8 sm:px-8 md:py-12 lg:w-1/2 lg:p-12 xl:p-16 2xl:p-24">
            <div className="mb-6 md:mb-10 max-w-xl">
              <p className="mb-2 md:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#FF2D8D]">
                Diagnóstico Estratégico de Crescimento
              </p>

              <h1 className="text-[28px] sm:text-3xl md:text-4xl font-black leading-[1.15] text-[#5A002B] lg:text-5xl xl:text-6xl">
                Descubra o que está travando{" "}
                <br className="hidden md:block" />
                <span className="relative mt-1 inline-block text-[#FF2D8D]">
                  o crescimento da sua empresa.
                </span>
              </h1>

              <p className="mt-3 md:mt-6 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-[#5A002B]/80">
                Mapeie o nível de maturidade da sua operação, identifique
                gargalos invisíveis e descubra onde sua empresa está perdendo
                oportunidades de crescimento em menos de 3 minutos.
              </p>
            </div>

            <div className="hidden max-w-md grid-cols-2 gap-4 lg:grid xl:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
                alt="Escritório premium"
                className="h-32 xl:h-40 w-full rounded-2xl object-cover opacity-90 shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop"
                alt="Reunião estratégica"
                className="-mt-6 xl:-mt-8 h-40 xl:h-48 w-full rounded-2xl object-cover opacity-90 shadow-sm"
              />
            </div>
          </div>

          {/* Seção Direita - Adicionado flex-1 e ajustes de padding */}
          <div
            className="relative flex flex-1 w-full items-center justify-center overflow-hidden px-4 py-10 sm:p-8 lg:w-1/2 lg:p-12 xl:p-16"
            style={{
              backgroundColor: "#5A002B",
              backgroundImage: `url(${fundoCard})`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px auto",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#5A002B]/40 mix-blend-multiply" />

            {/* Glow de fundo para a etapa de resultado */}
            {isResultScreen && !showStrategic && (
              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                <div className="h-[460px] w-full max-w-[940px] rounded-[42px] bg-[#FF2D8D]/12 blur-3xl" />
              </div>
            )}

            {!isResultScreen && (
              <Card className="relative z-10 w-full max-w-[400px] sm:max-w-md md:max-w-lg lg:max-w-xl overflow-hidden rounded-2xl md:rounded-[24px] border border-white/10 bg-[#6A0A36]/95 text-white shadow-2xl backdrop-blur-xl">
                <div className="absolute -right-6 sm:-right-8 -top-6 sm:-top-8 h-24 sm:h-32 w-24 sm:w-32 rotate-12 opacity-20 pointer-events-none">
                  <img
                    src="/logoo.jpeg"
                    alt="Logo"
                    className="h-full w-full object-contain brightness-200"
                  />
                </div>

                {screen === "capture" && (
                  <CaptureForm
                    captureData={captureData}
                    setCaptureData={setCaptureData}
                    onSubmit={handleCaptureSubmit}
                    isSubmitting={isSubmittingCapture}
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
              </Card>
            )}

            {isResultScreen && (
              <div className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-[940px]">
                <ResultsContainer
                  results={results}
                  showStrategic={showStrategic}
                />
              </div>
            )}

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