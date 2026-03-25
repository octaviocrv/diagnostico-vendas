import { AlertCircle } from "lucide-react";

export default function BottleneckCard({ results }) {
  return (
    <div className="bg-[#5A002B] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
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
  );
}