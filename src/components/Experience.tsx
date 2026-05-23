import { useState } from "react";
import { useLang, t, type T } from "@/lib/i18n";
import { SectionLabel } from "./About";
import { Plus, Minus } from "lucide-react";

type Exp = {
  year: string;
  date: T;
  role: T;
  company: string;
  desc: T;
  bullets?: T[];
};

const recent: Exp[] = [
  {
    year: "2025",
    date: { pt: "Jun/2025 — Hoje", en: "Jun/2025 — Now" },
    role: { pt: "Desenvolvedor de Software", en: "Software Developer" },
    company: "Versigent",
    desc: {
      pt: "Desenvolvimento de interfaces e funcionalidades para ERP interno, com JavaScript, Bootstrap, PHP e T-SQL/SQL Server. Foco em usabilidade, manutenção e otimização de processos.",
      en: "Building interfaces and features for an internal ERP with JavaScript, Bootstrap, PHP and T-SQL/SQL Server. Focused on usability, maintenance and process optimization.",
    },
  },
  {
    year: "2021",
    date: { pt: "Jul/2021 — Mai/2022", en: "Jul/2021 — May/2022" },
    role: { pt: "Analista de Produtos", en: "Product Analyst" },
    company: "MOVA — Credit as a Service",
    desc: { pt: "Atuação em diversas frentes de produto:", en: "Multiple product fronts:" },
    bullets: [
      { pt: "Criação de UMLs para o time de dev", en: "UMLs for the dev team" },
      { pt: "Novos produtos e funcionalidades", en: "New products and features" },
      { pt: "Análise de pain points", en: "Pain point analysis" },
      { pt: "Testes de APIs no Postman", en: "API testing in Postman" },
      { pt: "Cards no Jira e docs no Confluence", en: "Jira cards and Confluence docs" },
    ],
  },
];

const old: Exp[] = [
  {
    year: "2014",
    date: { pt: "2014 — 2017", en: "2014 — 2017" },
    role: { pt: "Auxiliar de Produção, TI e Logística", en: "Production, IT & Logistics Assistant" },
    company: "Proeletronic",
    desc: {
      pt: "Atuação em ambiente industrial com suporte às áreas de produção, logística e TI.",
      en: "Industrial environment supporting production, logistics and IT.",
    },
    bullets: [
      { pt: "Montagem e embalagem de antenas HDTV", en: "Assembly and packaging of HDTV antennas" },
      { pt: "Separação, conferência de pedidos e controle de estoque", en: "Order picking, checking and stock control" },
      { pt: "Recebimento de materiais e conferência de notas fiscais", en: "Material receiving and invoice checking" },
      { pt: "Suporte técnico interno e controle de ativos de TI", en: "Internal IT support and asset control" },
    ],
  },
  {
    year: "2009",
    date: { pt: "2009 — 2013", en: "2009 — 2013" },
    role: { pt: "Operador de Produção", en: "Production Operator" },
    company: "Delphi Automotive Systems",
    desc: {
      pt: "Montagem de chicotes elétricos e cabos de bateria para a linha Mercedes-Benz, seguindo padrões de qualidade e produtividade industrial.",
      en: "Assembly of electrical harnesses and battery cables for the Mercedes-Benz line, following industrial quality and productivity standards.",
    },
  },
];

function Item({ e }: { e: Exp }) {
  const { lang } = useLang();
  return (
    <article className="grid grid-cols-12 gap-4 md:gap-8 py-8 border-t border-foreground/20 group hover:bg-secondary/40 -mx-4 md:-mx-6 px-4 md:px-6 transition">
      <div className="col-span-3 md:col-span-2">
        <div className="font-display text-4xl md:text-6xl font-bold text-primary leading-none">
          {e.year}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
          {t(e.date, lang)}
        </div>
      </div>
      <div className="col-span-9 md:col-span-7">
        <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
          {t(e.role, lang)}
        </h3>
        <p className="font-serif italic text-lg text-muted-foreground mt-1">{e.company}</p>
        <p className="text-sm md:text-base leading-relaxed text-foreground/80 mt-3 max-w-xl">
          {t(e.desc, lang)}
        </p>
        {e.bullets && (
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {e.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">·</span>
                {t(b, lang)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="hidden md:block col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {e.company}
      </div>
    </article>
  );
}

export function Experience() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  return (
    <section id="experience" className="py-14 md:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel
          n="02"
          kicker={{ pt: "Trajetória", en: "Journey" }}
          title={{ pt: "Onde estive.", en: "Where I've been." }}
        />

        <div>
          {recent.map((e, i) => <Item key={i} e={e} />)}
          {show && old.map((e, i) => <Item key={`o-${i}`} e={e} />)}
          <div className="border-t border-foreground/20" />
        </div>

        <button
          onClick={() => setShow(!show)}
          className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition"
        >
          {show ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {show
            ? t({ pt: "Esconder histórico antigo", en: "Hide older roles" }, lang)
            : t({ pt: "Mostrar histórico antigo", en: "Show older roles" }, lang)}
        </button>
      </div>
    </section>
  );
}
