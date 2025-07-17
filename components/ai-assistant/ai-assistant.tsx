"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AiAssistantIcon } from "./ai-assistant-icon";
import { AiMessage } from "./ai-message";
import { AiHeader } from "./ai-header";
import { AiFooter } from "./ai-footer";
import { AiSuggestions } from "./ai-suggestions";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const path = usePathname();
  // const isAdminRoute: boolean = path.startsWith("/dashboard");

  // Mensajes de ejemplo
  const [messages, setMessages] = useState([
    {
      content:
        "¡Hola! Soy tu asistente de compras. ¿En qué puedo ayudarte hoy?",
      role: "assistant" as const,
    },
    {
      content: "¿Podrías recomendarme productos en oferta?",
      role: "user" as const,
    },
    {
      content:
        "Claro, actualmente tenemos excelentes promociones en electrónicos, moda y hogar. ¿Te interesa alguna categoría en particular?",
      role: "assistant" as const,
    },
  ]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = { content: inputValue, role: "user" as const };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsThinking(true);

    // Simular respuesta del asistente después de un breve retraso
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: getAiResponse(inputValue),
          role: "assistant" as const,
        },
      ]);
      setIsThinking(false);
    }, 1500);
  };

  const getAiResponse = (question: string) => {
    // En una implementación real, esto conectaría con un servicio de IA
    const responses: Record<string, string> = {
      ofertas:
        "Tenemos estas ofertas especiales: 📱 Smartphones con 20% de descuento, 👗 Moda verano 30% off, 🏠 Electrodomésticos con envío gratis. ¿Quieres que te muestre algún producto en detalle?",
      electrónicos:
        "En electrónicos destacamos: 🎧 Audífonos inalámbricos por $99, 📱 Smartphone X1 con cámara 108MP, 💻 Laptop ultradelgada con 12h de batería. ¿Te interesa alguno?",
      pedido:
        "Para realizar un pedido: 1) Selecciona tus productos 2) Ve al carrito 3) Elige método de pago 4) Confirma tu compra. ¿Necesitas ayuda con algún paso?",
      pago: "Aceptamos: 💳 Tarjetas crédito/débito, 📱 PayPal, 🏦 Transferencias bancarias y 💵 Efectivo en tiendas físicas.",
    };

    const lowerQuestion = question.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(keyword)) {
        return response;
      }
    }

    return `He recibido tu pregunta sobre "${question}". En una implementación completa, te proporcionaría una respuesta detallada conectada a nuestro catálogo de productos. ¿Hay algo más en lo que pueda ayudarte?`;
  };

  const handleSuggestionSelect = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative"
          >
            <Card className="h-[500px] w-[350px] overflow-hidden shadow-xl">
              <div className="flex h-full flex-col">
                <AiHeader onClose={() => setIsOpen(false)} />

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col">
                    {messages.map((message, index) => (
                      <AiMessage
                        key={index}
                        content={message.content}
                        role={message.role}
                      />
                    ))}

                    {isThinking && (
                      <AiMessage
                        content=""
                        role="assistant"
                        isThinking={true}
                      />
                    )}

                    {messages.length <= 3 && (
                      <AiSuggestions onSelect={handleSuggestionSelect} />
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <AiFooter
                  value={inputValue}
                  onChange={setInputValue}
                  onSubmit={handleSubmit}
                  onSuggestionSelect={handleSuggestionSelect}
                />
              </div>
            </Card>
          </motion.div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="origin-bottom"
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-14 w-14 rounded-full p-0 shadow-lg"
                >
                  <AiAssistantIcon className="h-6 w-6" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Asistente de compras</p>
            </TooltipContent>
          </Tooltip>
        )}
      </AnimatePresence>
    </div>
  );
}
