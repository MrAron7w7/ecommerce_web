import React from "react";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function TestimonialsSection() {
  return (
    <section className="container py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Lo que dicen nuestros clientes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 5
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="italic mb-4">
                `Excelente calidad de productos y entrega rápida.
                Definitivamente volveré a comprar aquí.`
              </blockquote>
              <div className="flex items-center justify-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?img=${item + 10}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Cliente Satisfecho</p>
                  <p className="text-sm text-gray-500">Desde 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
