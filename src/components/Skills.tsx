import { useLang, t, type T } from "@/lib/i18n";
import { SectionLabel } from "./About";

type Skill = { name: string | T; level: number };
type Cat = { title: T; items: Skill[] };

const cats: Cat[] = [
  {
    title: { pt: "Desenvolvimento", en: "Development" },
    items: [
      { name: "JavaScript", level: 67 },
      { name: "Python", level: 70 },
      { name: "HTML/CSS", level: 70 },
      { name: "React.js", level: 55 },
      { name: "Node.js", level: 45 },
      { name: "PHP", level: 20 },
    ],
  },
  {
    title: { pt: "Dados & Ferramentas", en: "Data & Tools" },
    items: [
      { name: "PostgreSQL", level: 67 },
      { name: "SQL Server", level: 40 },
      { name: "Git / GitHub", level: 70 },
      { name: "Postman", level: 30 },
      { name: "SCRUM", level: 65 },
      { name: "Jira", level: 50 },
    ],
  },
];

const softSkills: T[] = [
  { pt: "Criatividade", en: "Creativity" },
  { pt: "Pensamento analítico", en: "Analytical thinking" },
  { pt: "Resiliência", en: "Resilience" },
  { pt: "Adaptabilidade", en: "Adaptability" },
  { pt: "Comunicação", en: "Communication" },
  { pt: "Gestão de tempo", en: "Time management" },
];

const langs: { name: T; level: string }[] = [
  { name: { pt: "Português", en: "Portuguese" }, level: "Nativo" },
  { name: { pt: "Inglês", en: "English" }, level: "B2" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "A2" },
];

const levelLabel = (lvl: number, lang: "pt" | "en") => {
  if (lvl >= 85) return lang === "pt" ? "Avançado" : "Advanced";
  if (lvl >= 60) return lang === "pt" ? "Sólido" : "Solid";
  if (lvl >= 35) return lang === "pt" ? "Intermediário" : "Intermediate";
  return lang === "pt" ? "Básico" : "Basic";
};

type Variant = "filled" | "outline" | "ghost" | "muted";
const levelVariant = (lvl: number): Variant => {
  if (lvl >= 85) return "filled";
  if (lvl >= 60) return "outline";
  if (lvl >= 35) return "ghost";
  return "muted";
};

function LevelTag({ lvl, lang }: { lvl: number; lang: "pt" | "en" }) {
  const v = levelVariant(lvl);
  const label = levelLabel(lvl, lang);
  if (v === "filled")
    return (
      <span className="px-2 py-0.5 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    );
  if (v === "outline")
    return (
      <span className="px-2 py-0.5 border border-foreground font-mono text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    );
  if (v === "ghost")
    return (
      <span className="font-mono text-[10px] italic uppercase tracking-widest text-foreground/60">
        {label}
      </span>
    );
  return (
    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
      {label}
    </span>
  );
}

const rowOpacity = (lvl: number) =>
  lvl >= 60 ? "" : lvl >= 35 ? "opacity-80" : "opacity-60";

export function Skills() {
  const { lang } = useLang();
  return (
    <section id="skills" className="py-14 md:py-20 bg-secondary/40 bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel
          n="03"
          kicker={{ pt: "Stack", en: "Stack" }}
          title={{ pt: "O que carrego na mochila.", en: "What's in my toolkit." }}
        />

        <div className="border-t border-b border-foreground/20 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-16 gap-x-10 md:gap-x-12">
            {cats.map((c) => (
              <div key={t(c.title, lang)} className="space-y-6 md:space-y-8">
                <div className="border-b border-foreground pb-2 flex justify-between items-end gap-3">
                  <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tighter">
                    {t(c.title, lang)}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60 whitespace-nowrap">
                    [ {String(c.items.length).padStart(2, "0")}{" "}
                    {t({ pt: "itens", en: "items" }, lang)} ]
                  </span>
                </div>
                <ul className="divide-y divide-foreground/10">
                  {c.items.map((s, i) => {
                    const name =
                      typeof s.name === "string" ? s.name : t(s.name, lang);
                    return (
                      <li
                        key={i}
                        className={`py-3 flex justify-between items-center gap-3 ${rowOpacity(
                          s.level
                        )}`}
                      >
                        <span className="text-sm md:text-base font-mono">
                          {name}
                        </span>
                        <LevelTag lvl={s.level} lang={lang} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Third column: Languages + Soft skills */}
            <div className="space-y-10 md:space-y-12 md:pl-8 md:border-l border-foreground/10">
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/60">
                  {t({ pt: "Idiomas", en: "Languages" }, lang)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {langs.map((l) => (
                    <span
                      key={l.level}
                      className="font-mono text-sm border border-foreground px-3 py-1"
                    >
                      {t(l.name, lang)}{" "}
                      <span className="text-foreground/40 ml-1">/ {l.level}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground/60">
                  {t({ pt: "Soft Skills", en: "Soft Skills" }, lang)}
                </h3>
                <p className="font-display italic text-lg md:text-xl leading-relaxed text-foreground/90 max-w-sm">
                  {softSkills.map((s) => t(s, lang)).join(", ")}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            {t(
              {
                pt: "Índice técnico — atualizado 2025",
                en: "Technical index — updated 2025",
              },
              lang
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
