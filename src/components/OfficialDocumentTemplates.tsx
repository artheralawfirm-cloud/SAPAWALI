import React from 'react';
import { SapaWaliRecord } from '../types';
import { getBAMonitoringContent } from '../utils/officialDocumentHelpers';
import { getPdfPageHeaderTitle } from '../utils/pdfGenerator';
import {
  LOGO_KEMENKUMHAM_SVG,
  SIGNATURE_SYAFRIADI_STAMP_SVG,
  SIGNATURE_SYAFRIADI_SVG,
  SIGNATURE_ELSINTHA_SVG,
  STAMP_BHP_MEDAN_SVG,
  STAMP_KEPALA_BHP_SVG,
  SIGNATURE_SITI_ROSLINA_SVG,
  SIGNATURE_TAUFIK_SVG,
  SIGNATURE_BUDIYANTO_SVG,
  SIGNATURE_SHELA_NATASHA_SVG,
  SIGNATURE_SYUHADA_SVG,
  SIGNATURE_WALI_SVG,
  SIGNATURE_PENGAMPU_SVG,
  generateDynamicWaliSignature,
  OfficialOfficer,
  getSavedCustomSignature
} from '../utils/signaturesAndStamps';
import { PhonePreview } from './PhonePreview';
import {
  getRecordBattery,
  getRecordTopBarTime,
  getRecordOnlineStatus,
  createOfficialSapaWaliMessages,
  getRecordFormDateIndonesian,
  getFullSapaWaliDataset
} from '../data/sapaWaliData';

interface DocumentProps {
  record: SapaWaliRecord;
  recordIndex: number;
  selectedOfficer?: OfficialOfficer | null;
  customWaliSignature?: string | null;
  customBhpSignature?: string | null;
  customStamp?: string | null;
}

/**
 * Running Header for official PDF pages
 */
export const DocumentRunningHeader: React.FC<{ record: SapaWaliRecord }> = ({ record }) => {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const labelPeran = isPengampuan ? 'PENGAMPU' : 'WALI';
  const labelObjek = isPengampuan ? 'TERAMPU' : 'ANAK';
  const objekNama = record.namaAnak || 'TERAMPU';

  return (
    <div className="w-full flex justify-end items-center border-b border-slate-200 pb-1 mb-2 text-[5pt] font-sans font-bold text-slate-700 uppercase tracking-wider">
      <span>
        {labelPeran}: {record.namaWali.toUpperCase()} &bull; {labelObjek}: {objekNama.toUpperCase()}
      </span>
    </div>
  );
};

/**
 * Running Footer for official PDF pages
 */
export const DocumentRunningFooter: React.FC<{ pageNumber?: number }> = ({ pageNumber }) => {
  return (
    <div className="w-full flex justify-between items-center border-t border-slate-300 pt-2 mt-auto text-[8.5pt] font-sans text-slate-700">
      <span className="italic">Laporan Monitoring E-Form SAPA WALI Triwulan II 2026</span>
      <span className="font-bold text-slate-900">{pageNumber ? `Halaman ${pageNumber} dari 438` : 'Dokumen Resmi BHP Medan'}</span>
    </div>
  );
};

/**
 * Official Kop Surat Header component used across BA, SOP, and Kartu Kendali
 */
export const OfficialKopSurat: React.FC = () => {
  return (
    <div className="w-full text-center pb-2 mb-3 select-none font-sans">
      <div className="flex items-center justify-between px-1">
        {/* Left Logo */}
        <div className="w-20 flex-shrink-0 flex justify-center">
          <img src={LOGO_KEMENKUMHAM_SVG} alt="Logo Kemenkumham" className="h-20 w-auto object-contain" />
        </div>

        {/* Kop Text */}
        <div className="flex-1 text-center px-1">
          <h1 className="text-[13pt] font-bold tracking-tight text-black uppercase leading-tight">
            KEMENTERIAN HUKUM REPUBLIK INDONESIA
          </h1>
          <h2 className="text-[12pt] font-bold tracking-tight text-black uppercase leading-tight">
            KANTOR WILAYAH SUMATERA UTARA
          </h2>
          <h3 className="text-[14pt] font-extrabold tracking-wide text-black uppercase leading-tight mt-0.5">
            BALAI HARTA PENINGGALAN MEDAN
          </h3>
          <p className="text-[8.5pt] text-black leading-tight mt-1">
            Jalan Listrik No. 10 Medan &bull; Telepon: (061) 451 7830, Faksimile: (061) 451 4328
          </p>
          <p className="text-[8.5pt] text-black leading-tight">
            Laman: www.bhpmedan.kemenkum.go.id, Pos-el: bhp.medan@kemenkum.go.id
          </p>
        </div>

        {/* Right spacing balance */}
        <div className="w-20 flex-shrink-0" />
      </div>

      {/* Official Double Kop Line Divider */}
      <div className="w-full border-b-[3px] border-black mt-2 mb-[1.5px]" />
      <div className="w-full border-b-[1px] border-black" />
    </div>
  );
};

