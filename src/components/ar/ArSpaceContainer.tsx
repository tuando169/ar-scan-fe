import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import ArSpace from "./components/ArSpace.tsx";

export default function ArSpaceContainer({ model }: { model: File }) {
  return (
    <>
      <>
        <ARButton
          className="ar-button"
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
          }}
        />
        <Canvas>
          <XR>
            <ArSpace model={model} />
          </XR>
        </Canvas>
      </>
    </>
  );
}
