export default function Footer() {
  return (
    <footer className="border-t border-[#5A002B]/5 bg-transparent py-6">
      <div className="mx-auto max-w-[1400px] px-6 flex flex-col items-center justify-between gap-4 text-xs text-[#5A002B]/60 sm:flex-row font-medium">
        <p>SENSE HOUSE © 2026. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#FF2D8D] transition-colors">
            Termos
          </a>
          <a href="#" className="hover:text-[#FF2D8D] transition-colors">
            Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}