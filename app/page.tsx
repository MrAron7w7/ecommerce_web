import { Button } from "@/components/ui/button";

import Link from "next/link";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import FeaturedProducts from "@/components/home/featured-products";
import FeaturedCategories from "@/components/home/featured-categories";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Categories */}
        <FeaturedCategories />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Promo Banner */}
        <section className="w-full bg-primary text-primary-foreground py-12">
          <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Oferta de verano</h2>
              <p className="text-primary-foreground/80">
                Hasta un 30% de descuento en selección de productos
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/offers">Comprar ahora</Link>
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />
      </main>
    </div>
  );
}
