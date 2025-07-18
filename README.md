# Ecommerce Web - Plataforma de Comercio Electrónico

## 📝 Descripción

Ecommerce Web es una plataforma de comercio electrónico moderna y completa desarrollada con Next.js y TypeScript. El proyecto implementa una arquitectura robusta que incluye un panel de administración para gestionar productos y categorías, así como una interfaz de usuario atractiva para los clientes.

## 🚀 Características Principales

- **Interfaz de Usuario Moderna**: Diseño responsive y atractivo utilizando Tailwind CSS y shadcn/ui
- **Panel de Administración**: Gestión completa de productos y categorías
- **Carrito de Compras**: Funcionalidad completa de carrito de compras
- **Filtros de Productos**: Sistema de filtrado por categorías y precios
- **Base de Datos**: Integración con Prisma para una gestión eficiente de datos

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - React Hook Form
  - Zod

- **Backend**:
  - Prisma ORM
  - PostgreSQL

## 🤖 IAs Utilizadas en el Desarrollo

- **ChatGPT**: Utilizado para la organización del proyecto, definición de modelos y estructura técnica
- **Claude AI**: Empleado para el diseño de la interfaz web y experiencia de usuario
- **DeepSeek**: Consultado para resolver dudas generales y optimizaciones

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- PostgreSQL
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/MrAron7w7/ecommerce_web.git
cd ecommerce_web
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
```

4. Ejecutar migraciones de la base de datos:
```bash
npx prisma migrate dev
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## 📁 Estructura del Proyecto

```
├── actions/         # Acciones del servidor
├── app/             # Rutas y páginas de la aplicación
├── components/      # Componentes reutilizables
├── lib/            # Utilidades y configuraciones
├── prisma/         # Esquema y migraciones de la base de datos
├── public/         # Archivos estáticos
└── types/          # Definiciones de tipos TypeScript
```

## 👥 Equipo

- Arón Magallanes
- Jimmy Rebata

## 🌐 Despliegue

La aplicación está desplegada en Render y puede ser accedida en: [URL_DE_LA_APLICACION]

