import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pages, W, H } from "./journal";

type Props = {
  index: number;
  page: number;
  setPage: (n: number) => void;
};

export function JournalPage({ index, page, setPage }: Props) {
  const ref = useRef<THREE.Mesh>(null);
  const progress = useRef(index < page ? 1 : 0);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(W, H, 36, 2);
    g.translate(W / 2, 0, 0);

    g.setAttribute(
      "base",
      new THREE.BufferAttribute(
        new Float32Array(g.attributes.position.array),
        3,
      ),
    );

    return g;
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;

    progress.current = THREE.MathUtils.damp(
      progress.current,
      index < page ? 1 : 0,
      7,
      dt,
    );

    const p = progress.current;
    const bend = Math.sin(p * Math.PI);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const base = geometry.getAttribute("base") as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = base.getX(i);
      const y = base.getY(i);
      const t = x / W;

      pos.setXYZ(
        i,
        x,
        y,
        Math.sin(t * Math.PI) * bend * 0.48 +
          Math.sin(t * Math.PI * 0.5) * bend * t * 0.16,
      );
    }

    pos.needsUpdate = true;

    ref.current.rotation.y = -p * Math.PI;

    // Correct stacking on each side.
    ref.current.position.z =
      index < page
        ? -(index + 1) * 0.006
        : (pagesCount - index) * 0.006;

    ref.current.position.z += bend * 0.12;
  });

  /*
   * Only TWO sheets may be clicked:
   *
   * page     = exposed sheet on right → forward
   * page - 1 = exposed sheet on left  → backward
   */
  const canGoForward = index === page && page < pagesCount;
  const canGoBack = index === page - 1 && page > 0;
  const clickable = canGoForward || canGoBack;

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      castShadow
      receiveShadow
      onClick={
        clickable
          ? (e) => {
              e.stopPropagation();

              if (canGoForward) setPage(page + 1);
              else setPage(page - 1);
            }
          : undefined
      }
      onPointerEnter={
        clickable
          ? () => {
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerLeave={() => {
        document.body.style.cursor = "";
      }}
    >
      <meshStandardMaterial
        color={index % 2 ? "#F3EBDD" : "#FBF6EC"}
        side={THREE.DoubleSide}
        roughness={0.95}
      />
    </mesh>
  );
}

const pagesCount = pages.length;