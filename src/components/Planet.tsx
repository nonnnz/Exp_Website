"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface Comment {
  id: number;
  text: string;
  author: string;
  lat: number;
  lng: number;
}

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function CommentPin({ text, author, position }: { text: string; author: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#FFA630" />
      </mesh>
      <Text
        position={[0, 0.12, 0]}
        fontSize={0.08}
        color="#EFF4FF"
        anchorX="center"
        anchorY="bottom"
        maxWidth={0.8}
      >
        {text}
      </Text>
      <Text
        position={[0, 0.04, 0]}
        fontSize={0.05}
        color="#FFA630"
        anchorX="center"
        anchorY="bottom"
      >
        {`— ${author}`}
      </Text>
    </group>
  );
}

function PlanetMesh({ comments }: { comments: Comment[] }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const pins = useMemo(() => {
    return comments.map((c) => ({
      ...c,
      position: latLngToVector3(c.lat, c.lng, 2.15) as [number, number, number],
    }));
  }, [comments]);

  return (
    <group ref={groupRef}>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#0B3D91" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshStandardMaterial color="#1a5bc4" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Wireframe grid */}
      <mesh>
        <sphereGeometry args={[2.01, 24, 24]} />
        <meshBasicMaterial color="#FFA630" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Comment pins */}
      {pins.map((p) => (
        <CommentPin key={p.id} text={p.text} author={p.author} position={p.position} />
      ))}
    </group>
  );
}

export default function Planet({ comments }: { comments: Comment[] }) {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#FFA630" />
        <Suspense fallback={null}>
          <PlanetMesh comments={comments} />
        </Suspense>
        <OrbitControls enableZoom enablePan={false} minDistance={3.5} maxDistance={8} />
      </Canvas>
    </div>
  );
}
