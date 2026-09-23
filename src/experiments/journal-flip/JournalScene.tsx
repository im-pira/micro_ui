import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import JournalPage from "./JournalPage";
import { images, LAST_PAGE, PAGE_H, PAGE_W } from "./journal";

type Props = {
  page: number;
  target: number | null;
  onComplete: () => void;
};

function makeTexture(
  source: THREE.Texture,
  side: "full" | "left" | "right",
) {
  const texture = source.clone();

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  if (side === "left") {
    texture.repeat.set(0.5, 1);
    texture.offset.set(0, 0);
  } else if (side === "right") {
    texture.repeat.set(0.5, 1);
    texture.offset.set(0.5, 0);
  } else {
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
  }

  texture.needsUpdate = true;

  return texture;
}

export default function JournalScene({
  page,
  target,
  onComplete,
}: Props) {
  const source = useTexture([...images]);

  const textures = useMemo(
    () =>
      source.map((texture) => ({
        full: makeTexture(texture, "full"),
        left: makeTexture(texture, "left"),
        right: makeTexture(texture, "right"),
      })),
    [source],
  );

  const getLeft = (index: number) => {
    if (index === 0) return null;

    if (index === LAST_PAGE) {
      return textures[index].full;
    }

    return textures[index].left;
  };

  const getRight = (index: number) => {
    if (index === 0) {
      return textures[index].full;
    }

    if (index === LAST_PAGE) {
      return null;
    }

    return textures[index].right;
  };

  const moving = target !== null;

  const direction: 1 | -1 =
    moving && target < page ? -1 : 1;

  const low =
    moving && target !== null
      ? Math.min(page, target)
      : page;

  const high =
    moving && target !== null
      ? Math.max(page, target)
      : page;

  const visibleLeft = moving
    ? getLeft(low)
    : getLeft(page);

  const visibleRight = moving
    ? getRight(high)
    : getRight(page);

  const sheetFront = moving
    ? getRight(low)
    : null;

  const sheetBack = moving
    ? getLeft(high)
    : null;

  const showSpine =
    moving ||
    (page !== 0 && page !== LAST_PAGE);

  return (
    <>
      <ambientLight intensity={1.65} />

      <directionalLight
        position={[-3, 5, 6]}
        intensity={1.5}
        castShadow
      />

      <directionalLight
        position={[4, 2, 4]}
        intensity={0.65}
      />

      <group rotation={[-0.025, 0, 0]}>
        {visibleLeft && (
          <mesh
            position={[
              -PAGE_W / 2,
              0,
              -0.015,
            ]}
            receiveShadow
          >
            <planeGeometry
              args={[
                PAGE_W,
                PAGE_H,
              ]}
            />

            <meshStandardMaterial
              map={visibleLeft}
              roughness={0.94}
              side={THREE.FrontSide}
            />
          </mesh>
        )}

        {visibleRight && (
          <mesh
            position={[
              PAGE_W / 2,
              0,
              -0.015,
            ]}
            receiveShadow
          >
            <planeGeometry
              args={[
                PAGE_W,
                PAGE_H,
              ]}
            />

            <meshStandardMaterial
              map={visibleRight}
              roughness={0.94}
              side={THREE.FrontSide}
            />
          </mesh>
        )}

        {moving &&
          sheetFront &&
          sheetBack && (
            <JournalPage
              key={`${page}-${target}`}
              front={sheetFront}
              back={sheetBack}
              direction={direction}
              onComplete={onComplete}
            />
          )}

        {showSpine && (
          <mesh
            position={[
              0,
              0,
              0.045,
            ]}
          >
            <planeGeometry
              args={[
                0.012,
                PAGE_H,
              ]}
            />

            <meshBasicMaterial
              color="#4b4035"
              transparent
              opacity={0.16}
            />
          </mesh>
        )}
      </group>
    </>
  );
}