import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, Vector3 } from 'three';
import { Results } from '@mediapipe/face_mesh';
import { TRIANGULATION } from '@/utils/faceTriangulation';

interface FaceMesh3DProps {
  results: Results | null;
  wireframe?: boolean;
}

export default function FaceMesh3D({ results, wireframe = true }: FaceMesh3DProps) {
  const meshRef = useRef<Mesh>(null);
  const geometryRef = useRef<BufferGeometry>(null);

  // Initialize geometry with dummy positions
  const initialPositions = useMemo(() => {
    const count = 478; // MediaPipe Face Mesh has 478 landmarks with refinement
    const positions = new Float32Array(count * 3);
    return positions;
  }, []);

  // Update mesh every frame
  useFrame(() => {
    if (!results || !results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

    const landmarks = results.multiFaceLandmarks[0];
    const geometry = geometryRef.current;

    if (geometry) {
      const positions = geometry.attributes.position.array as Float32Array;

      // Update positions
      // We need to invert X and map coordinates to 3D space
      // MediaPipe coordinates are normalized [0,1], we map them to a reasonable 3D range
      for (let i = 0; i < landmarks.length; i++) {
        const { x, y, z } = landmarks[i];
        // Scale and center the face
        positions[i * 3] = -(x - 0.5) * 5;     // Invert X for mirror effect
        positions[i * 3 + 1] = -(y - 0.5) * 5; // Invert Y because screen coords are top-down
        positions[i * 3 + 2] = -z * 5;         // Scale Z
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={initialPositions.length / 3}
          array={initialPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          count={TRIANGULATION.length}
          array={new Uint16Array(TRIANGULATION)}
          itemSize={1}
        />
      </bufferGeometry>
      <meshStandardMaterial
        color="#00d9ff"
        wireframe={wireframe}
        side={DoubleSide}
        transparent
        opacity={0.6}
        roughness={0.2}
        metalness={0.8}
        emissive="#0044aa"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
