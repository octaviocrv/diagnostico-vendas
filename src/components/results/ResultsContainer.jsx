import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ResultsContainer({ results, showStrategic }) {
  return (
    <div
      className={`transition-all duration-1000 ${
        showStrategic 
          ? "animate-out fade-out zoom-out-95" 
          : "animate-in fade-in zoom-in-95"
      } duration-700`}
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
  );
}