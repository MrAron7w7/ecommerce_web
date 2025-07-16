import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="flex flex-col items-center relative w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Descubre los mejores productos deportivos
        </h1>
        <p className="max-w-[700px] text-gray-600 md:text-xl">
          Equípate con lo último en tecnología deportiva y accesorios de alta
          calidad para llevar tu rendimiento al siguiente nivel.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/products">Ver productos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/offers">Ofertas especiales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
