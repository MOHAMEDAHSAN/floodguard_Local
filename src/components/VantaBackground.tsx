import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Declare the VANTA object type
declare global {
  interface Window {
    VANTA: {
      CLOUDS: (config: any) => any;
    };
  }
}

export const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const loadVantaEffect = async () => {
      if (!vantaEffect && vantaRef.current) {
        try {
          // Load VANTA from CDN if not already loaded
          if (!window.VANTA) {
            await new Promise<void>((resolve) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.clouds.min.js';
              script.onload = () => resolve();
              document.head.appendChild(script);
            });
          }

          // Initialize VANTA effect
          const effect = window.VANTA.CLOUDS({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            backgroundColor: isDark ? 0x050810 : 0xf0f8ff,
            cloudColor: isDark ? 0x0a0a0a : 0x444444,
            cloudShadowColor: isDark ? 0x000000 : 0x333333,
            sunColor: isDark ? 0x050810 : 0xf0f8ff,
            sunGlareColor: isDark ? 0x0a0f1a : 0xf0f8ff,
            sunlightColor: isDark ? 0x0a0f1a : 0xf0f8ff,
            speed: 1.2,
            scale: 1.8,
            scaleMobile: 1.5,
            skyColor: isDark ? 0x030508 : 0xf0f8ff,
            quantity: 6,
          });
          setVantaEffect(effect);
        } catch (error) {
          console.error("Failed to initialize VANTA effect:", error);
        }
      }
    };

    loadVantaEffect();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect, isDark]);

  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.setOptions({
        backgroundColor: isDark ? 0x050810 : 0xf0f8ff,
        cloudColor: isDark ? 0x0a0a0a : 0x444444,
        cloudShadowColor: isDark ? 0x000000 : 0x333333,
        sunColor: isDark ? 0x050810 : 0xf0f8ff,
        sunGlareColor: isDark ? 0x0a0f1a : 0xf0f8ff,
        sunlightColor: isDark ? 0x0a0f1a : 0xf0f8ff,
        skyColor: isDark ? 0x030508 : 0xf0f8ff,
      });
    }
  }, [isDark]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
};