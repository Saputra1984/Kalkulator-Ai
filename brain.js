// --- brain.js: Modul Manajer Intelejen yang Sudah Dirapikan ---

// A. Logika Utilitas & String
function hitungJarakLevenshtein(a, b) {
    let tmp; if (a.length === 0) return b.length; if (b.length === 0) return a.length;
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }
    let row = Array.from(Array(a.length + 1).keys());
    for (let i = 1; i <= b.length; i++) {
        let prev = i;
        for (let j = 1; j <= a.length; j++) {
            let val = (b[i - 1] === a[j - 1]) ? row[j - 1] : Math.min(row[j - 1] + 1, row[j] + 1, prev + 1);
            row[j - 1] = prev; prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}

// B. Logika Normalisasi & Pelaporan
function normalisasiInput(kalimat) {
    let kataKata = kalimat.toLowerCase().replace(/[^\w\s]/gi, '').split(' ');
    return kataKata.map(kata => {
        let kataBersih = kata.replace(/(nya|kan|i|an)$/, "");
        // Jika tidak ada di kamus, catat ke laporan
        if (!databaseRumusGlobal.kamus_normalisasi[kataBersih]) {
            catatLaporan('KATA_ASING', kataBersih);
        }
        return databaseRumusGlobal.kamus_normalisasi[kataBersih] || kataBersih;
    });
}

function normalisasiDimensiKeCm(nilai, satuan) {
    const faktor = {
        "m": 100,
        "meter": 100,
        "cm": 1,
        "centimeter": 1,
        "mm": 0.1,
        "inch": 2.54,
        "in": 2.54,
        "yard": 91.44,
        "yd": 91.44,
        "kaki": 30.48,
        "ft": 30.48
    };
    
    // Jika satuan tidak ditemukan, asumsikan cm
    let multiplier = faktor[satuan.toLowerCase()] || 1;
    return nilai * multiplier;
}

function catatLaporan(tipe, konten) {
    let logData = JSON.parse(localStorage.getItem('log_pengembangan_pro') || '[]');
    logData.push({tipe, konten, waktu: new Date().toLocaleString()});
    localStorage.setItem('log_pengembangan_pro', JSON.stringify(logData));
}

// C. Manajer Dialog (AI Humanis)
function buatPesanTanya(kekurangan) {
    let labelVar = databaseRumusGlobal.pesan_humanis.label[kekurangan];
    let daftarTemplate = databaseRumusGlobal.pesan_humanis.template_tanya;
    let templateAcak = daftarTemplate[Math.floor(Math.random() * daftarTemplate.length)];
    return templateAcak.replace("{LABEL}", labelVar);
}

// D. Core Process (Pusat Kendali)
function prosesInput(inputUser) {
    resetSesiAI(); // Cek durasi sesi
    let dataTerdeteksi = normalisasiInput(inputUser);
    let rumus = cariRumusTerbaik(dataTerdeteksi);
    
    if (!rumus) {
        catatLaporan('RUMUS_GAGAL', inputUser);
        return "Maaf, saya belum paham rumus untuk perhitungan tersebut.";
    }

    let kekurangan = validasiInput(dataTerdeteksi, rumus);
    if (kekurangan) {
        return buatPesanTanya(kekurangan);
    }

    let hasil = hitungDenganRumus(rumus, dataTerdeteksi);
    simpanRiwayat(hasil);
    return "Hasilnya adalah: " + hasil + " " + (rumus.satuan_output || "");
}

// E. Admin & Maintenance
function cekLogPengembangan() {
    console.table(JSON.parse(localStorage.getItem('log_pengembangan_pro') || '[]'));
}

function bersihkanLogSetelahUpdate() {
    localStorage.removeItem('log_pengembangan_pro');
    console.log("Log lama dibersihkan.");
}

function resetSesiAI() {
    let terakhirAkses = localStorage.getItem('last_access');
    let sekarang = new Date().getTime();
    if (terakhirAkses && (sekarang - terakhirAkses > 1800000)) {
        localStorage.removeItem('konteks_ai'); 
    }
    localStorage.setItem('last_access', sekarang);
}

function amanHitung(formula) {
    // Dinding penghalang: Hanya izinkan angka dan operator matematika
    // Regex ini menghapus apa pun selain angka, operator, dan titik desimal
    const aman = formula.replace(/[^-()\d/*+.]/g, '');
    
    // Sekarang, kita hanya menghitung string yang sudah disaring
    return new Function('return ' + aman)();
}

function sanitasiAngka(dataInput) {
    let objekBersih = {};
    for (let key in dataInput) {
        // Mengubah input menjadi angka murni, jika gagal menjadi 0
        objekBersih[key] = parseFloat(dataInput[key]) || 0;
    }
    return objekBersih;
}
