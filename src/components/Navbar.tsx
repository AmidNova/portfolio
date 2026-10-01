import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../hooks/useLang";

const LANGS = ["fr", "en"] as const;

function Navbar() {
  const { t, lang, setLang, dark, toggleDark } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Escape closes the phone menu and hands focus back to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
      className={`sticky top-0 z-40 border-b bg-bg/70 backdrop-blur-md backdrop-saturate-150 transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label={t.nav.main} className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-6">
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

          {/* Phones: the links collapse behind a menu button. */}
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="-m-1.5 rounded-md p-1.5 text-muted transition-colors hover:text-fg sm:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <nav id="mobile-menu" aria-label={t.nav.menu} className="glass mx-4 mb-3 rounded-xl p-2 sm:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  viewTransition
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === l.to ? "page" : undefined}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-raised hover:text-fg aria-[current=page]:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
