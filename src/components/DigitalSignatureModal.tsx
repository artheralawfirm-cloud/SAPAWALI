import React, { useRef, useState, useEffect } from 'react';
import {
  PenTool,
  Upload,
  RefreshCw,
  Check,
  X,
  Shield,
  UserCheck,
  Sparkles,
  Image as ImageIcon,
  Eraser,
  Stamp,
  Search,
  Filter,
  Download,
  Copy,
  Layers,
  Palette
} from 'lucide-react';
import {
  SIGNATURE_WALI_SVG,
  SIGNATURE_PENGAMPU_SVG,
  generateDynamicWaliSignature,
  SIGNATURE_SYUHADA_SVG,
  SIGNATURE_SHELA_NATASHA_SVG,
  SIGNATURE_SYAFRIADI_SVG,
  SIGNATURE_BUDIYANTO_SVG,
  SIGNATURE_ELSINTHA_SVG,
  SIGNATURE_SITI_ROSLINA_SVG,
  SIGNATURE_TAUFIK_SVG,
  STAMP_BHP_MEDAN_SVG,
  STAMP_KEPALA_BHP_SVG,
  OFFICIAL_BHP_OFFICERS,
  OfficialOfficer,
  VECTOR_SIGNATURE_DATABASE,
  VectorSignatureItem,
  generateColoredVectorSvg
} from '../utils/signaturesAndStamps';

interface DigitalSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  namaWali: string;
  isPengampuan: boolean;
  customWaliSignature: string | null;
  customBhpSignature: string | null;
  customStamp?: string | null;
  onSaveSignatures: (waliSig: string | null, bhpSig: string | null, stampSig?: string | null) => void;
}

