import { useLoader, type Vector3 } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRef } from 'react';

interface ModelProps {
  position?: Vector3;
  file: string;
  scale?: number;
}

export default function Model({
  position = [0, -0.5, 0],
  file,
  scale = 1.5,
}: ModelProps) {
  const modelRef = useRef<THREE.Object3D>(null);
  const gltf = useLoader(GLTFLoader, file);

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <primitive object={gltf.scene} ref={modelRef} />
    </group>
  );
}
