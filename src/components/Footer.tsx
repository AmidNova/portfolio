import { LINKS } from "../data/profile";

function Footer() {
  return (
    <footer className="mx-auto mt-16 flex max-w-[1100px] flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-8 text-sm text-subtle">
      <p>© 2026 Soro Amidou</p>
      <ul className="flex gap-5">
        <li>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="link hover:text-fg">
            GitHub
          </a>
        </li>
        <li>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="link hover:text-fg">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={LINKS.email} className="link hover:text-fg">
            Email
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
