import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About";
import AboutSection from "./components/AboutSection";
import Contact from "./components/Contact";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Section from "./components/Section";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import { LangProvider, useLang } from "./context/LangContext";
import { EDUCATION, EXPERIENCE } from "./data/profile";
import { useDocumentMeta } from "./hooks/useDocumentMeta";

function Home() {
  const { t } = useLang();
  useDocumentMeta(t.meta.homeTitle, t.meta.homeDescription);
  return (
    <>
      <Hero />
      <Section id="about" title={t.about.title}>
        <AboutSection />
      </Section>
      <Section id="projects" title={t.projects.title} wide>
        <Projects />
      </Section>
      <Section id="experience" title={t.experience.title}>
        <Timeline entries={EXPERIENCE} />
      </Section>
      <Section id="education" title={t.education.title}>
        <Timeline entries={EDUCATION} />
      </Section>
      <Section id="skills" title={t.skills.title}>
        <Skills />
      </Section>
      <Credentials />
      <Section id="contact" title={t.contact.title}>
        <Contact />
      </Section>
    </>
  );
}

/** Scrolls to `#hash` targets (e.g. /#projects) and to the top on page change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      target.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppShell() {
  const { t } = useLang();
  return (
    <BrowserRouter>
      <ScrollManager />
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>
      <Navbar />
      <main id="main" className="mx-auto max-w-2xl px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}

export default App;
