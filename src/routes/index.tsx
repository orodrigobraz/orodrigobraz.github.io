import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LangContext, type Lang } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rodrigo Braz — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio de Rodrigo Braz — Desenvolvedor Full Stack especializado em JavaScript, React, Node.js e desenvolvimento web moderno.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
});

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "pt" || saved === "en") setLang(saved);
  }, []);
  const toggle = () => {
    setLang((p) => {
      const n = p === "pt" ? "en" : "pt";
      try { localStorage.setItem("lang", n); } catch {}
      return n;
    });
  };
  return (
    <LangContext.Provider value={{ lang, toggle }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
