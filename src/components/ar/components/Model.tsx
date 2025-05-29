import { useLoader, type Vector3 } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRef } from 'react';
import { apiEndpoints } from '../../../apiEndpoints';

interface ModelProps {
  position?: Vector3;
  file: string;
}

export default function Model({ position = [0, -0.5, 0], file }: ModelProps) {
  const modelRef = useRef<THREE.Object3D>(null);
  console.log('Loading model from:', file);

  const gltf = useLoader(GLTFLoader, apiEndpoints.upload.getResource(file));

  return (
    <group position={position}>
      <primitive object={gltf.scene} ref={modelRef} />
    </group>
  );
}
