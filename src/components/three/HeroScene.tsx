"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, Float, MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function SceneContent() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const isTablet = viewport.width < 8;

  // Parallax group ref
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Parallax effect: smoothly interpolate group rotation based on pointer
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
        <Icosahedron 
          args={[isMobile ? 1.5 : 2, isMobile ? 0 : 1]} 
          position={isMobile ? [0, 2, -2] : [-3, 0, -2]}
        >
          <MeshTransmissionMaterial
            backside
            thickness={0.5}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            color="#ffffff"
          />
        </Icosahedron>
      </Float>

      {/* 3D Depth Card */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={isMobile ? [0, -1, 0] : [3, 0, 0]}>
          {/* Card Base */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[isMobile ? 2.5 : 3.5, isMobile ? 3.5 : 5, 0.1]} />
            <meshPhysicalMaterial 
              color="#1a1a1a" 
              metalness={0.8}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
          
          {/* Inner Photo Area Placeholder */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[isMobile ? 2.3 : 3.2, isMobile ? 3.3 : 4.7]} />
            <meshBasicMaterial color="#333333" />
            {/* The user can replace the above with the following once the image is uploaded:
              const texture = useTexture('/profile.jpg');
              <meshBasicMaterial map={texture} />
            */}
          </mesh>

          {/* Glass Overlay (Depth effect) */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[isMobile ? 2.6 : 3.7, isMobile ? 3.6 : 5.2, 0.05]} />
            <MeshTransmissionMaterial
              transmission={0.9}
              thickness={0.1}
              roughness={0.1}
              ior={1.4}
              color="#ffffff"
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export function HeroScene({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    // Static fallback for prefers-reduced-motion
    return (
      <div className={`${className} bg-gradient-to-br from-background via-background to-accent/10`} />
    );
  }

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#00ffcc" />
        <pointLight position={[0, 5, 5]} intensity={1} color="#ff00cc" />
        
        <SceneContent />
      </Canvas>
    </div>
  );
}
