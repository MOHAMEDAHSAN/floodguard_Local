import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Declare the VANTA object type
declare const VANTA: {
  CLOUDS: (config: any) => any;
};

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Load Vanta only on client side
    const loadVanta = async () => {
      if (typeof window !== 'undefined') {
        // Dynamically import vanta
        const CLOUDS = (await import('vanta/dist/vanta.clouds.min.js')).default;
        
        if (!vantaEffect && vantaRef.current) {
          setVantaEffect(
            CLOUDS({
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
            })
          );
        }
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

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