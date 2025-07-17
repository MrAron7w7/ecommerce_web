import { motion } from "framer-motion";

export function AiLoading() {
  return (
    <div className="flex items-center justify-center space-x-2 px-4 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="h-2 w-2 rounded-full bg-primary"
        />
      ))}
    </div>
  );
}
