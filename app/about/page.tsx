import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Medal,
  Trophy,
  Shield,
  HeartHandshake,
  Users,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Carlos Martínez",
      role: "Fundador & CEO",
      bio: "Apasionado por el deporte y el emprendimiento con más de 15 años en el sector retail.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
    {
      name: "Ana Rodríguez",
      role: "Directora de Compras",
      bio: "Experta en selección de productos deportivos de alta calidad.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      name: "David López",
      role: "Jefe de Marketing",
      bio: "Especialista en branding digital y estrategias de crecimiento.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    {
      name: "Sofía García",
      role: "Servicio al Cliente",
      bio: "Comprometida con ofrecer la mejor experiencia de compra a nuestros clientes.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
  ];

  const stats = [
    {
      value: "10+",
      label: "Años en el mercado",
      icon: <Clock className="h-8 w-8" />,
    },
    {
      value: "50K+",
      label: "Clientes satisfechos",
      icon: <Users className="h-8 w-8" />,
    },
    {
      value: "100+",
      label: "Marcas colaboradoras",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      value: "5",
      label: "Premios industriales",
      icon: <Trophy className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 text-center md:py-24">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <Medal className="h-4 w-4" />
            Líderes en equipamiento deportivo
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Nuestra pasión por el deporte
          </h1>
          <p className="max-w-[700px] text-gray-600 md:text-xl">
            En SportShop, nos dedicamos a proporcionar los mejores productos
            deportivos para ayudarte a alcanzar tus metas.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nuestra historia</h2>
            <p className="text-gray-600 mb-4">
              Fundada en 2013, SportShop comenzó como una pequeña tienda local
              con un gran sueño: revolucionar la forma en que las personas
              compran equipamiento deportivo.
            </p>
            <p className="text-gray-600 mb-4">
              Lo que empezó como un modesto negocio familiar, hoy se ha
              convertido en un referente del sector, gracias a nuestro
              compromiso con la calidad, la innovación y el servicio excepcional
              al cliente.
            </p>
            <p className="text-gray-600 mb-6">
              Cada día trabajamos para ofrecerte las últimas novedades en
              tecnología deportiva, seleccionando cuidadosamente cada producto
              que forma parte de nuestro catálogo.
            </p>
            <Button asChild>
              <Link href="/products">Descubre nuestros productos</Link>
            </Button>
          </div>
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {/* Aquí iría una imagen o video */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
              <span className="text-lg font-medium text-primary">
                Nuestra tienda
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-12">
        <div className="container px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Nuestros valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <HeartHandshake className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Pasión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Amamos el deporte tanto como tú. Cada producto es seleccionado
                  con el mismo entusiasmo con el que lo usarás.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Integridad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Honestidad y transparencia en cada aspecto de nuestro negocio,
                  desde la descripción de productos hasta las políticas de
                  devolución.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Sostenibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nos comprometemos con prácticas comerciales responsables y con
                  ofrecer productos que respeten el medio ambiente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary/5 py-12 w-full">
        <div className="container px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit text-primary mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container py-12 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Conoce a nuestro equipo
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="mt-2 mb-4">
                  {member.role}
                </CardDescription>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full flex flex-col items-center bg-primary text-primary-foreground py-16">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Listo para llevar tu rendimiento al siguiente nivel?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Descubre nuestra selección de productos deportivos de alta calidad
            diseñados para ayudarte a alcanzar tus metas.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/products">Ver productos</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
