import { useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { SectionLabel } from "./About";

const EMAIL = "rodrigo.braz@outlook.com.br";
const PHONE = "+5535984771404";

export function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 mb-12 items-end border-t border-background/30 pt-6">
          <div className="col-span-12 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            / 05 — {t({ pt: "Contato", en: "Contact" }, lang)}
          </div>
          <h2 className="col-span-12 md:col-span-9 font-display text-5xl md:text-7xl font-bold leading-[0.9]">
            {t({ pt: "Vamos construir algo?", en: "Let's build something?" }, lang)}
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8 mt-4 border-t border-background/30 pt-12">
          <div className="col-span-12 md:col-span-6">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-md text-background/90">
              {t(
                {
                  pt: "Sempre aberto a novos projetos, conversas e ideias. Manda um e-mail ou me encontra nos canais ao lado.",
                  en: "Always open to new projects, conversations and ideas. Drop me a line or find me on the channels.",
                },
                lang,
              )}
            </p>

            <button
              onClick={copy}
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 border border-background/40 hover:border-gold hover:text-gold font-mono text-[11px] uppercase tracking-widest transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied
                ? t({ pt: "Copiado", en: "Copied" }, lang)
                : t({ pt: "Copiar e-mail", en: "Copy email" }, lang)}
            </button>
          </div>

          <div className="col-span-12 md:col-span-6">
            <ul className="font-mono text-sm">
              <ChannelRow
                label="E-mail"
                href={`mailto:${EMAIL}`}
                handle={EMAIL}
              />
              <ChannelRow
                label="LinkedIn"
                href="https://www.linkedin.com/in/orodrigobraz/"
                handle="@orodrigobraz"
              />
              <ChannelRow
                label="GitHub"
                href="https://github.com/orodrigobraz"
                handle="@orodrigobraz"
              />
              <ChannelRow
                label="WhatsApp"
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                handle="+55 35 98477-1404"
              />
              <ChannelRow
                label={t({ pt: "Localização", en: "Location" }, lang)}
                href="#"
                handle="Paraisópolis, MG"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({ label, href, handle }: { label: string; href: string; handle: string }) {
  const isExt = href.startsWith("http");
  return (
    <li className="border-t border-background/20 last:border-b">
      <a
        href={href}
        target={isExt ? "_blank" : undefined}
        rel="noreferrer"
        className="flex items-center justify-between py-4 group hover:text-gold transition"
      >
        <span className="uppercase text-[11px] tracking-[0.25em] text-background/60 group-hover:text-gold">
          {label}
        </span>
        <span className="flex items-center gap-2 text-base">
          {handle}
          {isExt && <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition" />}
        </span>
      </a>
    </li>
  );
}
