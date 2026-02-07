import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Cpu, Activity, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useFaceMesh } from '@/hooks/useFaceMesh';
import FaceMesh3D from '@/components/lab/Face3D/FaceMesh3D';

export default function FaceRecognitionPage() {
  const { t } = useTranslation('lab');
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { results, isLoading, onFrame } = useFaceMesh(videoRef);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      videoRef.current = webcamRef.current.video;
      const interval = setInterval(() => {
        if (webcamRef.current?.video?.readyState === 4) {
          setIsCameraReady(true);
          onFrame();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [webcamRef, onFrame]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050510] text-cyan-500 font-mono relative overflow-hidden flex flex-col">
      {/* Sci-fi Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-cyan-900/50 bg-[#050510]/80 backdrop-blur-md">
        <Link
          to="/lab"
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-sm">Return to Lab</span>
        </Link>

        <div className="flex items-center gap-3">
          <Activity className="animate-pulse text-cyan-400" size={20} />
          <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Biometric Analysis
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs text-cyan-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content Split View */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 p-4 gap-4 overflow-hidden">

        {/* Left Panel: Source Feed */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="flex-1 bg-black/40 border border-cyan-900/50 rounded-lg p-1 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 z-20"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 z-20"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 z-20"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 z-20"></div>

            <div className="absolute top-4 left-4 z-20 bg-black/60 px-2 py-1 rounded text-xs flex items-center gap-2 text-cyan-400">
              <Video size={12} />
              <span>SOURCE_FEED_01</span>
            </div>

            <div className="h-full w-full rounded overflow-hidden relative bg-black flex items-center justify-center">
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover opacity-80"
                mirrored
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center text-cyan-500/50 animate-pulse">
                  INITIALIZING OPTICS...
                </div>
              )}
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="h-48 bg-black/40 border border-cyan-900/50 rounded-lg p-4 font-mono text-xs text-cyan-400 flex flex-col gap-2">
            <div className="flex justify-between border-b border-cyan-900/50 pb-2 mb-2">
              <span className="text-cyan-600">METRICS</span>
              <Cpu size={14} />
            </div>
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className={isLoading ? "text-yellow-500" : "text-green-500"}>
                {isLoading ? "CALIBRATING..." : "TRACKING ACTIVE"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CONFIDENCE:</span>
              <span>{results?.multiFaceLandmarks ? "98.4%" : "0.0%"}</span>
            </div>
            <div className="flex justify-between">
              <span>VERTICES:</span>
              <span>{results?.multiFaceLandmarks?.[0]?.length || 0}</span>
            </div>
            <div className="mt-auto pt-2 text-[10px] text-cyan-800 leading-tight">
              >> MESH TOPOLOGY GENERATED
              <br />
              >> RENDER PIPELINE OPTIMIZED
            </div>
          </div>
        </div>

        {/* Right Panel: 3D Visualization */}
        <div className="lg:w-2/3 bg-black/40 border border-cyan-900/50 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

          <div className="absolute top-4 right-4 z-20 flex gap-2">
             <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-300">
               3D RECONSTRUCTION
             </div>
          </div>

          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={true} enablePan={true} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <FaceMesh3D results={results} />

            <gridHelper args={[20, 20, 0x112244, 0x050510]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
          </Canvas>

          <div className="absolute bottom-4 left-4 text-[10px] text-cyan-700 pointer-events-none">
            ROTATION: ENABLED | ZOOM: ENABLED
          </div>
        </div>
      </main>
    </div>
  );
}
