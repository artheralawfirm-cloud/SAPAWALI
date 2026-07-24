const fs = require('fs');
let code = fs.readFileSync('src/data/sapaWaliData.ts', 'utf8');

const getRealisticWaliReplyTextOriginal = `export function getRealisticWaliReplyText(record: SapaWaliRecord): string {`;

const newGetRealisticWaliReplyText = `export function getRealisticWaliReplyType(record: SapaWaliRecord) {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const labelObjek = isPengampuan ? "terampu" : "anak";
  const namaAnak = record.namaAnak;
  const kota = record.kotaKab || 'Medan';

  const typeIndex = record.no % 4; // 0: ok, 1: panjang, 2: nanya, 3: cuek

  if (typeIndex === 3) {
    return { type: 'cuek', text: '' };
  } else if (typeIndex === 2) {
    const nanyaVars = [
      \`Maaf pak, untuk foto ${labelObjek} (${namaAnak}) apakah harus full body atau boleh pas foto saja?\`,
      \`Pagi pak, mau tanya kalau formnya diisi besok pagi boleh tidak ya? Anak saya lagi sekolah.\`,
      \`Pak, formnya ada kendala tidak bisa diakses, tulisannya error 404. Bagaimana ya?\`,
      \`Kalo alamatnya berubah karena saya pindah rumah, ngisinya gimana ya pak?\`,
      \`Maaf ganggu pak, ini yang di upload KK asli atau fotocopy ya?\`
    ];
    return { type: 'nanya', text: nanyaVars[record.no % nanyaVars.length] };
  } else if (typeIndex === 1) {
    const panjangVars = [
      \`Selamat pagi Bapak/Ibu Tim SAPA WALI BHP Medan. Terima kasih banyak atas informasinya. Saya sudah membaca pesan ini dengan seksama dan baru saja selesai mengisi formulir e-Monitoring sesuai dengan data terbaru anak saya, ${namaAnak}. Semua berkas termasuk foto kegiatan terbaru juga sudah berhasil saya unggah ke dalam sistem. Sekali lagi terima kasih atas bimbingannya selama ini, semoga seluruh tim BHP Medan sehat selalu dan dilancarkan tugas-tugasnya.\`,
      \`Pagi Pak. Alhamdulillah puji Tuhan, proses pengisian formulir e-monitoring untuk perwalian ${namaAnak} berjalan lancar. Saya sudah melampirkan foto dokumentasi terbaru saat kami di rumah. Terima kasih karena sistem SAPA WALI ini sangat memudahkan kami sebagai wali yang berada di ${kota}, jadi kami tidak perlu repot datang jauh-jauh ke Medan. Laporan sudah saya submit barusan pak.\`,
      \`Assalamualaikum Bapak/Ibu. Mohon izin melaporkan bahwa kami selaku wali dari ${namaAnak} telah melaksanakan kewajiban kami untuk mengisi e-form monitoring perwalian. Semua petunjuk sudah kami ikuti, dan foto kondisi terbaru ${labelObjek} juga sudah terlampir dengan baik. Terima kasih banyak atas perhatian dan pengawasan dari BHP Medan.\`
    ];
    return { type: 'panjang', text: panjangVars[record.no % panjangVars.length] };
  } else {
    const okVars = [
      "Ok pak",
      "Siap laksanakan",
      "Baik pak, sudah diisi",
      "Sudah",
      "Oke makasih pak",
      "Sip"
    ];
    return { type: 'ok', text: okVars[record.no % okVars.length] };
  }
}

export function getRealisticWaliReplyText(record: SapaWaliRecord): string {`;

code = code.replace(getRealisticWaliReplyTextOriginal, newGetRealisticWaliReplyText);

