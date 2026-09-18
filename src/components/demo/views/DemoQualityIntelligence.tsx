import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Scan, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  ArrowRight, 
  RotateCcw,
  Check,
  ShieldCheck,
  Zap,
  Activity,
  Camera,
  Upload,
  Sliders,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Maximize2,
  RefreshCw,
  Wrench,
  FileCheck,
  CheckCircle,
  CameraOff,
  ExternalLink,
  SwitchCamera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DemoTab } from '../../../types';
import { Badge } from '../../common/Badge';

export interface QualityDefectItem {
  id: string;
  type: string;
  garmentArea: string;
  confidence: number;
  severity: 'Critical' | 'Major' | 'Minor';
  detectedAt: string;
  lineId: string;
  status: 'Needs Review' | 'Verified' | 'False Positive' | 'Rework Dispatched';
  boundingBox: { x: number; y: number; width: number; height: number }; // percentage coords (0-100)
  rootCause: string;
  correctiveAction: string;
  machineId: string;
  sampleType: 'polo' | 'crew' | 'denim' | 'activewear' | 'custom';
}

interface DemoQualityIntelligenceProps {
  onNavigate: (tab: DemoTab) => void;
  currentDefectRate?: number;
  onUpdateDefectRate?: (newRate: number) => void;
  activeOrderNumber?: string;
  activeBuyer?: string;
}

const INITIAL_DEFECTS: QualityDefectItem[] = [
  {
    id: 'DEF-101',
    type: 'Stitch Irregularity & Pitch Variation',
    garmentArea: 'Placket & Collar Band Join',
    confidence: 94.8,
    severity: 'Major',
    detectedAt: '10:14 AM - Line 02',
    lineId: 'Line 02 (Sewing Station L02-08)',
    status: 'Needs Review',
    boundingBox: { x: 42, y: 18, width: 28, height: 22 },
    rootCause: 'Needle thread tension imbalance (135 cN vs 85 cN nominal) + feed dog timing drift.',
    correctiveAction: 'Re-calibrate upper tension disc and inspect feed dog clearance on Juki DDL-9000C #08.',
    machineId: 'JUKI-DDL-9000C-08',
    sampleType: 'polo',
  },
  {
    id: 'DEF-102',
    type: 'Skip Stitch Anomaly (3 Stitches)',
    garmentArea: 'Left Armhole Overlock Join',
    confidence: 96.4,
    severity: 'Critical',
    detectedAt: '09:42 AM - Line 02',
    lineId: 'Line 02 (Overlock Station L02-14)',
    status: 'Needs Review',
    boundingBox: { x: 64, y: 34, width: 22, height: 26 },
    rootCause: 'Bent looper needle tip & synthetic thread fraying under high-speed feed (4,800 RPM).',
    correctiveAction: 'Replace needle with titanium-coated Groz-Beckert 75/11 and adjust looper clearance.',
    machineId: 'PEGASUS-EXT3200-14',
    sampleType: 'polo',
  },
  {
    id: 'DEF-103',
    type: 'Tension Puckering & Distortion',
    garmentArea: 'Bottom Hem Double-Stitch',
    confidence: 91.2,
    severity: 'Minor',
    detectedAt: '09:15 AM - Line 04',
    lineId: 'Line 04 (Flatlock Station L04-03)',
    status: 'Verified',
    boundingBox: { x: 26, y: 72, width: 46, height: 18 },
    rootCause: 'Differential feed ratio setting mismatch for 180 GSM single jersey elastic recovery.',
    correctiveAction: 'Adjust differential feed knob from 1:1.2 to 1:0.9 on Yamato flatbed.',
    machineId: 'YAMATO-VG2700-03',
    sampleType: 'polo',
  },
  {
    id: 'DEF-104',
    type: 'Fabric Shading Variance (ΔE = 1.45)',
    garmentArea: 'Right Sleeve Panel Lot Mismatch',
    confidence: 89.5,
    severity: 'Major',
    detectedAt: '08:50 AM - Line 01',
    lineId: 'Line 01 (Cut Panel Assembly)',
    status: 'Needs Review',
    boundingBox: { x: 12, y: 36, width: 20, height: 32 },
    rootCause: 'Cutting bundle mixed from two separate dyeing dyehouse lots (Lot A-4 vs Lot A-7).',
    correctiveAction: 'Implement barcode bundle grouping verification before bundle dispatch to sewing line.',
    machineId: 'GERBER-CUT-02',
    sampleType: 'crew',
  },
];

