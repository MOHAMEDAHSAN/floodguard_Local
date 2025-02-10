
import React from "react";

export const HeroSection = () => {
  return (
    <div className="h-[50vh] bg-hero-pattern bg-cover bg-center relative mt-16">
      <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm">
        <div className="container h-full flex items-center justify-center">
          <div className="text-center space-y-4 animate-fadeIn">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              Flood Simulation Model
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Advanced analytics and real-time assessment of water level rise based on
              environmental parameters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
