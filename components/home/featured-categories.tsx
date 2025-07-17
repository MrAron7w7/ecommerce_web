import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCategories } from "@/actions/category/get-category";

async function FeaturedCategories() {
  const categories = await getCategories();
  // const categories = [
  //   {
  //     id: "1",
  //     name: "Zapatillas",
  //     description: "Calzado deportivo para todas las actividades",
  //   },
  //   {
  //     id: "2",
  //     name: "Ropa",
  //     description: "Ropa deportiva para hombre y mujer",
  //   },
  //   {
  //     id: "3",
  //     name: "Electrónica",
  //     description: "Dispositivos electrónicos para fitness",
  //   },
  //   {
  //     id: "4",
  //     name: "Accesorios",
  //     description: "Complementos para tu entrenamiento",
  //   },
  // ];

  // Solo tomar las primeras 4 categorias
  categories.length = 4;

  return (
    <section className="container py-12 px-4">
      <h2 className="text-2xl font-bold mb-8">Categorías destacadas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0" asChild>
                <Link href={`/category/${category.id}`}>
                  Ver productos <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;
