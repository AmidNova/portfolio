import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface CardProps {
  id?: string;
  /** id of the heading that names this card, for aria-labelledby. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** A bento tile: dark surface, hairline border, rounded corners. */
export function Card({ id, labelledBy, className = "", children }: CardProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`card p-6 ${className}`}>
      {children}
    </section>
  );
}

interface CardHeaderProps {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  /** Optional control on the right of the title (tabs, "view all"…). */
  action?: ReactNode;
}

export function CardHeader({ id, icon: Icon, title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h2 id={id} className="flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.025em]">
          <Icon size={26} aria-hidden="true" className="shrink-0 text-accent" />
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-subtle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
