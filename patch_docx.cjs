const fs = require('fs');

let docxCode = `import { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, PageBreak, Header, Footer } from "docx";
import { SapaWaliRecord } from "../types";
import { getBAMonitoringContent } from "./officialDocumentHelpers";
import { OfficialOfficer } from "./signaturesAndStamps";
import { getRecordFormDateIndonesian } from "../data/sapaWaliData";

export async function generateDocxForRecord(
  record: SapaWaliRecord,
  recordIndex: number,
  screenshotBase64: string,
  officer: OfficialOfficer | null
): Promise<Blob> {
  const content = getBAMonitoringContent(record, recordIndex, officer);
  
  // Clean base64 string
  let base64Data = screenshotBase64;
  if (screenshotBase64.includes(',')) {
    base64Data = screenshotBase64.split(',')[1];
  }
  
  // Convert base64 to ArrayBuffer
  const binaryString = window.atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const screenshotBuffer = bytes.buffer;

  // We will assume A4 page size in DOCX. A4 width is ~595 points.
  // We want the image to fit the page horizontally.
  
  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } }
      },
      children: [
        // Page 1: Screenshot
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: \`SCREENSHOT PENGIRIMAN E-FORM MONITORING \${content.isPengampuan ? 'PENGAMPUAN AN. TERAMPU' : 'PERWALIAN AN. WALI'} \${record.namaWali.toUpperCase()}\`,
              bold: true,
              size: 24,
            })
          ]
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
           children: [
             new ImageRun({
                data: screenshotBuffer,
                transformation: { width: 400, height: 700 }, // Will be resized nicely by Word to fit
             })
           ],
           alignment: AlignmentType.CENTER
        }),
        new Paragraph({ children: [new PageBreak()] }),
        
        // Page 2: Berita Acara
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: content.title, bold: true, size: 28 }),
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: \`Nomor: \${content.nomorBA}\`, size: 24 }),
          ]
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({ text: \`Pada hari ini \${content.dateInfo.hari} tanggal \${content.dateInfo.tanggal} bulan \${content.dateInfo.bulan} tahun \${content.dateInfo.tahun} (\${content.dateInfo.formattedDate}), kami yang bertanda tangan di bawah ini:\`, size: 22 })
          ]
        }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: \`1. Nama     : \${content.petugasNama}\`, size: 22 }),
        new Paragraph({ text: \`   NIP      : \${content.petugasNip}\`, size: 22 }),
        new Paragraph({ text: \`   Jabatan  : \${content.petugasJabatan}\`, size: 22 }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: \`2. Nama     : \${record.namaWali}\`, size: 22 }),
        new Paragraph({ text: \`   Umur     : \${content.ageStr}\`, size: 22 }),
        new Paragraph({ text: \`   Pekerjaan: \${content.pekerjaanStr}\`, size: 22 }),
        new Paragraph({ text: \`   Alamat   : \${content.alamat}\`, size: 22 }),
        new Paragraph({ text: "" }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({ text: \`Telah melakukan evaluasi dan pengawasan terhadap \${content.subjekHak} atas nama \${content.objekNama}.\`, size: 22 })
          ]
        }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: "Hasil Monitoring:", bold: true, size: 22 }),
        new Paragraph({ text: content.keteranganLengkap, size: 22 }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: "Tindak Lanjut:", bold: true, size: 22 }),
        new Paragraph({ text: content.tindakLanjut, size: 22 }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: \`Demikian Berita Acara ini dibuat dengan sebenarnya.\`, size: 22 }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: "" }),
        
        // Signatures Table
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({ text: \`\${content.subjekRoleCapital},\`, alignment: AlignmentType.CENTER, size: 22 }),
                                new Paragraph({ text: "", size: 22 }),
                                new Paragraph({ text: "", size: 22 }),
                                new Paragraph({ text: "", size: 22 }),
                                new Paragraph({ text: record.namaWali, alignment: AlignmentType.CENTER, bold: true, size: 22 }),
                            ]
                        }),
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({ text: \`Mengetahui,\`, alignment: AlignmentType.CENTER, size: 22 }),
                                new Paragraph({ text: \`\${content.petugasJabatan},\`, alignment: AlignmentType.CENTER, size: 22 }),
                                new Paragraph({ text: "", size: 22 }),
                                new Paragraph({ text: "", size: 22 }),
                                new Paragraph({ text: content.petugasNama, alignment: AlignmentType.CENTER, bold: true, size: 22 }),
                                new Paragraph({ text: \`NIP. \${content.petugasNip}\`, alignment: AlignmentType.CENTER, size: 22 }),
                            ]
                        })
                    ]
                })
            ]
        })
      ]
    }]
  });

  return Packer.toBlob(doc);
}
`;

fs.writeFileSync('src/utils/docxExporter.ts', docxCode, 'utf8');
