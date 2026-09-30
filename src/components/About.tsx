import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Portrait from "../assets/images/Confident professional in office attire.webp";
import PhotoLouvre from "../assets/images/MoiAuLouvre.webp";
import PhotoLit from "../assets/images/MoiQuiLit.webp";
import PhotoSeul from "../assets/images/MoiSeul.webp";
import PhotoTrophee from "../assets/images/MoiEtTrophéEloquence.webp";
import { useLang } from "../hooks/useLang";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// One photo per chapter, in the same order as t.story.chapters.
const CHAPTER_PHOTOS = [PhotoLouvre, PhotoSeul, PhotoTrophee];

function About() {
  const { t } = useLang();
  const story = t.story;
  useDocumentMeta(t.meta.aboutTitle, t.meta.aboutDescription);

  return (
    <article className="pt-14 sm:pt-20">
      <Link
        to="/"
        viewTransition
        className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
        {story.back}
      </Link>

      <header className="mt-8">
        {/* Same view-transition name as the hero portrait, so it morphs between pages. */}
        <img
          src={Portrait}
          alt=""
          width={56}
          height={56}
          className="portrait mb-6 size-14 rounded-full object-cover object-top"
          style={{ viewTransitionName: "portrait" }}
        />
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{story.title}</h1>
        <p className="mt-3 text-lg text-muted">{story.lead}</p>
      </header>

      {story.chapters.map((chapter, i) => (
        <section key={chapter.title} className="mt-16" aria-labelledby={`chapter-${i}`}>
          <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
          <h2 id={`chapter-${i}`} className="mt-1 text-xl font-semibold tracking-tight">
            {chapter.title}
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-muted">
            {chapter.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <figure className="mt-6">
            <img
              src={CHAPTER_PHOTOS[i]}
              alt={chapter.caption}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
            />
            <figcaption className="mt-2 text-xs text-subtle">{chapter.caption}</figcaption>
          </figure>
        </section>
      ))}

      <section className="mt-16" aria-labelledby="off-clock">
        <h2 id="off-clock" className="text-xl font-semibold tracking-tight">
          {story.offClock.title}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-[10rem_1fr]">
          <img src={PhotoLit} alt="" loading="lazy" className="aspect-square w-40 rounded-xl border border-line object-cover" />
          <dl className="space-y-4">
            {story.offClock.items.map((item) => (
              <div key={item.title}>
                <dt className="font-medium">{item.title}</dt>
                <dd className="text-sm text-muted">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}

export default About;
