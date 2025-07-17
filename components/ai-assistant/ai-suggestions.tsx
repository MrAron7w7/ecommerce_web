import { Button } from "../ui/button";

const SUGGESTIONS = [
  "¿Qué productos están en oferta?",
  "Recomiéndame electrónicos",
  "¿Cómo realizo un pedido?",
  "¿Cuáles son los métodos de pago?",
];

export function AiSuggestions({
  onSelect,
}: {
  onSelect: (question: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {SUGGESTIONS.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          className="h-auto whitespace-normal py-2 text-left text-xs"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
