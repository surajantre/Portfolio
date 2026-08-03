"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";

function CyberneticBrain() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const { progress } = useProgress();
  const setLoaded = useAppStore((state) => state.setLoaded);

  useEffect(() => {
    if (progress === 100) setLoaded(true);
  }, [progress, setLoaded]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return; // Disable parallax on touch devices
      
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Procedurally generate the Neural Web and Connections
  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = 350;
    const maxConnectionDistance = 0.45;
    
    const nodes: THREE.Vector3[] = [];
    
    // Generate nodes clustered in two hemispheres to resemble a brain
    for (let i = 0; i < nodeCount; i++) {
      const isRightHemi = Math.random() > 0.5;
      const xOffset = isRightHemi ? 0.35 : -0.35;
      
      // Random spherical distribution
      const radius = 0.8 + Math.random() * 0.6; 
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Squash slightly on Y and Z to make it brain-shaped
      const x = radius * Math.sin(phi) * Math.cos(theta) * 0.7 + xOffset;
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = radius * Math.cos(phi) * 0.9;
      
      nodes.push(new THREE.Vector3(x, y, z));
    }
    
    const posArray = new Float32Array(nodes.length * 3);
    const lineArray: number[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      posArray[i * 3] = nodes[i].x;
      posArray[i * 3 + 1] = nodes[i].y;
      posArray[i * 3 + 2] = nodes[i].z;
      
      // Calculate distances and create connections (synapses)
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxConnectionDistance) {
          lineArray.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }
    
    return {
      nodePositions: posArray,
      linePositions: new Float32Array(lineArray)
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Mouse follow parallax for the entire cybernetic brain
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.4,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.4,
        0.05
      );
      
      // Gentle breathing/floating rotation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    if (ringsRef.current) {
      // Rotate the robotic casing rings on different axes
      ringsRef.current.children.forEach((ring, index) => {
        const speed = index % 2 === 0 ? 0.5 : -0.4;
        ring.rotation.x += delta * speed * 0.5;
        ring.rotation.y += delta * speed;
      });
    }

    if (linesRef.current) {
      // Pulse the synaptic connections opacity
      const material = linesRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        
        {/* The Neural Web (Connections) */}
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#a855f7" 
            transparent 
            opacity={0.2} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* The Neurons (Nodes) */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.03} 
            color="#3b82f6" 
            transparent 
            opacity={0.8} 
            sizeAttenuation 
            depthWrite={false} 
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Robotic Cyber-Casing (Rings) */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.9, 0.015, 16, 100]} />
            <meshStandardMaterial color="#8b5cf6" metalness={1} roughness={0.2} emissive="#8b5cf6" emissiveIntensity={0.5} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[2.0, 0.01, 16, 100]} />
            <meshStandardMaterial color="#3b82f6" metalness={1} roughness={0.2} emissive="#3b82f6" emissiveIntensity={0.8} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, -Math.PI / 6]}>
            <torusGeometry args={[1.85, 0.02, 16, 100]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} transparent opacity={0.3} />
          </mesh>
        </group>

      </Float>
    </group>
  );
}

export function HeroScene({ className }: { className?: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const setHovering3D = useAppStore((state) => state.setHovering3D);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={`flex items-center justify-center ${className || ""}`}>
        <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-3xl opacity-50" />
      </div>
    );
  }

  return (
    <div 
      className={className}
      onMouseEnter={() => setHovering3D(true)}
      onMouseLeave={() => setHovering3D(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]} // Cap DPR for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#4338ca" />
        
        <CyberneticBrain />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
