import { useEffect, useState } from 'react';
import { useLoader, type Vector3 } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface ModelProps {
  position?: Vector3;
  model: File;
}

const Model = ({ position = [0, -0.5, 0], model }: ModelProps) => {
  // const [url, setUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const objectUrl = URL.createObjectURL(model);
  //   setUrl(objectUrl);

  //   return () => {
  //     URL.revokeObjectURL(objectUrl);
  //   };
  // }, [model]);

  // const gltf = useLoader(GLTFLoader, url ?? '');
  const gltf = useLoader(GLTFLoader, '/assets/druid.gltf');

  // if (!url) return null;

  return <primitive position={position} object={gltf.scene} />;
};

export default Model;
