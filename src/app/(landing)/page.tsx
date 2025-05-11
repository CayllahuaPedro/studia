import TitleSection from "@/components/landing-page/title-section";
import React from "react";

function Home() {
  return (
    <section>
      <div className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center"></div>
      <TitleSection
        title="Toma notas inteligentes con"
        highlighted="Studia"
        pill="🤖 IA para revolucionar tus notas"
      />
      {/* TODO: Agregar un boton gradiente parecido al que usamos en elethor, que sea gradiento todo el bg
      agregar alguna animacion constante y cuando se interactua con el boton, que se vuelva mas brillante
      */}
    </section>
  );
}

export default Home;
