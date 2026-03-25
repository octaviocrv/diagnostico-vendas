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
} from "lucide-react";

export default function CaptureForm({ captureData, setCaptureData, onSubmit }) {
  const maskPhone = (value) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a máscara baseada na quantidade de dígitos
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="space-y-2 border-b border-white/5 px-8 pb-6 pt-8">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          Descubra agora seu diagnóstico estratégico
        </CardTitle>
        <CardDescription className="text-sm text-[#F5C6D6] font-light">
          Seus dados estão seguros. Usaremos apenas para entregar seu resultado.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <form onSubmit={onSubmit} className="space-y-5">
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
                  type="tel"
                  maxLength={15}
                  required
                  value={captureData.whatsapp}
                  onChange={(e) =>
                    setCaptureData((prev) => ({
                      ...prev,
                      whatsapp: maskPhone(e.target.value),
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
                    <SelectItem value="socio">Sócio / Fundador</SelectItem>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="diretor">Diretor(a)</SelectItem>
                    <SelectItem value="gerente">Gerente / Head</SelectItem>
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
            Iniciar Diagnóstico
            <ArrowRight className="h-5 w-5" />
          </button>

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
  );
}