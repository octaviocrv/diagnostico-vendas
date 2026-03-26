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
  Briefcase
} from "lucide-react";

export default function CaptureForm({ captureData, setCaptureData, onSubmit }) {
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

  return (
    <>
      <CardHeader className="space-y-3 border-b border-white/5 px-8 pb-8 pt-10 text-center sm:text-left">
          <CardTitle className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Inicie seu diagnóstico estratégico
          </CardTitle>
          <CardDescription className="text-[15px] leading-relaxed text-white/50 font-normal max-w-lg">
            Descubra os gargalos que limitam sua operação. 
            <span className="text-[#F5C6D6]/80 block mt-1">Seus dados estão seguros e serão usados apenas para o resultado.</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 py-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-5">
              
              {/* Nome */}
              <div className="space-y-2">
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
                    className="h-13 pl-11 rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email e WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1">
                    E-mail Corporativo
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={captureData.email}
                      onChange={(e) => setCaptureData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="h-13 pl-11 rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1">
                    WhatsApp
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors" />
                    <Input
                      id="whatsapp"
                      type="tel"
                      maxLength={15}
                      required
                      value={captureData.whatsapp}
                      onChange={(e) => setCaptureData((prev) => ({ ...prev, whatsapp: maskPhone(e.target.value) }))}
                      placeholder="(00) 00000-0000"
                      className="h-13 pl-11 rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Empresa e Cargo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
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
                      className="h-13 pl-11 rounded-xl border-white/5 bg-white/[0.03] text-white/90 placeholder:text-white/20 focus:bg-white/[0.05] focus:border-[#FF2D8D]/50 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300 relative"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-semibold ml-1">
                    Cargo
                  </Label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-[#FF2D8D] transition-colors z-10 pointer-events-none" />
                    <Select
                      required
                      value={captureData.cargo}
                      onValueChange={(value) => setCaptureData((prev) => ({ ...prev, cargo: value }))}
                    >
                      <SelectTrigger className="h-13 pl-11 rounded-xl border-white/5 bg-white/[0.03] text-white/90 focus:ring-1 focus:ring-[#FF2D8D]/50 transition-all duration-300">
                        <SelectValue placeholder="Selecione seu cargo" className="text-white/20" />
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
              </div>
            </div>

            {/* Botão Moderno com Glow */}
            <button
              type="submit"
              className="group relative mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-[#FF2D8D] to-[#D6156B] px-6 text-[15px] font-medium tracking-wide text-white shadow-[0_0_40px_-10px_rgba(255,45,141,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(255,45,141,0.7)] active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span>Quero meu diagnóstico</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Rodapé Features Suavizado */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <CheckCircle2 className="h-4 w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[11px] text-white/40 font-medium tracking-wide">Certificado</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <Clock3 className="h-4 w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[11px] text-white/40 font-medium tracking-wide">Imediato</span>
              </div>

              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-300">
                  <CircleCheck className="h-4 w-4 text-[#F5C6D6]/70 group-hover:text-[#F5C6D6] transition-colors" />
                </div>
                <span className="text-[11px] text-white/40 font-medium tracking-wide">Gratuito</span>
              </div>
            </div>
          </form>
        </CardContent>
    </>
  );
}