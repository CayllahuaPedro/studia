"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar la apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Función para scroll suave a las secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
            <Mountain className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold">Studia</span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("experiencia")}
            className="text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Experiencia
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("caracteristicas")}
            className="text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Características
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Botón de acción */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Iniciar Sesión
          </Button>
          <Button variant="gradient" size="sm" className="group transition-all duration-300 hover:scale-105">
            <Link href="/dashboard">Comenzar Gratis</Link>
            {/* Efecto de brillo animado */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-md"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
