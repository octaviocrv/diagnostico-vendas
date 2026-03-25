import { Target } from "lucide-react";

export default function MaturityCard({ results }) {
  return (
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
  );
}