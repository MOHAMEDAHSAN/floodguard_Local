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
    ];

    // Function to get a distributed position
    const getDistributedPosition = (index: number, total: number) => {
      // Create a grid-like distribution around the viewport
      const gridSize = Math.ceil(Math.sqrt(total));
      const cellSize = 30; // Size of each grid cell
      
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      
      // Add some randomness to the grid positions
      const randomOffset = () => (Math.random() - 0.5) * 15;
      
      return {
        x: (col - gridSize/2) * cellSize + randomOffset(),
        y: (row - gridSize/2) * cellSize + randomOffset(),
        z: Math.random() * 20 - 30 // Varied depth
      };
    };

    // Create more shapes with distributed positions
    for (let i = 0; i < 35; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0x00BCD4),
        transparent: true,
        opacity: 0.2 + Math.random() * 0.3,
        wireframe: true,
      });
      
      const shape = new THREE.Mesh(geometry, material);
      
      // Get distributed position
      const position = getDistributedPosition(i, 35);
      shape.position.set(position.x, position.y, position.z);
      
      // Random initial rotation
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      // Random scale for variety, with some shapes being larger
      const scale = 0.5 + Math.random() * 2;
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
        // Unique rotation speeds for each shape
        shape.rotation.x += 0.001 + (i * 0.0001);
        shape.rotation.y += 0.002 + (i * 0.0001);
        
        // More responsive mouse interaction
        shape.position.x += (mouseX * 0.02 - shape.position.x * 0.001) * 0.01;
        shape.position.y += (-mouseY * 0.02 - shape.position.y * 0.001) * 0.01;
        
        // Add floating motion with different frequencies for each shape
        const time = Date.now() * 0.001;
        const floatSpeed = 0.002 + (i * 0.0001);
        shape.position.y += Math.sin(time + i * 0.5) * floatSpeed;
        shape.position.x += Math.cos(time + i * 0.7) * floatSpeed;
        
        // Add slight z-axis movement
        shape.position.z += Math.sin(time * 0.5 + i) * 0.01;
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