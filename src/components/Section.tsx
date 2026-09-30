import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** Content breaks out of the reading column (the title stays aligned with the text). */
  wide?: boolean;
  children: ReactNode;
}

function Section({ id, title, wide = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-24 sm:mt-32">
      <h2 id={`${id}-title`} className="mb-8 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        {title}
      </h2>
      {wide ? <div className="breakout">{children}</div> : children}
    </section>
  );
}

export default Section;
