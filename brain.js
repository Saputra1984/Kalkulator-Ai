// --- brain.js: Modul Intelejen untuk Aplikasi Pro ---

// A. Fungsi Fuzzy Matching (Anti Salah Ketik)
// Mencari kemiripan kata agar tidak error saat typo
function cariKataTerdekat(input, daftarKata) {
    let jarakTerpendek = 3; // Ambang batas kesalahan ketik
    let kandidat = null;

    daftarKata.forEach(kata => {
        let jarak = hitungJarakLevenshtein(input.toLowerCase(), kata.toLowerCase());
        if (jarak < jarakTerpendek) {
            jarakTerpendek = jarak;
            kandidat = kata;
        }
    });
    return kandidat || input;
}

function hitungJarakLevenshtein(a, b) {
    let tmp;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }
    let row = Array.from(Array(a.length + 1).keys());
    for (let i = 1; i <= b.length; i++) {
        let prev = i;
        for (let j = 1; j <= a.length; j++) {
            let val = (b[i - 1] === a[j - 1]) ? row[j - 1] : Math.min(row[j - 1] + 1, row[j] + 1, prev + 1);
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}

// B. Fitur Belajar Mandiri (Simpan data ke LocalStorage HP)
function pelajariRumusBaru(nama, kondisi, rumus) {
    let memoriBaru = JSON.parse(localStorage.getItem('memori_pro') || '{}');
    memoriBaru[nama] = { kondisi_input: kondisi, rumus_string: rumus };
    localStorage.setItem('memori_pro', JSON.stringify(memoriBaru));
    alert("Data berhasil dipelajari dan disimpan di memori HP Anda!");
}

// C. Prediksi Input (Asking Logic)
function validasiInput(inputUser, rumus) {
    if (inputUser.length < rumus.kondisi_input.length) {
        return "Data kurang. Anda butuh input untuk: " + rumus.kondisi_input[inputUser.length];
    }
    return null;
}

// Simpan riwayat perhitungan ke LocalStorage
function simpanRiwayat(hasil) {
    let riwayat = JSON.parse(localStorage.getItem('riwayat_hitung') || '[]');
    riwayat.push({tgl: new Date(), hasil: hasil});
    localStorage.setItem('riwayat_hitung', JSON.stringify(riwayat));
}

function debugRumus(kondisi, angka) {
    let debugText = "Variabel Terdeteksi:\n";
    kondisi.forEach((nama, i) => {
        debugText += `${nama}: ${angka[i] || "TIDAK TERBACA"}\n`;
    });
    return debugText;
}

function deteksiKategori(inputTeks) {
    let kataInput = inputTeks.toLowerCase();
    for (let kategori in databaseRumusGlobal.kategori) {
        let kataKunci = databaseRumusGlobal.kategori[kategori];
        if (kataKunci.some(kata => kataInput.includes(kata))) {
            return kategori; // Mengembalikan: 'konveksi', 'fisika', atau 'kimia'
        }
    }
    return "umum"; // Default jika tidak terdeteksi
}

function prosesSuhu(kalimat, suhu) {
    if (kalimat.includes("f")) {
        return (suhu * 9/5) + 32 + " °F";
    } else if (kalimat.includes("k")) {
        return (suhu + 273.15) + " K";
    } else {
        // Default jika tidak ada unit yang diminta
        return "Pilih unit tujuan: F (Fahrenheit) atau K (Kelvin)?";
    }
}
