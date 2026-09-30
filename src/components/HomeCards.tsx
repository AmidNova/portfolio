import { Activity, FolderGit2, UserRound, Wrench } from "lucide-react";
import { useLang } from "../context/LangContext";
import AboutSection from "./AboutSection";
import { Card, CardHeader } from "./Card";
import LivePulse from "./LivePulse";
import Projects from "./Projects";
import Toolbox from "./Toolbox";

/** Thin tiles that wrap existing sections in the bento card shell. */
export function AboutCard() {
  const { t } = useLang();
  return (
    <Card id="about" labelledBy="about-title" className="flex-1">
      <CardHeader id="about-title" icon={UserRound} title={t.about.title} subtitle={t.cards.about.subtitle} />
      <AboutSection />
    </Card>
  );
}

export function StackCard() {
  const { t } = useLang();
  return (
    <Card id="skills" labelledBy="skills-title">
      <CardHeader id="skills-title" icon={Wrench} title={t.skills.title} subtitle={t.skills.subtitle} />
      <Toolbox />
    </Card>
  );
}

export function LiveCard() {
  const { t } = useLang();
  return (
    <Card labelledBy="live-title" className="flex-1">
      <CardHeader id="live-title" icon={Activity} title={t.cards.live.title} subtitle={t.cards.live.subtitle} />
      <div className="flex min-h-16 items-center rounded-lg bg-bg px-4 py-3">
        <LivePulse width={220} height={36} />
      </div>
    </Card>
  );
}

export function ProjectsCard() {
  const { t } = useLang();
  return (
    <Card id="projects" labelledBy="projects-title">
      <CardHeader
        id="projects-title"
        icon={FolderGit2}
        title={t.projects.title}
        subtitle={t.cards.projects.subtitle}
      />
      <Projects />
    </Card>
  );
}
