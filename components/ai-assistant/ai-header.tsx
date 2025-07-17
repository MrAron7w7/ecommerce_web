import { AiAssistantIcon } from "./ai-assistant-icon";
import { X, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function AiHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="rounded-lg bg-primary p-2">
            <AiAssistantIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
              >
                <Sparkles className="h-3 w-3 text-primary" />
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Asistente con IA</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <h3 className="font-semibold">Asistente de compras</h3>
          <p className="text-xs text-muted-foreground">En línea</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
