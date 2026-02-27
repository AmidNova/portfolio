import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Career from "./components/Career";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Career />
      <Projects />
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <About />
      <Footer />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
