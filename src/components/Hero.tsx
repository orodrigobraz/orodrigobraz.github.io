import profile from "@/assets/profile.jpg";
import { useLang, t } from "@/lib/i18n";
import { ArrowDownRight } from "lucide-react";


export function Hero() {
  const { lang } = useLang();
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-0 bg-paper overflow-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full flex-1 pb-16">
        {/* Meta row */}
        <div className="grid grid-cols-12 gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-10">
          <span className="col-span-6 md:col-span-3">
            {t({ pt: "Edição", en: "Edition" }, lang)} N.º 01
          </span>
          <span className="col-span-6 md:col-span-3">
            {new Date().toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
              day: "2-digit", month: "long", year: "numeric",
            })}
          </span>
          <span className="hidden md:block col-span-3">
            {t({ pt: "Disponível p/ projetos", en: "Available for work" }, lang)} ●
          </span>
          <span className="hidden md:block col-span-3 text-right">
            UNIFEI / Versigent
          </span>
        </div>

        <div className="border-t border-foreground/30" />

        {/* Big hero */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 mt-8 md:mt-12">
          {/* Title block */}
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(3rem,11vw,9rem)]">
              <span className="block">Rodrigo</span>
              <span className="block">
                Braz<span className="text-primary">.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-md font-serif italic text-2xl md:text-3xl leading-snug text-foreground/80">
              {t(
                {
                  pt: "Estudante de Sistemas de Informação desenvolvendo interfaces modernas, responsivas e integradas — com JavaScript, TypeScript e React.js.",
                  en: "Information Systems student building modern, responsive, API-integrated interfaces — with JavaScript, TypeScript and React.js.",
                },
                lang,
              )}
            </p>
          </div>

          {/* Profile + status card */}
          <div className="col-span-12 md:col-span-4 relative md:pr-24">
            <div className="relative w-full max-w-[280px] md:mx-0 mx-auto">
              <div className="absolute -inset-3 border-2 border-primary translate-x-3 translate-y-3" />
              <img
                src={profile}
                alt="Rodrigo Braz"
                className="relative w-full aspect-square object-cover grayscale-[20%]"
              />
            </div>

            <div className="mt-10 md:mx-0 mx-auto max-w-[280px] border-t-2 border-foreground/80 pt-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                {t({ pt: "Atualmente", en: "Currently" }, lang)}
              </div>
              <p className="text-sm leading-relaxed">
                {t(
                  {
                    pt: "Desenvolvendo soluções full-stack como estagiário na ",
                    en: "Building full-stack solutions as an intern at ",
                  },
                  lang,
                )}
                <a
                  href="https://www.linkedin.com/company/versigent/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary border-b border-primary"
                >
                  Versigent
                </a>
                {t(
                  { pt: " — JavaScript, PHP & SQL Server.", en: " — JavaScript, PHP & SQL Server." },
                  lang,
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Numbered CTAs */}
        <div className="grid grid-cols-12 gap-4 mt-16 md:mt-24 border-t border-foreground/30 pt-6">
          <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            ↓ {t({ pt: "Comece por", en: "Start with" }, lang)}
          </div>
          <button
            onClick={() => go("projects")}
            className="col-span-6 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition"
          >
            <div>
              <div className="font-mono text-[11px] text-primary">/ 04</div>
              <div className="font-display text-2xl font-semibold">
                {t({ pt: "Projetos", en: "Work" }, lang)}
              </div>
            </div>
            <ArrowDownRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" />
          </button>
          <button
            onClick={() => go("experience")}
            className="col-span-6 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition"
          >
            <div>
              <div className="font-mono text-[11px] text-primary">/ 02</div>
              <div className="font-display text-2xl font-semibold">
                {t({ pt: "Trajetória", en: "Journey" }, lang)}
              </div>
            </div>
            <ArrowDownRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" />
          </button>
          <button
            onClick={() => go("contact")}
            className="col-span-12 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition"
          >
            <div>
              <div className="font-mono text-[11px] text-primary">/ 05</div>
              <div className="font-display text-2xl font-semibold">
                {t({ pt: "Conversar", en: "Say hi" }, lang)}
              </div>
            </div>
            <ArrowDownRight className="w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" />
          </button>
        </div>
      </div>

    </section>
  );
}
