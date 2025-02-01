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
        setTimeout(checkVanta, 100); // Check again in 100ms
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
        skyColor: 0xe8b8d7,
        cloudColor: 0xadc1de,
        cloudShadowColor: 0x183550,
        sunColor: 0xff9919,
        sunGlareColor: 0xff6533,
        sunlightColor: 0xff9933,
        speed: 1.0
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
      className="fixed inset-0 -z-10 pointer-events-none dark:hidden"
    />
  );
};