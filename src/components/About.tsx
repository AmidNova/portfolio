import { ArrowLeft, BookOpen, Crown, Footprints } from "lucide-react";
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
// One icon per pastime, in the same order as t.story.offClock.items (reading, chess, running).
const PASTIME_ICONS = [BookOpen, Crown, Footprints];

/** The long story, in the home page's bento: one row per chapter, text and photo side by side. */
function About() {
  const { t } = useLang();
  const story = t.story;
  useDocumentMeta(t.meta.aboutTitle, t.meta.aboutDescription);

  return (
    <article className="mx-auto max-w-[1100px] px-4 pt-8 pb-4 sm:px-6 sm:pt-12">
      <Link
        to="/"
        viewTransition
        className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={14} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
        {story.back}
      </Link>

      <header className="card animate-enter mt-6 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
        {/* Same view-transition name as the hero portrait, so it morphs between pages. */}
        <img
          src={Portrait}
          alt=""
          width={100}
          height={100}
          className="size-24 shrink-0 rounded-xl object-cover object-top sm:size-[100px]"
          style={{ viewTransitionName: "portrait" }}
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">{story.title}</h1>
          <p className="mt-3 text-lg text-muted">{story.lead}</p>
        </div>
      </header>

      {story.chapters.map((chapter, i) => (
        <section key={chapter.title} aria-labelledby={`chapter-${i}`} className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="card flex flex-col justify-center p-6 sm:p-10">
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h2 id={`chapter-${i}`} className="mt-2 text-2xl font-semibold tracking-tight">
              {chapter.title}
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted">
              {chapter.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {/* Photos alternate sides on wide screens so the page zigzags instead of stacking. */}
          <figure className={`card relative overflow-hidden ${i % 2 === 1 ? "lg:order-first" : ""}`}>
            <img
              src={CHAPTER_PHOTOS[i]}
              alt={chapter.caption}
              loading="lazy"
              className="aspect-[4/3] size-full object-cover object-[50%_20%] lg:absolute lg:inset-0 lg:aspect-auto"
            />
            <figcaption className="glass absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs text-fg">
              {chapter.caption}
            </figcaption>
          </figure>
        </section>
      ))}

      <section aria-labelledby="off-clock" className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_2fr]">
        <div className="card overflow-hidden">
          <img src={PhotoLit} alt="" loading="lazy" className="aspect-square size-full object-cover" />
        </div>
        <div className="card flex flex-col justify-center p-6 sm:p-10">
          <h2 id="off-clock" className="text-2xl font-semibold tracking-tight">
            {story.offClock.title}
          </h2>
          <dl className="mt-6 grid gap-3 md:grid-cols-3">
            {story.offClock.items.map((item, i) => {
              const Icon = PASTIME_ICONS[i] ?? BookOpen;
              return (
                <div key={item.title} className="rounded-xl border border-line bg-raised p-4">
                  <dt className="flex items-center gap-2 font-medium">
                    <Icon size={16} aria-hidden="true" className="text-accent" />
                    {item.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>
    </article>
  );
}

export default About;
