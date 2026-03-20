import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Career from "./components/Career";
import FadeIn from "./components/FadeIn";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import { LangProvider } from "./context/LangContext";

function Home() {
  return (
    <>
      <Hero />
      <FadeIn><Services /></FadeIn>
      <FadeIn delay={50}><Career /></FadeIn>
      <FadeIn delay={50}><Projects /></FadeIn>
      <FadeIn delay={50}><Footer /></FadeIn>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <FadeIn><About /></FadeIn>
      <FadeIn delay={50}><Footer /></FadeIn>
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
