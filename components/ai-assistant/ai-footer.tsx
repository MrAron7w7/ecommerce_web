import { Send, Mic } from "lucide-react";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

interface AiFooterProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSuggestionSelect: (question: string) => void;
}

export function AiFooter({ value, onChange, onSubmit }: AiFooterProps) {
  return (
    <div className="border-t">
      <form onSubmit={onSubmit} className="p-3">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="pr-12"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Usar voz (próximamente)</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={!value.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Enviar mensaje</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          El asistente puede cometer errores. Verifica la información
          importante.
        </p>
      </form>
    </div>
  );
}
