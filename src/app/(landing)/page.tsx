import TitleSection from "@/components/landing-page/title-section";
import FeaturesSection from "@/components/landing-page/features-section";
import ExperienceSection from "@/components/landing-page/experience-section";
import Footer from "@/components/landing-page/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <section className="min-h-screen bg-brand-dark flex flex-col">
      {/* Sección de inicio */}
      <div id="inicio" className="max-w-4xl px-4 sm:px-6 lg:px-8 py-16 mx-auto pt-32">
        <div className="flex flex-col items-center gap-6">
          <TitleSection
            title="Toma notas inteligentes con"
            highlighted="Studia"
            pill="🤖 IA para revolucionar tus notas"
            subheading="Un gestionador de notas con IA integrado, rápido y seguro. Guarda tus notas localmente, con múltiples opciones de backup y compatibilidad con formatos como DOCX, PDF y PPT."
          />
          
          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="gradient" size="lg">
              <Link href="/dashboard">Comenzar Gratis</Link>
            </Button>
            <Button variant="secondary" size="lg">
              Ver Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Sección de experiencia */}
      <div id="experiencia">
        <ExperienceSection />
      </div>
      
      {/* Sección de características */}
      <div id="caracteristicas">
        <FeaturesSection />
      </div>
    </section>
  );
}

export default Home;
