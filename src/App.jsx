import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Clock3,
  CircleCheck,
  CheckCircle2,
  ChevronDown,
  TrendingUp,
  Target,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import fundoCard from "./assets/imagem0-fundo.png";
import "./select-animations.css";

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

  // Novas 8 perguntas focadas em posicionamento e autoridade
  const quizQuestions = [
    {
      id: 1,
      question: "Hoje, sua empresa é reconhecida no mercado como referência?",
      options: [
        { value: "sim-posicionados", label: "Sim, somos bem posicionados" },
        { value: "mais-ou-menos", label: "Mais ou menos, ainda não como gostaríamos" },
        { value: "nao-abaixo", label: "Não, sabemos que estamos abaixo do nosso potencial" },
        { value: "nunca-pensei", label: "Nunca pensei nisso" }
      ]
    },
    {
      id: 2,
      question: "Quando alguém precisa do que você vende, sua empresa vem à mente?",
      options: [
        { value: "sim-lembrados", label: "Sim, somos lembrados com frequência" },
        { value: "as-vezes", label: "Às vezes" },
        { value: "raramente", label: "Raramente" },
        { value: "nao", label: "Não" }
      ]
    },
    {
      id: 3,
      question: "Como sua empresa gera novas oportunidades hoje?",
      options: [
        { value: "indicacao-networking", label: "Indicação / networking" },
        { value: "marketing-digital", label: "Marketing digital / tráfego" },
        { value: "comercial-ativo", label: "Comercial ativo" },
        { value: "nao-processo", label: "Não temos um processo claro" }
      ]
    },
    {
      id: 4,
      question: "Você sente que sua comunicação e marca refletem o nível real da sua empresa?",
      options: [
        { value: "sim-totalmente", label: "Sim, totalmente" },
        { value: "em-partes", label: "Em partes" },
        { value: "nao-incomoda", label: "Não, isso me incomoda" },
        { value: "nunca-analisei", label: "Nunca analisei isso" }
      ]
    },
    {
      id: 5,
      question: "Sua empresa já utiliza eventos ou experiências para gerar posicionamento e negócios?",
      options: [
        { value: "sim-estrategia", label: "Sim, com estratégia" },
        { value: "ja-fizemos", label: "Já fizemos, mas sem resultado claro" },
        { value: "nunca-fizemos", label: "Nunca fizemos" },
        { value: "nao-prioridade", label: "Não vejo isso como prioridade" }
      ]
    },
    {
      id: 6,
      question: "Hoje, o que mais trava o crescimento da sua empresa?",
      options: [
        { value: "falta-posicionamento", label: "Falta de posicionamento claro" },
        { value: "baixa-geracao", label: "Baixa geração de demanda qualificada" },
        { value: "comunicacao-nao-conecta", label: "Comunicação não conecta" },
        { value: "ja-investimos", label: "Já investimos, mas não vimos retorno" }
      ]
    },
    {
      id: 7,
      question: "Se isso fosse resolvido agora, qual seria o impacto no seu negócio?",
      options: [
        { value: "crescimento-acelerado", label: "Crescimento acelerado" },
        { value: "mais-autoridade", label: "Mais autoridade no mercado" },
        { value: "mais-oportunidades", label: "Mais oportunidades de negócio" },
        { value: "mais-previsibilidade", label: "Mais previsibilidade" }
      ]
    },
    {
      id: 8,
      question: "Você já investe ou pretende investir para crescer de forma mais estruturada?",
      options: [
        { value: "sim-ja-invisto", label: "Sim, já invisto" },
        { value: "sim-buscando", label: "Sim, estou buscando solução" },
        { value: "talvez", label: "Talvez" },
        { value: "nao-momento", label: "Não no momento" }
      ]
    }
  ];

  const handleCaptureSubmit = (e) => {
    e.preventDefault();
    setScreen("quiz");
  };

  // Auto-avanço com delay para feedback visual
  const handleAnswerSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [quizStep]: value }));

    setTimeout(() => {
      if (quizStep < quizQuestions.length) {
        setQuizStep((prev) => prev + 1);
      } else {
        handleFinishQuiz();
      }
    }, 450);
  };

  const handlePrevQuestion = () => {
    if (quizStep > 1) setQuizStep(quizStep - 1);
  };

  const calculateResults = () => {
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

  const handleFinishQuiz = () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setScreen("result");

    // Transição automática para o Raio-X Estratégico após 3.5s
    setTimeout(() => {
      setShowStrategic(true);
    }, 3500);
  };

  const currentQuestion = quizQuestions[quizStep - 1];
  const progressPercentage = (quizStep / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#5A002B] flex flex-col font-sans">
      {/* Header Premium */}
      <header className="border-b border-[#5A002B]/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl tracking-widest text-[#5A002B] font-black">
              SENSE HOUSE
            </h2>
            <span className="h-5 w-px bg-[#5A002B]/20" />
            <span className="text-sm md:text-base text-[#FF2D8D] font-bold">
              Raio-X Comercial
            </span>
          </div>
          <div className="text-sm text-[#5A002B]/60 hidden sm:block font-light">
            Transformando vendas em conexões
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[1400px] flex-col lg:flex-row">
          {/* Lado Esquerdo - Copy e Imagens Abstratas */}
          <div className="flex w-full flex-col justify-center p-8 lg:w-1/2 lg:p-16 xl:p-24">
            <div className="mb-10 max-w-xl">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#FF2D8D] font-bold">
                Diagnóstico Estratégico de Crescimento
              </p>

              {/* Headline atualizada com tamanho reduzido e quebras de linha estratégicas */}
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

          {/* Lado Direito - Card Interativo */}
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
              {/* Logo decorativo */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 rotate-12">
                <img
                  src="/logoo.jpeg"
                  alt="Logo"
                  className="w-full h-full object-contain filter brightness-200"
                />
              </div>

              {screen === "capture" ? (
                /* --- TELA 1: CAPTURA --- */
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader className="space-y-2 border-b border-white/5 px-8 pb-6 pt-8">
                    <CardTitle className="text-2xl sm:text-3xl font-bold">
                      Descubra agora seu diagnóstico estratégico
                    </CardTitle>
                    <CardDescription className="text-sm text-[#F5C6D6] font-light">
                      Seus dados estão seguros. Usaremos apenas para entregar
                      seu resultado.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-8 py-8">
                    <form onSubmit={handleCaptureSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="nome"
                            className="text-white/90 text-sm font-medium"
                          >
                            Nome Completo
                          </Label>
                          <Input
                            id="nome"
                            required
                            value={captureData.nome}
                            onChange={(e) =>
                              setCaptureData((prev) => ({
                                ...prev,
                                nome: e.target.value,
                              }))
                            }
                            placeholder="Seu nome"
                            className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-[#FF2D8D] focus:ring-1 focus:ring-[#FF2D8D] transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="email"
                              className="text-white/90 text-sm font-medium"
                            >
                              E-mail Corporativo
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              value={captureData.email}
                              onChange={(e) =>
                                setCaptureData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              placeholder="seu@email.com"
                              className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-[#FF2D8D] focus:ring-1 focus:ring-[#FF2D8D] transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="whatsapp"
                              className="text-white/90 text-sm font-medium"
                            >
                              WhatsApp
                            </Label>
                            <Input
                              id="whatsapp"
                              required
                              value={captureData.whatsapp}
                              onChange={(e) =>
                                setCaptureData((prev) => ({
                                  ...prev,
                                  whatsapp: e.target.value,
                                }))
                              }
                              placeholder="(00) 00000-0000"
                              className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-[#FF2D8D] focus:ring-1 focus:ring-[#FF2D8D] transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="empresa"
                              className="text-white/90 text-sm font-medium"
                            >
                              Empresa
                            </Label>
                            <Input
                              id="empresa"
                              required
                              value={captureData.empresa}
                              onChange={(e) =>
                                setCaptureData((prev) => ({
                                  ...prev,
                                  empresa: e.target.value,
                                }))
                              }
                              placeholder="Sua empresa"
                              className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-[#FF2D8D] focus:ring-1 focus:ring-[#FF2D8D] transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-white/90 text-sm font-medium">
                              Cargo
                            </Label>
                            <Select
                              required
                              value={captureData.cargo}
                              onValueChange={(value) =>
                                setCaptureData((prev) => ({
                                  ...prev,
                                  cargo: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5 text-white focus:ring-1 focus:ring-[#FF2D8D] transition-all">
                                <SelectValue
                                  placeholder="Selecione"
                                  className="text-white/50"
                                />
                              </SelectTrigger>
                              <SelectContent className="border-white/10 bg-[#6A0A36] text-white">
                                <SelectItem value="socio">
                                  Sócio / Fundador
                                </SelectItem>
                                <SelectItem value="ceo">CEO</SelectItem>
                                <SelectItem value="diretor">
                                  Diretor(a)
                                </SelectItem>
                                <SelectItem value="gerente">
                                  Gerente / Head
                                </SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#FF2D8D] px-6 text-white font-bold transition-all hover:bg-[#e61e7a] hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#FF2D8D]/20"
                      >
                        
                        <ArrowRight className="h-5 w-5" />
                      </button>

                      {/* Benefícios */}
                      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="mb-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-[#F5C6D6]" />
                          </div>
                          <span className="text-xs text-white/80 font-medium">
                            Certificado
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="mb-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <Clock3 className="h-4 w-4 text-[#F5C6D6]" />
                          </div>
                          <span className="text-xs text-white/80 font-medium">
                            Resultado imediato
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="mb-2 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <CircleCheck className="h-4 w-4 text-[#F5C6D6]" />
                          </div>
                          <span className="text-xs text-white/80 font-medium">
                            Gratuito
                          </span>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </div>
              ) : screen === "quiz" ? (
                /* --- TELA 2: QUIZ --- */
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <CardHeader className="space-y-4 border-b border-white/5 px-8 pb-6 pt-8">
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-sm tracking-wider text-[#F5C6D6] uppercase font-bold">
                        Etapa {quizStep} de {quizQuestions.length}
                      </CardTitle>
                      <span className="text-sm font-medium text-white/60">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#FF2D8D] h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 py-8">
                    <div className="space-y-8">
                      <h3 className="text-xl md:text-2xl font-medium leading-snug text-white">
                        {currentQuestion.question}
                      </h3>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => handleAnswerSelect(option.value)}
                            className={`group flex items-center p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                              answers[quizStep] === option.value
                                ? "bg-[#FF2D8D]/10 border-[#FF2D8D] shadow-[0_0_15px_rgba(255,45,141,0.15)]"
                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <div
                              className={`mr-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                answers[quizStep] === option.value
                                  ? "border-[#FF2D8D] bg-[#FF2D8D]"
                                  : "border-white/30 group-hover:border-white/50"
                              }`}
                            >
                              {answers[quizStep] === option.value && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span className="text-white/90 font-normal leading-relaxed">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handlePrevQuestion}
                          disabled={quizStep === 1}
                          className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-0 font-medium"
                        >
                          ← Voltar para pergunta anterior
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              ) : (
                /* --- TELA 3: RESULTADO RESUMIDO --- */
                <div
                  className={`transition-all duration-1000 ${showStrategic ? "animate-out fade-out zoom-out-95" : "animate-in fade-in zoom-in-95"} duration-700`}
                >
                  <CardHeader className="text-center space-y-4 border-b border-white/5 px-8 pb-8 pt-10">
                    <div className="mx-auto w-16 h-16 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-8 w-8 text-[#FF2D8D]" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Diagnóstico Concluído
                    </CardTitle>
                    <CardDescription className="text-sm text-[#F5C6D6] font-light max-w-sm mx-auto">
                      Processando sua análise estratégica...
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-8 py-8">
                    {results && (
                      <div className="text-center space-y-6">
                        <div className="bg-white/5 rounded-2xl p-6">
                          <div className="text-3xl font-black text-white mb-2">
                            {results.scoreNota}
                            <span className="text-lg text-white/40">/10</span>
                          </div>
                          <p className="text-sm text-[#FF2D8D] font-bold">
                            {results.maturityTitle}
                          </p>
                          <p className="text-xs text-white/60 mt-2">
                            {results.potentialPercent}% de potencial inexplorado
                          </p>
                        </div>

                        <div className="flex items-center justify-center space-x-2 text-white/40">
                          <div className="w-2 h-2 bg-[#FF2D8D] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#FF2D8D] rounded-full animate-pulse animation-delay-200"></div>
                          <div className="w-2 h-2 bg-[#FF2D8D] rounded-full animate-pulse animation-delay-400"></div>
                        </div>

                        <p className="text-xs text-white/50 font-light">
                          Preparando seu raio-X estratégico completo...
                        </p>
                      </div>
                    )}
                  </CardContent>
                </div>
              )}
            </Card>

            {/* TELA ESTRATÉGICA - OVERLAY FULL SCREEN */}
            {showStrategic && (
              <div className="fixed inset-0 bg-[#F9F6F0] z-50 animate-in fade-in slide-in-from-bottom-4 duration-1000 overflow-y-auto">
                <div className="min-h-screen py-12 px-6">
                  <div className="max-w-4xl mx-auto">
                    {/* Header Estratégico */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                      <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-[#FF2D8D] rounded-full"></div>
                        <span className="text-sm uppercase tracking-[0.2em] text-[#5A002B] font-bold">
                          RELATÓRIO ESTRATÉGICO
                        </span>
                        <div className="w-3 h-3 bg-[#FF2D8D] rounded-full"></div>
                      </div>

                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#5A002B] mb-4 leading-tight">
                        Seu Raio-X Estratégico
                      </h1>

                      <p className="text-lg md:text-xl text-[#5A002B]/80 font-normal max-w-2xl mx-auto leading-relaxed">
                        <strong className="font-bold">
                          {captureData.nome}
                        </strong>
                        , analisamos a operação da
                        <strong className="font-bold text-[#FF2D8D]">
                          {" "}
                          {captureData.empresa}
                        </strong>{" "}
                        e identificamos os pontos críticos para acelerar o
                        crescimento.
                      </p>
                    </div>

                    {results && (
                      <div className="space-y-8">
                        {/* Cards Principais */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                          {/* Maturidade Atual */}
                          <div className="bg-white rounded-3xl p-8 border border-[#5A002B]/5 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-[#5A002B]/10 rounded-full flex items-center justify-center">
                                <Target className="h-5 w-5 text-[#5A002B]" />
                              </div>
                              <h3 className="text-lg font-bold text-[#5A002B]">
                                Maturidade Atual
                              </h3>
                            </div>

                            <div className="text-center">
                              <div className="text-5xl font-black text-[#5A002B] mb-2">
                                {results.scoreNota}
                                <span className="text-2xl text-[#5A002B]/50">
                                  /10
                                </span>
                              </div>
                              <div className="inline-flex items-center gap-2 bg-[#5A002B]/5 rounded-full px-4 py-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    results.scorePercent <= 35
                                      ? "bg-red-500"
                                      : results.scorePercent <= 60
                                        ? "bg-orange-500"
                                        : results.scorePercent <= 80
                                          ? "bg-yellow-500"
                                          : "bg-green-500"
                                  }`}
                                ></div>
                                <span className="text-sm font-bold text-[#5A002B]">
                                  {results.maturityTitle}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Gap de Crescimento */}
                          <div className="bg-gradient-to-br from-[#FF2D8D]/10 to-[#FF2D8D]/5 rounded-3xl p-8 border border-[#FF2D8D]/20 shadow-2xl relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#FF2D8D]/5 rounded-full"></div>

                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-10 h-10 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-[#FF2D8D]" />
                              </div>
                              <h3 className="text-lg font-bold text-[#5A002B]">
                                Gap de Crescimento
                              </h3>
                            </div>

                            <div className="text-center relative z-10">
                              <div className="text-5xl font-black text-[#FF2D8D] mb-2">
                                {results.potentialPercent}%
                              </div>
                              <p className="text-sm text-[#5A002B]/70 font-medium">
                                potencial inexplorado identificado
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Ponto de Atenção */}
                        <div className="bg-[#5A002B] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                          <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#FF2D8D]/10 rounded-full"></div>

                          <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-[#FF2D8D]/20 rounded-full px-4 py-2 mb-6">
                              <AlertCircle className="h-4 w-4 text-[#FF2D8D]" />
                              <span className="text-sm font-bold text-[#FF2D8D] uppercase tracking-wider">
                                Ponto de Atenção
                              </span>
                            </div>

                            <h3 className="text-sm text-white/70 font-medium mb-2">
                              Seu principal obstáculo hoje é:
                            </h3>
                            <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                              {results.bottleneck}
                            </p>

                            <div className="border-t border-white/10 pt-6">
                              <h4 className="text-sm font-bold text-[#FF2D8D] mb-3">
                                LEITURA ESTRATÉGICA:
                              </h4>
                              <p className="text-white/90 leading-relaxed font-light">
                                {results.maturityDescription}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Benefícios e CTA */}
                        <div className="bg-white rounded-3xl p-8 border border-[#5A002B]/5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-[#5A002B] mb-4">
                              Próximos Passos Estratégicos
                            </h3>
                            <p className="text-[#5A002B]/70 max-w-xl mx-auto leading-relaxed">
                              Com base no diagnóstico, definimos um plano de
                              ação personalizado para destravar o crescimento da{" "}
                              <strong>{captureData.empresa}</strong>.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="text-center p-4">
                              <div className="w-12 h-12 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="h-6 w-6 text-[#FF2D8D]" />
                              </div>
                              <p className="text-xs font-bold text-[#5A002B]">
                                Análise Aprofundada
                              </p>
                            </div>

                            <div className="text-center p-4">
                              <div className="w-12 h-12 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Target className="h-6 w-6 text-[#FF2D8D]" />
                              </div>
                              <p className="text-xs font-bold text-[#5A002B]">
                                Direcionamento Estratégico
                              </p>
                            </div>

                            <div className="text-center p-4">
                              <div className="w-12 h-12 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <AlertCircle className="h-6 w-6 text-[#FF2D8D]" />
                              </div>
                              <p className="text-xs font-bold text-[#5A002B]">
                                Clareza sobre Prioridades
                              </p>
                            </div>

                            <div className="text-center p-4">
                              <div className="w-12 h-12 bg-[#FF2D8D]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="h-6 w-6 text-[#FF2D8D]" />
                              </div>
                              <p className="text-xs font-bold text-[#5A002B]">
                                Plano de Evolução
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <button
                              type="button"
                              onClick={() => {
                                // TODO: Integrar com WhatsApp
                                console.log("Dados para WhatsApp:", {
                                  captureData,
                                  results,
                                });
                                alert(
                                  "Em breve! Redirecionamento para WhatsApp será implementado.",
                                );
                              }}
                              className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl bg-[#FF2D8D] px-8 text-white transition-all hover:bg-[#e61e7a] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#FF2D8D]/20 font-black text-lg"
                            >
                              <MessageCircle className="h-6 w-6" />
                              Quero Destravar meu Crescimento
                            </button>

                            <div className="text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setScreen("capture");
                                  setQuizStep(1);
                                  setAnswers({});
                                  setResults(null);
                                  setShowStrategic(false);
                                }}
                                className="text-sm text-[#5A002B]/50 hover:text-[#5A002B] transition-colors font-medium"
                              >
                                ← Fazer novo diagnóstico
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="border-t border-[#5A002B]/5 bg-transparent py-6">
        <div className="mx-auto max-w-[1400px] px-6 flex flex-col items-center justify-between gap-4 text-xs text-[#5A002B]/60 sm:flex-row font-medium">
          <p>SENSE HOUSE © 2026. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FF2D8D] transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-[#FF2D8D] transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
