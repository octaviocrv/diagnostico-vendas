import {
  CheckCircle2,
  Target,
  AlertCircle,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

export default function NextStepsCard({ captureData, onContactClick, onRestartClick }) {
  const handleContactClick = () => {
    // Abre WhatsApp com João Rodrigues
    const phoneNumber = "5582996164369"; // +55 82 9616-4369
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
    
    // Mantém callback original se existir
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#5A002B]/5 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#5A002B] mb-4">
          Próximos Passos Estratégicos
        </h3>
        <p className="text-[#5A002B]/70 max-w-xl mx-auto leading-relaxed">
          Com base no diagnóstico, definimos um plano de ação personalizado para destravar o crescimento da{" "}
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
          onClick={handleContactClick}
          className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl bg-[#FF2D8D] px-8 text-white transition-all hover:bg-[#e61e7a] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#FF2D8D]/20 font-black text-lg"
        >
          <MessageCircle className="h-6 w-6" />
          Quero Destravar meu Crescimento
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onRestartClick}
            className="text-sm text-[#5A002B]/50 hover:text-[#5A002B] transition-colors font-medium"
          >
            ← Fazer novo diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}