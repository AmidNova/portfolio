import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";

const LANGS = ["fr", "en"] as const;

function Navbar() {
  const { t, lang, setLang, dark, toggleDark } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.projects, to: "/#projects" },
    { label: t.nav.experience, to: "/#experience" },
    { label: t.nav.about, to: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-sm transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
        <Link to="/" viewTransition className="text-sm font-medium tracking-tight">
          Soro Amidou
        </Link>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 text-sm text-muted sm:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  viewTransition
                  aria-current={pathname === l.to ? "page" : undefined}
                  className="link transition-colors hover:text-fg aria-[current=page]:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div role="group" aria-label={t.nav.language} className="flex items-center text-xs font-medium">
            {LANGS.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="mx-1 text-line" aria-hidden="true">/</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className="uppercase text-subtle transition-colors hover:text-fg aria-pressed:text-fg"
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? t.nav.toLight : t.nav.toDark}
            className="-m-1.5 rounded-md p-1.5 text-muted transition-colors hover:text-fg"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
