import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import {
  AboutCard,
  ProjectsCard,
  ServicesCard,
  StackCard,
} from "./components/HomeCards";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";
import ProjectsPage from "./components/ProjectsPage";
import StatTiles from "./components/StatTiles";
import { LangProvider, useLang } from "./context/LangContext";
import { useDocumentMeta } from "./hooks/useDocumentMeta";

/** Bento home: identity + story on the left, tools and numbers on the right, work below. */
function Home() {
  const { t } = useLang();
  useDocumentMeta(t.meta.homeTitle, t.meta.homeDescription);
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-4 px-4 pt-6 sm:px-6">
      {/* Two balanced rows of two columns; min-w-0 stops marquees from widening a column. */}
      <div className="grid gap-4 lg:grid-cols-[5fr_6fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <Hero />
          <AboutCard />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <StackCard />
          <StatTiles />
          <ServicesCard />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[5fr_6fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <ProjectsCard />
          <Journey />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <Credentials />
          <Contact />
        </div>
      </div>
    </div>
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
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/about"
            element={
              <div className="mx-auto max-w-2xl px-6">
                <About />
              </div>
            }
          />
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
