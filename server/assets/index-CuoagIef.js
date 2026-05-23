import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { Languages, ArrowDownRight, Minus, Plus, ArrowUpRight, Check, Copy } from "lucide-react";
const LangContext = createContext({ lang: "pt", toggle: () => {
} });
const useLang = () => useContext(LangContext);
const t = (val, lang) => val[lang];
const links = [
  { id: "about", n: "01", label: { pt: "Sobre", en: "About" } },
  { id: "experience", n: "02", label: { pt: "Trajetória", en: "Journey" } },
  { id: "skills", n: "03", label: { pt: "Stack", en: "Stack" } },
  { id: "projects", n: "04", label: { pt: "Projetos", en: "Work" } },
  { id: "contact", n: "05", label: { pt: "Contato", en: "Contact" } }
];
function Navbar() {
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
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["home", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-background/70 border-b border-foreground/10 shadow-soft" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 md:px-10 py-5", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => go("home"),
              className: "font-mono text-[12px] font-bold lowercase tracking-[0.3em] text-foreground",
              children: [
                "rodrigo",
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "." }),
                "braz"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: t({ pt: "Paraisópolis · MG", en: "Paraisópolis · BR" }, lang) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: toggle,
                className: "flex items-center gap-1.5 px-2.5 py-1 border border-foreground/40 hover:border-primary hover:text-primary font-mono text-[11px] uppercase tracking-wider transition",
                children: [
                  /* @__PURE__ */ jsx(Languages, { className: "w-3.5 h-3.5" }),
                  lang === "pt" ? "EN" : "PT"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "md:hidden font-mono text-[11px] uppercase tracking-wider border border-foreground/40 px-2.5 py-1",
                onClick: () => setOpen(!open),
                children: open ? "Close" : "Menu"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("nav", { className: "hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 items-end", children: links.map((l) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => go(l.id),
        className: `group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] transition ${active === l.id ? "text-primary" : "text-foreground/50 hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "opacity-0 group-hover:opacity-100 transition", children: t(l.label, lang) }),
          /* @__PURE__ */ jsx("span", { children: l.n }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `h-px transition-all ${active === l.id ? "w-10 bg-primary" : "w-5 bg-foreground/40"}`
            }
          )
        ]
      },
      l.id
    )) }),
    open && /* @__PURE__ */ jsx("div", { className: "md:hidden fixed inset-0 top-[60px] z-40 bg-background border-t border-foreground/10 px-6 py-8 flex flex-col gap-5", children: links.map((l) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => go(l.id),
        className: "text-left font-display text-3xl font-bold flex items-baseline gap-3",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-primary", children: l.n }),
          t(l.label, lang)
        ]
      },
      l.id
    )) })
  ] });
}
const profile = "/assets/profile-It2jZ_wm.jpg";
function Hero() {
  const { lang } = useLang();
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return /* @__PURE__ */ jsx("section", { id: "home", className: "relative min-h-screen pt-28 pb-0 bg-paper overflow-hidden flex flex-col", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10 w-full flex-1 pb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-10", children: [
      /* @__PURE__ */ jsxs("span", { className: "col-span-6 md:col-span-3", children: [
        t({ pt: "Edição", en: "Issue" }, lang),
        " N.º 01"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "col-span-6 md:col-span-3", children: (/* @__PURE__ */ new Date()).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }) }),
      /* @__PURE__ */ jsxs("span", { className: "hidden md:block col-span-3", children: [
        t({ pt: "Disponível p/ projetos", en: "Available for work" }, lang),
        " ●"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "hidden md:block col-span-3 text-right", children: "UNIFEI / Versigent" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-foreground/30" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 md:gap-8 mt-8 md:mt-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-8", children: [
        /* @__PURE__ */ jsxs("h1", { className: "font-display font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(3rem,11vw,9rem)]", children: [
          /* @__PURE__ */ jsx("span", { className: "block", children: "Rodrigo" }),
          /* @__PURE__ */ jsxs("span", { className: "block", children: [
            "Braz",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md font-serif italic text-2xl md:text-3xl leading-snug text-foreground/80", children: t(
          {
            pt: "Estudante de Sistemas de Informação desenvolvendo interfaces modernas, responsivas e integradas a APIs — com JavaScript, TypeScript e React.",
            en: "Information Systems student building modern, responsive, API-integrated interfaces — with JavaScript, TypeScript and React."
          },
          lang
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-4 relative md:pr-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-[280px] md:mx-0 mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-3 border-2 border-primary translate-x-3 translate-y-3" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: profile,
              alt: "Rodrigo Braz",
              className: "relative w-full aspect-square object-cover grayscale-[20%]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 md:mx-0 mx-auto max-w-[280px] border-t-2 border-foreground/80 pt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2", children: t({ pt: "Atualmente", en: "Currently" }, lang) }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed", children: [
            t(
              {
                pt: "Desenvolvendo soluções full-stack como estagiário na ",
                en: "Building full-stack solutions as an intern at "
              },
              lang
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/company/versigent/",
                target: "_blank",
                rel: "noreferrer",
                className: "font-semibold text-primary border-b border-primary",
                children: "Versigent"
              }
            ),
            t(
              { pt: " — JavaScript, PHP & SQL Server.", en: " — JavaScript, PHP & SQL Server." },
              lang
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 mt-16 md:mt-24 border-t border-foreground/30 pt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground", children: [
        "↓ ",
        t({ pt: "Comece por", en: "Start with" }, lang)
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => go("projects"),
          className: "col-span-6 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] text-primary", children: "/ 04" }),
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-semibold", children: t({ pt: "Projetos", en: "Work" }, lang) })
            ] }),
            /* @__PURE__ */ jsx(ArrowDownRight, { className: "w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => go("experience"),
          className: "col-span-6 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] text-primary", children: "/ 02" }),
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-semibold", children: t({ pt: "Trajetória", en: "Journey" }, lang) })
            ] }),
            /* @__PURE__ */ jsx(ArrowDownRight, { className: "w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => go("contact"),
          className: "col-span-12 md:col-span-3 group text-left flex items-start justify-between border-l border-foreground/20 pl-4 hover:border-primary transition",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] text-primary", children: "/ 05" }),
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-semibold", children: t({ pt: "Conversar", en: "Say hi" }, lang) })
            ] }),
            /* @__PURE__ */ jsx(ArrowDownRight, { className: "w-5 h-5 text-foreground/40 group-hover:text-primary group-hover:rotate-[-45deg] transition" })
          ]
        }
      )
    ] })
  ] }) });
}
function SectionLabel({
  n,
  title,
  kicker
}) {
  const { lang } = useLang();
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 mb-12 items-end border-t border-foreground/30 pt-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary", children: [
      "/ ",
      n,
      " ",
      kicker && /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
        "— ",
        t(kicker, lang)
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "col-span-12 md:col-span-9 font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight", children: t(title, lang) })
  ] });
}
function About() {
  const { lang } = useLang();
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-14 md:py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: [
    /* @__PURE__ */ jsx(
      SectionLabel,
      {
        n: "01",
        kicker: { pt: "Sobre", en: "About" },
        title: {
          pt: "Curioso por natureza, técnico por escolha.",
          en: "Curious by nature, technical by choice."
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-6 md:gap-10", children: [
      /* @__PURE__ */ jsxs("aside", { className: "col-span-12 md:col-span-4 md:sticky md:top-24 md:self-start", children: [
        /* @__PURE__ */ jsx("div", { className: "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4", children: t({ pt: "Resumo", en: "Summary" }, lang) }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 font-mono text-sm", children: [
          /* @__PURE__ */ jsx(Row, { k: t({ pt: "Formação", en: "Studying" }, lang), v: "UNIFEI · 2027" }),
          /* @__PURE__ */ jsx(Row, { k: t({ pt: "Trabalho", en: "Working" }, lang), v: "Versigent" }),
          /* @__PURE__ */ jsx(Row, { k: t({ pt: "Foco", en: "Focus" }, lang), v: "Full-stack" }),
          /* @__PURE__ */ jsx(Row, { k: t({ pt: "Local", en: "Based in" }, lang), v: "Paraisópolis, MG" }),
          /* @__PURE__ */ jsx(Row, { k: t({ pt: "Línguas", en: "Languages" }, lang), v: "PT · EN · ES" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-serif text-3xl md:text-4xl leading-[1.15] text-balance", children: [
          t(
            {
              pt: "Estudo ",
              en: "I study "
            },
            lang
          ),
          /* @__PURE__ */ jsx("em", { className: "text-primary", children: t({ pt: "Sistemas de Informação", en: "Information Systems" }, lang) }),
          t(
            {
              pt: " na UNIFEI e construo software para resolver problemas reais — do ERP corporativo ao app que documenta minhas viagens.",
              en: " at UNIFEI and build software to solve real problems — from corporate ERP to an app that documents my travels."
            },
            lang
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-muted-foreground max-w-2xl", children: t(
          {
            pt: "Atuei com desenvolvimento usando UML, Postman, Jira e Confluence, e colaborei na criação de novos produtos. Antes da TI, passei por produção, logística e suporte — experiências que me deram olhar analítico, adaptabilidade e responsabilidade.",
            en: "I've worked with development using UML, Postman, Jira and Confluence, and collaborated on building new products. Before tech, I worked in production, logistics and IT support — experiences that gave me an analytical perspective, adaptability and a sense of responsibility."
          },
          lang
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-muted-foreground max-w-2xl", children: t(
          {
            pt: "Participei ativamente de projetos extracurriculares como Enactus e Cheetah E-Racing, onde aprendi sobre comunicação, trabalho em equipe e gerar impacto.",
            en: "I actively took part in extracurricular projects like Enactus and Cheetah E-Racing, where I learned about communication, teamwork and creating impact."
          },
          lang
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-6 pt-8 border-t border-foreground/20", children: [
          /* @__PURE__ */ jsx(Stat, { n: "2027", l: { pt: "Formatura", en: "Graduation" } }),
          /* @__PURE__ */ jsx(Stat, { n: "2+", l: { pt: "Empresas", en: "Companies" } }),
          /* @__PURE__ */ jsx(Stat, { n: "∞", l: { pt: "Curiosidade", en: "Curiosity" } })
        ] })
      ] })
    ] })
  ] }) });
}
function Row({ k, v }) {
  return /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-b border-foreground/15 pb-2", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground uppercase text-[10px] tracking-widest", children: k }),
    /* @__PURE__ */ jsx("span", { className: "text-foreground", children: v })
  ] });
}
function Stat({ n, l }) {
  const { lang } = useLang();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "font-display text-4xl md:text-5xl font-bold text-primary leading-none", children: n }),
    /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2", children: t(l, lang) })
  ] });
}
const recent = [
  {
    year: "2025",
    date: { pt: "Jun/2025 — Hoje", en: "Jun/2025 — Now" },
    role: { pt: "Desenvolvedor de Software", en: "Software Developer" },
    company: "Versigent",
    desc: {
      pt: "Desenvolvimento de interfaces e funcionalidades para ERP interno, com JavaScript, Bootstrap, PHP e T-SQL/SQL Server. Foco em usabilidade, manutenção e otimização de processos.",
      en: "Building interfaces and features for an internal ERP with JavaScript, Bootstrap, PHP and T-SQL/SQL Server. Focused on usability, maintenance and process optimization."
    }
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
      { pt: "Cards no Jira e docs no Confluence", en: "Jira cards and Confluence docs" }
    ]
  }
];
const old = [
  {
    year: "2014",
    date: { pt: "2014 — 2017", en: "2014 — 2017" },
    role: { pt: "Auxiliar de Produção, TI e Logística", en: "Production, IT & Logistics Assistant" },
    company: "Proeletronic",
    desc: {
      pt: "Atuação em ambiente industrial com suporte às áreas de produção, logística e TI.",
      en: "Industrial environment supporting production, logistics and IT."
    },
    bullets: [
      { pt: "Montagem e embalagem de antenas HDTV", en: "Assembly and packaging of HDTV antennas" },
      { pt: "Separação, conferência de pedidos e controle de estoque", en: "Order picking, checking and stock control" },
      { pt: "Recebimento de materiais e conferência de notas fiscais", en: "Material receiving and invoice checking" },
      { pt: "Suporte técnico interno e controle de ativos de TI", en: "Internal IT support and asset control" }
    ]
  },
  {
    year: "2009",
    date: { pt: "2009 — 2013", en: "2009 — 2013" },
    role: { pt: "Operador de Produção", en: "Production Operator" },
    company: "Delphi Automotive Systems",
    desc: {
      pt: "Montagem de chicotes elétricos e cabos de bateria para a linha Mercedes-Benz, seguindo padrões de qualidade e produtividade industrial.",
      en: "Assembly of electrical harnesses and battery cables for the Mercedes-Benz line, following industrial quality and productivity standards."
    }
  }
];
function Item({ e }) {
  const { lang } = useLang();
  return /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-12 gap-4 md:gap-8 py-8 border-t border-foreground/20 group hover:bg-secondary/40 -mx-4 md:-mx-6 px-4 md:px-6 transition", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-3 md:col-span-2", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display text-4xl md:text-6xl font-bold text-primary leading-none", children: e.year }),
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2", children: t(e.date, lang) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-9 md:col-span-7", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-semibold leading-tight", children: t(e.role, lang) }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-lg text-muted-foreground mt-1", children: e.company }),
      /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base leading-relaxed text-foreground/80 mt-3 max-w-xl", children: t(e.desc, lang) }),
      e.bullets && /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1 text-sm text-muted-foreground", children: e.bullets.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "·" }),
        t(b, lang)
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block col-span-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: e.company })
  ] });
}
function Experience() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  return /* @__PURE__ */ jsx("section", { id: "experience", className: "py-14 md:py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: [
    /* @__PURE__ */ jsx(
      SectionLabel,
      {
        n: "02",
        kicker: { pt: "Trajetória", en: "Journey" },
        title: { pt: "Onde estive.", en: "Where I've been." }
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      recent.map((e, i) => /* @__PURE__ */ jsx(Item, { e }, i)),
      show && old.map((e, i) => /* @__PURE__ */ jsx(Item, { e }, `o-${i}`)),
      /* @__PURE__ */ jsx("div", { className: "border-t border-foreground/20" })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setShow(!show),
        className: "mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition",
        children: [
          show ? /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
          show ? t({ pt: "Esconder histórico antigo", en: "Hide older roles" }, lang) : t({ pt: "Mostrar histórico antigo", en: "Show older roles" }, lang)
        ]
      }
    )
  ] }) });
}
const cats = [
  {
    title: { pt: "Desenvolvimento", en: "Development" },
    items: [
      { name: "JavaScript", level: 67 },
      { name: "Python", level: 70 },
      { name: "HTML/CSS", level: 70 },
      { name: "React.js", level: 55 },
      { name: "Node.js", level: 45 },
      { name: "PHP", level: 20 }
    ]
  },
  {
    title: { pt: "Dados & Ferramentas", en: "Data & Tools" },
    items: [
      { name: "PostgreSQL", level: 67 },
      { name: "SQL Server", level: 40 },
      { name: "Git / GitHub", level: 70 },
      { name: "Postman", level: 30 },
      { name: "SCRUM", level: 65 },
      { name: "Jira", level: 50 }
    ]
  }
];
const softSkills = [
  { pt: "Criatividade", en: "Creativity" },
  { pt: "Pensamento analítico", en: "Analytical thinking" },
  { pt: "Resiliência", en: "Resilience" },
  { pt: "Adaptabilidade", en: "Adaptability" },
  { pt: "Comunicação", en: "Communication" },
  { pt: "Gestão de tempo", en: "Time management" }
];
const langs = [
  { name: { pt: "Português", en: "Portuguese" }, level: "Nativo" },
  { name: { pt: "Inglês", en: "English" }, level: "B2" },
  { name: { pt: "Espanhol", en: "Spanish" }, level: "A2" }
];
const levelLabel = (lvl, lang) => {
  if (lvl >= 85) return lang === "pt" ? "Avançado" : "Advanced";
  if (lvl >= 60) return lang === "pt" ? "Sólido" : "Solid";
  if (lvl >= 35) return lang === "pt" ? "Intermediário" : "Intermediate";
  return lang === "pt" ? "Básico" : "Basic";
};
const levelVariant = (lvl) => {
  if (lvl >= 85) return "filled";
  if (lvl >= 60) return "outline";
  if (lvl >= 35) return "ghost";
  return "muted";
};
function LevelTag({ lvl, lang }) {
  const v = levelVariant(lvl);
  const label = levelLabel(lvl, lang);
  if (v === "filled")
    return /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-widest", children: label });
  if (v === "outline")
    return /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 border border-foreground font-mono text-[10px] font-bold uppercase tracking-widest", children: label });
  if (v === "ghost")
    return /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] italic uppercase tracking-widest text-foreground/60", children: label });
  return /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-foreground/40", children: label });
}
const rowOpacity = (lvl) => lvl >= 60 ? "" : lvl >= 35 ? "opacity-80" : "opacity-60";
function Skills() {
  const { lang } = useLang();
  return /* @__PURE__ */ jsx("section", { id: "skills", className: "py-14 md:py-20 bg-secondary/40 bg-paper", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: [
    /* @__PURE__ */ jsx(
      SectionLabel,
      {
        n: "03",
        kicker: { pt: "Stack", en: "Stack" },
        title: { pt: "O que carrego na mochila.", en: "What's in my toolkit." }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "border-t border-b border-foreground/20 py-10 md:py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-16 gap-x-10 md:gap-x-12", children: [
      cats.map((c) => /* @__PURE__ */ jsxs("div", { className: "space-y-6 md:space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-foreground pb-2 flex justify-between items-end gap-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg md:text-xl font-bold uppercase tracking-tighter", children: t(c.title, lang) }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono text-[10px] uppercase tracking-widest text-foreground/60 whitespace-nowrap", children: [
            "[ ",
            String(c.items.length).padStart(2, "0"),
            " ",
            t({ pt: "itens", en: "items" }, lang),
            " ]"
          ] })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "divide-y divide-foreground/10", children: c.items.map((s, i) => {
          const name = typeof s.name === "string" ? s.name : t(s.name, lang);
          return /* @__PURE__ */ jsxs(
            "li",
            {
              className: `py-3 flex justify-between items-center gap-3 ${rowOpacity(
                s.level
              )}`,
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm md:text-base font-mono", children: name }),
                /* @__PURE__ */ jsx(LevelTag, { lvl: s.level, lang })
              ]
            },
            i
          );
        }) })
      ] }, t(c.title, lang))),
      /* @__PURE__ */ jsxs("div", { className: "space-y-10 md:space-y-12 md:pl-8 md:border-l border-foreground/10", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-mono text-xs font-bold uppercase tracking-widest text-foreground/60", children: t({ pt: "Idiomas", en: "Languages" }, lang) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: langs.map((l) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "font-mono text-sm border border-foreground px-3 py-1",
              children: [
                t(l.name, lang),
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-foreground/40 ml-1", children: [
                  "/ ",
                  l.level
                ] })
              ]
            },
            l.level
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-mono text-xs font-bold uppercase tracking-widest text-foreground/60", children: t({ pt: "Soft Skills", en: "Soft Skills" }, lang) }),
          /* @__PURE__ */ jsxs("p", { className: "font-display italic text-lg md:text-xl leading-relaxed text-foreground/90 max-w-sm", children: [
            softSkills.map((s) => t(s, lang)).join(", "),
            "."
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40", children: t(
      {
        pt: "Índice técnico — atualizado 2025",
        en: "Technical index — updated 2025"
      },
      lang
    ) }) })
  ] }) });
}
const quiztop = "/assets/quiztop-B-5SFH2b.png";
const viajero = "/assets/viajero-BkGaVmat.png";
const pomofocus = "/assets/pomofocus-D45Onwwf.jpg";
const projects = [
  {
    n: "01",
    title: "Viaje.ro",
    desc: {
      pt: "Forma inovadora de documentar viagens pelo Brasil — mapas interativos e geolocalização.",
      en: "An innovative way to document trips across Brazil — interactive maps and geolocation."
    },
    img: viajero,
    href: "https://orodrigobraz.github.io/viaje.ro/",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "PostGIS", "Leaflet"],
    year: "2024"
  },
  {
    n: "02",
    title: "Pomofocus Clone",
    desc: {
      pt: "Recriação do Pomofocus — técnica Pomodoro para gestão de tempo e produtividade.",
      en: "Recreation of Pomofocus — Pomodoro technique for time management and productivity."
    },
    img: pomofocus,
    href: "https://orodrigobraz.github.io/pomofocus-clone/",
    tech: ["React", "TypeScript", "CSS3"],
    year: "2024"
  },
  {
    n: "03",
    title: "QuizTop",
    desc: {
      pt: "Quiz interativo com pontuação e ranking. Firebase para auth e dados em tempo real.",
      en: "Interactive quiz with scoring and rankings. Firebase for auth and realtime data."
    },
    img: quiztop,
    href: "https://orodrigobraz.github.io/quiztop/",
    tech: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    year: "2023"
  }
];
function Projects() {
  const { lang } = useLang();
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-14 md:py-20 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: [
    /* @__PURE__ */ jsx(
      SectionLabel,
      {
        n: "04",
        kicker: { pt: "Projetos", en: "Selected work" },
        title: { pt: "O que construí.", en: "What I've built." }
      }
    ),
    /* @__PURE__ */ jsx("div", { children: projects.map((p, idx) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: p.href,
        target: "_blank",
        rel: "noreferrer",
        className: `group grid grid-cols-12 gap-4 md:gap-8 py-10 border-t border-foreground/20 ${idx === projects.length - 1 ? "border-b" : ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1 font-mono text-[11px] text-primary", children: [
            "/ ",
            p.n
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-10 md:col-span-4 order-2 md:order-none", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-4xl md:text-6xl font-bold leading-none group-hover:text-primary transition", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "font-serif italic text-base text-muted-foreground mt-2", children: p.year }),
            /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base leading-relaxed text-foreground/80 mt-4 max-w-md", children: t(p.desc, lang) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: p.tech.map((tg) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "font-mono text-[10px] uppercase tracking-widest border border-foreground/30 px-2 py-1",
                children: tg
              },
              tg
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-6 relative overflow-hidden bg-secondary order-1 md:order-none", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: p.img,
                alt: p.title,
                className: "w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition flex items-center gap-1", children: [
              t({ pt: "Visitar", en: "Visit" }, lang),
              " ",
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex col-span-1 items-start justify-end", children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-6 h-6 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition" }) })
        ]
      },
      p.title
    )) })
  ] }) });
}
const EMAIL = "rodrigo.braz@outlook.com.br";
const PHONE = "+5535984771404";
function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-14 md:py-20 bg-foreground text-background", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 mb-12 items-end border-t border-background/30 pt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold", children: [
        "/ 05 — ",
        t({ pt: "Contato", en: "Contact" }, lang)
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "col-span-12 md:col-span-9 font-display text-5xl md:text-7xl font-bold leading-[0.9]", children: t({ pt: "Vamos construir algo?", en: "Let's build something?" }, lang) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 md:gap-8 mt-4 border-t border-background/30 pt-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-6", children: [
        /* @__PURE__ */ jsx("p", { className: "font-serif italic text-2xl md:text-3xl leading-snug max-w-md text-background/90", children: t(
          {
            pt: "Sempre aberto a novos projetos, conversas e ideias. Manda um e-mail ou me encontra nos canais ao lado.",
            en: "Always open to new projects, conversations and ideas. Drop me a line or find me on the channels."
          },
          lang
        ) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: copy,
            className: "mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-background/40 hover:border-gold hover:text-gold font-mono text-[11px] uppercase tracking-widest transition",
            children: [
              copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
              copied ? t({ pt: "Copiado", en: "Copied" }, lang) : t({ pt: "Copiar e-mail", en: "Copy email" }, lang)
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-6", children: /* @__PURE__ */ jsxs("ul", { className: "font-mono text-sm", children: [
        /* @__PURE__ */ jsx(
          ChannelRow,
          {
            label: "E-mail",
            href: `mailto:${EMAIL}`,
            handle: EMAIL
          }
        ),
        /* @__PURE__ */ jsx(
          ChannelRow,
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/orodrigobraz/",
            handle: "@orodrigobraz"
          }
        ),
        /* @__PURE__ */ jsx(
          ChannelRow,
          {
            label: "GitHub",
            href: "https://github.com/orodrigobraz",
            handle: "@orodrigobraz"
          }
        ),
        /* @__PURE__ */ jsx(
          ChannelRow,
          {
            label: "WhatsApp",
            href: `https://wa.me/${PHONE.replace("+", "")}`,
            handle: "+55 35 98477-1404"
          }
        ),
        /* @__PURE__ */ jsx(
          ChannelRow,
          {
            label: t({ pt: "Localização", en: "Location" }, lang),
            href: "#",
            handle: "Paraisópolis, MG"
          }
        )
      ] }) })
    ] })
  ] }) });
}
function ChannelRow({ label, href, handle }) {
  const isExt = href.startsWith("http");
  return /* @__PURE__ */ jsx("li", { className: "border-t border-background/20 last:border-b", children: /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: isExt ? "_blank" : void 0,
      rel: "noreferrer",
      className: "flex items-center justify-between py-4 group hover:text-gold transition",
      children: [
        /* @__PURE__ */ jsx("span", { className: "uppercase text-[11px] tracking-[0.25em] text-background/60 group-hover:text-gold", children: label }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-base", children: [
          handle,
          isExt && /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4 group-hover:rotate-45 transition" })
        ] })
      ]
    }
  ) });
}
function Footer() {
  const { lang } = useLang();
  return /* @__PURE__ */ jsx("footer", { className: "bg-foreground text-background border-t border-background/20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10 py-6 grid grid-cols-12 gap-4 font-mono text-[11px] uppercase tracking-[0.25em]", children: [
    /* @__PURE__ */ jsxs("span", { className: "col-span-6 md:col-span-3 text-background/60", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " R. Braz"
    ] }),
    /* @__PURE__ */ jsx("span", { className: "hidden md:block col-span-3 text-background/60", children: t({ pt: "Feito com React + TS", en: "Built with React + TS" }, lang) }),
    /* @__PURE__ */ jsx("span", { className: "hidden md:block col-span-3 text-background/60", children: t({ pt: "Paraisópolis · MG · BR", en: "Paraisópolis · MG · BR" }, lang) }),
    /* @__PURE__ */ jsxs("span", { className: "col-span-6 md:col-span-3 text-right text-background/60", children: [
      "↑ ",
      /* @__PURE__ */ jsx("a", { href: "#home", className: "hover:text-gold", children: t({ pt: "Voltar ao topo", en: "Back to top" }, lang) })
    ] })
  ] }) });
}
function Index() {
  const [lang, setLang] = useState("pt");
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") setLang(saved);
  }, []);
  const toggle = () => {
    setLang((p) => {
      const n = p === "pt" ? "en" : "pt";
      try {
        localStorage.setItem("lang", n);
      } catch {
      }
      return n;
    });
  };
  return /* @__PURE__ */ jsxs(LangContext.Provider, { value: {
    lang,
    toggle
  }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Experience, {}),
      /* @__PURE__ */ jsx(Skills, {}),
      /* @__PURE__ */ jsx(Projects, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Index as component
};
