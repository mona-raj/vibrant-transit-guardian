
import { CircuitBoard } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <CircuitBoard className="w-8 h-8 text-blue-600" />
      <span className="font-semibold text-xl tracking-tight">TransportAI</span>
    </div>
  );
};