export const DigitalSignatureModal: React.FC<DigitalSignatureModalProps> = ({
  isOpen,
  onClose,
  namaWali,
  isPengampuan,
  customWaliSignature,
  customBhpSignature,
  customStamp,
  onSaveSignatures
}) => {
  // Active target being edited: 'wali', officer ID ('shela_natasha', 'syuhada', etc.), or 'stamp'
  const [selectedTargetId, setSelectedTargetId] = useState<string>('shela_natasha');
  const [activeMethod, setActiveMethod] = useState<'database' | 'draw' | 'upload'>('database');
  
  // Canvas refs and states for signature pad
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [penColor, setPenColor] = useState('#0b1021'); // Official Black Ink
  const [penWidth, setPenWidth] = useState(2.8);

  // Vector Database Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Semua');
  const [vectorInkColor, setVectorInkColor] = useState<string>('#0b1021');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Dictionary of signatures stored in modal local state: { targetId -> base64/SVG }
  const [signaturesMap, setSignaturesMap] = useState<Record<string, string | null>>({
    wali: customWaliSignature,
    bhp: customBhpSignature,
    stamp: customStamp || null
  });

  // Load custom saved signatures from localStorage on mount/open
  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = localStorage.getItem('SAPA_WALI_CUSTOM_OFFICER_SIGNATURES');
      const parsed = saved ? JSON.parse(saved) : {};
      setSignaturesMap({
        wali: customWaliSignature || parsed['wali'] || null,
        bhp: customBhpSignature || parsed['bhp'] || null,
        stamp: customStamp || parsed['stamp'] || null,
        ...parsed
      });
    } catch (e) {
      setSignaturesMap({
        wali: customWaliSignature,
        bhp: customBhpSignature,
        stamp: customStamp || null
      });
    }
  }, [isOpen, customWaliSignature, customBhpSignature, customStamp]);

  if (!isOpen) return null;

  // Default vector signatures lookup
  const getDefaultSignatureForTarget = (targetId: string): string => {
    if (targetId === 'wali') {
      return generateDynamicWaliSignature(namaWali, isPengampuan);
    }
    if (targetId === 'stamp') {
      return STAMP_BHP_MEDAN_SVG;
    }
    const officer = OFFICIAL_BHP_OFFICERS.find((o) => o.id === targetId);
    if (officer) return officer.signatureSvg;
    return SIGNATURE_SYUHADA_SVG;
  };

  const defaultSig = getDefaultSignatureForTarget(selectedTargetId);
  const currentSigInUse = signaturesMap[selectedTargetId] || defaultSig;
  const isUsingCustom = Boolean(signaturesMap[selectedTargetId]);

  // Clear signature pad
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Save Drawn Canvas
  const handleSaveDrawnCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const dataUrl = canvas.toDataURL('image/png');
    setSignaturesMap((prev) => ({
      ...prev,
      [selectedTargetId]: dataUrl,
      ...(selectedTargetId !== 'wali' && selectedTargetId !== 'stamp' ? { bhp: dataUrl } : {})
    }));
  };

  // Handle Image File Upload (PNG/JPG/SVG)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setSignaturesMap((prev) => ({
          ...prev,
          [selectedTargetId]: result,
          ...(selectedTargetId !== 'wali' && selectedTargetId !== 'stamp' ? { bhp: result } : {})
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset selected target signature back to database vector default
  const handleResetTarget = () => {
    setSignaturesMap((prev) => {
      const next = { ...prev };
      delete next[selectedTargetId];
      if (selectedTargetId !== 'wali' && selectedTargetId !== 'stamp') {
        delete next['bhp'];
      }
      return next;
    });
  };

  // Select vector specimen from vector database catalog
  const handleSelectVectorSpecimen = (item: VectorSignatureItem) => {
    const coloredSvg = generateColoredVectorSvg(item.svgDataUrl, vectorInkColor);
    
    // Map vector item to selected target or update selectedTargetId appropriately
    let target = selectedTargetId;
    if ((item as any).category === 'Wali / Pengampu') {
      target = 'wali';
    } else if ((item as any).category === 'Stempel') {
      target = 'stamp';
    } else {
      // Officer
      target = item.id;
    }

    setSelectedTargetId(target);
    setSignaturesMap((prev) => ({
      ...prev,
      [target]: coloredSvg,
      ...(target !== 'wali' && target !== 'stamp' ? { bhp: coloredSvg } : {})
    }));

    setCopiedNotification(`Spesimen "${(item as any).title}" berhasil dipasang!`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  // Copy Vector SVG Code
  const handleCopySvgCode = (item: VectorSignatureItem) => {
    try {
      const decodedSvg = decodeURIComponent(item.svgDataUrl.replace('data:image/svg+xml;utf8,', ''));
      navigator.clipboard.writeText(decodedSvg);
      setCopiedNotification(`Kode SVG ${(item as any).title} disalin ke clipboard!`);
      setTimeout(() => setCopiedNotification(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Download Vector SVG File
  const handleDownloadSvgFile = (item: VectorSignatureItem) => {
    try {
      const decodedSvg = decodeURIComponent(item.svgDataUrl.replace('data:image/svg+xml;utf8,', ''));
      const blob = new Blob([decodedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Spesimen_Vektor_${item.id}_SAPA_WALI.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  // Save & Apply All
  const handleApplyAll = () => {
    try {
      localStorage.setItem('SAPA_WALI_CUSTOM_OFFICER_SIGNATURES', JSON.stringify(signaturesMap));
    } catch (e) {
      console.error('Failed to save signatures to localStorage', e);
    }

    const waliSig = signaturesMap['wali'] || null;
    const bhpSig = signaturesMap['bhp'] || signaturesMap[selectedTargetId] || null;
    const stampSig = signaturesMap['stamp'] || null;

    onSaveSignatures(waliSig, bhpSig, stampSig);
    onClose();
  };

  // Selected Target Info Label
  const getTargetTitle = (id: string) => {
    if (id === 'wali') return `${isPengampuan ? 'Pengampu' : 'Wali'}: ${namaWali}`;
    if (id === 'stamp') return 'Stempel Ungu Resmi Balai Harta Peninggalan Medan';
    const officer = OFFICIAL_BHP_OFFICERS.find((o) => o.id === id);
    if (officer) return `${(officer as any).nama} (${(officer as any).jabatan.split(' pada ')[0]})`;
    return 'Petugas BHP Medan';
  };

  // Filtered Vector Signatures Database List
  const filteredVectorDatabase = VECTOR_SIGNATURE_DATABASE.filter((item) => {
    const matchesCategory =
      selectedCategoryFilter === 'Semua' || (item as any).category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (item as any).title.toLowerCase().includes(q) ||
      (item as any).roleTitle.toLowerCase().includes(q) ||
      ((item as any).nip && (item as any).nip.includes(q)) ||
      ((item as any).seksi && (item as any).seksi.toLowerCase().includes(q)) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 font-sans text-slate-100">
      <div className="bg-slate-900 border border-slate-700/90 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-slate-800/90 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                <span>Database Vektor Tanda Tangan &amp; Spesimen Resmi</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 font-semibold">
                  SAPA WALI
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Katalog presisi vektor tanda tangan pejabat, wali/pengampu, &amp; stempel ungu Pengayoman Kemenkumham
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Notification Toast */}
        {copiedNotification && (
          <div className="bg-emerald-500 text-slate-950 font-bold text-xs py-2 px-4 text-center animate-fadeIn flex items-center justify-center space-x-2">
            <Check className="w-4 h-4" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* 1. Target Officer & Signee Selector Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>PEJABAT / WALI / STEMPEL AKTIF YANG DIATUR:</span>
              </span>
              <span className="text-amber-400 font-bold normal-case text-xs">
                {getTargetTitle(selectedTargetId)}
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              {/* Wali / Pengampu Option */}
              <button
                type="button"
                onClick={() => setSelectedTargetId('wali')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition-all flex flex-col justify-between h-16 cursor-pointer ${
                  selectedTargetId === 'wali'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    <span>{isPengampuan ? 'PENGAMPU' : 'WALI'}</span>
                  </span>
                  {signaturesMap['wali'] && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                </div>
                <span className="font-bold truncate text-[11px] text-white mt-1">{namaWali}</span>
              </button>

              {/* Official BHP Officers */}
              {OFFICIAL_BHP_OFFICERS.map((officer) => {
                const hasCustom = Boolean(signaturesMap[officer.id]);
                const isSelected = selectedTargetId === officer.id;
                return (
                  <button
                    key={officer.id}
                    type="button"
                    onClick={() => setSelectedTargetId(officer.id)}
                    className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition-all flex flex-col justify-between h-16 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 truncate flex items-center gap-1">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span>{(officer as any).nama.split(',')[0]}</span>
                      </span>
                      {hasCustom && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                    </div>
                    <span className="font-bold truncate text-[11px] text-white mt-1">
                      {(officer as any).nama.replace(/, S\.H\..*/, '')}
                    </span>
                  </button>
                );
              })}

              {/* Official Stamp Option */}
              <button
                type="button"
                onClick={() => setSelectedTargetId('stamp')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition-all flex flex-col justify-between h-16 cursor-pointer ${
                  selectedTargetId === 'stamp'
                    ? 'bg-purple-500/20 text-purple-200 border-purple-500/60 shadow-md ring-1 ring-purple-500/30'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-purple-400 flex items-center gap-1">
                    <Stamp className="w-3 h-3" />
                    <span>STEMPEL</span>
                  </span>
                  {signaturesMap['stamp'] && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                </div>
                <span className="font-bold truncate text-[11px] text-white mt-1">Stempel BHP</span>
              </button>
            </div>
          </div>

          {/* 2. Source Method Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveMethod('database')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeMethod === 'database'
                    ? 'bg-blue-600/30 text-blue-200 border-blue-500/70 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>1. Katalog Database Vektor (Rekomendasi)</span>
              </button>

              <button
                onClick={() => setActiveMethod('draw')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeMethod === 'draw'
                    ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/70 shadow-md'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4 text-emerald-400" />
                <span>2. Gores Kanvas Digital</span>
              </button>

              <button
                onClick={() => setActiveMethod('upload')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeMethod === 'upload'
                    ? 'bg-purple-600/30 text-purple-200 border-purple-500/70 shadow-md'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4 text-purple-400" />
                <span>3. Unggah Berkas Foto PNG/JPG</span>
              </button>
            </div>

            {isUsingCustom && (
              <button
                onClick={handleResetTarget}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset ke Bawaan</span>
              </button>
            )}
          </div>

          {/* 3. Main Method Content Container */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-4">
            
            {/* METHOD 1: DATABSE VEKTOR CATALOG & SEARCH */}
            {activeMethod === 'database' && (
              <div className="space-y-4">
                
                {/* Search & Vector Ink Color Toolbar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari spesimen tanda tangan, NIP, atau nama pejabat..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Vector Ink Color Picker */}
                  <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-medium text-[11px] text-slate-400">Tinta Vektor:</span>
                    
                    <button
                      type="button"
                      onClick={() => setVectorInkColor('#0b1021')}
                      className={`w-5 h-5 rounded-full bg-slate-950 border border-slate-400 ${
                        vectorInkColor === '#0b1021' ? 'ring-2 ring-emerald-400 scale-110' : ''
                      }`}
                      title="Hitam Pekat"
                    />
                    <button
                      type="button"
                      onClick={() => setVectorInkColor('#1e3a8a')}
                      className={`w-5 h-5 rounded-full bg-blue-900 border border-blue-400 ${
                        vectorInkColor === '#1e3a8a' ? 'ring-2 ring-emerald-400 scale-110' : ''
                      }`}
                      title="Biru Legal"
                    />
                    <button
                      type="button"
                      onClick={() => setVectorInkColor('#6b21a8')}
                      className={`w-5 h-5 rounded-full bg-purple-900 border border-purple-400 ${
                        vectorInkColor === '#6b21a8' ? 'ring-2 ring-emerald-400 scale-110' : ''
                      }`}
                      title="Ungu Stempel"
                    />
                    <button
                      type="button"
                      onClick={() => setVectorInkColor('#991b1b')}
                      className={`w-5 h-5 rounded-full bg-rose-900 border border-rose-400 ${
                        vectorInkColor === '#991b1b' ? 'ring-2 ring-emerald-400 scale-110' : ''
                      }`}
                      title="Merah Dinas"
                    />
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
                  {['Semua', 'Pimpinan', 'Pejabat', 'Fungsional', 'Wali / Pengampu', 'Stempel'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer text-[11px] ${
                        selectedCategoryFilter === cat
                          ? 'bg-blue-500 text-white shadow'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Vector Database Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
                  {filteredVectorDatabase.map((item) => {
                    const coloredSvg = generateColoredVectorSvg(item.svgDataUrl, vectorInkColor);

                    return (
                      <div
                        key={item.id}
                        className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between hover:border-blue-500/60 transition-all space-y-2 group shadow-sm"
                      >
                        {/* Header Info */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                              {(item as any).category}
                            </span>
                            {(item as any).seksi && (
                              <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                                {(item as any).seksi}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-white leading-snug">{(item as any).title}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{(item as any).roleTitle}</p>
                          {(item as any).nip && (
                            <p className="text-[9px] text-slate-500 font-mono">NIP. {(item as any).nip}</p>
                          )}
                        </div>

                        {/* White Canvas Box */}
                        <div className="bg-white rounded-lg p-2 h-20 flex items-center justify-center border border-slate-300 shadow-inner overflow-hidden relative">
                          <img
                            src={coloredSvg}
                            alt={(item as any).title}
                            className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-1 flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectVectorSpecimen(item)}
                            className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Gunakan</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopySvgCode(item)}
                            title="Salin Kode SVG"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all cursor-pointer border border-slate-700"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadSvgFile(item)}
                            title="Unduh Berkas .SVG"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-all cursor-pointer border border-slate-700"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredVectorDatabase.length === 0 && (
                    <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                      Tidak ada spesimen vektor yang cocok dengan pencarian "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* METHOD 2: HTML5 Digital Signature Pad Canvas */}
            {activeMethod === 'draw' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-300">
                  <span className="font-medium">Goreskan tanda tangan pada bidang di bawah ini:</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-[11px] text-slate-400 mr-1">Tinta:</span>
                      <button
                        type="button"
                        onClick={() => setPenColor('#0b1021')}
                        className={`w-5 h-5 rounded-full bg-slate-950 border border-slate-400 ${
                          penColor === '#0b1021' ? 'ring-2 ring-emerald-400 scale-110' : ''
                        }`}
                        title="Tinta Hitam Pekat"
                      />
                      <button
                        type="button"
                        onClick={() => setPenColor('#1e3a8a')}
                        className={`w-5 h-5 rounded-full bg-blue-900 border border-blue-400 ${
                          penColor === '#1e3a8a' ? 'ring-2 ring-emerald-400 scale-110' : ''
                        }`}
                        title="Tinta Biru Legal"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="flex items-center space-x-1 text-rose-400 hover:text-rose-300 text-xs bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20 cursor-pointer"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span>Bersihkan</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-dashed border-slate-400 overflow-hidden relative touch-none shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-40 cursor-crosshair block"
                  />
                  {!hasDrawn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs font-semibold">
                      Tulis / Goreskan Tanda Tangan di Sini...
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveDrawnCanvas}
                    disabled={!hasDrawn}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Gunakan Hasil Coretan Ini</span>
                  </button>
                </div>
              </div>
            )}

            {/* METHOD 3: Image File Upload (PNG/JPG/SVG) */}
            {activeMethod === 'upload' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-300 font-medium flex items-center justify-between">
                  <span>Pilih file foto atau scan tanda tangan resmi (PNG, JPG, WEBP, SVG):</span>
                  <span className="text-slate-400 text-[11px] italic">Saran: Gunakan foto PNG bertinta jelas</span>
                </div>

                <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-xl bg-slate-900/60 cursor-pointer transition-all hover:bg-slate-900 group">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4 text-center">
                    <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-full mb-2 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-white font-bold">
                      Klik di sini untuk unggah foto Tanda Tangan
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Otomatis dipasang pada posisi {getTargetTitle(selectedTargetId)}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Current Active Preview Box */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 mb-1.5 flex items-center justify-between">
                <span>PREVIEW HASIL TANDA TANGAN UNTUK {getTargetTitle(selectedTargetId).toUpperCase()}:</span>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                  isUsingCustom ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {isUsingCustom ? 'CUSTOM / PILIHAN PENGGUNA' : 'DATABASE VEKTOR BAWAAN'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-300 flex items-center justify-center h-24 shadow-inner relative">
                <img
                  src={currentSigInUse}
                  alt="Preview Tanda Tangan"
                  className="h-20 w-auto object-contain z-10"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-800/90 p-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-slate-400 font-medium">
            Tanda tangan vektor otomatis diterapkan pada Berita Acara, SOP, &amp; Kartu Kendali
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleApplyAll}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan &amp; Terapkan Tanda Tangan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
