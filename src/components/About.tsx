import { useLang, t, type T } from "@/lib/i18n";

export function SectionLabel({
  n,
  title,
  kicker,
}: {
  n: string;
  title: T;
  kicker?: T;
}) {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-12 gap-4 mb-12 items-end border-t border-foreground/30 pt-6">
      <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
        / {n} {kicker && <span className="text-muted-foreground">— {t(kicker, lang)}</span>}
      </div>
      <h2 className="col-span-12 md:col-span-9 font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
        {t(title, lang)}
      </h2>
    </div>
  );
}

export function About() {
  const { lang } = useLang();
  return (
    <section id="about" className="py-14 md:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel
          n="01"
          kicker={{ pt: "Sobre", en: "About" }}
          title={{
            pt: "Sobre mim.",
            en: "About me.",
          }}
        />

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <aside className="col-span-12 md:col-span-4 md:sticky md:top-24 md:self-start">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              {t({ pt: "Resumo", en: "Summary" }, lang)}
            </div>
            <ul className="space-y-3 font-mono text-sm">
              <Row k={t({ pt: "Formação", en: "Studying" }, lang)} v="UNIFEI · 2027" />
              <Row k={t({ pt: "Trabalho", en: "Working" }, lang)} v="Versigent" />
              <Row k={t({ pt: "Foco", en: "Focus" }, lang)} v="Full-stack" />
              <Row k={t({ pt: "Local", en: "Based in" }, lang)} v="Paraisópolis, MG" />
              <Row k={t({ pt: "Idiomas", en: "Languages" }, lang)} v="PT · EN · ES" />
            </ul>
          </aside>

          <div className="col-span-12 md:col-span-8 space-y-6">
            <p className="font-serif text-3xl md:text-4xl leading-[1.15] text-balance">
              {t(
                {
                  pt: ("Estudante de " as string),
                  en: ("Student of " as string),
                },
                lang,
              )}
              <em className="text-primary">
                {t({ pt: "Sistemas de Informação", en: "Information Systems" }, lang)}
              </em>
              {t(
                {
                  pt: " na Universidade Federal de Itajubá (UNIFEI) e construindo software para resolver problemas reais — do ERP corporativo ao app que documenta minhas viagens.",
                  en: " at Federal University of Itajubá (UNIFEI) and building software to solve real problems — from corporate ERP to an app that documents my travels.",
                },
                lang,
              )}
            </p>

            <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
              {t(
                {
                  pt: "Atuei com desenvolvimento usando UML, Postman, Jira e Confluence, e colaborei na criação de novos produtos. Antes do software, passei por produção, logística e suporte — experiências que me deram olhar analítico, adaptabilidade e responsabilidade.",
                  en: "I've worked with development using UML, Postman, Jira and Confluence, and collaborated on building new products. Before tech, I worked in production, logistics and IT support — experiences that gave me an analytical perspective, adaptability and a sense of responsibility.",
                },
                lang,
              )}
            </p>

            <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
              {t(
                {
                  pt: "Participei ativamente de projetos extracurriculares como Enactus e Cheetah E-Racing, onde aprendi sobre comunicação, trabalho em equipe e gerar impacto.",
                  en: "I actively took part in extracurricular projects like Enactus and Cheetah E-Racing, where I learned about communication, teamwork and creating impact.",
                },
                lang,
              )}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/20">
              <Stat n="2027" l={{ pt: "Formatura", en: "Graduation" }} />
              <Stat n="2+" l={{ pt: "Empresas", en: "Companies" }} />
              <Stat n="∞" l={{ pt: "Curiosidade", en: "Curiosity" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex justify-between border-b border-foreground/15 pb-2">
      <span className="text-muted-foreground uppercase text-[10px] tracking-widest">{k}</span>
      <span className="text-foreground">{v}</span>
    </li>
  );
}

function Stat({ n, l }: { n: string; l: T }) {
  const { lang } = useLang();
  return (
    <div>
      <div className="font-display text-4xl md:text-5xl font-bold text-primary leading-none">{n}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
        {t(l, lang)}
      </div>
    </div>
  );
}
