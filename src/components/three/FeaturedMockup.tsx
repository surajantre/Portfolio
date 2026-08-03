"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PresentationControls, Text, RoundedBox, MeshTransmissionMaterial, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlassScreen({ title, category }: { title: string; category: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const scale = viewport.width < 4 ? 0.75 : 1;

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating/wobble effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group scale={scale}>
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap
      >
        <Float rotationIntensity={0.4}>
          {/* Outer Screen Frame */}
          <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.1} smoothness={4}>
            <MeshTransmissionMaterial 
              backside
              samples={4}
              thickness={0.2}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.1}
              distortionScale={0.3}
              temporalDistortion={0.1}
              clearcoat={1}
              color="#ffffff"
            />
          </RoundedBox>

          {/* Inner Display Area (Simulated UI) */}
          <RoundedBox args={[3.0, 2.0, 0.11]} radius={0.05} smoothness={4} position={[0, 0, -0.01]}>
            <meshStandardMaterial color="#050505" />
          </RoundedBox>
          
          {/* Abstract UI Elements inside the screen */}
          <group position={[0, 0, 0.06]}>
            <Text
              position={[-1.3, 0.7, 0]}
              fontSize={0.1}
              color="#a855f7"
              anchorX="left"
              anchorY="top"
              font="/fonts/GeistMono.ttf" // Fallback to standard text if font missing
            >
              {category.toUpperCase()}
            </Text>
            <Text
              position={[-1.3, 0.45, 0]}
              fontSize={0.25}
              color="#ffffff"
              anchorX="left"
              anchorY="top"
              maxWidth={2.5}
            >
              {title}
            </Text>
            
            {/* Abstract code/data blocks */}
            <mesh position={[-0.6, -0.2, 0]}>
              <planeGeometry args={[1.4, 0.6]} />
              <meshBasicMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.6, -0.2, 0]}>
              <planeGeometry args={[0.8, 0.6]} />
              <meshBasicMaterial color="#2d2d2d" />
            </mesh>
            <mesh position={[-0.2, -0.7, 0]}>
              <planeGeometry args={[2.2, 0.2]} />
              <meshBasicMaterial color="#8b5cf6" />
            </mesh>
          </group>
        </Float>
      </PresentationControls>

      {/* Realistic Shadow beneath the screen */}
      <ContactShadows position={[0, -1.4, 0]} opacity={0.7} scale={10} blur={2.5} far={4} />
    </group>
  );
}

export function FeaturedMockup({ title, category }: { title: string; category: string }) {
  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <GlassScreen title={title} category={category} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
