import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Certificates } from "@/components/sections/Certificates";
import { CodingProfiles } from "@/components/sections/CodingProfiles";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <Achievements />
        <Certificates />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