/**
 * HALAMAN COVER UTAMA LAPORAN MONITORING
 */
export const OfficialReportCoverView: React.FC = () => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] mx-auto shadow-md flex flex-col justify-between text-black font-sans box-border relative border-[3px] border-slate-900">
      {/* Top Header Logo & Institution */}
      <div className="text-center pt-2">
        <img src={LOGO_KEMENKUMHAM_SVG} alt="Logo Kemenkumham" className="h-28 w-auto mx-auto object-contain mb-4" />
        <h2 className="text-[13pt] font-extrabold uppercase tracking-wide text-slate-950">
          KEMENTERIAN HUKUM REPUBLIK INDONESIA
        </h2>
        <h3 className="text-[12pt] font-bold uppercase tracking-wide text-slate-900 mt-0.5">
          KANTOR WILAYAH SUMATERA UTARA
        </h3>
        <h1 className="text-[15pt] font-black uppercase tracking-wider text-slate-950 mt-1">
          BALAI HARTA PENINGGALAN MEDAN
        </h1>
        <div className="w-48 h-1 bg-amber-500 mx-auto my-3 rounded-full" />
      </div>

      {/* Main Report Title Block */}
      <div className="my-auto py-8 text-center px-4 bg-slate-50 border-2 border-slate-900 rounded-lg shadow-xs">
        <span className="inline-block px-4 py-1 bg-amber-400 text-slate-950 font-black text-[11pt] tracking-widest uppercase rounded mb-4">
          LAPORAN RESMI MONITORING E-FORM
        </span>
        
        <h1 className="text-[18pt] font-black uppercase leading-snug tracking-tight text-slate-950 max-w-[160mm] mx-auto">
          LAPORAN MONITORING E-FORM SAPA WALI
        </h1>
        
        <h2 className="text-[15pt] font-bold uppercase leading-snug tracking-normal text-slate-900 mt-2 max-w-[160mm] mx-auto">
          TERHADAP 109 PERKARA PERWALIAN / PENGAMPUAN
        </h2>

        <div className="w-24 h-0.5 bg-slate-900 mx-auto my-3" />

        <p className="text-[13pt] font-extrabold uppercase tracking-widest text-emerald-900">
          TRIWULAN II TAHUN 2026
        </p>

        <p className="text-[10pt] font-medium text-slate-700 italic mt-4">
          Sistem Pelaporan &amp; Generasi Berkas Otomatis E-Monitoring Perwalian dan Pengampuan Berbasis WhatsApp &amp; Digital Form
        </p>
      </div>

      {/* Bottom Metadata & Official Seal */}
      <div className="w-full pt-4 border-t-2 border-slate-900 flex justify-between items-end">
        <div className="text-left text-[10pt] text-slate-900 space-y-1">
          <p className="font-bold uppercase tracking-wide text-slate-950">TIM PELAKSANA SAPA WALI:</p>
          <p>&bull; Tim Pengawas Perwalian &amp; Pengampuan Wilayah II</p>
          <p>&bull; Balai Harta Peninggalan Medan</p>
          <p className="font-semibold text-emerald-950 pt-1">Lokasi: Medan, Sumatera Utara</p>
          <p className="font-semibold text-slate-900">Tanggal Terbit: Juli 2026</p>
        </div>

        {/* Signature + Seal Block */}
        <div className="text-center w-64 relative">
          <p className="text-[9.5pt] font-bold uppercase text-slate-900">Mengetahui,</p>
          <p className="text-[10pt] font-black uppercase text-slate-950">Kepala BHP Medan</p>
          <div className="relative h-20 my-1 flex items-center justify-center">
            
          </div>
          <p className="font-bold underline text-[10.5pt] text-slate-950">Syafriadi Lubis, S.H., M.H.</p>
          
        </div>
      </div>
    </div>
  );
};

