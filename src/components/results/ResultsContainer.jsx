import { useEffect, useState } from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

const loadingTexts = [
  "Mapeando a maturidade da sua operação...",
  "Identificando gargalos invisíveis no seu processo...",
  "Cruzando respostas com padrões de mercado premium...",
  "Calculando seu volume de potencial inexplorado...",
  "Finalizando a montagem do seu raio-X estratégico...",
];

export default function ResultsContainer({ results, showStrategic }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(textInterval);
          return prev;
        }

        return prev + 1;
      });
    }, 1500);

    const finishTimeout = setTimeout(() => {
      setIsAnalyzing(false);
    }, 7500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[2.25rem] border border-[#FF4AA2]/30 bg-[radial-gradient(circle_at_top,_rgba(255,61,150,0.16),_rgba(106,10,54,0.96)_42%,_rgba(74,0,36,1)_100%)] shadow-[0_0_22px_rgba(255,45,141,0.34),0_0_80px_rgba(255,45,141,0.22)] transition-all duration-1000 ${
        showStrategic
          ? "animate-out fade-out zoom-out-95"
          : "animate-in fade-in zoom-in-95"
      }`}
    >
      {/* brilho externo */}
      <div className="pointer-events-none absolute inset-[-1px] rounded-[2.25rem] ring-1 ring-[#FF7ABA]/20" />
      <div className="pointer-events-none absolute -left-10 -right-10 -top-10 h-24 bg-[#FF4AA2]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-[65%] -translate-x-1/2 rounded-full bg-[#FF4AA2]/20 blur-3xl" />

      {isAnalyzing ? (
        <div className="relative z-10 flex min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex-col items-center justify-center px-4 sm:px-6 md:px-8 xl:px-12 py-12 sm:py-14 md:py-16 text-center">
          <div className="mb-6 sm:mb-8 rounded-full p-1.5 sm:p-2">
            <Loader2 className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 animate-spin text-[#FF2D8D]" />
          </div>

          <h3 className="mb-3 sm:mb-4 text-2xl sm:text-[28px] md:text-[30px] lg:text-[34px] font-black tracking-tight text-white">
            Processando Diagnóstico
          </h3>

          <div className="mb-8 sm:mb-10 h-6 sm:h-7 overflow-hidden">
            <p
              key={loadingTextIndex}
              className="animate-in slide-in-from-bottom-4 fade-in text-xs sm:text-sm md:text-base font-medium text-[#FFD2E5] duration-500"
            >
              {loadingTexts[loadingTextIndex]}
            </p>
          </div>

          <div className="h-1.5 w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-[#FF2D8D] shadow-[0_0_12px_rgba(255,45,141,0.85)] animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 relative z-10 duration-1000">
          <CardHeader className="space-y-3 sm:space-y-4 border-b border-white/8 px-4 sm:px-6 md:px-8 xl:px-10 pb-5 sm:pb-6 pt-8 sm:pt-10 text-center">
            <div className="mx-auto mb-1.5 sm:mb-2 flex h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 items-center justify-center rounded-full border border-[#FF4AA2]/25 bg-[#FF2D8D]/12 shadow-[0_0_30px_rgba(255,45,141,0.28)]">
              <Sparkles className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-[#FF2D8D]" />
            </div>

            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              Raio-X Estratégico Concluído
            </CardTitle>

            <CardDescription className="mx-auto max-w-xs sm:max-w-sm text-xs sm:text-sm font-medium text-[#F5C6D6]/80">
              Sua operação foi analisada com sucesso.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 md:px-8 xl:px-10 py-6 sm:py-8">
            {results ? (
              <div className="space-y-6 sm:space-y-8 text-center">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-white/8 bg-black/15 p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 hover:scale-[1.01]">
                  <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#FF4AA2] to-transparent opacity-80" />

                  <p className="mb-3 sm:mb-4 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    Nível de Maturidade Atual
                  </p>

                  <div className="mb-3 sm:mb-4 flex items-baseline justify-center gap-0.5 sm:gap-1">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                      {results.scoreNota ?? "-"}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white/30">/10</span>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-[#FF2D8D]/30 bg-[#FF2D8D]/10 px-4 sm:px-6 py-1.5 sm:py-2 shadow-[0_0_15px_rgba(255,45,141,0.1)]">
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#FF5BA8]">
                      {results.maturityTitle ?? "Sem classificação"}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 border-t border-white/6 pt-5 sm:pt-6">
                    <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed text-white/70">
                      Detectamos{" "}
                      <span className="mx-1 inline-block rounded-md bg-[#FF2D8D]/20 px-1.5 sm:px-2 py-0.5 sm:py-1 text-base sm:text-lg font-black text-white">
                        {results.potentialPercent ?? 0}%
                      </span>{" "}
                      de potencial inexplorado no seu negócio.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs font-light text-white/40">
                  Prepare-se para o direcionamento estratégico na próxima etapa.
                </p>
              </div>
            ) : (
              <p className="text-center text-xs sm:text-sm text-white/60">
                Não foi possível carregar os resultados.
              </p>
            )}
          </CardContent>
        </div>
      )}
    </div>
  );
}