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
        backgroundColor: isDark ? 0x0a0f1a : 0xffffff,
        cloudColor: isDark ? 0x000000 : 0x4a4a4a,
        cloudShadowColor: isDark ? 0x000000 : 0x4a4a4a,
        sunColor: isDark ? 0x0a0f1a : 0xffffff,
        sunGlareColor: isDark ? 0x151b29 : 0xe0e0e0,
        sunlightColor: isDark ? 0x151b29 : 0xe0e0e0,
        speed: 1.2,
        scale: 3.0,
        scaleMobile: 3.0,
        skyColor: isDark ? 0x0a0f1a : 0xffffff,
        quantity: 8,
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