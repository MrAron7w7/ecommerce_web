import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Dirección",
      details: "Calle Principal 123, Ciudad",
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
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      title: "Teléfono",
      details: "+1 (123) 456-7890",
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
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      title: "Email",
      details: "info@tutienda.com",
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
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contacto</h1>
        <p className="text-gray-600">
          ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte.
          Contáctanos y te responderemos lo antes posible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((info) => (
          <Card key={info.title}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4 text-primary">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Asunto
              </label>
              <Input id="subject" placeholder="Asunto de tu mensaje" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje aquí"
                className="min-h-[150px]"
              />
            </div>
            <Button className="w-full">Enviar Mensaje</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12 pt-12 border-t">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Preguntas Frecuentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold mb-2">¿Cuál es el tiempo de entrega?</h3>
            <p className="text-gray-600">
              El tiempo de entrega varía según tu ubicación, generalmente entre 3-5
              días hábiles para áreas urbanas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">¿Tienen política de devoluciones?</h3>
            <p className="text-gray-600">
              Sí, ofrecemos 30 días para devoluciones en productos sin usar y en su
              empaque original.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">¿Hacen envíos internacionales?</h3>
            <p className="text-gray-600">
              Actualmente solo realizamos envíos dentro del país. Estamos
              trabajando para expandir nuestros servicios.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">¿Cómo puedo rastrear mi pedido?</h3>
            <p className="text-gray-600">
              Una vez realizado tu pedido, recibirás un correo con el número de
              seguimiento para rastrear tu envío.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}