/**
 * HALAMAN DAFTAR ISI LAPORAN MONITORING (Thesis Format)
 */
export const OfficialReportTableOfContentsView: React.FC = () => {
  const dataset = getFullSapaWaliDataset();

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] mx-auto shadow-md flex flex-col justify-between text-black font-sans box-border relative">
      <div>
        <OfficialKopSurat />

        {/* Title */}
        <div className="text-center my-4">
          <h2 className="text-[14pt] font-black uppercase tracking-wider text-black underline">
            DAFTAR ISI LAPORAN MONITORING
          </h2>
          <p className="text-[10pt] font-bold text-slate-800 uppercase tracking-wide mt-1">
            REKAPITULASI DOKUMEN 109 PERKARA PERWALIAN &amp; PENGAMPUAN TRIWULAN II 2026
          </p>
        </div>

        {/* Table of Contents Structured Items */}
        <div className="space-y-2 mt-6 text-[10pt] text-slate-950">
          <div className="flex justify-between items-baseline font-bold uppercase">
            <span>COVER UTAMA LAPORAN MONITORING</span>
            <span className="flex-1 border-b border-dotted border-slate-500 mx-2" />
            <span>Halaman 1</span>
          </div>

          <div className="flex justify-between items-baseline font-bold uppercase">
            <span>DAFTAR ISI LAPORAN MONITORING</span>
            <span className="flex-1 border-b border-dotted border-slate-500 mx-2" />
            <span>Halaman 2</span>
          </div>

          <div className="flex justify-between items-baseline font-bold uppercase mt-4">
            <span>BERKAS LAMPIRAN 109 PERKARA PERWALIAN &amp; PENGAMPUAN</span>
            <span className="flex-1 border-b border-dotted border-slate-500 mx-2" />
            <span>Halaman 3 s.d. 438</span>
          </div>

          {/* Detailed Item List Preview (First 15 items + summary note) */}
          <div className="pl-4 space-y-1.5 mt-2 text-[9.5pt]">
            {dataset.slice(0, 18).map((rec, idx) => {
              const startPg = 3 + idx * 4;
              const endPg = startPg + 3;
              const isPengampuan = rec.jenisWewenang === 'Pengampuan';
              return (
                <div key={idx} className="flex justify-between items-baseline">
                  <span className="truncate max-w-[130mm]">
                    <span className="font-bold">Perkara #{idx + 1}:</span> [{rec.jenisWewenang}] Wali: <span className="font-semibold">{rec.namaWali}</span> (Anak: {rec.namaAnak})
                  </span>
                  <span className="flex-1 border-b border-dotted border-slate-400 mx-2" />
                  <span className="font-semibold text-slate-800">Hal. {startPg} - {endPg}</span>
                </div>
              );
            })}

            <div className="pt-2 text-center text-[9pt] font-bold text-slate-700 italic border-t border-slate-300 mt-2">
              ... dan 91 Perkara Perwalian / Pengampuan Lainnya (Perkara #19 s.d. #109 hingga Halaman 438) ...
            </div>
          </div>
        </div>
      </div>

      <DocumentRunningFooter pageNumber={2} />
    </div>
  );
};

/**
 * DOKUMEN 1: Screenshot Pengisian Link E-Monitoring
 */
export const Document1ScreenshotView: React.FC<DocumentProps> = ({ record, recordIndex }) => {
  const titleText = getPdfPageHeaderTitle(record);
  const pageNum = 3 + recordIndex * 5;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[18mm] mx-auto shadow-md flex flex-col items-center justify-between text-black font-sans leading-[1.15] box-border relative">
      <div className="w-full">
        <DocumentRunningHeader record={record} />
        
        {/* Header Title (CAPSLOCK Arial 12 Bold Centered) */}
        <div className="w-full text-center my-3 pt-1">
          <h2 className="text-[12pt] font-bold uppercase tracking-wide text-black max-w-[170mm] mx-auto text-center leading-snug">
            {titleText}
          </h2>
        </div>

        {/* Embedded WhatsApp Screenshot with Full Chat Content */}
        <div className="flex items-center justify-center w-full py-2">
          <div className="w-full flex justify-center pb-8">
            <PhonePreview
              className="!w-[380px] origin-top"
              config={{
                isDarkMode: true,
                useAndroidFrame: true,
                contactName: `(Wali) ${record.namaWali}`,
                phoneNumber: record.noHp,
                onlineStatus: getRecordOnlineStatus(record),
                batteryLevel: getRecordBattery(record),
                timeTopBar: getRecordTopBarTime(record),
                messages: createOfficialSapaWaliMessages(record)
              }}
            />
          </div>
        </div>
      </div>

      <DocumentRunningFooter pageNumber={pageNum} />
    </div>
  );
};

