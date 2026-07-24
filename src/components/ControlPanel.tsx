import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Search, Moon, Sun, 
  MessageSquare, Plus, Trash2, Download, FileText, FolderArchive, Sparkles, RefreshCw, Layers
} from 'lucide-react';
import { SapaWaliRecord, ChatConfig, ChatMessage } from '../types';
import { createOfficialSapaWaliMessages } from '../data/sapaWaliData';
import { getWaliHonorific } from '../utils/officialDocumentHelpers';

interface ControlPanelProps {
  dataset: SapaWaliRecord[];
  currentIndex: number;
  onSelectRecord: (index: number) => void;
  config: ChatConfig;
  onChangeConfig: (newConfig: ChatConfig) => void;
  onSinglePngDownload: () => void;
  onSinglePdfDownload: () => void;
  onOpenBatchModal: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  dataset,
  currentIndex,
  onSelectRecord,
  config,
  onChangeConfig,
  onSinglePngDownload,
  onSinglePdfDownload,
  onOpenBatchModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const currentRecord = dataset[currentIndex];

  // Filtered dataset for dropdown & search
  const filteredDataset = useMemo(() => {
    if (!searchTerm.trim()) return dataset;
    const term = searchTerm.toLowerCase();
    return dataset.filter(
      (item) =>
        item.namaWali.toLowerCase().includes(term) ||
        item.noHp.includes(term) ||
        item.namaAnak.toLowerCase().includes(term) ||
        item.nik.includes(term) ||
        item.kotaKab.toLowerCase().includes(term)
    );
  }, [dataset, searchTerm]);

  // Handle Preset Reset
  const handleApplyPreset = (presetType: 'official_full' | 'reminder_only' | 'short_reply') => {
    if (!currentRecord) return;
    let newMsgs: ChatMessage[] = [];

    if (presetType === 'official_full') {
      newMsgs = createOfficialSapaWaliMessages(currentRecord);
    } else if (presetType === 'reminder_only') {
      newMsgs = [
        { id: 'm1', type: 'date_header', text: 'Hari ini' },
        {
          id: 'm2',
          type: 'incoming',
          time: '14:20',
          hasLinkCard: true,
          linkTitle: 'SAPA WALI - Monitoring Perwalian & Pengampuan',
          linkSubtitle: 'BHP Medan Kemenkum RI',
          linkUrl: 'bit.ly',
          text: `Selamat Siang ${getWaliHonorific(currentRecord)} ${currentRecord.namaWali}, mengingatkan kembali untuk mengisi Formulir E-Monitoring SAPA WALI: https://bit.ly/PertanyaanMonitoringSAPAWALI . Terima kasih.`
        }
      ];
    } else if (presetType === 'short_reply') {
      newMsgs = [
        { id: 'm1', type: 'date_header', text: 'May 20, 2026' },
        {
          id: 'm2',
          type: 'incoming',
          time: '09:43',
          hasLinkCard: true,
          linkTitle: 'SAPA WALI - Monitoring Perwalian & Pengampuan',
          linkSubtitle: 'BHP Medan Kemenkum RI',
          linkUrl: 'bit.ly',
          text: `Yth. ${currentRecord.namaWali}, mohon kesediaannya mengisi E-Monitoring SAPA WALI: https://bit.ly/PertanyaanMonitoringSAPAWALI`
        },
        { id: 'm3', type: 'outgoing', time: '09:45', status: 'read', text: 'Baik, terima kasih pak.' }
      ];
    }

    onChangeConfig({
      ...config,
      messages: newMsgs
    });
  };

