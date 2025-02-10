
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const RiskAnalysis = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
        <Dialog>
          <DialogTrigger asChild>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-primary-dark dark:text-cyan-400">
                Antecedent Precipitation
              </h3>
              <img 
                src="/lovable-uploads/0141ae5a-405b-4713-8719-8dfe5294503c.png" 
                alt="Flood Simulation Formula"
                className="w-full h-[400px] object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4 text-primary-dark dark:text-cyan-400">
              Antecedent Precipitation
            </h2>
            <img 
              src="/lovable-uploads/0141ae5a-405b-4713-8719-8dfe5294503c.png" 
              alt="Flood Simulation Formula"
              className="w-full h-auto"
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/80 backdrop-blur-lg dark:bg-[#0f1117]/80 rounded-xl p-8 shadow-lg space-y-6 border border-white/20 dark:border-white/10 transition-all duration-500">
        <div className="h-40 rounded-lg overflow-hidden mb-6">
          <div className="w-full h-full bg-river-pattern bg-cover bg-center transform hover:scale-110 transition-transform duration-500"></div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary-dark dark:text-cyan-400">
            Risk Factors Analysis
          </h3>
          <ul className="space-y-3 text-sm dark:text-gray-300/90">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>High rainfall intensity increases flood risk significantly</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>Soil saturation affects water absorption capacity</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>Good drainage systems help mitigate flood risks</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>Urban areas are more susceptible to flooding</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <span>Vegetation cover helps reduce flood risk</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
