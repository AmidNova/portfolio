import { ArrowLeft, FolderGit2, SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLang } from "../hooks/useLang";

/** Unknown address: say so plainly and offer the two useful ways back. */
function NotFound() {
  const { t } = useLang();
  useDocumentMeta(t.notFound.metaTitle, t.notFound.body);

  return (
    <div className="mx-auto flex max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-16">
      <section className="card mx-auto flex w-full max-w-lg flex-col items-center px-6 py-12 text-center">
        <span className="flex size-20 items-center justify-center rounded-full border border-line bg-bg">
          <SearchX size={34} aria-hidden="true" className="text-accent" />
        </span>
        <p className="stat-figure mt-6 font-mono text-6xl font-bold tracking-tighter">404</p>
        <h1 className="mt-2 text-2xl font-bold">{t.notFound.title}</h1>
        <p className="mt-2 max-w-sm leading-relaxed text-muted">{t.notFound.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link to="/" viewTransition className="btn btn-primary">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.projects.page.back}
          </Link>
          <Link to="/projects" viewTransition className="btn">
            <FolderGit2 size={16} aria-hidden="true" />
            {t.notFound.projects}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
