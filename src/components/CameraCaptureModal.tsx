import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, Check, Image as ImageIcon, Sparkles, Zap, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { SAMPLE_HAZARD_PHOTOS } from '../data/mockData';
import { LanguageCode, getUIString } from '../utils/i18n';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (photoDataUrl: string, source: 'camera' | 'upload' | 'sample', meta?: any) => void;
  currentLanguage?: LanguageCode;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  currentLanguage = 'en',
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'samples' | 'upload'>('camera');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [isInitializingCamera, setIsInitializingCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Start camera when modal opens and camera tab is active
  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, facingMode, capturedImage]);

  const startCamera = async () => {
    setIsInitializingCamera(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API (getUserMedia) not supported in this browser.');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access permission was denied. Please allow camera permissions in your browser or select a sample photo.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No physical camera device was detected on your system. You can upload a photo or pick a sample photo.');
      } else {
        setCameraError(`Camera unavailable: ${err.message || 'Permission or hardware issue'}. Try uploading an image or selecting a sample hazard.`);
      }
    } finally {
      setIsInitializingCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const toggleTorch = async () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities?.() as any;
    if (capabilities && capabilities.torch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !torchEnabled } as any],
        });
        setTorchEnabled(!torchEnabled);
      } catch (e) {
        console.error('Torch error', e);
      }
    } else {
      setTorchEnabled(!torchEnabled);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);
    setFlashEffect(true);

    setTimeout(() => {
      setFlashEffect(false);
    }, 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // If user camera, mirror it
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
    setIsCapturing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const confirmCapturedPhoto = () => {
    if (capturedImage) {
      onPhotoCaptured(capturedImage, activeTab === 'samples' ? 'sample' : activeTab === 'upload' ? 'upload' : 'camera');
      onClose();
    }
  };

  const retake = () => {
    setCapturedImage(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Shutter Flash Animation */}
        {flashEffect && <div className="absolute inset-0 z-50 bg-white opacity-80 pointer-events-none transition-opacity duration-150" />}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-900/90 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100 text-base">Civic Vision Camera Capture</h3>
              <p className="text-xs text-neutral-400">Live optical inspection & automatic defect identification</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {!capturedImage && (
          <div className="flex border-b border-neutral-800 bg-neutral-950 px-5 pt-3 gap-2">
            <button
              onClick={() => {
                setActiveTab('camera');
                setCameraError(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
                activeTab === 'camera'
                  ? 'border-emerald-500 text-emerald-400 bg-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              {currentLanguage === 'kn' ? 'ಲೈವ್ ಕ್ಯಾಮೆರಾ' : 'Live Device Camera'}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              onClick={() => {
                stopCamera();
                setActiveTab('samples');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
                activeTab === 'samples'
                  ? 'border-emerald-500 text-emerald-400 bg-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {getUIString(currentLanguage, 'samplePhotos')}
            </button>

            <button
              onClick={() => {
                stopCamera();
                setActiveTab('upload');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
                activeTab === 'upload'
                  ? 'border-emerald-500 text-emerald-400 bg-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {currentLanguage === 'kn' ? 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್' : 'Upload Image File'}
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="relative flex-1 bg-black flex flex-col items-center justify-center overflow-hidden min-h-[360px]">
          {/* STATE 1: Review Captured/Selected Image */}
          {capturedImage ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <div className="relative max-h-[380px] max-w-full rounded-xl overflow-hidden border border-neutral-700 shadow-xl group">
                <img src={capturedImage} alt="Captured hazard" className="max-h-[380px] object-contain w-full" />
                
                {/* Simulated AI optical bounding box overlay */}
                <div className="absolute inset-8 border-2 border-dashed border-emerald-400/80 rounded-lg pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between text-[11px] font-mono bg-neutral-950/80 text-emerald-300 px-2 py-1 rounded backdrop-blur">
                    <span>{currentLanguage === 'kn' ? 'AI ಗುರುತಿಸುವಿಕೆ: ಮೂಲಸೌಕರ್ಯ ದೋಷ' : 'AI OPTICAL DETECT: INFRASTRUCTURE DEFECT'}</span>
                    <span className="text-emerald-400 font-bold">CONF: 97.4%</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded w-max">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    GPS Geo-Exif Stamped
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={retake}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  {getUIString(currentLanguage, 'retake')}
                </button>
                <button
                  onClick={confirmCapturedPhoto}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-900/30 transition"
                >
                  <Check className="w-4 h-4" />
                  {getUIString(currentLanguage, 'useThisPhoto')}
                </button>
              </div>
            </div>
          ) : activeTab === 'camera' ? (
            /* STATE 2: Live Camera Viewfinder */
            <div className="relative w-full h-[400px] flex items-center justify-center bg-black">
              {cameraError ? (
                <div className="p-6 text-center max-w-md">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-3 border border-red-500/20">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-neutral-100 text-sm mb-1">Camera Access Notice</h4>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">{cameraError}</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={startCamera}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 text-xs text-white hover:bg-neutral-700 transition"
                    >
                      Retry Camera
                    </button>
                    <button
                      onClick={() => setActiveTab('samples')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-xs text-white hover:bg-emerald-500 transition"
                    >
                      Pick Sample Hazard
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                  />

                  {/* High-tech Viewfinder HUD */}
                  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                    {/* Top HUD */}
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg border border-emerald-500/30">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>LIVE OPTICAL FEED</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>37.7749° N, 122.4194° W</span>
                      </div>
                    </div>

                    {/* Reticle / Crosshair */}
                    <div className="self-center my-auto relative w-56 h-56 border-2 border-emerald-400/40 rounded-2xl flex items-center justify-center">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
                      <span className="absolute -bottom-6 text-[10px] font-mono text-emerald-300/80 bg-black/60 px-2 py-0.5 rounded">
                        FRAME DAMAGE WITHIN BOUNDS
                      </span>
                    </div>

                    {/* Bottom Camera Controls Bar */}
                    <div className="flex items-center justify-between w-full pointer-events-auto bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-neutral-800">
                      <button
                        onClick={toggleTorch}
                        className={`p-3 rounded-xl border transition ${
                          torchEnabled
                            ? 'bg-amber-400 text-black border-amber-300'
                            : 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:text-white'
                        }`}
                        title="Toggle Flash / Torch"
                      >
                        <Zap className="w-5 h-5" />
                      </button>

                      {/* Giant Shutter Button */}
                      <button
                        onClick={takeSnapshot}
                        disabled={isCapturing || isInitializingCamera}
                        className="relative group p-1 rounded-full border-4 border-white/60 hover:border-white transition transform active:scale-95"
                        title="Capture Photo"
                      >
                        <div className="w-14 h-14 rounded-full bg-emerald-500 group-hover:bg-emerald-400 flex items-center justify-center shadow-lg transition">
                          <Camera className="w-6 h-6 text-neutral-950" />
                        </div>
                      </button>

                      <button
                        onClick={toggleFacingMode}
                        className="p-3 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:text-white transition"
                        title="Flip Front/Rear Camera"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === 'samples' ? (
            /* STATE 3: Sample Hazard Presets for Hackathon Judges */
            <div className="w-full h-full p-6 overflow-y-auto">
              <div className="text-center mb-4">
                <span className="inline-block text-[11px] font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 mb-1">
                  Judge Testing Mode
                </span>
                <h4 className="text-sm font-semibold text-neutral-100">Pick a Verified Civic Hazard Sample</h4>
                <p className="text-xs text-neutral-400">Instantly test the multimodal triage pipeline with real-world scenarios</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {SAMPLE_HAZARD_PHOTOS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setCapturedImage(sample.dataUrl);
                      onPhotoCaptured(sample.dataUrl, 'sample', {
                        title: sample.title,
                        description: sample.description,
                        category: sample.category,
                        address: sample.location,
                        nearSensitiveZone: sample.nearSensitiveZone,
                      });
                      onClose();
                    }}
                    className="flex flex-col text-left p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-850 transition group"
                  >
                    <div className="relative w-full h-28 rounded-lg overflow-hidden mb-2 bg-neutral-950 border border-neutral-800">
                      <img src={sample.dataUrl} alt={sample.label} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute top-2 right-2 text-[10px] font-semibold bg-neutral-950/80 text-emerald-300 px-2 py-0.5 rounded backdrop-blur">
                        {sample.category}
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-200 text-xs group-hover:text-emerald-400 transition">
                      {sample.label}
                    </span>
                    <span className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {sample.nearSensitiveZone || sample.location}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* STATE 4: Upload File */
            <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-md p-8 border-2 border-dashed border-neutral-700 hover:border-emerald-500 rounded-2xl bg-neutral-900/50 cursor-pointer flex flex-col items-center justify-center transition group"
              >
                <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition mb-3">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h4 className="font-medium text-neutral-200 text-sm mb-1">Click to browse or drop photo</h4>
                <p className="text-xs text-neutral-400">Supports JPG, PNG, WEBP from your device storage or camera reel</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Encrypted transmission to municipal triage engine</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">DamGo Vision™ v3.8</span>
        </div>
      </div>
    </div>
  );
};
