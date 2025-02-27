
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  gradient,
}: FeatureCardProps) => {
  return (
    <div className="feature-card" style={{ background: gradient }}>
      <div className="relative z-10">
        <div className="mb-4 p-3 inline-block rounded-xl bg-white/10">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </div>
  );
};
