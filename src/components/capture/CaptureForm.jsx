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
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  DollarSign
} from "lucide-react";

export default function CaptureForm({ captureData, setCaptureData, onSubmit, isSubmitting = false }) {
  const maskPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 11);
    
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // Immediate response handler for better UX
  const handleButtonClick = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    // Let the form handle the actual submission
  };

  return (
    <>
      <CardHeader className="space-y-3 border-b border-white/5 px-4 sm:px-6 md:px-8 pb-6 md:pb-8 pt-8 md:pt-10 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Inicie seu diagnóstico estratégico
          </CardTitle>
          <CardDescription className="text-sm sm:text-[15px] leading-relaxed text-white/50 font-normal max-w-lg">
            Descubra os gargalos que limitam sua operação. 
            <span className="text-[#F5C6D6]/80 block mt-1">Seus dados estão seguros e serão usados apenas para o resultado.</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <form onSubmit={onSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-4 md:space-y-5">
              
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="nome" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1">
                  Nome Completo
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors" />
                  <Input
                    id="nome"
                    required
                    value={captureData.nome}
                    onChange={(e) => setCaptureData((prev) => ({ ...prev, nome: e.target.value }))}
                    placeholder="Como devemos te chamar?"
                    className="h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Cargo e Faturamento - Ajustado com flex e justify-end para alinhar perfeitamente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col justify-end gap-2 h-full w-full overflow-hidden">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1 truncate">
                    Cargo
                  </Label>
                  <div className="relative group mt-auto w-full">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors z-10 pointer-events-none" />
                    <Select
                      required
                      value={captureData.cargo}
                      onValueChange={(value) => setCaptureData((prev) => ({ ...prev, cargo: value }))}
                    >
                      {/* ADICIONADO w-full AQUI */}
                      <SelectTrigger className="w-full h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300">
                        <SelectValue placeholder="Selecione seu cargo" className="text-white/20 truncate" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-zinc-900/95 backdrop-blur-xl text-white/90 shadow-2xl rounded-xl">
                        <SelectItem value="socio" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Sócio / Fundador</SelectItem>
                        <SelectItem value="ceo" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">CEO</SelectItem>
                        <SelectItem value="diretor" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Diretor(a)</SelectItem>
                        <SelectItem value="gerente" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Gerente / Head</SelectItem>
                        <SelectItem value="outro" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2 h-full w-full overflow-hidden">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1 truncate">
                    Faturamento Mensal
                  </Label>
                  <div className="relative group mt-auto w-full">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors z-10 pointer-events-none" />
                    <Select
                      required
                      value={captureData.faturamento}
                      onValueChange={(value) => setCaptureData((prev) => ({ ...prev, faturamento: value }))}
                    >
                      {/* ADICIONADO w-full AQUI */}
                      <SelectTrigger className="w-full h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300">
                        <SelectValue placeholder="Selecione o faturamento" className="text-white/20 truncate" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-zinc-900/95 backdrop-blur-xl text-white/90 shadow-2xl rounded-xl">
                        <SelectItem value="ate-10k" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Até R$10 mil</SelectItem>
                        <SelectItem value="10k-30k" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">De R$10 mil a R$30 mil</SelectItem>
                        <SelectItem value="30k-100k" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">De R$30 mil a R$100 mil</SelectItem>
                        <SelectItem value="100k-500k" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">De R$100 mil a R$500 mil</SelectItem>
                        <SelectItem value="acima-500k" className="focus:bg-[#FF2D8D]/20 focus:text-white cursor-pointer rounded-lg m-1">Acima de R$500 mil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Email e WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col justify-end gap-2 h-full">
                  <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1 truncate">
                    E-mail Corporativo
                  </Label>
                  <div className="relative group mt-auto">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={captureData.email}
                      onChange={(e) => setCaptureData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end gap-2 h-full">
                  <Label htmlFor="whatsapp" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1 truncate">
                    WhatsApp
                  </Label>
                  <div className="relative group mt-auto">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors" />
                    <Input
                      id="whatsapp"
                      type="tel"
                      maxLength={15}
                      required
                      value={captureData.whatsapp}
                      onChange={(e) => setCaptureData((prev) => ({ ...prev, whatsapp: maskPhone(e.target.value) }))}
                      placeholder="(00) 00000-0000"
                      className="h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Empresa */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="empresa" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1">
                  Empresa
                </Label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors z-10" />
                  <Input
                    id="empresa"
                    required
                    value={captureData.empresa}
                    onChange={(e) => setCaptureData((prev) => ({ ...prev, empresa: e.target.value }))}
                    placeholder="Nome da empresa"
                    className="h-12 sm:h-13 pl-10 sm:pl-11 text-sm sm:text-base rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300 relative"
                  />
                </div>
              </div>
            </div>

            {/* Botão Moderno com Glow */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleButtonClick}
              className={`group relative mt-8 md:mt-10 flex h-12 sm:h-14 w-full items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-b from-[#FF2D8D] to-[#D6156B] px-4 sm:px-6 text-sm sm:text-[15px] font-medium tracking-wide text-white shadow-[0_0_40px_-10px_rgba(255,45,141,0.5)] transition-all duration-200 overflow-hidden ${
                isSubmitting 
                  ? 'cursor-not-allowed opacity-75 scale-95' 
                  : 'hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(255,45,141,0.7)] active:scale-[0.98]'
              }`}
            >
              <div className={`absolute inset-0 transition-opacity duration-200 ${
                isSubmitting 
                  ? 'bg-black/10 opacity-100' 
                  : 'bg-white/20 opacity-0 group-hover:opacity-100'
              }`} />
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Iniciando diagnóstico...</span>
                </>
              ) : (
                <>
                  <span>Quero meu diagnóstico</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Rodapé Features Suavizado */}
            <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/5 grid grid-cols-3 gap-1 sm:gap-2">
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <CheckCircle2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-medium tracking-wide">Certificado</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <Clock3 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-medium tracking-wide">Imediato</span>
              </div>

              <div className="flex flex-col items-center gap-1.5 sm:gap-2 group cursor-default">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <CircleCheck className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-medium tracking-wide">Gratuito</span>
              </div>
            </div>
          </form>
        </CardContent>
    </>
  );
}