/**
 * DOKUMEN 2: Berita Acara Monitoring Wali / Pengampu
 */
export const Document2BeritaAcaraView: React.FC<DocumentProps> = ({
  record,
  recordIndex,
  selectedOfficer,
  customWaliSignature,
  customBhpSignature,
  customStamp
}) => {
  const content = getBAMonitoringContent(record, recordIndex, selectedOfficer);
  const pageNum = 4 + recordIndex * 5;

  const waliSigSrc = customWaliSignature || getSavedCustomSignature('wali') || generateDynamicWaliSignature(record.namaWali, content.isPengampuan);
  const bhpSigSrc = customBhpSignature || getSavedCustomSignature(content.officer.id) || getSavedCustomSignature('bhp') || content.petugasSignatureSvg;
  const stampSrc = customStamp !== undefined ? (customStamp || STAMP_BHP_MEDAN_SVG) : (getSavedCustomSignature('stamp') || STAMP_BHP_MEDAN_SVG);

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] mx-auto shadow-md flex flex-col justify-between text-black font-sans text-[11pt] leading-[1.25] text-justify box-border relative">
      <div>
        <DocumentRunningHeader record={record} />
        <OfficialKopSurat />

        {/* Title & BA Number */}
        <div className="text-center my-3">
          <h2 className="text-[12pt] font-bold uppercase tracking-wider text-black underline">
            {content.title}
          </h2>
          <p className="text-[11pt] font-semibold text-black tracking-wide mt-1">
            NOMOR: {content.nomorBA}
          </p>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-3 mt-4 text-[11pt] text-slate-950 font-sans">
          <p className="text-justify indent-8 leading-relaxed">
            Pada hari ini, <span className="font-semibold">{content.dateInfo.hariStr}</span> tanggal <span className="font-semibold">{content.dateInfo.tanggalTerbilang}</span> bulan <span className="font-semibold">{content.dateInfo.bulanStr}</span> tahun <span className="font-semibold">{content.dateInfo.tahunTerbilang}</span>, telah dilaksanakan monitoring secara daring melalui pengisian e-Form SAPA WALI oleh saya, <span className="font-semibold">{content.petugasNama}</span>, {content.petugasJabatan}, terhadap <span className="font-semibold">{content.sapaanWali} {record.namaWali}</span>, Pekerjaan {content.pekerjaanStr}, beralamat di {content.alamat}, yang berdasarkan Pasal 366 KUH Perdata bertindak selaku {content.subjekRole} terhadap {content.subjekHak}, yaitu:
          </p>

          <div className="pl-12 font-semibold uppercase text-[11pt] my-2 text-slate-950">
            &bull; {content.objekNama}, {content.isPengampuan ? 'Orang Dalam Pengampuan' : 'Anak Belum Dewasa'}, Lahir tanggal {record.tanggalLahirAnak || '-'};
          </div>

          <p className="text-justify indent-8 leading-relaxed">
            Bahwa pada kesempatan ini dilakukan pelaksanaan monitoring dan evaluasi secara daring melalui pengisian e-Form SAPA WALI untuk memastikan bahwa {content.sapaanWali} {record.namaWali} selaku {content.subjekRole} menjalankan kewajibannya sebagaimana diatur dalam ketentuan perwalian dan pengampuan, khususnya dalam hal pemeliharaan, pengasuhan, serta pengawasan kepentingan {content.isPengampuan ? 'orang dalam pengampuan' : 'anak yang belum dewasa'} yang berada di bawah pengawasannya. Monitoring berbasis e-Form ini dilaksanakan sebagai bagian dari fungsi pengawasan Balai Harta Peninggalan Medan.
          </p>

          <p className="text-justify indent-8 leading-relaxed">
            Bahwa dalam pengisian e-Form monitoring tersebut, {content.sapaanWali} {record.namaWali} memberikan keterangan mengenai kondisi terkini {content.isPengampuan ? 'terampu' : 'anak di bawah perwaliannya'}, termasuk keberlangsungan pendidikan formal, status kesehatan, serta pemenuhan kebutuhan hidup sehari-hari. {content.subjekRoleCapital} menerangkan bahwa kondisi {content.isPengampuan ? 'terampu' : 'anak'} dalam keadaan sehat jasmani dan rohani serta berada dalam pengasuhan yang baik. Pemenuhan kebutuhan hidup sehari-hari, kesehatan, serta pendidikan berjalan dengan layak dan berkesinambungan.
          </p>

          <p className="text-justify indent-8 leading-relaxed">
            Terkait dengan pengelolaan harta, {content.subjekRole} menyatakan bahwa seluruh aset milik {content.isPengampuan ? 'terampu' : 'anak'} tetap terpelihara dan dikelola dengan baik untuk kepentingan {content.isPengampuan ? 'terampu' : 'anak'}. Diterangkan pula bahwa domisili {content.isPengampuan ? 'terampu' : 'anak'} saat ini berada bersama {content.subjekRole}, yaitu di {content.alamat}, sehingga pengasuhan dan pengawasan dilaksanakan secara langsung oleh {content.subjekRole}.
          </p>

          <p className="text-justify indent-8 leading-relaxed">
            Bahwa berdasarkan hasil monitoring, tidak ditemukan adanya indikasi penyalahgunaan kewenangan {content.subjekRole} ataupun tindakan yang dapat merugikan hak maupun kepentingan {content.isPengampuan ? 'terampu' : 'anak'}. Pengawasan dinilai telah dilaksanakan sesuai dengan ketentuan hukum yang berlaku dan kepentingan {content.isPengampuan ? 'terampu' : 'anak'} terlindungi sebagaimana mestinya.
          </p>

          <p className="text-justify indent-8 leading-relaxed">
            Demikian Berita Acara Monitoring ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya, kemudian ditutup dan ditandatangani oleh Tim Pelaksana Balai Harta Peninggalan Medan bersama {content.sapaanWali} {record.namaWali} selaku {content.subjekRole}.
          </p>
        </div>
      </div>

      {/* Parallel Signature Area: Wali / Pengampu (Left) and BHP Officer (Right) */}
      <div className="w-full mt-6 pt-2">
        <div className="grid grid-cols-2 gap-8 text-center text-[10.5pt]">
          {/* Left Signature: Wali / Pengampu */}
          <div className="text-center w-64 mx-auto">
            <p className="font-semibold text-[10.5pt]">{content.subjekRoleCapital},</p>
            <div className="h-20 flex items-center justify-center my-1">
              
            </div>
            <p className="font-bold underline text-[10.5pt] tracking-wide">{record.namaWali}</p>
            <p className="text-[9.5pt] text-slate-800">{content.subjekRoleCapital}</p>
          </div>

          {/* Right Signature: Tim Pelaksana BHP Medan */}
          <div className="text-center w-64 mx-auto relative">
            <p className="font-semibold text-[10.5pt]">Tim Pelaksana BHP Medan,</p>
            
            {/* Signature + Overlaid Stamp */}
            <div className="relative h-20 my-1 flex items-center justify-center">
              
              
            </div>

            <p className="font-bold underline text-[10.5pt] tracking-wide mb-2">{content.petugasNama}</p>
            
          </div>
        </div>
      </div>

      <DocumentRunningFooter pageNumber={pageNum} />
    </div>
  );
};

