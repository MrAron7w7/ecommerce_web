import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AiMessageProps {
  content: string;
  role: "user" | "assistant";
  isThinking?: boolean;
}

export function AiMessage({ content, role, isThinking }: AiMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3 p-4",
        role === "assistant" ? "bg-muted/40" : "bg-background"
      )}
    >
      <div>
        <Avatar className="h-8 w-8">
          {role === "assistant" ? (
            <>
              <AvatarImage src="/ai-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/user-avatar.png" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </>
          )}
        </Avatar>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="font-medium text-foreground/80">
          {role === "assistant" ? "Asistente" : "Tú"}
        </p>
        {isThinking ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Pensando...</span>
          </div>
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>
    </motion.div>
  );
}
