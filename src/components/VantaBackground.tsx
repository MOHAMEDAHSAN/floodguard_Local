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
    if (!vantaRef.current || !isScriptLoaded || !window.VANTA) return;

    try {
      vantaEffect.current = window.VANTA.CLOUDS({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0xe8f7ff,
        cloudColor: 0xffffff,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6533,
        sunlightColor: 0xff9933,
        speed: 0.6,
        scale: 1.5,
        scaleMobile: 1.5,
        skyColor: 0x68b8d7,
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
  }, [isScriptLoaded]);

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