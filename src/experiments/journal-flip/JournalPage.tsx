import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PAGE_H, PAGE_W, SEGMENTS } from "./journal";

type Props = {
  front: THREE.Texture;
  back: THREE.Texture;
  direction: 1 | -1;
  onComplete: () => void;
};

export default function JournalPage({
  front,
  back,
  direction,
  onComplete,
}: Props) {
  const progress = useRef(direction === 1 ? 0 : 1);
  const done = useRef(false);

  const frontGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(PAGE_W, PAGE_H, SEGMENTS, 8);
    g.translate(PAGE_W / 2, 0, 0);
    return g;
  }, []);

  const backGeo = useMemo(() => frontGeo.clone(), [frontGeo]);

  const original = useMemo(() => {
    const p = frontGeo.attributes.position;
    return Array.from({ length: p.count }, (_, i) => ({
      x: p.getX(i),
      y: p.getY(i),
    }));
  }, [frontGeo]);

  useFrame((_, delta) => {
    const target = direction === 1 ? 1 : 0;

    progress.current = THREE.MathUtils.damp(
      progress.current,
      target,
      6.5,
      delta,
    );

    const p = progress.current;
    const turn = p * Math.PI;

    const update = (geo: THREE.BufferGeometry, depth: number) => {
      const pos = geo.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const ox = original[i].x;
        const oy = original[i].y;
        const t = THREE.MathUtils.clamp(ox / PAGE_W, 0, 1);

        const middle = Math.sin(Math.PI * p);
        const edge = Math.sin(Math.PI * t);

        const curl = middle * edge;

        const bend =
          turn +
          curl * 0.34 -
          middle * Math.pow(t, 1.7) * 0.18;

        const x =
          PAGE_W *
          t *
          Math.cos(bend);

        const z =
          -PAGE_W *
            t *
            Math.sin(bend) +
          curl * 0.22 +
          depth;

        const y =
          oy +
          curl *
            Math.sin((oy / PAGE_H + 0.5) * Math.PI) *
            0.018;

        pos.setXYZ(i, x, y, z);
      }

      pos.needsUpdate = true;
      geo.computeVertexNormals();
    };

    update(frontGeo, 0.003);
    update(backGeo, -0.003);

    if (
      !done.current &&
      Math.abs(progress.current - target) < 0.002
    ) {
      done.current = true;
      onComplete();
    }
  });

  return (
    <group position={[0, 0, 0.035]}>
      <mesh geometry={frontGeo} castShadow>
        <meshStandardMaterial
          map={front}
          side={THREE.FrontSide}
          roughness={0.92}
        />
      </mesh>

      <mesh geometry={backGeo} castShadow>
        <meshStandardMaterial
          map={back}
          side={THREE.BackSide}
          roughness={0.92}
        />
      </mesh>
    </group>
  );
}