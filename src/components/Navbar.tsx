import { useEffect, useState } from "react";
import { useLang, t } from "@/lib/i18n";
import { Languages } from "lucide-react";

const links = [
  { id: "about", n: "01", label: { pt: "Sobre", en: "About" } },
  { id: "experience", n: "02", label: { pt: "Trajetória", en: "Journey" } },
  { id: "skills", n: "03", label: { pt: "Stack", en: "Stack" } },
  { id: "projects", n: "04", label: { pt: "Projetos", en: "Work" } },
  { id: "contact", n: "05", label: { pt: "Contato", en: "Contact" } },
];

export function Navbar() {
  const { lang, toggle } = useLang();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ["home", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-background/70 border-b border-foreground/10 shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <button
            onClick={() => go("home")}
            className="font-mono text-[12px] font-bold lowercase tracking-[0.3em] text-foreground"
          >
            rodrigo<span className="text-primary">.</span>braz
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {t({ pt: "Paraisópolis · MG", en: "Paraisópolis · BR" }, lang)}
            </span>
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-2.5 py-1 border border-foreground/40 hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-wider transition"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === "pt" ? "EN" : "PT"}
            </button>
            <button
              className="md:hidden font-mono text-[11px] uppercase tracking-wider border border-foreground/40 px-2.5 py-1"
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Side rail (desktop) */}
      <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-end">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className={`group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] transition ${
              active === l.id ? "text-primary" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition">
              {t(l.label, lang)}
            </span>
            <span>{l.n}</span>
            <span
              className={`h-px transition-all ${
                active === l.id ? "w-10 bg-primary" : "w-5 bg-foreground/40"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-background border-t border-foreground/10 px-6 py-8 flex flex-col gap-5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-left font-display text-3xl font-bold flex items-baseline gap-3"
            >
              <span className="font-mono text-xs text-primary">{l.n}</span>
              {t(l.label, lang)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
