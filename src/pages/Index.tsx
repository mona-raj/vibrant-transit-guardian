
import { Train, TrafficCone, Truck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 py-6">
        <nav className="flex justify-between items-center mb-16">
          <Logo />
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              About
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </nav>

        <main>
          <div className="max-w-3xl mx-auto text-center mb-16 fade-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
              AI-Powered Transport: Safer Roads, Smarter Rails
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of transport safety with our cutting-edge AI technology.
              Predictive maintenance, real-time monitoring, and intelligent analytics working together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="fade-up" style={{ animationDelay: "0.4s" }}>
              <FeatureCard
                title="Railway Fault Detection"
                description="Advanced AI systems monitoring track conditions and predicting maintenance needs in real-time."
                icon={Train}
                gradient="linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)"
              />
            </div>
            <div className="fade-up" style={{ animationDelay: "0.6s" }}>
              <FeatureCard
                title="Highway Maintenance"
                description="Smart forecasting for road maintenance, optimizing safety and resource allocation."
                icon={TrafficCone}
                gradient="linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)"
              />
            </div>
            <div className="fade-up" style={{ animationDelay: "0.8s" }}>
              <FeatureCard
                title="Vehicle Monitoring"
                description="Real-time load monitoring and safety analytics for commercial vehicles."
                icon={Truck}
                gradient="linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)"
              />
            </div>
          </div>

          <div className="text-center fade-up" style={{ animationDelay: "1s" }}>
            <p className="text-sm text-gray-500">
              Trusted by leading transport authorities worldwide
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