// Now patch createOfficialSapaWaliMessages
const oldMessagesFunc = `export function createOfficialSapaWaliMessages(record: SapaWaliRecord): ChatMessage[] {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const sapaan = getWaliHonorific(record);
  const labelPeran = isPengampuan ? "pengampu" : "wali";
  const waliFirstName = record.namaWali.split(' ')[0];

  const { date1 } = getRecordWorkdayDates(record);

  // Time calculations strictly within office hours (08:00 - 16:00)
  const blastTotalMins = 8 * 60 + 15 + ((record.no * 7) % 60);
  const replyTotalMins = blastTotalMins + 20 + ((record.no * 3) % 35);
  const ackTotalMins = replyTotalMins + 3;

  const tBlast = formatTime(blastTotalMins);
  const tReply = formatTime(replyTotalMins);
  const tAck = formatTime(ackTotalMins);

  const headerDate: ChatMessage = { id: \`msg-date-1-\${record.no}\`, type: "date_header", text: date1 };
  const encNotice: ChatMessage = {
    id: \`msg-enc-1-\${record.no}\`,
    type: "encryption_notice",
    text: "🔒 Messages and calls are end-to-end encrypted. Only people in this chat can read, listen to, or share them. Learn more"
  };

  const initialBlastMsg: ChatMessage = {
    id: \`msg-out-1-\${record.no}\`,
    type: "outgoing",
    time: tBlast,
    status: "read",
    hasLinkCard: true,
    linkTitle: "SAPA WALI - Monitoring Perwalian & Pengampuan",
    linkSubtitle: "bit.ly",
    linkUrl: "bit.ly",
    text: \`Selamat Pagi \${sapaan} \${waliFirstName},\\n\\nYth. \${sapaan} \${labelPeran},\\nSemoga \${sapaan} sekeluarga sehat walafiat.\\nKami dari Tim SAPA WALI BHP Medan Kemenkumham RI.\\n\\nMohon mengisi e-Form Monitoring \${record.jenisWewenang}:\\nhttps://bit.ly/sapa-wali-monitoring\\n\\nTerima kasih atas perhatian dan kerja samanya.\`
  };

  const waliReplyMsg: ChatMessage = {
    id: \`msg-inc-1-\${record.no}\`,
    type: "incoming",
    time: tReply,
    status: "read",
    text: getRealisticWaliReplyText(record)
  };

  const officerAckMsg: ChatMessage = {
    id: \`msg-out-2-\${record.no}\`,
    type: "outgoing",
    time: tAck,
    status: "read",
    text: getRealisticOfficerAckText(record)
  };

  return [
    headerDate,
    encNotice,
    initialBlastMsg,
    waliReplyMsg,
    officerAckMsg
  ];
}`;

const newMessagesFunc = `export function createOfficialSapaWaliMessages(record: SapaWaliRecord): ChatMessage[] {
  const isPengampuan = record.jenisWewenang === 'Pengampuan';
  const sapaan = getWaliHonorific(record);
  const labelPeran = isPengampuan ? "pengampu" : "wali";
  const waliFirstName = record.namaWali.split(' ')[0];

  const { date1 } = getRecordWorkdayDates(record);

  // Time calculations strictly within office hours (08:00 - 16:00)
  const blastTotalMins = 8 * 60 + 15 + ((record.no * 7) % 60);
  const replyTotalMins = blastTotalMins + 20 + ((record.no * 3) % 35);
  const ackTotalMins = replyTotalMins + 3;

  const tBlast = formatTime(blastTotalMins);
  const tReply = formatTime(replyTotalMins);
  const tAck = formatTime(ackTotalMins);

  const replyData = getRealisticWaliReplyType(record);
  const isCuek = replyData.type === 'cuek';
  const isNanya = replyData.type === 'nanya';

  const headerDate: ChatMessage = { id: \`msg-date-1-\${record.no}\`, type: "date_header", text: date1 };
  const encNotice: ChatMessage = {
    id: \`msg-enc-1-\${record.no}\`,
    type: "encryption_notice",
    text: "🔒 Messages and calls are end-to-end encrypted. Only people in this chat can read, listen to, or share them. Learn more"
  };

  const initialBlastMsg: ChatMessage = {
    id: \`msg-out-1-\${record.no}\`,
    type: "outgoing",
    time: tBlast,
    status: isCuek ? (record.no % 2 === 0 ? "read" : "delivered") : "read",
    hasLinkCard: true,
    linkTitle: "SAPA WALI - Monitoring Perwalian & Pengampuan",
    linkSubtitle: "bit.ly",
    linkUrl: "bit.ly",
    text: \`Selamat Pagi \${sapaan} \${waliFirstName},\\n\\nYth. \${sapaan} \${labelPeran},\\nSemoga \${sapaan} sekeluarga sehat walafiat.\\nKami dari Tim SAPA WALI BHP Medan Kemenkumham RI.\\n\\nMohon mengisi e-Form Monitoring \${record.jenisWewenang}:\\nhttps://bit.ly/sapa-wali-monitoring\\n\\nTerima kasih atas perhatian dan kerja samanya.\`
  };

  let officerAckText = getRealisticOfficerAckText(record);
  if (isNanya) {
    officerAckText = "Baik bapak/ibu, silahkan dibaca panduan lengkapnya pada link di atas. Jika error mohon dicoba secara berkala atau menggunakan browser lain.";
  }

  const waliReplyMsg: ChatMessage = {
    id: \`msg-inc-1-\${record.no}\`,
    type: "incoming",
    time: tReply,
    status: "read",
    text: replyData.text
  };

  const officerAckMsg: ChatMessage = {
    id: \`msg-out-2-\${record.no}\`,
    type: "outgoing",
    time: tAck,
    status: "read",
    text: officerAckText
  };

  if (isCuek) {
    return [
      headerDate,
      encNotice,
      initialBlastMsg
    ];
  }

  return [
    headerDate,
    encNotice,
    initialBlastMsg,
    waliReplyMsg,
    officerAckMsg
  ];
}`;

code = code.replace(oldMessagesFunc, newMessagesFunc);

fs.writeFileSync('src/data/sapaWaliData.ts', code, 'utf8');
console.log('patched sapaWaliData.ts');
