import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Activity, Video, Scan, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFaceMesh } from '@/hooks/useFaceMesh';
import FaceMesh3D from '@/components/lab/Face3D/FaceMesh3D';

export default function FaceRecognitionPage() {
  useTranslation('lab');
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-cyan-900/30 bg-[#050510]/80 backdrop-blur-md">
        <Link
          to="/lab"
          className="group flex items-center gap-3 text-cyan-700 hover:text-cyan-400 transition-colors"
        >
          <div className="p-2 border border-cyan-900/50 rounded bg-cyan-950/30 group-hover:bg-cyan-900/50 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">Return to Lab</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-900/50 rounded text-xs text-cyan-400">
            <Scan size={14} />
            <span className="tracking-wider">FACE_MESH_V2</span>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="animate-pulse text-cyan-400" size={20} />
            <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 shadow-cyan-500/20 drop-shadow-lg">
              Biometric Analysis
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-cyan-700 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
            <span className="tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content Split View */}
      <main className="flex-1 flex flex-col lg:flex-row relative z-10 p-4 gap-4 overflow-hidden">

        {/* Left Panel: Source Feed */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="flex-1 bg-black/40 border border-cyan-900/50 rounded-lg p-1 relative overflow-hidden group shadow-[0_0_20px_rgba(0,255,255,0.05)]">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 z-20"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 z-20"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 z-20"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 z-20"></div>

            <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur px-2 py-1 rounded border border-cyan-900/50 text-xs flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
              <Video size={12} />
              <span>SOURCE_FEED_01</span>
            </div>

            <div className="h-full w-full rounded overflow-hidden relative bg-black flex items-center justify-center">
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover opacity-60 grayscale-[30%] contrast-125"
                mirrored
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/90 z-30">
                  <div className="w-12 h-12 border-4 border-cyan-900 border-t-cyan-500 rounded-full animate-spin"></div>
                  <div className="text-cyan-500/80 animate-pulse text-sm tracking-widest">INITIALIZING OPTICS...</div>
                </div>
              )}
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="h-48 bg-black/40 border border-cyan-900/50 rounded-lg p-5 font-mono text-xs text-cyan-400 flex flex-col gap-3 shadow-[0_0_20px_rgba(0,255,255,0.05)] relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none"></div>

            <div className="flex justify-between border-b border-cyan-900/50 pb-2 mb-1 relative z-10">
              <span className="text-cyan-600 font-bold tracking-widest">REALTIME METRICS</span>
              <Cpu size={14} className="text-cyan-600" />
            </div>

            <div className="space-y-2 relative z-10">
              <div className="flex justify-between items-center bg-cyan-950/20 p-2 rounded border border-cyan-900/30">
                <span className="text-cyan-700">STATUS</span>
                <span className={`font-bold tracking-wider ${isLoading ? "text-yellow-500" : "text-emerald-400"}`}>
                  {isLoading ? "CALIBRATING..." : "TRACKING ACTIVE"}
                </span>
              </div>

              <div className="flex justify-between items-center p-2">
                <span className="text-cyan-700">CONFIDENCE</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-cyan-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{ width: results?.multiFaceLandmarks ? '98%' : '0%' }}
                    />
                  </div>
                  <span className="font-bold">{results?.multiFaceLandmarks ? "98.4%" : "0.0%"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-2">
                <span className="text-cyan-700">VERTICES</span>
                <span className="font-mono text-cyan-300">{results?.multiFaceLandmarks?.[0]?.length || 0}</span>
              </div>
            </div>

            <div className="mt-auto pt-2 text-[10px] text-cyan-800 leading-tight border-t border-cyan-900/30">
              <span className="animate-pulse">_</span> MESH TOPOLOGY GENERATED<br/>
              <span className="animate-pulse">_</span> RENDER PIPELINE OPTIMIZED
            </div>
          </div>
        </div>

        {/* Right Panel: 3D Visualization */}
        <div className="lg:w-2/3 bg-black/60 border border-cyan-900/50 rounded-lg relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

          <div className="absolute top-4 right-4 z-20 flex gap-2">
             <div className="px-3 py-1.5 bg-cyan-950/80 border border-cyan-500/30 rounded backdrop-blur text-xs text-cyan-300 font-bold tracking-wider flex items-center gap-2 shadow-lg">
               <Maximize2 size={12} />
               3D RECONSTRUCTION
             </div>
          </div>

          <Canvas className="w-full h-full" gl={{ antialias: true, alpha: true }}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={true} enablePan={true} maxDistance={10} minDistance={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <FaceMesh3D results={results} />

            <gridHelper args={[20, 20, 0x112244, 0x050510]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
          </Canvas>

          <div className="absolute bottom-4 left-4 text-[10px] text-cyan-700 pointer-events-none font-bold tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur">
            ROTATION: ENABLED | ZOOM: ENABLED
          </div>
        </div>
      </main>
    </div>
  );
}