/**
 * DOKUMEN 3: Form Checklist SOP SAPA WALI
 */

export const Document3SOPChecklistView: React.FC<DocumentProps> = ({
  record,
  recordIndex,
  selectedOfficer,
}) => {
  const content = getBAMonitoringContent(record, recordIndex, selectedOfficer);
  const formDate = record.tanggalForm || getRecordFormDateIndonesian(record);
  const pageNum = 5 + recordIndex * 5;

  return (
    <>
      <div className="w-[210mm] min-h-[297mm] bg-white p-[18mm] mx-auto shadow-md flex flex-col justify-between text-black font-sans text-[10pt] leading-tight box-border relative page-break-after">
        <div>
          <DocumentRunningHeader record={record} />
          <OfficialKopSurat />

          <div className="text-center my-3">
            <h2 className="text-[12pt] font-extrabold uppercase tracking-wide text-black underline">
              FORM CHECKLIST SOP SAPA WALI
            </h2>
            <h3 className="text-[11pt] font-bold uppercase tracking-wide text-black">
              BALAI HARTA PENINGGALAN
            </h3>
          </div>

          <table className="w-full border-none border-collapse text-[10pt] my-3 font-sans">
            <tbody>
              <tr>
                <td className="py-1 font-semibold w-56 text-slate-950">Tanggal Pelaksanaan SAPA WALI</td>
                <td className="py-1 px-1 w-4 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">{formDate}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">a. Nama Wali/Pengampu*</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 font-bold text-slate-950">{record.namaWali}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">b. Alamat</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">{record.alamat || 'Jalan Listrik No. 10 Medan'}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">c. Pekerjaan</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">{content.pekerjaanStr}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">d. No Hp</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">{record.noHpWali || '-'}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">e. Anak dibawah Umur/Terampu*</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 font-bold text-slate-950">{content.objekNama}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">f. Nomor Penetapan</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">{record.noPenetapan || 'Penetapan PN Medan'}</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950">g. Nomor/Tanggal Penyumpahan</td>
                <td className="py-1 px-1 text-center font-bold">:</td>
                <td className="py-1 text-slate-950">............................................................../..............................</td>
              </tr>
              <tr>
                <td className="py-1 font-semibold text-slate-950 align-top">h. Tim</td>
                <td className="py-1 px-1 text-center font-bold align-top">:</td>
                <td className="py-1 text-slate-950">
                  <table className="w-full border-none">
                    <tbody>
                      <tr><td className="w-40 py-0.5">Kepala Seksi HP Wilayah {record.seksi ? (record.seksi.toLowerCase().includes('1') || record.seksi.toLowerCase().includes('i') ? 'I' : 'II') : 'II'}</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Budiyanto, S.H.</td></tr>
                      <tr><td className="w-40 py-0.5">Kepala/JFKK Madya*</td><td className="w-2 py-0.5">:</td><td className="py-0.5">{content.petugasNama}</td></tr>
                      <tr><td className="w-40 py-0.5">JFKK Muda</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Siti Roslina, S.H.</td></tr>
                      <tr><td className="w-40 py-0.5">JFKK Pertama</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Shela Natasha, S.H.</td></tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-collapse border border-black text-[9.5pt] my-3 font-sans">
            <thead>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-black p-1.5 w-10" rowSpan={2}>No.</th>
                <th className="border border-black p-1.5 text-left" rowSpan={2}>ITEM YANG DIMONITOR</th>
                <th className="border border-black p-1.5" colSpan={2}>PELAKSANAAN</th>
                <th className="border border-black p-1.5 w-32" rowSpan={2}>KETERANGAN</th>
              </tr>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-black p-1 w-12">YA</th>
                <th className="border border-black p-1 w-12">TIDAK</th>
              </tr>
            </thead>
            <tbody>
              {[
                'Tim yang menangani di awal',
                'Menghubungi Wali atau Pengampu via Telpon tentang rencana monitoring',
                'Tim mengirimkan Surat pemberitahuan via POS dan/atau WA surat resmi terkait Monitoring yang dilakukan melalui Video Call',
                'Tim melaksanakan Monitoring sesuai dengan jadwal yang sudah di tentukan',
                'Pelaksanaan Monitoring berdasarkan cheklist pertanyaan (terlampir)',
                'Tim membuat laporan Monitoring dan Evaluasi',
                'Membuat laporan Tindak lanjut dari hasil Monitoring dan Evaluasi',
                'Menyampaikan Laporan ke Pengadilan Negeri dan Direktorat Jenderal Administrasi Hukum Umum'
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="border border-black p-1 text-center font-medium">{idx + 1}</td>
                  <td className="border border-black p-1 px-2">{item}</td>
                  <td className="border border-black p-1 text-center font-bold text-slate-900">&check;</td>
                  <td className="border border-black p-1 text-center"></td>
                  <td className="border border-black p-1 px-2 text-[9pt] text-slate-800"></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-2 p-1 my-2 text-[10pt] font-sans">
            <span className="font-bold whitespace-nowrap">Hasil Monitoring : </span>
            <span className="border-b border-black flex-1 leading-snug">{record.hasilMonitoring || 'Wali/Pengampu menjalankan kewajibannya dengan penuh tanggung jawab. Kebutuhan fisik, pendidikan, dan kesehatan terampu terpenuhi dengan baik.'}</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="w-full mt-4 pt-2 font-sans">
          <div className="grid grid-cols-2 gap-4 text-center text-[10pt]">
            <div>
              <p className="font-semibold">Kepala Seksi HP Wilayah {record.seksi ? (record.seksi.toLowerCase().includes('1') || record.seksi.toLowerCase().includes('i') ? 'I' : 'II') : 'II'}</p>
              <div className="h-20"></div>
              <p className="font-bold underline">Budiyanto, S.H.</p>
            </div>
            <div>
              <p className="font-semibold">Kepala/JFKK Madya*</p>
              <div className="h-20"></div>
              <p className="font-bold underline">{content.petugasNama}</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">JFKK Muda</p>
              <div className="h-20"></div>
              <p className="font-bold underline">Siti Roslina, S.H.</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">JFKK Pertama</p>
              <div className="h-20"></div>
              <p className="font-bold underline">Shela Natasha, S.H.</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-[10pt] font-semibold">Mengetahui,</p>
            <p className="text-[10pt] font-bold">Kepala BHP Medan</p>
            <div className="h-24"></div>
            <p className="font-bold underline text-[10pt]">Syafriadi Lubis</p>
          </div>
          <div className="mt-4 text-[9pt] italic">
            *coret yang tidak perlu
          </div>
        </div>
        <DocumentRunningFooter pageNumber={pageNum} />
      </div>

      <div className="w-[210mm] min-h-[297mm] bg-white p-[18mm] mx-auto shadow-md flex flex-col text-black font-sans text-[10pt] leading-relaxed box-border relative break-before-page">
        <DocumentRunningHeader record={record} />
        <OfficialKopSurat />
        <div className="mt-4">
          <h2 className="font-bold uppercase underline">Lampiran</h2>
          <p className="mt-1 font-semibold">Monitoring meliputi:</p>
          <p className="font-bold">Daftar Pertanyaan Monitoring (Perwalian & Pengampuan)</p>

          <ol className="list-decimal pl-4 mt-4 space-y-4">
            <li>
              Siapa nama lengkap Anak / Terampu?
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">{content.objekNama}</span></p>
            </li>
            <li>
              Bagaimana kondisi kesehatan dan perkembangan anak / terampu saat ini?
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Sehat dan dalam kondisi baik.</span></p>
            </li>
            <li>
              Mohon jelaskan kondisi atau sakit yang diderita anak / terampu (jika ada):
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Tidak ada keluhan serius.</span></p>
            </li>
            <li>
              Bagaimana status pendidikan atau kegiatan anak / terampu saat ini?
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Sesuai dengan perkembangannya.</span></p>
            </li>
            <li>
              Bagaimana kondisi aset harta kekayaan milik anak / terampu saat ini?
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Aset dikelola dengan baik dan utuh.</span></p>
            </li>
            <li>
              Tuliskan jenis aset atau lokasi aset yang telah dijual:
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">-</span></p>
            </li>
            <li>
              Mohon jelaskan penggunaan aset yang sudah dijual:
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">-</span></p>
            </li>
            <li>
              Mohon jelaskan kendala atau sengketa aset tersebut:
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Tidak ada sengketa yang berarti.</span></p>
            </li>
            <li>
              Apakah anak/terampu masih tinggal bersama Bapak/Ibu Wali/Pengampu di alamat terdaftar?
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">Ya, masih tinggal bersama.</span></p>
            </li>
            <li>
              Tuliskan alamat lengkap domisili terbaru anak/terampu saat ini:
              <p className="font-semibold mt-1">Jawaban: <span className="font-normal">{record.alamat}</span></p>
            </li>
          </ol>
        </div>
        <div className="mt-auto">
            <DocumentRunningFooter pageNumber={pageNum + 1} />
        </div>
      </div>
    </>
  );
};
/**
 * DOKUMEN 4: Kartu Kendali Pelaksanaan SAPA WALI
 */
export const Document4KartuKendaliView: React.FC<DocumentProps> = ({
  record,
  recordIndex,
  selectedOfficer,
  customBhpSignature,
  customStamp
}) => {
  const content = getBAMonitoringContent(record, recordIndex, selectedOfficer);
  const formDate = record.tanggalForm || getRecordFormDateIndonesian(record);
  const pageNum = 7 + recordIndex * 5;

  const bhpSigSrc = customBhpSignature || content.petugasSignatureSvg;
  const stampSrc = customStamp !== undefined ? customStamp : STAMP_BHP_MEDAN_SVG;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white p-[20mm] mx-auto shadow-md flex flex-col justify-between text-black font-sans text-[11pt] leading-[1.25] box-border relative">
      <div>
        <DocumentRunningHeader record={record} />
        <OfficialKopSurat />

        {/* Title */}
        <div className="text-center my-4">
          <h2 className="text-[12pt] font-bold uppercase tracking-wider text-black underline">
            KARTU KENDALI PELAKSANAAN SAPA WALI
          </h2>
        </div>

        {/* Structured Table Layout */}
        <table className="w-full border-collapse border border-black text-[10.5pt] my-4 font-sans">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold w-56 bg-slate-50">Tanggal Pelaksanaan</td>
              <td className="border border-black p-2 font-medium">: {formDate}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-slate-50">Nama Wali / Pengampu</td>
              <td className="border border-black p-2 font-bold">: {record.namaWali}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-slate-50">Nama Anak / Orang yang Diampu</td>
              <td className="border border-black p-2 font-bold">: {content.objekNama}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-slate-50">Petugas BHP Penanggung Jawab</td>
              <td className="border border-black p-2 font-bold text-slate-900">: {content.petugasNama} ({record.seksi || 'Seksi Wilayah II'})</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-slate-50">Nomor Penetapan Pengadilan</td>
              <td className="border border-black p-2 font-medium">: {record.noPenetapan || 'Penetapan Pengadilan Negeri'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold bg-slate-50">Bentuk Pengawasan</td>
              <td className="border border-black p-2 font-bold text-emerald-950">: E-Monitoring Daring (e-Form WhatsApp)</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold align-top bg-slate-50">Hasil Pengawasan</td>
              <td className="border border-black p-2 text-justify font-normal leading-relaxed">
                : {content.keteranganLengkap}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold align-top bg-slate-50">Tindak Lanjut</td>
              <td className="border border-black p-2 text-justify font-normal leading-relaxed">
                : {content.tindakLanjut}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Signature */}
      <div className="w-full flex justify-end mt-6 pr-4 font-sans">
        <div className="text-center w-72 relative">
          <p className="font-semibold text-[11pt]">{content.petugasJabatan}</p>

          <div className="relative h-24 my-1 flex items-center justify-center">
            <img src={bhpSigSrc} alt={`Tanda Tangan ${content.petugasNama}`} className="h-20 w-auto object-contain z-20 relative " />
            
          </div>

          <p className="font-bold underline text-[11pt] tracking-wide mb-2">{content.petugasNama}</p>
          
        </div>
      </div>

      <DocumentRunningFooter pageNumber={pageNum} />
    </div>
  );
};

/**
 * Full Set Container displaying all 4 documents in order for a record
 */
export const DocumentSetContainer: React.FC<{
  record: SapaWaliRecord;
  recordIndex: number;
  selectedOfficer?: OfficialOfficer | null;
  customWaliSignature?: string | null;
  customBhpSignature?: string | null;
  customStamp?: string | null;
}> = ({
  record,
  recordIndex,
  selectedOfficer,
  customWaliSignature,
  customBhpSignature,
  customStamp
}) => {
  return (
    <div className="space-y-8 print:space-y-0 font-sans">
      <div id={`doc-1-${recordIndex}`} className="page-break-after">
        <Document1ScreenshotView record={record} recordIndex={recordIndex} />
      </div>

      <div id={`doc-2-${recordIndex}`} className="page-break-after">
        <Document2BeritaAcaraView
          record={record}
          recordIndex={recordIndex}
          selectedOfficer={selectedOfficer}
          customWaliSignature={customWaliSignature}
          customBhpSignature={customBhpSignature}
          customStamp={customStamp}
        />
      </div>

      <div id={`doc-3-${recordIndex}`} className="page-break-after">
        <Document3SOPChecklistView
          record={record}
          recordIndex={recordIndex}
          selectedOfficer={selectedOfficer}
          customBhpSignature={customBhpSignature}
          customStamp={customStamp}
        />
      </div>

      <div id={`doc-4-${recordIndex}`}>
        <Document4KartuKendaliView
          record={record}
          recordIndex={recordIndex}
          selectedOfficer={selectedOfficer}
          customBhpSignature={customBhpSignature}
          customStamp={customStamp}
        />
      </div>
    </div>
  );
};

