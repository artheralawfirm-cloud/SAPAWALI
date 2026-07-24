const fs = require('fs');

let code = fs.readFileSync('src/components/OfficialDocumentTemplates.tsx', 'utf8');

const newDoc3 = `
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
                      <tr><td className="w-32 py-0.5">Kepala Seksi</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Budiyanto, S.H.</td></tr>
                      <tr><td className="w-32 py-0.5">Kepala/JFKK Madya*</td><td className="w-2 py-0.5">:</td><td className="py-0.5">{content.petugasNama}</td></tr>
                      <tr><td className="w-32 py-0.5">JFKK Muda</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Siti Roslina, S.H.</td></tr>
                      <tr><td className="w-32 py-0.5">JFKK Pertama</td><td className="w-2 py-0.5">:</td><td className="py-0.5">Shela Natasha, S.H.</td></tr>
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
              <p className="font-semibold">Kepala Seksi HP Wilayah II</p>
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
`;

const startIndex = code.indexOf('export const Document3SOPChecklistView');
const nextExportIndex = code.indexOf('export const Document4KartuKendaliView', startIndex);

if (startIndex > -1 && nextExportIndex > -1) {
  // We want to replace from startIndex to before the next export
  const pre = code.substring(0, startIndex);
  // Need to extract the JSDoc comments before Document4KartuKendaliView
  const doc4CommentIndex = code.lastIndexOf('/**', nextExportIndex);
  
  let newCode = pre + newDoc3 + code.substring(doc4CommentIndex);
  fs.writeFileSync('src/components/OfficialDocumentTemplates.tsx', newCode, 'utf8');
  console.log('Successfully replaced Document3SOPChecklistView');
} else {
  console.log('Could not find indices!');
}

