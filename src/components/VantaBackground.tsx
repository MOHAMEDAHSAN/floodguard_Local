
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA?: {
      CLOUDS: (config: any) => any;
    };
  }
}

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const checkVanta = () => {
      if (window.VANTA) {
        setIsScriptLoaded(true);
      } else {
        setTimeout(checkVanta, 100);
      }
    };

    checkVanta();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!vantaRef.current || !isScriptLoaded || !window.VANTA) return;

    try {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      vantaEffect.current = window.VANTA.CLOUDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: isDark ? 0x1a1f2c : 0xf0f8ff,
        cloudColor: isDark ? 0x2a3142 : 0xffffff,
        cloudShadowColor: isDark ? 0x000000 : 0x183550,
        sunColor: isDark ? 0x1a1f2c : 0xff9919,
        sunGlareColor: isDark ? 0x2a3142 : 0xff6533,
        sunlightColor: isDark ? 0x2a3142 : 0xff9933,
        speed: 0.6,
        scale: 1.5,
        scaleMobile: 1.5,
        skyColor: isDark ? 0x141824 : 0x87ceeb,
        quantity: 4,
      });

      return () => {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }
      };
    } catch (error) {
      console.error('Error initializing VANTA:', error);
    }
  }, [isScriptLoaded, isDark]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-500"
      style={{
        opacity: isScriptLoaded ? 1 : 0,
      }}
    />
  );
};
