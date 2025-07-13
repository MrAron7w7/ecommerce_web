import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const features = [
    {
      title: "Calidad Premium",
      description: "Seleccionamos cuidadosamente cada producto para garantizar la más alta calidad.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 2l3 7h7l-6 4 3 7-7-4-7 4 3-7-6-4h7l3-7z" />
        </svg>
      ),
    },
    {
      title: "Envío Rápido",
      description: "Entrega rápida y segura a cualquier parte del país.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M5 17.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5z" />
          <path d="M17 17.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5z" />
          <path d="M14 16V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10" />
          <path d="M14 6h6l2 3v7c0 1.1-.9 2-2 2h-2" />
        </svg>
      ),
    },
    {
      title: "Atención Personalizada",
      description: "Equipo de expertos disponible para asesorarte en tus compras.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <circle cx="12" cy="10" r="2" />
          <line x1="8" y1="2" x2="8" y2="4" />
          <line x1="16" y1="2" x2="16" y2="4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-gray-600 mb-8">
          En TuTienda, nos dedicamos a ofrecer la mejor experiencia de compra online,
          combinando calidad, estilo y servicio excepcional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Fundada en 2024, TuTienda nació con la visión de revolucionar la forma
            en que las personas compran moda online. Comenzamos como una pequeña
            tienda local y hemos crecido hasta convertirnos en un referente del
            comercio electrónico.
          </p>
          <p className="text-gray-600 mb-6">
            Nuestro compromiso con la calidad y la satisfacción del cliente nos ha
            permitido construir una comunidad fiel de compradores que confían en
            nosotros para sus necesidades de moda.
          </p>
          <Button size="lg">Conoce Más</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">10K+</h3>
              <p className="text-sm text-gray-600">Clientes Satisfechos</p>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-sm text-gray-600">Marcas Premium</p>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-sm text-gray-600">Soporte al Cliente</p>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">100%</h3>
              <p className="text-sm text-gray-600">Garantía de Calidad</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Sé parte de nuestra comunidad y mantente al día con las últimas tendencias,
          ofertas exclusivas y novedades de TuTienda.
        </p>
        <Button size="lg" variant="default">
          Suscríbete al Newsletter
        </Button>
      </div>
    </div>
  );
}