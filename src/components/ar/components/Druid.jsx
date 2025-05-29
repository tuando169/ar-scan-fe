import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ position }) => {
  const gltf = useLoader(GLTFLoader, "/models/druid.gltf");
  return <primitive position={position ?? [0, -0.5, 0]} object={gltf.scene} />;
};

export default Model;
