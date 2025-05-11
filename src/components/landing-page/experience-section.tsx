import React from "react";
import { CheckIcon } from "lucide-react";

interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-primary/20 rounded-full p-1">
        <CheckIcon className="h-4 w-4 text-primary" />
      </div>
      <span className="text-lg">{text}</span>
    </div>
  );
};

export default function ExperienceSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experimenta la <span className="text-primary">nueva forma</span> de tomar notas
          </h2>
          
          <p className="mb-8">
            Studia revoluciona la manera en que organizas tus ideas. Con nuestra
            interfaz intuitiva y herramientas potenciadas por IA, tomar notas
            nunca ha sido tan eficiente.
          </p>
          
          <div className="space-y-2">
            <FeatureItem text="Organización automática por temas" />
            <FeatureItem text="Búsqueda avanzada con filtros inteligentes" />
            <FeatureItem text="Sugerencias de contenido relacionado" />
            <FeatureItem text="Colaboración en tiempo real" />
            <FeatureItem text="Modo oscuro para reducir la fatiga visual" />
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-gradient-to-r from-primary/10 to-purple-600/20 flex items-center justify-center overflow-hidden shadow-xl">
            {/* Fallback para la imagen */}
            <div className="w-3/4 h-3/4 bg-brand-dark/80 rounded-xl flex items-center justify-center">
              <svg 
                className="w-24 h-24 text-primary/40" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            
            {/* Efectos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
