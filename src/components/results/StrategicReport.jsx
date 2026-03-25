import MaturityCard from "./MaturityCard";
import GrowthGapCard from "./GrowthGapCard";
import BottleneckCard from "./BottleneckCard";
import NextStepsCard from "./NextStepsCard";

export default function StrategicReport({ 
  captureData, 
  results, 
  onContactClick, 
  onRestartClick 
}) {
  return (
    <div className="fixed inset-0 bg-[#F9F6F0] z-50 animate-in fade-in slide-in-from-bottom-4 duration-1000 overflow-y-auto">
      <div className="min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header do relatório */}
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
              e identificamos os pontos críticos para acelerar o crescimento.
            </p>
          </div>

          {results && (
            <div className="space-y-8">
              {/* Cards de métricas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <MaturityCard results={results} />
                <GrowthGapCard results={results} />
              </div>

              {/* Card do gargalo */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                <BottleneckCard results={results} />
              </div>

              {/* Card dos próximos passos */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900">
                <NextStepsCard 
                  captureData={captureData}
                  onContactClick={onContactClick}
                  onRestartClick={onRestartClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}