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
        size: 1.5,
        height: 0.2,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 16
      });
      
      // Create a sleek, modern material
      const textMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x006064,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x006064,
        emissiveIntensity: 0.1
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);

      // Smooth floating animation
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
        textMesh.position.y = Math.sin(Date.now() * 0.001) * 0.03;
        renderer.render(scene, camera);
      };
      animate();
    });

    // Modern lighting setup
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(1, 1, 2);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0xB2EBF2, 1);
    fillLight.position.set(-1, 0.5, -1);
    scene.add(fillLight);
    
    const rimLight = new THREE.DirectionalLight(0x80DEEA, 1.5);
    rimLight.position.set(0, -1, -2);
    scene.add(rimLight);
    
    const ambientLight = new THREE.AmbientLight(0xE0F7FA, 0.8);
    scene.add(ambientLight);

    camera.position.z = 6;

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
    <div className="relative">
      <div ref={containerRef} className="h-64 w-full bg-gradient-to-b from-primary-dark via-primary/5 to-transparent" />
      <div className="absolute bottom-6 left-0 w-full text-center">
        <p className="text-2xl font-light text-primary-dark tracking-widest uppercase">
          Advanced Flood Warning System
        </p>
      </div>
    </div>
  );
};