export const DemoQualityIntelligence: React.FC<DemoQualityIntelligenceProps> = ({
  onNavigate,
  currentDefectRate = 4.8,
  onUpdateDefectRate,
  activeOrderNumber = 'BD-3048',
  activeBuyer = 'Nordic Apparel Co.',
}) => {
  // Input Source Mode: 'samples' | 'camera' | 'upload'
  const [sourceMode, setSourceMode] = useState<'samples' | 'camera' | 'upload'>('samples');
  const [selectedSample, setSelectedSample] = useState<'polo' | 'crew' | 'denim' | 'activewear'>('polo');
  
  // Camera State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'environment' | 'user'>('environment');
  const [isSimulatedStream, setIsSimulatedStream] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Uploaded Image State
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scanning & AI Inference state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhaseText, setScanPhaseText] = useState('Standby');
  const [activeDefectId, setActiveDefectId] = useState<string>('DEF-101');
  const [defectsList, setDefectsList] = useState<QualityDefectItem[]>(INITIAL_DEFECTS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'Critical' | 'Major' | 'Minor'>('all');
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [mechanicDispatchedId, setMechanicDispatchedId] = useState<string | null>(null);

  // Computed Stats
  const inspectedPiecesCount = 4320;
  const verifiedCount = defectsList.filter(d => d.status === 'Verified').length;
  const criticalCount = defectsList.filter(d => d.severity === 'Critical').length;
  const activeDefect = defectsList.find(d => d.id === activeDefectId) || defectsList[0];

  // Dynamic Defect Rate calculated from current active defect load
  const calculatedDefectRate = Number(( (defectsList.filter(d => d.status !== 'False Positive').length / 85) * 100).toFixed(2));

  // Sound synthesis
  const playBeep = useCallback((freq = 880, type: OscillatorType = 'sine', duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  // Attach MediaStream safely to video
  const attachStreamToVideo = (stream: MediaStream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.play().catch((e) => console.warn('Video play prevented:', e));
    }
    setCameraActive(true);
    setIsSimulatedStream(false);
    setCameraError(null);
  };

  // Robust Multi-Stage Camera Starter
  const startCamera = async (targetFacing: 'environment' | 'user' = cameraFacingMode) => {
    setCameraError(null);
    setIsSimulatedStream(false);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API unavailable in this sandboxed iframe. Optical Sensor Simulator running.');
      setIsSimulatedStream(true);
      setCameraActive(true);
      return;
    }

    // Attempt 1: Target facingMode
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: targetFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      attachStreamToVideo(stream);
      return;
    } catch (err1) {
      console.warn('Attempt 1 (target facing) failed:', err1);
    }

    // Attempt 2: Alternate facingMode
    try {
      const altFacing = targetFacing === 'environment' ? 'user' : 'environment';
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: altFacing },
        audio: false,
      });
      setCameraFacingMode(altFacing);
      attachStreamToVideo(stream);
      return;
    } catch (err2) {
      console.warn('Attempt 2 (alternate facing) failed:', err2);
    }

    // Attempt 3: Generic video constraint
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      attachStreamToVideo(stream);
      return;
    } catch (err3: unknown) {
      console.warn('All hardware webcam attempts failed:', err3);
      const isPermissionDenied = (err3 as { name?: string })?.name === 'NotAllowedError';
      const msg = isPermissionDenied
        ? 'Camera permission was blocked by browser or preview iframe. Optical AI Simulator active.'
        : 'Webcam hardware not detected. Optical AI Simulator active.';
      setCameraError(msg);
      setIsSimulatedStream(true);
      setCameraActive(true);
    }
  };

  const flipCamera = () => {
    const nextFacing = cameraFacingMode === 'environment' ? 'user' : 'environment';
    setCameraFacingMode(nextFacing);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    startCamera(nextFacing);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (sourceMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [sourceMode]);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      setSourceMode('upload');
      // trigger scan on upload
      setTimeout(() => {
        runCameraFrameScan('custom');
      }, 300);
    }
  };

  // Run AI Vision Scan
  const runCameraFrameScan = (overrideSample?: string) => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(10);
    setScanPhaseText('Extracting Edge Tensor (MobileNetV3)...');
    playBeep(440, 'triangle', 0.15);

    setTimeout(() => {
      setScanProgress(45);
      setScanPhaseText('Running Multi-Head Defect Bounding Box Inference (18ms)...');
      playBeep(660, 'sine', 0.12);
    }, 400);

    setTimeout(() => {
      setScanProgress(80);
      setScanPhaseText('Performing NMS Non-Max Suppression & AQL 1.5 Grading...');
      playBeep(880, 'sine', 0.12);
    }, 800);

    setTimeout(() => {
      setScanProgress(100);
      setScanPhaseText('Inference Complete: Defect Vectors Tagged');
      setIsScanning(false);
      playBeep(1174, 'sine', 0.25);

      // Add a dynamic newly detected defect to showcase real product behavior
      const sample = overrideSample || (sourceMode === 'samples' ? selectedSample : 'custom');
      const newDefectId = `DEF-${Math.floor(100 + Math.random() * 900)}`;
      
      const dynamicDefect: QualityDefectItem = {
        id: newDefectId,
        type: sample === 'denim' ? 'Bar-tack Misalignment & Pocket Flare' :
              sample === 'activewear' ? 'Flatlock Elastic Thread Tension Snag' :
              sample === 'crew' ? 'Rib Collar Pitch Variance' : 'Broken Stitch & Needle Deflection',
        garmentArea: sample === 'denim' ? 'Back Pocket Reinforcement' :
                     sample === 'activewear' ? 'Side Legging Seam' :
                     sample === 'crew' ? 'Crew Neck Front Center' : 'Left Placket Collar Join',
        confidence: Number((91 + Math.random() * 7).toFixed(1)),
        severity: Math.random() > 0.6 ? 'Critical' : 'Major',
        detectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        lineId: 'Line 02 (Real-time Vision Camera #04)',
        status: 'Needs Review',
        boundingBox: {
          x: Math.round(25 + Math.random() * 45),
          y: Math.round(20 + Math.random() * 45),
          width: Math.round(20 + Math.random() * 15),
          height: Math.round(16 + Math.random() * 14),
        },
        rootCause: 'Optical sensor detected 1.8mm stitch skip caused by needle temperature overheating at 4,500 RPM.',
        correctiveAction: 'Apply silicone thread lubrication spray and replace needle tip.',
        machineId: 'JUKI-DDL-9000C-08',
        sampleType: sample as any,
      };

      setDefectsList(prev => [dynamicDefect, ...prev.slice(0, 7)]);
      setActiveDefectId(newDefectId);

      try {
        confetti({
          particleCount: 24,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#F59E0B'],
        });
      } catch {
        // Confetti fallback
      }
    }, 1200);
  };

  // Verify / Dismiss Defect
  const handleUpdateStatus = (id: string, newStatus: QualityDefectItem['status']) => {
    setDefectsList(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    playBeep(newStatus === 'Verified' ? 880 : 350, 'sine', 0.15);
  };

  // Dispatch Mechanic
  const handleDispatchMechanic = (defect: QualityDefectItem) => {
    setMechanicDispatchedId(defect.id);
    handleUpdateStatus(defect.id, 'Rework Dispatched');
    playBeep(987, 'triangle', 0.2);
    setTimeout(() => {
      setMechanicDispatchedId(null);
    }, 4000);
  };

  // Sync Defect Rate to Factory Data Entry & AI Risk Center
  const handleSyncToDataEntry = () => {
    if (onUpdateDefectRate) {
      onUpdateDefectRate(calculatedDefectRate);
    }
    setShowSyncSuccess(true);
    playBeep(1046, 'sine', 0.2);
    setTimeout(() => {
      setShowSyncSuccess(false);
    }, 3500);
  };

  const filteredDefects = defectsList.filter(d => {
    if (filterSeverity === 'all') return true;
    return d.severity === filterSeverity;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 text-[#087F6A] border border-emerald-300 shadow-sm">
              <Scan className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#0B1120] tracking-tight">
              AI Quality Intelligence & Edge Vision QC
            </h1>
            <Badge variant="blue" dot>
              EDGE VISION ON-PREM
            </Badge>
          </div>
          <p className="text-sm text-[#334155] font-medium max-w-2xl mt-1">
            Real-time end-of-line optical camera stream with bounding-box stitch defect classification, needle telemetry diagnostics, and ISO 2859-1 AQL compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-md bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#334155] hover:text-[#0B1120] text-xs transition-colors cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
            title={soundEnabled ? 'Mute Audio Signals' : 'Enable Audio Signals'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#087F6A]" /> : <VolumeX className="w-4 h-4 text-[#475569]" />}
          </button>

          <button
            onClick={() => runCameraFrameScan()}
            disabled={isScanning}
            className="px-4 py-2.5 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Inferring Edge Tensor...' : 'Simulate Camera Frame Scan'}</span>
          </button>

          <button
            onClick={() => onNavigate('data-entry')}
            className="px-3.5 py-2.5 rounded-md bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#0B1120] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Factory Data Entry</span>
          </button>
        </div>
      </div>

      {/* Sync Defect Rate to Factory Data Entry Bar */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-100 text-[#087F6A] shrink-0 border border-emerald-200">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
                LIVE QC DEFECT RATE: {calculatedDefectRate}%
              </span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase shadow-sm ${
                calculatedDefectRate > 4.0 ? 'bg-rose-100 text-rose-900 border border-rose-300' : 'bg-emerald-100 text-[#065F46] border border-emerald-300'
              }`}>
                {calculatedDefectRate > 4.0 ? 'Elevated Rework Load' : 'AQL 1.5 Export Pass'}
              </span>
            </div>
            <p className="text-xs text-[#0B1120] font-medium mt-0.5">
              Syncing this defect rate directly updates the AI Risk Center's delivery delay score and sewing capacity calculations for Order #{activeOrderNumber}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSyncSuccess && (
            <span className="text-xs font-mono font-bold text-[#087F6A] flex items-center gap-1 animate-pulse">
              <CheckCircle className="w-3.5 h-3.5" />
              Synced to Data Entry!
            </span>
          )}
          <button
            onClick={handleSyncToDataEntry}
            className="px-4 py-2 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply to Factory Data Entry & Recalculate Risk</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="text-xs font-mono font-bold text-[#334155] uppercase">Current Defect Rate</div>
          <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
            calculatedDefectRate > 4.0 ? 'text-rose-700' : calculatedDefectRate > 2.5 ? 'text-amber-700' : 'text-[#087F6A]'
          }`}>
            {calculatedDefectRate}%
          </div>
          <div className="text-xs text-[#334155] font-medium flex items-center justify-between pt-1 border-t border-[#CBD5E1]">
            <span>AQL Standard Limit: 2.5%</span>
            <span className={calculatedDefectRate > 2.5 ? 'text-rose-700 font-extrabold' : 'text-[#087F6A] font-extrabold'}>
              {calculatedDefectRate > 2.5 ? 'FAIL' : 'PASS'}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="text-xs font-mono font-bold text-[#334155] uppercase">Inspected Units Today</div>
          <div className="text-3xl sm:text-4xl font-black text-[#0B1120] font-mono tracking-tight">{inspectedPiecesCount.toLocaleString()} pcs</div>
          <div className="text-xs text-[#087F6A] font-bold flex items-center gap-1 pt-1 border-t border-[#CBD5E1]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% 4K Optical Station 04</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="text-xs font-mono font-bold text-[#334155] uppercase">Critical Anomalies</div>
          <div className="text-3xl sm:text-4xl font-black text-rose-700 font-mono tracking-tight">{criticalCount} Flagged</div>
          <div className="text-xs text-[#334155] font-medium pt-1 border-t border-[#CBD5E1]">Immediate rework required</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-2">
          <div className="text-xs font-mono font-bold text-[#334155] uppercase">Edge Model Latency</div>
          <div className="text-3xl sm:text-4xl font-black text-[#087F6A] font-mono tracking-tight">18.4 ms</div>
          <div className="text-xs text-[#334155] font-medium pt-1 border-t border-[#CBD5E1]">MobileNetV3 on NVIDIA Jetson</div>
        </div>
      </div>

      {/* Main Optical Canvas + Defect Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Garment Optical Video / Sensor View */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            {/* Source Mode Selector (Samples / Live Web Camera / Custom Upload) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#CBD5E1]">
              <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-lg border border-[#CBD5E1] shadow-sm">
                <button
                  onClick={() => setSourceMode('samples')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    sourceMode === 'samples' ? 'bg-white text-[#087F6A] shadow-sm border border-[#CBD5E1]' : 'text-[#334155] hover:text-[#0B1120]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Garment Presets</span>
                </button>

                <button
                  onClick={() => setSourceMode('camera')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    sourceMode === 'camera' ? 'bg-white text-[#087F6A] shadow-sm border border-[#CBD5E1]' : 'text-[#334155] hover:text-[#0B1120]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Live Webcam / Camera</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    sourceMode === 'upload' ? 'bg-white text-[#087F6A] shadow-sm border border-[#CBD5E1]' : 'text-[#334155] hover:text-[#0B1120]'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Sample switcher if in samples mode */}
              {sourceMode === 'samples' && (
                <div className="flex items-center gap-1 text-xs">
                  {(['polo', 'crew', 'denim', 'activewear'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSample(s);
                        runCameraFrameScan(s);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${
                        selectedSample === s ? 'bg-emerald-50 text-[#087F6A] border border-emerald-300' : 'bg-[#F8FAFC] text-[#334155] hover:text-[#0B1120] border border-[#CBD5E1]'
                      }`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Canvas Container */}
            <div className="relative w-full h-96 sm:h-[420px] rounded-xl bg-[#0F172A] border border-[#CBD5E1] flex items-center justify-center overflow-hidden select-none shadow-md">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />

              {/* Laser Scanning Bar Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 z-30 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10B981] animate-laser-scan pointer-events-none" />
              )}

              {/* LIVE CAMERA FEED OR OPTICAL SENSOR STREAM */}
              {sourceMode === 'camera' ? (
                <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                  {/* Real video if available and not simulated */}
                  {!isSimulatedStream && (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}

                  {/* High-Tech Industrial Optical Sensor Simulation */}
                  {isSimulatedStream && (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      {/* Conveyor Belt Track Texture */}
                      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                      {/* Optical Crosshair Targeting HUD */}
                      <div className="absolute inset-8 border border-emerald-500/25 pointer-events-none rounded-xl">
                        {/* Corner Reticles */}
                        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                        
                        {/* Center Target Mark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <div className="w-12 h-12 border border-dashed border-emerald-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Garment Silhouette on Optical Stage */}
                      <div className="relative w-64 h-72 border-2 border-slate-700/80 rounded-2xl flex flex-col items-center justify-between p-4 bg-slate-900/80 shadow-2xl backdrop-blur-sm z-10">
                        <div className="w-28 h-12 border-2 border-slate-600 rounded-b-xl bg-slate-800 flex flex-col items-center justify-center text-[9px] font-mono text-slate-300 shadow-inner">
                          <span className="font-bold">Collar Rib Assembly</span>
                          <span className="text-[7px] text-slate-400">180 GSM Jersey</span>
                        </div>
                        <div className="w-10 h-20 border-l-2 border-r-2 border-slate-700 bg-slate-850 flex flex-col justify-around items-center py-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-600" />
                          <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-600" />
                          <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-600" />
                        </div>
                        <div className="w-56 h-5 border-t-2 border-slate-700 bg-slate-800/40 text-center text-[8px] font-mono text-slate-400 flex items-center justify-center">
                          Double-Needle Bottom Hem (AQL 1.5 Target)
                        </div>
                      </div>

                      {/* Simulation Notice Ribbon */}
                      <div className="absolute top-12 inset-x-4 z-30 flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md text-xs">
                        <div className="flex items-center gap-2 text-slate-300 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Optical Sensor Stream Active (Industrial Camera Mode)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startCamera(cameraFacingMode)}
                            className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-1 border border-slate-700 cursor-pointer shadow-sm"
                            title="Retry hardware camera"
                          >
                            <RefreshCw className="w-3 h-3 text-emerald-400" />
                            <span>Retry Hardware</span>
                          </button>
                          <button
                            onClick={() => window.open(window.location.href, '_blank')}
                            className="px-2 py-1 rounded-md bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 cursor-pointer shadow-sm"
                            title="Open in new tab to grant hardware permissions"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>New Tab</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : sourceMode === 'upload' && uploadedImageUrl ? (
                /* UPLOADED IMAGE */
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Garment"
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                /* GARMENT SILHOUETTE CANVAS */
                <div className="relative w-72 h-80 border-2 border-dashed border-slate-700/80 rounded-2xl flex flex-col items-center justify-between p-5 bg-slate-900/60 shadow-2xl">
                  {/* Collar Band */}
                  <div className="w-32 h-14 border-2 border-slate-600 rounded-b-2xl bg-slate-800/80 flex flex-col items-center justify-center text-xs font-mono text-slate-300 shadow-inner">
                    <span className="font-bold">Collar Rib Assembly</span>
                    <span className="text-[9px] text-slate-400">180 GSM Jersey</span>
                  </div>

                  {/* Chest Placket & Buttons */}
                  <div className="w-12 h-24 border-l-2 border-r-2 border-slate-700 bg-slate-850/70 flex flex-col justify-around items-center py-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-600" />
                  </div>

                  {/* Hem */}
                  <div className="w-64 h-6 border-t-2 border-slate-700 bg-slate-800/40 text-center text-[10px] font-mono text-slate-400 flex items-center justify-center">
                    Double-Needle Bottom Hem (AQL 1.5 Target)
                  </div>
                </div>
              )}

              {/* Dynamic Bounding Boxes Overlay */}
              {defectsList.map((defect) => {
                const isSelected = defect.id === activeDefectId;
                const isCritical = defect.severity === 'Critical';
                const isMajor = defect.severity === 'Major';

                return (
                  <div
                    key={defect.id}
                    onClick={() => {
                      setActiveDefectId(defect.id);
                      playBeep(isSelected ? 600 : 750, 'sine', 0.1);
                    }}
                    style={{
                      left: `${defect.boundingBox.x}%`,
                      top: `${defect.boundingBox.y}%`,
                      width: `${defect.boundingBox.width}%`,
                      height: `${defect.boundingBox.height}%`,
                    }}
                    className={`absolute z-20 rounded cursor-pointer transition-all border-2 flex flex-col justify-between p-1.5 ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400/50'
                        : isCritical
                        ? 'border-rose-500 bg-rose-500/20 hover:bg-rose-500/30'
                        : isMajor
                        ? 'border-amber-400 bg-amber-400/20 hover:bg-amber-400/30'
                        : 'border-cyan-400 bg-cyan-400/15 hover:bg-cyan-400/25'
                    }`}
                  >
                    <div className="flex items-center justify-between pointer-events-none">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded truncate max-w-[80%] ${
                        isCritical ? 'bg-rose-600 text-white' : isMajor ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                      }`}>
                        {defect.type}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded">
                        {defect.confidence}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono font-semibold text-slate-300 bg-slate-950/70 px-1.5 py-0.5 rounded pointer-events-none">
                      <span>{defect.id}</span>
                      <span>{defect.status}</span>
                    </div>
                  </div>
                );
              })}

              {/* Edge Vision Telemetry Badge Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono font-bold text-white bg-slate-900/85 px-3 py-1.5 rounded-md border border-slate-700 backdrop-blur-md z-10 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>RTSP 1080p · 30 FPS · STATION #04 (LINE 02)</span>
              </div>

              <div className="absolute bottom-3 right-3 text-xs font-mono font-bold text-white bg-slate-900/85 px-3 py-1.5 rounded-md border border-slate-700 backdrop-blur-md z-10 flex items-center gap-2 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>INFERENCE: 18.4ms · MobileNetV3-RMG-v2</span>
              </div>
            </div>

            {/* Inference Status Log */}
            {isScanning && (
              <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-[#065F46] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2 font-medium">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#087F6A]" />
                  <span>{scanPhaseText}</span>
                </div>
                <span className="font-mono font-bold">{scanProgress}%</span>
              </div>
            )}
          </div>

          {/* Camera Controls & Action Toolbar */}
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex flex-wrap items-center justify-between gap-2 text-xs shadow-sm">
            <div className="flex items-center gap-2 text-[#334155] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#087F6A] shrink-0" />
              <span className="hidden sm:inline">Optical Station 04 active on Line 02.</span>
              <span className="sm:hidden">Line 02 Optical Active.</span>
            </div>
            <div className="flex items-center gap-2">
              {sourceMode === 'camera' && (
                <button
                  onClick={flipCamera}
                  className="px-3 py-1.5 rounded-md bg-white hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#0B1120] font-bold flex items-center gap-1 transition-all cursor-pointer text-xs shadow-sm hover:shadow"
                  title="Switch camera (Front / Back)"
                >
                  <SwitchCamera className="w-3.5 h-3.5 text-[#087F6A]" />
                  <span>{cameraFacingMode === 'environment' ? 'Back Cam' : 'Front Cam'}</span>
                </button>
              )}
              <button
                onClick={() => runCameraFrameScan()}
                className="px-3 py-1.5 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold flex items-center gap-1 transition-all cursor-pointer text-xs shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Capture & AI Scan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Defect Inspector & Machine Correction Diagnostics */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Inspector Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#CBD5E1] gap-2">
              <div>
                <span className="text-xs font-mono text-[#087F6A] font-extrabold uppercase tracking-wider">
                  OPTICAL DIAGNOSTIC INSPECTOR
                </span>
                <h3 className="text-lg font-extrabold text-[#0B1120] leading-snug mt-0.5">
                  {activeDefect.type}
                </h3>
                <span className="text-xs font-mono font-semibold text-[#334155]">ID: {activeDefect.id}</span>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold inline-block border shadow-sm ${
                  activeDefect.severity === 'Critical'
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : activeDefect.severity === 'Major'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-sky-100 text-sky-900 border-sky-300'
                }`}>
                  {activeDefect.severity.toUpperCase()} · {activeDefect.confidence}%
                </span>
                <div className="text-xs font-mono font-medium text-[#475569] mt-1">{activeDefect.detectedAt}</div>
              </div>
            </div>

            {/* Defect Telemetry Grid */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#CBD5E1] text-[#334155]">
                <span className="font-medium">Associated Order</span>
                <span className="text-[#0B1120] font-mono font-bold">#{activeOrderNumber} ({activeBuyer})</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#CBD5E1] text-[#334155]">
                <span className="font-medium">Sewing Workstation</span>
                <span className="text-[#087F6A] font-mono font-bold">{activeDefect.lineId}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#CBD5E1] text-[#334155]">
                <span className="font-medium">Machine Telemetry ID</span>
                <span className="text-[#0B1120] font-mono font-bold">{activeDefect.machineId}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#CBD5E1] text-[#334155]">
                <span className="font-medium">Garment Area</span>
                <span className="text-[#0B1120] font-bold">{activeDefect.garmentArea}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#CBD5E1] text-[#334155]">
                <span className="font-medium">Verification State</span>
                <span className={`font-mono font-extrabold ${
                  activeDefect.status === 'Verified' ? 'text-[#087F6A]' :
                  activeDefect.status === 'Rework Dispatched' ? 'text-sky-700' :
                  activeDefect.status === 'False Positive' ? 'text-[#475569]' : 'text-amber-800'
                }`}>
                  {activeDefect.status}
                </span>
              </div>
            </div>

            {/* Root Cause Hypothesis Box */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1.5 shadow-sm">
              <div className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>AI Root Cause & Tension Hypothesis</span>
              </div>
              <p className="text-xs text-[#0B1120] leading-relaxed font-medium">
                “{activeDefect.rootCause}”
              </p>
            </div>

            {/* Corrective Action Box */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 space-y-1.5 shadow-sm">
              <div className="text-xs font-extrabold text-[#065F46] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#087F6A]" />
                <span>Recommended Mechanical Calibration</span>
              </div>
              <p className="text-xs text-[#0B1120] leading-relaxed font-medium">
                {activeDefect.correctiveAction}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-[#CBD5E1]">
            {mechanicDispatchedId === activeDefect.id ? (
              <div className="p-3 rounded-md bg-sky-50 border border-sky-300 text-center text-xs text-sky-950 font-bold flex items-center justify-center gap-2 animate-pulse shadow-sm">
                <Wrench className="w-4 h-4 text-sky-600" />
                <span>Mechanic Alert Dispatched to {activeDefect.machineId}!</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateStatus(activeDefect.id, 'Verified')}
                  className="py-2.5 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Defect</span>
                </button>

                <button
                  onClick={() => handleDispatchMechanic(activeDefect)}
                  className="py-2.5 rounded-md bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Dispatch Mechanic</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-xs text-[#334155] font-medium">
              <button
                onClick={() => handleUpdateStatus(activeDefect.id, 'False Positive')}
                className="text-[#334155] hover:text-[#0B1120] underline underline-offset-2 cursor-pointer font-semibold"
              >
                Flag as False Positive
              </button>

              <button
                onClick={() => onNavigate('risk-center')}
                className="text-[#087F6A] hover:text-[#066653] font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View Risk Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Defect Detections Log Stream Table */}
      <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-[#0B1120] flex items-center gap-2 uppercase tracking-wider font-mono">
              <Activity className="w-4 h-4 text-[#087F6A]" />
              <span>Edge Vision Detection Log Stream</span>
            </h3>
            <p className="text-xs text-[#334155] font-medium mt-1">
              Live anomaly events recorded by optical station cameras across Sewing Lines 01 to 08.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#334155] font-bold mr-1">Filter:</span>
            {(['all', 'Critical', 'Major', 'Minor'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${
                  filterSeverity === sev ? 'bg-[#087F6A] text-white' : 'bg-[#F8FAFC] text-[#334155] hover:text-[#0B1120] border border-[#CBD5E1]'
                }`}
              >
                {sev.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#CBD5E1] text-[#334155] font-mono font-bold text-xs uppercase">
                <th className="pb-3">Defect ID</th>
                <th className="pb-3">Anomaly Classification</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Workstation</th>
                <th className="pb-3">Garment Area</th>
                <th className="pb-3">AI Confidence</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CBD5E1]">
              {filteredDefects.map((def) => {
                const isSelected = def.id === activeDefectId;
                return (
                  <tr
                    key={def.id}
                    onClick={() => setActiveDefectId(def.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-bold' : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <td className="py-3.5 font-mono font-bold text-[#0B1120] flex items-center gap-1.5">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#087F6A]" />}
                      {def.id}
                    </td>
                    <td className="py-3.5 text-[#0B1120] font-semibold">{def.type}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-sm ${
                          def.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : def.severity === 'Major'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-sky-100 text-sky-900 border-sky-300'
                        }`}
                      >
                        {def.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-[#334155] font-semibold">{def.lineId.split(' ')[0]}</td>
                    <td className="py-3.5 text-[#0B1120] font-medium">{def.garmentArea}</td>
                    <td className="py-3.5 font-mono text-[#087F6A] font-extrabold">{def.confidence}%</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-sm ${
                        def.status === 'Verified' ? 'bg-emerald-100 text-[#065F46] border-emerald-300' :
                        def.status === 'Rework Dispatched' ? 'bg-sky-100 text-sky-900 border-sky-300' :
                        def.status === 'False Positive' ? 'bg-slate-100 text-[#475569] border-[#CBD5E1]' : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {def.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDefectId(def.id);
                        }}
                        className="text-[#087F6A] hover:text-[#066653] text-xs font-bold flex items-center justify-end gap-1 ml-auto cursor-pointer"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
