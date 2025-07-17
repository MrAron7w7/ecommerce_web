import { motion } from "framer-motion";

export function AiCharacter() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative h-24 w-24"
    >
      {/* Cabeza */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full bg-primary"
      >
        {/* Ojos */}
        <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-white"></div>
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white"></div>

        {/* Boca */}
        <motion.div
          animate={{
            scaleY: [1, 0.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-3 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-white"
        ></motion.div>
      </motion.div>

      {/* Cuerpo */}
      <div className="absolute left-1/2 top-12 h-12 w-8 -translate-x-1/2 rounded-b-full bg-primary/90"></div>

      {/* Brazos */}
      <motion.div
        animate={{
          rotate: [-20, 20, -20],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute left-3 top-12 h-6 w-2 origin-top rounded-full bg-primary/80"
      ></motion.div>
      <motion.div
        animate={{
          rotate: [20, -20, 20],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute right-3 top-12 h-6 w-2 origin-top rounded-full bg-primary/80"
      ></motion.div>

      {/* Mensaje flotante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-8 left-1/2 w-48 -translate-x-1/2 rounded-lg bg-popover px-3 py-2 text-center text-sm font-medium text-popover-foreground shadow-lg"
      >
        ¡Hoy seré tu asistente!
        <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-popover"></div>
      </motion.div>
    </motion.div>
  );
}
