import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import type { Results } from '@mediapipe/face_mesh';

export const useFaceMesh = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const faceMeshRef = useRef<FaceMesh | null>(null);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((res) => {
      setResults(res);
      setIsLoading(false);
    });

    faceMeshRef.current = faceMesh;

    return () => {
      faceMesh.close();
    };
  }, []);

  const onFrame = useCallback(async () => {
    if (videoRef.current && faceMeshRef.current && videoRef.current.readyState === 4) {
      try {
        await faceMeshRef.current.send({ image: videoRef.current });
      } catch (error) {
        console.error("FaceMesh error:", error);
      }
    }
    requestAnimationFrame(onFrame);
  }, [videoRef]);

  return { results, isLoading, onFrame };
};
