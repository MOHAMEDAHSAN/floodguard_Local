import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1),
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.TorusGeometry(0.8, 0.2, 16, 100),
      new THREE.DodecahedronGeometry(0.8),
      new THREE.RingGeometry(0.5, 1, 32),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.6),
    ];

    // Function to get a distributed position
    const getDistributedPosition = (index: number, total: number) => {
      const gridSize = Math.ceil(Math.sqrt(total));
      const cellSize = 40; // Increased cell size for better spread
      
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      
      const randomOffset = () => (Math.random() - 0.5) * 25; // More randomness
      
      return {
        x: (col - gridSize/2) * cellSize + randomOffset(),
        y: (row - gridSize/2) * cellSize + randomOffset(),
        z: Math.random() * 40 - 50 // More depth variation
      };
    };

    // Create more shapes with distributed positions
    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x00BCD4),
        transparent: true,
        opacity: 0.25 + Math.random() * 0.35, // Increased opacity
        wireframe: true,
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      const position = getDistributedPosition(i, 50);
      shape.position.set(position.x, position.y, position.z);
      
      // Random initial rotation
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Larger scale range
      const scale = 0.8 + Math.random() * 3.5;
      shape.scale.set(scale, scale, scale);
      
      shapes.push(shape);
      scene.add(shape);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Position camera
    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        // More varied rotation speeds
        shape.rotation.x += 0.0005 + (i * 0.0001);
        shape.rotation.y += 0.001 + (i * 0.0001);
        
        // Enhanced mouse interaction
        shape.position.x += (mouseX * 0.03 - shape.position.x * 0.001) * 0.01;
        shape.position.y += (-mouseY * 0.03 - shape.position.y * 0.001) * 0.01;
        
        // Enhanced floating motion
        const time = Date.now() * 0.001;
        const floatSpeed = 0.003 + (i * 0.0002);
        shape.position.y += Math.sin(time + i * 0.5) * floatSpeed;
        shape.position.x += Math.cos(time + i * 0.7) * floatSpeed;
        shape.position.z += Math.sin(time * 0.3 + i) * 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};