export default function Header() {
  return (
    <header className="border-b border-[#5A002B]/10 bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl tracking-widest text-[#5A002B] font-black">
            SENSE HOUSE
          </h2>
          <span className="h-5 w-px bg-[#5A002B]/20" />
          <span className="text-sm md:text-base text-[#FF2D8D] font-bold">
            Raio-X Comercial
          </span>
        </div>
        <div className="text-sm text-[#5A002B]/60 hidden sm:block font-light">
          Transformando vendas em conexões
        </div>
      </div>
    </header>
  );
}