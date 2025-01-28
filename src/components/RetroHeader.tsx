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

    // Create text geometry
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('FloodGuard', {
        font: font,
        size: 1.2,
        height: 0.4,
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 8
      });
      
      // Create material with modern metallic effect
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00BCD4,
        specular: 0xffffff,
        shininess: 150,
        reflectivity: 1,
        flatShading: false
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);

      // Add dynamic animation
      textMesh.rotation.x = 0.15;
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y = Math.sin(Date.now() * 0.0008) * 0.15;
        textMesh.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        renderer.render(scene, camera);
      };
      animate();
    });

    // Enhanced dramatic lighting
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 0, 2);
    scene.add(frontLight);
    
    const topLight = new THREE.DirectionalLight(0x00BCD4, 1);
    topLight.position.set(0, 2, 0);
    scene.add(topLight);
    
    const backLight = new THREE.DirectionalLight(0x4DD0E1, 0.8);
    backLight.position.set(0, 0, -2);
    scene.add(backLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    camera.position.z = 5;

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
      <div ref={containerRef} className="h-52 w-full bg-gradient-to-b from-primary-dark/20 via-primary/10 to-transparent" />
      <div className="absolute bottom-4 left-0 w-full text-center">
        <p className="text-xl font-semibold italic text-primary-dark tracking-wide">
          Never miss a flood warning
        </p>
      </div>
    </div>
  );
};