import { ArrowUpRight } from "lucide-react";
import { useLang, t, type T } from "@/lib/i18n";
import { SectionLabel } from "./About";
import quiztop from "@/assets/quiztop.png";
import viajero from "@/assets/viajero.png";
import pomofocus from "@/assets/pomofocus.jpg";

type Project = {
  n: string;
  title: string;
  desc: T;
  img: string;
  href: string;
  tech: string[];
  year: string;
};

const projects: Project[] = [
  {
    n: "01",
    title: "Viaje.ro",
    desc: {
      pt: "Forma inovadora de documentar viagens pelo Brasil — mapas interativos e geolocalização.",
      en: "An innovative way to document trips across Brazil — interactive maps and geolocation.",
    },
    img: viajero,
    href: "https://orodrigobraz.github.io/viaje.ro/",
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "PostGIS", "Leaflet"],
    year: "2024",
  },
  {
    n: "02",
    title: "Pomofocus Clone",
    desc: {
      pt: "Recriação do Pomofocus — técnica Pomodoro para gestão de tempo e produtividade.",
      en: "Recreation of Pomofocus — Pomodoro technique for time management and productivity.",
    },
    img: pomofocus,
    href: "https://orodrigobraz.github.io/pomofocus-clone/",
    tech: ["React", "TypeScript", "CSS3"],
    year: "2024",
  },
  {
    n: "03",
    title: "QuizTop",
    desc: {
      pt: "Quiz interativo com pontuação e ranking. Firebase para auth e dados em tempo real.",
      en: "Interactive quiz with scoring and rankings. Firebase for auth and realtime data.",
    },
    img: quiztop,
    href: "https://orodrigobraz.github.io/quiztop/",
    tech: ["HTML5", "CSS3", "JavaScript", "Firebase"],
    year: "2023",
  },
];

export function Projects() {
  const { lang } = useLang();
  return (
    <section id="projects" className="py-14 md:py-20 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionLabel
          n="04"
          kicker={{ pt: "Projetos", en: "Selected work" }}
          title={{ pt: "O que construí.", en: "What I've built." }}
        />

        <div>
          {projects.map((p, idx) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={`group grid grid-cols-12 gap-4 md:gap-8 py-10 border-t border-foreground/20 ${
                idx === projects.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="col-span-2 md:col-span-1 font-mono text-[11px] text-primary">
                / {p.n}
              </div>

              <div className="col-span-10 md:col-span-4 order-2 md:order-none">
                <h3 className="font-display text-4xl md:text-6xl font-bold leading-none group-hover:text-primary transition">
                  {p.title}
                </h3>
                <p className="font-serif italic text-base text-muted-foreground mt-2">
                  {p.year}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80 mt-4 max-w-md">
                  {t(p.desc, lang)}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((tg) => (
                    <span
                      key={tg}
                      className="font-mono text-[10px] uppercase tracking-widest border border-foreground/30 px-2 py-1"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 relative overflow-hidden bg-secondary order-1 md:order-none">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                  {t({ pt: "Visitar", en: "Visit" }, lang)} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              <div className="hidden md:flex col-span-1 items-start justify-end">
                <ArrowUpRight className="w-6 h-6 text-foreground/40 group-hover:text-primary group-hover:rotate-45 transition" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
