import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-brand-dark-secondary rounded-xl p-6 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
      
      <div className="relative z-10">
        <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  return (
    <div className="py-16 w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Características <span className="text-primary">Principales</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16.5c2.385 0 4.5-2.115 4.5-4.5 0-1.94-1.282-3.583-3.046-4.13l.345-1.305c.242.063.494.098.753.098 1.661 0 3.01-1.349 3.01-3.01S15.661 0.5 14 0.5c-1.358 0-2.506.899-2.879 2.132l-5.005 19.085c-.22.084-.116.283-.116.283h2c0-.917.674-1.681 1.555-1.819l.443-1.681h2.996c.242 0 .474-.034.694-.098l.312 1.191c.7.268.7.537.7.807zm0-12c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5-1.5.673-1.5 1.5.673 1.5 1.5 1.5zm-6 12c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"/></svg>}
          title="IA Integrada"
          description="Organiza y mejora tus notas automáticamente con nuestra IA avanzada. Genera resúmenes, extrae conceptos clave y obtén sugerencias inteligentes."
        />
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>}
          title="Seguridad Garantizada"
          description="Tus notas están protegidas con encriptación de extremo a extremo. Nadie más que tú puede acceder a tu información confidencial."
        />
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41z"/></svg>}
          title="Almacenamiento Local"
          description="Guarda tus notas directamente en tu dispositivo. Trabaja sin conexión y mantén el control total sobre tus datos."
        />
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>}
          title="Compatibilidad Total"
          description="Importa y exporta tus notas en múltiples formatos: DOCX, PDF, PPT y más. Integración perfecta con tus herramientas favoritas."
        />
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}
          title="Velocidad Increíble"
          description="Interfaz ultrarrápida diseñada para una experiencia fluida. Toma notas sin interrupciones ni tiempos de carga."
        />
        <FeatureCard
          icon={<svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>}
          title="Múltiples Backups"
          description="Nunca pierdas tus notas con nuestras opciones de respaldo automático. Sincroniza con la nube o guarda copias locales."
        />
      </div>
    </div>
  );
}
