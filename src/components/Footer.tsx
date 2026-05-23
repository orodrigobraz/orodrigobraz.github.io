import { useLang, t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="bg-foreground text-background border-t border-background/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 grid grid-cols-12 gap-4 font-mono text-[11px] uppercase tracking-[0.25em]">
        <span className="col-span-6 md:col-span-3 text-background/60">
          © {new Date().getFullYear()} R. Braz
        </span>
        <span className="hidden md:block col-span-3 text-background/60">
          {t({ pt: "Feito com React + TS", en: "Built with React + TS" }, lang)}
        </span>
        <span className="hidden md:block col-span-3 text-background/60">
          {t({ pt: "Paraisópolis · MG · BR", en: "Paraisópolis · MG · BR" }, lang)}
        </span>
        <span className="col-span-6 md:col-span-3 text-right text-background/60">
          ↑ <a href="#home" className="hover:text-gold">{t({ pt: "Voltar ao topo", en: "Back to top" }, lang)}</a>
        </span>
      </div>
    </footer>
  );
}
