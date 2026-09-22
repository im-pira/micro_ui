import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { JournalPage } from "./JournalPage";
import { pages, W, H } from "./journal";

type Props = {
  page: number;
  setPage: (n: number) => void;
};

export function JournalScene({ page, setPage }: Props) {
  const book = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!book.current) return;

    /*
     * Closed:
     *
     *       [ PAGE ]
     *          ↑
     *       centered
     *
     * Open:
     *
     *   [ LEFT ][ RIGHT ]
     *          ↑
     *        center
     *
     * Therefore the journal center moves by W/2 once
     * pages exist on both sides.
     */

    const isOpen = page > 0 && page < pages.length;

    const targetX = isOpen ? 0 : page === 0 ? -W / 2 : W / 2;

    book.current.position.x = THREE.MathUtils.damp(
      book.current.position.x,
      targetX,
      6,
      dt,
    );
  });

  return (
    <>
      <ambientLight intensity={2.2} />

      <directionalLight
        position={[-3, 6, 8]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[5, -1, 5]}
        intensity={0.45}
      />

      <group ref={book}>
        {/*
          Spine is x = 0.

          Pages extend right initially and rotate
          around the spine toward the left.
        */}

        {pages.map((_, index) => (
          <JournalPage
            key={index}
            index={index}
            page={page}
            setPage={setPage}
          />
        ))}

        {/* subtle spine shadow */}
        {page > 0 && page < pages.length && (
          <mesh position={[0, 0, -0.04]}>
            <planeGeometry args={[0.055, H * 0.97]} />

            <meshBasicMaterial
              color="#8E806E"
              transparent
              opacity={0.12}
            />
          </mesh>
        )}
      </group>
    </>
  );
}