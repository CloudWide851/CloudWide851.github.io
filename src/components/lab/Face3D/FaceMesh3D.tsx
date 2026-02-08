import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, DoubleSide, Mesh, Points, ShaderMaterial, AdditiveBlending } from 'three';
import type { Results } from '@mediapipe/face_mesh';
import { TRIANGULATION } from '@/utils/faceTriangulation';

interface FaceMesh3DProps {
  results: Results | null;
  wireframe?: boolean;
}

export default function FaceMesh3D({ results, wireframe = true }: FaceMesh3DProps) {
  const meshRef = useRef<Mesh>(null);
  const pointsRef = useRef<Points>(null);
  const geometryRef = useRef<BufferGeometry>(null);

  // Initialize geometry with dummy positions
  const initialPositions = useMemo(() => {
    const count = 478; // MediaPipe Face Mesh has 478 landmarks with refinement
    const positions = new Float32Array(count * 3);
    return positions;
  }, []);

  const indices = useMemo(() => new Uint16Array(TRIANGULATION), []);

  // Update mesh every frame
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Animate material if available
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = time;
      }
    }

    if (!results || !results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) return;

    const landmarks = results.multiFaceLandmarks[0];
    const geometry = geometryRef.current;

    if (geometry) {
      const positions = geometry.attributes.position.array as Float32Array;

      // Update positions
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

  // Cyberpunk Hologram Shader
  const hologramShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Float32Array([0.0, 0.85, 1.0]) } // Cyan
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;

        // Glitch effect on vertex position
        vec3 pos = position;
        float glitch = sin(pos.y * 10.0 + uTime * 5.0) * 0.02;
        pos.x += glitch;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 4.0;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColor;

      void main() {
        // Fresnel effect (glow at edges)
        vec3 viewDir = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);

        // Scanline effect
        float scanline = sin(vPosition.y * 20.0 - uTime * 2.0) * 0.5 + 0.5;

        // Combine effects
        vec3 color = uColor;
        float alpha = fresnel * 0.6 + scanline * 0.1 + 0.1;

        gl_FragColor = vec4(color, alpha);
      }
    `
  }), []);

  return (
    <group scale={[1.5, 1.5, 1.5]}>
      {/* Main Mesh Surface */}
      <mesh ref={meshRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          args={[hologramShader]}
          transparent
          side={DoubleSide}
          depthWrite={false}
          blending={AdditiveBlending}
          wireframe={wireframe}
        />
      </mesh>

      {/* Points Cloud Overlay */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
