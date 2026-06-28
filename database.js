const databaseRumusGlobal = {
    // Definisi kategori untuk "scope sensing"
  kategori: {
      "konveksi": ["kain", "potong", "pcs", "baju", "panjang", "lebar"],
      "fisika": ["gravitasi", "kecepatan", "jarak", "waktu", "massa"],
      "kimia": ["molar", "konsentrasi", "volume", "larutan"]
  },

  "peta_3_kotak": {
    "KOTAK_BESAR": {
      "id": "besar",
      "kata_kunci": ["kain", "bahan", "lebar_kain", "panjang_kain", "wadah", "bak", "balok", "tabung", "total_kapasitas", "tinggi_benda"]
    },
    "KOTAK_KECIL": {
      "id": "kecil",
      "kata_kunci": ["potongan", "baju", "pola", "celana", "masker", "ukuran_per_unit", "alas", "diameter", "volume_total"]
    },
    "KOTAK_TARGET": {
      "id": "target",
      "kata_kunci": ["pcs", "biji", "buah", "lusin", "kodi", "target", "hasil", "jarak", "waktu", "kecepatan", "berat_total"]
    }
  },

  "rumpun_operator": {
    "pembagian": ["bagi", "dibagi", "per", "pecah", "potong jadi", "distribusi", "menjadi"],
    "perkalian": ["kali", "gandakan", "kelipatan", "double", "tiap", "setiap", "×", "x"],
    "penambahan": ["tambah", "plus", "jumlahkan", "total", "gabung", "sisa", "lebihin", "cadangan"],
    "pengurangan": ["kurang", "minus", "potong", "susut", "buang", "limbah", "pangkas"]
  },

  "mesin_rumus": {
    // --- KATEGORI KONVEKSI / BIDANG ---
    "hitung_panjang_kain_dari_target_pcs": {
      "id": "hitung_panjang_kain_bidang",
      "kondisi_input": ["BESAR_LEBAR", "KECIL_PANJANG", "KECIL_LEBAR", "TARGET"],
      "mencari": "BESAR_PANJANG",
      "satuan_output": " Meter",
      "rumus_string": "Math.min((Math.ceil(TARGET / Math.floor(BESAR_LEBAR / KECIL_LEBAR)) * KECIL_PANJANG), (Math.ceil(TARGET / Math.floor(BESAR_LEBAR / KECIL_PANJANG)) * KECIL_LEBAR)) / 100"
    },

    "hitung_target_pcs_dari_panjang_kain": {
      "id": "hitung_pcs_dari_bidang_kain",
      "kondisi_input": ["BESAR_PANJANG", "BESAR_LEBAR", "KECIL_PANJANG", "KECIL_LEBAR"],
      "mencari": "TARGET_PCS",
      "satuan_output": " Pcs",
      "rumus_string": "Math.max((Math.floor(BESAR_LEBAR / KECIL_LEBAR) * Math.floor(BESAR_PANJANG / KECIL_PANJANG)), (Math.floor(BESAR_LEBAR / KECIL_PANJANG) * Math.floor(BESAR_PANJANG / KECIL_LEBAR)))"
    },

    "panjang_ke_pcs_linear": {
      "id": "hitung_pcs_dari_panjang",
      "kondisi_input": ["BESAR_PANJANG", "KECIL_PANJANG"],
      "mencari": "TARGET_PCS",
      "satuan_output": " Pcs",
      "rumus_string": "Math.floor(BESAR_PANJANG / KECIL_PANJANG)"
    },

    "pcs_ke_panjang_linear": {
      "id": "hitung_panjang_dari_pcs",
      "kondisi_input": ["TARGET", "KECIL_PANJANG"],
      "mencari": "BESAR_PANJANG",
      "satuan_output": " cm",
      "rumus_string": "TARGET * KECIL_PANJANG"
    },

    "hitung_kain_potong": {
        kondisi_input: ["TARGET", "LEBAR_KAIN_UTAMA", "PANJANG_POTONGAN", "LEBAR_POTONGAN"],
        rumus_string: "(TARGET / (Math.floor(LEBAR_KAIN_UTAMA / LEBAR_POTONGAN) * Math.floor(100 / PANJANG_POTONGAN))) / 100",
        satuan_output: "meter"
    },

    // --- KATEGORI UNIT TUNGGAL (TON, KUINTAL & GROS) ---
    "konversi_ton_ke_kg": {
      "id": "ton_ke_kg",
      "kondisi_input": ["ANGKA_AWAL_TON"],
      "mencari": "BERAT_TOTAL",
      "satuan_output": " Kg",
      "rumus_string": "ANGKA_AWAL_TON * 1000"
    },

    "konversi_kuintal_ke_kg": {
      "id": "kuintal_ke_kg",
      "kondisi_input": ["ANGKA_AWAL_KW"],
      "mencari": "BERAT_TOTAL",
      "satuan_output": " Kg",
      "rumus_string": "ANGKA_AWAL_KW * 100"
    },

    "konversi_gros_ke_pcs": {
      "id": "gros_ke_pcs",
      "kondisi_input": ["ANGKA_AWAL_GROS"],
      "mencari": "TARGET_PCS",
      "satuan_output": " Pcs",
      "rumus_string": "ANGKA_AWAL_GROS * 144"
    },

    // --- KATEGORI GEOMETRI / LUAS & VOLUME ---
    "hitung_volume_balok": {
      "id": "volume_wadah_balok",
      "kondisi_input": ["BESAR_PANJANG", "BESAR_LEBAR", "BESAR_TINGGI"],
      "mencari": "VOLUME_BALOK",
      "satuan_output": " cm³",
      "rumus_string": "BESAR_PANJANG * BESAR_LEBAR * BESAR_TINGGI"
    },

    "luas_lingkaran": {
      "id": "luas_alas_bulat",
      "kondisi_input": ["DIAMETER_ADA"],
      "mencari": "LUAS_BULAT",
      "satuan_output": " cm²",
      "rumus_string": "3.14159 * Math.pow((DIAMETER_ADA / 2), 2)"
    },

    "luas_segitiga": {
      "id": "luas_alas_segitiga",
      "kondisi_input": ["BESAR_PANJANG", "BESAR_LEBAR"], 
      "mencari": "LUAS_SEGITIGA",
      "satuan_output": " cm²",
      "rumus_string": "0.5 * BESAR_PANJANG * BESAR_LEBAR"
    },

    "volume_tabung": {
      "id": "volume_wadah_tabung",
      "kondisi_input": ["DIAMETER_ADA", "BESAR_TINGGI"],
      "mencari": "VOLUME_TABUNG",
      "satuan_output": " cm³",
      "rumus_string": "(3.14159 * Math.pow((DIAMETER_ADA / 2), 2)) * BESAR_TINGGI"
    },

    // --- KATEGORI MASSA JENIS ---
    "massa_jenis_cari_berat": {
      "id": "berat_dari_volume",
      "kondisi_input": ["VOLUME_TOTAL", "BERAT_PER_LITER"],
      "mencari": "BERAT_TOTAL",
      "satuan_output": " Kg",
      "rumus_string": "VOLUME_TOTAL * BERAT_PER_LITER"
    },

    "massa_jenis_cari_volume": {
      "id": "volume_dari_berat",
      "kondisi_input": ["BERAT_TOTAL", "BERAT_PER_LITER"],
      "mencari": "VOLUME_TOTAL",
      "satuan_output": " Liter",
      "rumus_string": "BERAT_TOTAL / BERAT_PER_LITER"
    },

    // --- KATEGORI LOGISTIK / PERJALANAN ---
    "hitung_waktu_tempuh": {
      "id": "waktu_perjalanan",
      "kondisi_input": ["JARAK_ADA", "KECEPATAN_ADA"],
      "mencari": "WAKTU",
      "satuan_output": " Jam",
      "rumus_string": "JARAK_ADA / KECEPATAN_ADA"
    },

    "hitung_jarak_tempuh": {
      "id": "jarak_perjalanan",
      "kondisi_input": ["WAKTU_ADA", "KECEPATAN_ADA"],
      "mencari": "JARAK",
      "satuan_output": " Km",
      "rumus_string": "WAKTU_ADA * KECEPATAN_ADA"
    },

    // --- KATEGORI FISIKA ---
    "hitung_kecepatan": {
        "kondisi_input": ["JARAK", "WAKTU"],
        "rumus_string": "JARAK / WAKTU",
        "satuan_output": "m/s"
    },
    "hitung_jarak": {
        "kondisi_input": ["KECEPATAN", "WAKTU"],
        "rumus_string": "KECEPATAN * WAKTU",
        "satuan_output": "meter"
    },
    "hitung_energi_kinetik": {
        "kondisi_input": ["MASSA", "KECEPATAN"],
        "rumus_string": "0.5 * MASSA * Math.pow(KECEPATAN, 2)",
        "satuan_output": "Joule"
    },
    "hitung_gravitasi_ep": { // Energi Potensial
        "kondisi_input": ["MASSA", "TINGGI"],
        "rumus_string": "MASSA * 9.8 * TINGGI",
        "satuan_output": "Joule"
    },

    // --- KIMIA ---
    "hitung_molaritas": {
        "kondisi_input": ["MOL", "VOLUME"],
        "rumus_string": "MOL / VOLUME",
        "satuan_output": " Molar"
    },
    "hitung_massa_zat": {
        "kondisi_input": ["MOL", "MASSA_MOLAR"],
        "rumus_string": "MOL * MASSA_MOLAR",
        "satuan_output": " Gram"
    },

    // --- SUHU (Termodinamika) ---
    "konversi_c_ke_f": {
        "kondisi_input": ["SUHU_CELSIUS"],
        "rumus_string": "(SUHU_CELSIUS * 9/5) + 32",
        "satuan_output": " °F"
    },
    "konversi_c_ke_k": {
        "kondisi_input": ["SUHU_CELSIUS"],
        "rumus_string": "SUHU_CELSIUS + 273.15",
        "satuan_output": " K"
    }
  },

  "kamus_normalisasi": {
    "mtr": "meter", "m": "meter", "cm": "centimeter", "senti": "centimeter",
    "kg": "kilogram", "kilo": "kilogram", "gr": "gram", "g": "gram",
    "ltr": "liter", "l": "liter", "gimana": "berapa", "berpa": "berapa",
    "klo": "jika", "klw": "jika", "kalau": "jika", "soalnya": "jika",
    "tiap": "per", "setiap": "per", "peces": "pcs", "biji": "pcs",
    "batang": "pcs", "botol": "pcs", "lsn": "lusin", "kdi": "kodi",
    "gross": "gros", "lembar": "pcs", "potong": "pcs", "buah": "pcs",
    "butuh": "berapa", "menghasilkan": "jadi", "membuat": "jadi",
    "potongan": "panjang_per_pcs", "lebar": "lebar_potongan", "panjang": "panjang_potongan",
    "panjang_kain": "panjang_kain_utama", "lebar_kain": "lebar_kain_utama",
    "kain_lebar": "lebar_kain_utama", "kain_panjang": "panjang_kain_utama",
    "bikin": "jadi", "buat": "jadi", "tinggi": "tinggi_benda",
    "ton": "ton ANGKA_AWAL_TON",
    "kuintal": "kuintal ANGKA_AWAL_KW",
    "kwintal": "kuintal ANGKA_AWAL_KW",
    "kw": "kuintal ANGKA_AWAL_KW",
    "gros": "gros ANGKA_AWAL_GROS",
    "pcs": "TARGET", "biji": "TARGET", "buah": "TARGET", "lembar": "TARGET",
    "panjang": "PANJANG_POTONGAN", "p": "PANJANG_POTONGAN",
    "lebar": "LEBAR_POTONGAN", "l": "LEBAR_POTONGAN",
    "kain": "LEBAR_KAIN_UTAMA",
    "diameter": "DIAMETER", "d": "DIAMETER",
    "jarak": "JARAK", "j": "JARAK",
    "waktu": "WAKTU", "w": "WAKTU",
    "massa": "MASSA", "m": "MASSA",
    "tinggi": "TINGGI", "t": "TINGGI",
    "kecepatan": "KECEPATAN",
    "energi": "ENERGI",
    "mol": "MOL", 
    "volume": "VOLUME", "vol": "VOLUME",
    "massa": "MASSA_MOLAR", "massa_molar": "MASSA_MOLAR",
    "molaritas": "MOLARITAS",
    "celsius": "SUHU_CELSIUS", "celcius": "SUHU_CELSIUS", "c": "SUHU_CELSIUS",
    "suhu": "SUHU_CELSIUS", "temperatur": "SUHU_CELSIUS"
  }
};
