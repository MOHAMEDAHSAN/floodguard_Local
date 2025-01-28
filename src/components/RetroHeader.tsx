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
        size: 0.8,
        height: 0.3,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });
      
      // Create material with gradient-like effect
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00BCD4,
        specular: 0xffffff,
        shininess: 100,
        reflectivity: 1
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      scene.add(textMesh);

      // Add subtle rotation animation
      textMesh.rotation.x = 0.1;
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
        renderer.render(scene, camera);
      };
      animate();
    });

    // Add dramatic lighting
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 1);
    scene.add(frontLight);
    
    const topLight = new THREE.DirectionalLight(0x00BCD4, 0.8);
    topLight.position.set(0, 1, 0);
    scene.add(topLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
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
      <div ref={containerRef} className="h-40 w-full bg-gradient-to-b from-primary-dark/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full text-center text-primary-dark">
        <p className="text-lg font-semibold italic">Never miss a flood warning</p>
      </div>
    </div>
  );
};