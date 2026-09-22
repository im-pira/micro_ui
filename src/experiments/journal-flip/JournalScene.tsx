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
  const t = source.clone();

  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;

  if (side === "left") {
    t.repeat.set(0.5, 1);
    t.offset.set(0, 0);
  } else if (side === "right") {
    t.repeat.set(0.5, 1);
    t.offset.set(0.5, 0);
  } else {
    t.repeat.set(1, 1);
    t.offset.set(0, 0);
  }

  t.needsUpdate = true;

  return t;
}

export default function JournalScene({
  page,
  target,
  onComplete,
}: Props) {
  const source = useTexture([...images]);

  const tex = useMemo(
    () =>
      source.map((t) => ({
        full: makeTexture(t, "full"),
        left: makeTexture(t, "left"),
        right: makeTexture(t, "right"),
      })),
    [source],
  );

  const left = (i: number) => {
    if (i === 0) return null;
    if (i === LAST_PAGE) return tex[i].full;
    return tex[i].left;
  };

  const right = (i: number) => {
    if (i === 0) return tex[i].full;
    if (i === LAST_PAGE) return null;
    return tex[i].right;
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

  const visibleLeft = moving ? left(low) : left(page);
  const visibleRight = moving ? right(high) : right(page);

  const sheetFront = moving ? right(low) : null;
  const sheetBack = moving ? left(high) : null;

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
        <mesh position={[-PAGE_W / 2, 0, -0.045]} receiveShadow>
          <planeGeometry args={[PAGE_W, PAGE_H]} />
          <meshStandardMaterial
            color="#eee8dd"
            roughness={1}
          />
        </mesh>

        <mesh position={[PAGE_W / 2, 0, -0.045]} receiveShadow>
          <planeGeometry args={[PAGE_W, PAGE_H]} />
          <meshStandardMaterial
            color="#eee8dd"
            roughness={1}
          />
        </mesh>

        {visibleLeft && (
          <mesh position={[-PAGE_W / 2, 0, -0.015]} receiveShadow>
            <planeGeometry args={[PAGE_W, PAGE_H]} />
            <meshStandardMaterial
              map={visibleLeft}
              roughness={0.94}
            />
          </mesh>
        )}

        {visibleRight && (
          <mesh position={[PAGE_W / 2, 0, -0.015]} receiveShadow>
            <planeGeometry args={[PAGE_W, PAGE_H]} />
            <meshStandardMaterial
              map={visibleRight}
              roughness={0.94}
            />
          </mesh>
        )}

        {moving && sheetFront && sheetBack && (
          <JournalPage
            key={`${page}-${target}`}
            front={sheetFront}
            back={sheetBack}
            direction={direction}
            onComplete={onComplete}
          />
        )}

        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[0.012, PAGE_H]} />
          <meshBasicMaterial
            color="#4b4035"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </>
  );
}