  // Text message updates
  const handleMessageChange = (id: string, field: keyof ChatMessage, value: any) => {
    const updated = (config?.messages || []).map((m) => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    onChangeConfig({ ...config, messages: updated });
  };

  const handleAddMessage = (type: ChatMessage['type']) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      type,
      time: '10:00',
      status: 'read',
      text: type === 'incoming' ? 'Pesan baru dari petugas' : 'Pesan balasan'
    };
    onChangeConfig({
      ...config,
      messages: [...(config?.messages || []), newMsg]
    });
  };

  const handleDeleteMessage = (id: string) => {
    onChangeConfig({
      ...config,
      messages: (config?.messages || []).filter((m) => m.id !== id)
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-lg space-y-6 text-slate-800 dark:text-slate-100 max-w-xl w-full">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              SAPA WALI
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              BHP MEDAN
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight mt-1 text-slate-900 dark:text-white">
            WhatsApp Batch Generator
          </h1>
        </div>

        {/* Dark Mode Chat Toggle */}
        <button
          onClick={() => onChangeConfig({ ...config, isDarkMode: !config.isDarkMode })}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
            config.isDarkMode
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          title="Toggle Dark/Light Mode WhatsApp Chat Frame"
        >
          {config.isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{config.isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* Database Selector & Navigator (109 Records) */}
      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Pilih Data Perwakilan ({dataset.length} Data Registered)
          </label>
          <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
            Record #{currentIndex + 1} / {dataset.length}
          </span>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari Nama Wali, Nomor HP, Nama Anak, NIK..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Dropdown Selector */}
        <select
          value={currentIndex}
          onChange={(e) => onSelectRecord(Number(e.target.value))}
          className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium focus:ring-2 focus:ring-emerald-500 truncate"
        >
          {(filteredDataset || []).map((item) => {
            const actualIndex = dataset.indexOf(item);
            return (
              <option key={item.id} value={actualIndex >= 0 ? actualIndex : 0}>
                #{item.no} - {item.namaWali} | {item.jenisWewenang} ({item.kotaKab}) - {item.noHp}
              </option>
            );
          })}
        </select>

        {/* Prev / Next Navigation Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelectRecord(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex-1 py-2 px-3 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
          
          <button
            onClick={() => onSelectRecord(Math.min(dataset.length - 1, currentIndex + 1))}
            disabled={currentIndex === dataset.length - 1}
            className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Record Metadata Cards */}
        {currentRecord && (
          <div className="mt-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 leading-relaxed">
            <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-1.5">
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                {currentRecord.namaWali} ({currentRecord.hubungan})
              </span>
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {currentRecord.jenisWewenang}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400">No. HP:</span> <strong>{currentRecord.noHp}</strong>
              </div>
              <div>
                <span className="text-slate-400">Kota/Kab:</span> <strong>{currentRecord.kotaKab}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Nama Anak/Terampu:</span> <strong className="text-slate-800 dark:text-slate-100">{currentRecord.namaAnak}</strong>
              </div>
              <div>
                <span className="text-slate-400">Seksi:</span> <span>{currentRecord.seksi}</span>
              </div>
              <div>
                <span className="text-slate-400">JFKK:</span> <span>{currentRecord.jfkk}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Header Customization */}
      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Pengaturan Display WhatsApp
        </label>
        
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Nama Kontak Header
            </label>
            <textarea
              rows={4}
              value={config.contactName}
              onChange={(e) => onChangeConfig({ ...config, contactName: e.target.value })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium resize-y"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Status Online
            </label>
            <select
              value={config.onlineStatus}
              onChange={(e) => onChangeConfig({ ...config, onlineStatus: e.target.value })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
            >
              <option value="online">online</option>
              <option value="ketik...">ketik...</option>
              <option value="Terakhir dilihat hari ini 09:42">Terakhir dilihat hari ini 09:42</option>
              <option value="Terakhir dilihat kemarin 18:15">Terakhir dilihat kemarin 18:15</option>
              <option value="">(Kosong / Offline)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Jam Top Bar HP
            </label>
            <input
              type="text"
              value={config.timeTopBar}
              onChange={(e) => onChangeConfig({ ...config, timeTopBar: e.target.value })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">
              Baterai HP ({config.batteryLevel}%)
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={config.batteryLevel}
              onChange={(e) => onChangeConfig({ ...config, batteryLevel: Number(e.target.value) })}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Preset Message Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Preset Template SAPA WALI</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleApplyPreset('official_full')}
            className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-[11px] font-bold hover:bg-emerald-100 transition-colors text-center"
          >
            Lengkap (Resmi + Wali)
          </button>
          <button
            onClick={() => handleApplyPreset('reminder_only')}
            className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-200 transition-colors text-center"
          >
            Pengingat (Followup)
          </button>
          <button
            onClick={() => handleApplyPreset('short_reply')}
            className="p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-200 transition-colors text-center"
          >
            Singkat & Cepat
          </button>
        </div>
      </div>

      {/* Chat Messages Editor */}
      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Edit Daftar Pesan Chat ({config.messages.length})
          </label>
          <div className="flex gap-1">
            <button
              onClick={() => handleAddMessage('incoming')}
              className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-[10px] font-bold hover:bg-slate-100 flex items-center gap-1"
            >
              <Plus className="w-3 h-3 text-emerald-600" /> + Masuk (Petugas)
            </button>
            <button
              onClick={() => handleAddMessage('outgoing')}
              className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> + Keluar (Wali)
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {(config?.messages || []).map((msg, index) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg border text-xs relative ${
                msg.type === 'incoming'
                  ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                  : msg.type === 'outgoing'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    msg.type === 'incoming'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : msg.type === 'outgoing'
                      ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  #{index + 1} - {msg.type === 'incoming' ? 'Petugas SAPA WALI' : msg.type === 'outgoing' ? 'Wali/Pengampu' : msg.type}
                </span>

                <div className="flex items-center gap-2">
                  {msg.type !== 'date_header' && msg.type !== 'encryption_notice' && (
                    <input
                      type="text"
                      value={msg.time || ''}
                      onChange={(e) => handleMessageChange(msg.id, 'time', e.target.value)}
                      placeholder="Jam"
                      className="w-16 p-1 text-[10px] border rounded bg-white dark:bg-slate-800 text-center font-semibold"
                    />
                  )}
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="p-1 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                rows={msg.type === 'incoming' && msg.hasLinkCard ? 24 : 10}
                value={msg.text || ''}
                onChange={(e) => handleMessageChange(msg.id, 'text', e.target.value)}
                className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
              />
              {msg.hasLinkCard && (
                <div className="mt-3 space-y-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <label className="block text-xs font-semibold text-slate-500">Link Title (Kartu Link)</label>
                  <textarea
                    rows={8}
                    value={msg.linkTitle || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkTitle', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                  <label className="block text-xs font-semibold text-slate-500">Link Subtitle</label>
                  <textarea
                    rows={6}
                    value={msg.linkSubtitle || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkSubtitle', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                  <label className="block text-xs font-semibold text-slate-500">Link URL</label>
                  <textarea
                    rows={6}
                    value={msg.linkUrl || ''}
                    onChange={(e) => handleMessageChange(msg.id, 'linkUrl', e.target.value)}
                    className="w-full p-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>
              )}


              {msg.type === 'outgoing' && (
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={msg.status === 'read'}
                      onChange={(e) => handleMessageChange(msg.id, 'status', e.target.checked ? 'read' : 'delivered')}
                      className="accent-emerald-600 rounded"
                    />
                    Status Centang Dua Biru (Read Receipt)
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Action Buttons Section */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          {/* Single Download PNG 3x Ultra Sharp */}
          <button
            onClick={onSinglePngDownload}
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            Unduh PNG (3x Ultra Sharp)
          </button>

          {/* Single Download PDF */}
          <button
            onClick={onSinglePdfDownload}
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Unduh PDF 1-Klik
          </button>
        </div>

        {/* BATCH EXPORT MASSAL 109 DATA */}
        <button
          onClick={onOpenBatchModal}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border border-amber-400/30"
        >
          <FolderArchive className="w-5 h-5 animate-pulse" />
          EKSPOR MASSAL (Batch 109 Data ke Multi-PDF / ZIP PNG)
        </button>
      </div>
    </div>
  );
};
