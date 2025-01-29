import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const RetroHeader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create text geometry with new settings
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('FloodGuard', {
        font: font,
        size: 2,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      // Create a modern material with our primary color scheme
      const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00BCD4,
        metalness: 0.3,
        roughness: 0.4,
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);

      // Subtle rotation animation
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y = Math.sin(Date.now() * 0.0003) * 0.05;
        renderer.render(scene, camera);
      };
      animate();
    });

    // Modern lighting setup with our color scheme
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(1, 1, 1);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xB2EBF2, 0.8);
    fillLight.position.set(-1, 0.5, -1);
    scene.add(fillLight);
    
    const ambientLight = new THREE.AmbientLight(0xE0F7FA, 0.5);
    scene.add(ambientLight);

    camera.position.z = 8;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light">
      <div ref={containerRef} className="h-48 w-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 
          className="text-6xl font-black tracking-tighter text-white"
          style={{
            textShadow: `
              ${getComputedStyle(document.documentElement).getPropertyValue('--primary-light')} 2px 2px 0px,
              ${getComputedStyle(document.documentElement).getPropertyValue('--primary')} 4px 4px 0px,
              ${getComputedStyle(document.documentElement).getPropertyValue('--primary-dark')} 6px 6px 0px,
              #006064 8px 8px 0px
            `
          }}
        >
          FloodGuard
        </h1>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center">
        <p className="text-xl font-light text-white tracking-[0.2em] italic">
          Advanced Flood Warning System
        </p>
      </div>
    </div>
  );
};