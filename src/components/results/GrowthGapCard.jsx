import { TrendingUp } from "lucide-react";

export default function GrowthGapCard({ results }) {
  return (
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
  );
}