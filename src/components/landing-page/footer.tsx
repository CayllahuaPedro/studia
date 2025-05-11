import React from "react";
import Link from "next/link";
import { GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
  // En lugar de usar Date.now() que causa problemas de hidratación,
  // usamos un año estático o lo manejaremos con useEffect en el cliente
  return (
    <footer className="w-full bg-brand-dark border-t border-brand-dark-secondary">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">Studia</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Un gestionador de notas con IA integrado, rápido y seguro. 
              Revoluciona la manera en que organizas tus ideas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="font-semibold mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Descargas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Actualizaciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-brand-dark-secondary mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Studia. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Términos
            </Link>
            <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
