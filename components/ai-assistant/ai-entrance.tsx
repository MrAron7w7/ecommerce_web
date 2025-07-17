"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AiCharacter } from "./ai-character";
import { Dialog, DialogContent } from "../ui/dialog";

export function AiEntrance() {
  const [showEntrance, setShowEntrance] = useState(true);

  useEffect(() => {
    // Solo mostrar una vez por sesión
    const shown = sessionStorage.getItem("aiEntranceShown");
    if (shown) {
      setShowEntrance(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowEntrance(false);
      sessionStorage.setItem("aiEntranceShown", "true");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showEntrance && (
          <Dialog open={showEntrance}>
            <DialogContent className="max-w-md overflow-hidden border-0 bg-transparent shadow-none">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <AiCharacter />
              </motion.div>

              {/* Efecto de partículas */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 1.5] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 10,
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </motion.div>
              ))}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Opciones para el AiAssistant */}
      {/*
        Si necesitas mostrar el AiAssistant después:
        1. Importa el componente: import { AiAssistant } from "./ai-assistant";
        2. Descomenta este bloque
        3. Asegúrate de manejar el estado adecuadamente

      <AnimatePresence>
        {!showEntrance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AiAssistant />
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </>
  );
}
