import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useHitTest, useXR, useXREvent } from '@react-three/xr';
import { Fragment, useRef, useState } from 'react';
import * as THREE from 'three';
import Model from './Model';

interface ModelInstance {
  id: number;
  position: THREE.Vector3;
}

export default function ArSpace({ file }: { file: string }) {
  const reticleRef = useRef<THREE.Mesh>(null);
  const [models, setModels] = useState<ModelInstance[]>([]);

  const { isPresenting } = useXR();

  useXREvent('select', () => {
    if (isPresenting) {
      placeModel();
    }
  });

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix: THREE.Matrix4) => {
    if (!reticleRef.current) return;

    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = () => {
    if (!reticleRef.current) return;
    const position = reticleRef.current.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => (
          <Fragment key={id}>
            <Model position={position} file={file} />
          </Fragment>
        ))}

      {isPresenting && (
        <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.1, 0.25, 32]} />
          <meshStandardMaterial color={'white'} />
        </mesh>
      )}

      {!isPresenting && <Model file={file} position={[0, -0.5, 0]} />}
    </>
  );
}
