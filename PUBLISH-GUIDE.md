# Panduan Publish KabarKala

Panduan untuk agen/jadwal otomatis yang menerbitkan artikel baru.

## Struktur repo

```
index.html            → homepage (render dari data/articles.json via assets/app.js)
tentang.html          → tentang + metode + koreksi
artikel/<slug>.html   → satu file per artikel (standalone)
data/articles.json    → array metadata, urutan TERBARU dulu
assets/               → style.css, app.js
sw.js                 → service worker (bump versi tiap ada perubahan shell: kabarkala-v2, dst)
```

## Langkah publish (2–3 artikel per run)

1. **Pilih topik**: rotasi kategori — Nasional, Dunia, Teknologi, Ekonomi, Olahraga, Hiburan.
   Usahakan tiap artikel beda kategori. Jangan mengulang topik yang sudah ada di
   `data/articles.json` (cek 20 terakhir). Prioritaskan berita aktual 24 jam terakhir.
   Target 2–3 artikel per run; kalau topik yang terverifikasi kurang dari itu,
   terbitkan yang ada saja (minimal 1) — kualitas di atas kuota.
2. **Riset**: tiap artikel diriset dari MINIMAL 5 sumber berita publik yang berbeda.
   Catat URL + nama media tiap sumber.
3. **Tulis artikel** (Bahasa Indonesia, gaya sesuai panduan di bawah) dalam **FORMAT CAROUSEL 60-detik**:
   - 6–7 slide: (1) cover — judul nge-hook + 1 kalimat kenapa rame + gambar ilustrasi;
     (2–4/5) tiap slide 1 fakta, maksimal 2–3 kalimat pendek + emoji judul;
     (terakhir) "Efeknya ke lo apa?" — kenapa anak muda harus peduli;
     (opsional) 1 slide "💬 Kata netizen" HANYA jika ada komentar sosmed asli (beri label jelas).
   - Judul catchy dan jujur — tidak clickbait murahan.
   - **Verifikasi silang**: nama, angka, tanggal harus muncul di ≥2 sumber. Yang tidak terverifikasi → jangan tulis.
   - Estimasi waktu baca: ±1 menit.
4. **Buat file** `artikel/<slug>.html` per artikel memakai TEMPLATE di bawah.
   Slug: huruf kecil, strip, tanpa tanggal. Contoh: `indonesia-lolos-piala-dunia-2026`.
5. **Update** `data/articles.json`: prepend semua entri baru (terbaru di index 0).
6. **Commit & push** ke repo `kabarkala`, branch `main` (satu commit berisi semua artikel).
7. **Laporkan** ke user: daftar judul + link + 1 kalimat ringkasan per artikel.

## Gaya bahasa ✍️ (Gen Z, format carousel)

- **Target pembaca: anak muda (Gen Z).** Bahasa Indonesia santai kayak lagi cerita di tongkrongan — BUKAN bahasa koran.
- Slang Gen Z yang hidup boleh dipakai: *spill, plot twist, red flag, auto, valid, era, gas, kena imbas, adu jotos* — asal tetap sopan.
- JANGAN: kata kasar, umpatan, bahasa vulgar, atau slang yang menyinggung SARA.
- Tiap slide maksimal 2–3 kalimat pendek. Satu slide = satu fakta. Tidak ada tembok teks.
- Slide terakhir WAJIB "Efeknya ke lo apa?" — hubungkan berita ke hidup anak muda (harga HP, ongkir, skincare, nongkrong, dll).
- Judul boleh nge-gas tapi tetap jujur — jangan clickbait murahan.
- Gaya boleh santai, tapi **fakta tetap serius**: angka, nama, tanggal, kutipan harus akurat dan netral.
- Topik sensitif (bencana, kriminal, politik panas): gaya boleh ringan tapi nada tetap empati dan hormat — jangan bercanda soal korban.
- "💬 Kata netizen": hanya komentar sosmed ASLI, beri atribusi platform + label "(Suara netizen — bukan fakta.)". Jangan karang komentar.

## 🖼️ Gambar ilustrasi (wajib tiap artikel)

Tiap artikel memakai 1 gambar ilustrasi SVG sebagai hero + thumbnail kartu:
- Pakai template kategori di `assets/img/`: `nasional.svg`, `dunia.svg`,
  `teknologi.svg`, `ekonomi.svg`, `olahraga.svg`, `hiburan.svg`.
- Untuk variasi, boleh salin template jadi `assets/img/<slug>.svg` lalu ubah
  2–3 warna gradien agar beda dari artikel lain sekategori.
- Aturan: gaya ilustrasi editorial, tanpa foto orang asli, tanpa teks di dalam
  gambar. Caption memakai **"Ilustrasi: KabarKala"** (sudah ada di template).
- Tambahkan field `"image": "assets/img/<file>.svg"` di entri `data/articles.json`
  agar muncul juga sebagai thumbnail di homepage.

## Batasan kualitas (wajib)

- Jangan menerbitkan topik yang tidak bisa diverifikasi dari ≥2 sumber independen.
- Jangan menulis opini sebagai fakta. Pisahkan jelas: fakta vs analisis.
- Jangan mengarang kutipan. Hanya kutip jika ada di sumber, dengan atribusi.
- Topik sensitif (bencana, kriminal, politik panas): tetap faktual, nada netral, hindari spekulasi.
- Jika ragu → lewati topik itu, pilih topik lain. Melewatkan 1 jam lebih baik daripada menerbitkan yang salah.

## TEMPLATE artikel/<slug>.html (format carousel 60-detik)

Ganti [HURUF_BESAR] dengan isi. Warna kategori: Nasional #c1121f, Dunia #1d4ed8,
Teknologi #7c3aed, Ekonomi #047857, Olahraga #ea580c, Hiburan #db2777.
Emoji kategori: Nasional 🏛️, Dunia 🌍, Teknologi 💻, Ekonomi 💰, Olahraga ⚽, Hiburan 🎬.

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[JUDUL NGE-HOOK] — KabarKala</title>
<meta name="description" content="[RINGKASAN 1 KALIMAT]">
<link rel="stylesheet" href="../assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📰</text></svg>">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <div><a href="../index.html"><div class="brand">Kabar<span>Kala</span></div></a><div class="tagline">Kabar zaman, dirangkum cerdas</div></div>
    <div style="text-align:right"><div class="dateline" id="dateline"></div></div>
  </div>
</header>
<main class="wrap">
  <div class="article-head">
    <span class="badge" style="background:[WARNA]">[KATEGORI]</span>
    <h1>[JUDUL NGE-HOOK, jujur, boleh emoji 1]</h1>
    <div class="article-meta"><span class="viewcount" data-slug="[SLUG]"></span><span>📅 [TANGGAL ID]</span><span>⏱️ 1 menit baca</span></div>
  </div>

  <div class="carousel">
    <div class="track" id="track">
      <div class="slide cover" style="background:linear-gradient(160deg,[WARNA],#111)">
        <div class="num">1 / [N]</div>
        <img class="cover-img" src="../assets/img/[SLUG].svg" alt="[DESKRIPSI GAMBAR]">
        <div class="kicker">[EMOJI] [KATEGORI HURUF KAPITAL]</div>
        <h2>[JUDUL VERSI PENDEK + HOOK]</h2>
        <p>[1 kalimat kenapa rame + ajakan geser →]</p>
      </div>
      <div class="slide">
        <div class="num">2 / [N]</div>
        <div class="emoji-big">[EMOJI]</div>
        <h2>[Judul fakta 1]</h2>
        <p>[2–3 kalimat fakta terverifikasi]</p>
      </div>
      <!-- ulang pola slide untuk fakta 2, 3, (4) -->
      <div class="slide">
        <div class="num">[N-1] / [N]</div>
        <div class="emoji-big">💬</div>
        <h2>Kata netizen</h2>
        <p>[HANYA jika ada komentar sosmed asli + atribusi. Jika tidak ada, HAPUS slide ini.] <span class="netizen-note">(Suara netizen — bukan fakta.)</span></p>
      </div>
      <div class="slide">
        <div class="num">[N] / [N]</div>
        <div class="emoji-big">🤔</div>
        <h2>Efeknya ke lo apa?</h2>
        <p>[WAJIB: hubungkan ke hidup anak muda — harga, ongkir, nongkrong, dll.]</p>
      </div>
    </div>
    <div class="dots" id="dots"></div>
    <div class="swipe-hint">👆 geser kartunya</div>
  </div>

  <h3 style="margin:18px 0 4px">Gimana menurut lo?</h3>
  <div class="react" id="react" data-slug="[SLUG]">
    <button data-r="fire">🔥<span class="cnt" id="c-fire">…</span></button>
    <button data-r="wow">😮<span class="cnt" id="c-wow">…</span></button>
    <button data-r="like">👍<span class="cnt" id="c-like">…</span></button>
  </div>

  <div class="ai-note">🤖 Artikel ini disusun dengan bantuan AI dari berbagai sumber publik dan telah disunting manusia.</div>
  <details class="sources"><summary>📚 Sumber ([N] media)</summary><ul>
    <li><a href="[URL1]">[Nama Media 1] — [judul referensi]</a></li>
    <li><a href="[URL2]">[Nama Media 2] — [judul referensi]</a></li>
  </ul></details>
  <a class="backlink" href="../index.html">← Berita lainnya</a>
</main>
<footer>
  <div class="wrap">
    <div class="brand">Kabar<span>Kala</span></div>
    <div class="disclaimer">KabarKala adalah blog kurasi berita. Artikel disusun dengan bantuan AI dari berbagai sumber publik dan disunting manusia.</div>
    <div class="flink"><a href="../index.html">Beranda</a><a href="../statistik.html">📊 Statistik</a><a href="../tentang.html">Tentang Kami</a></div>
    <div style="margin-top:10px">© 2026 KabarKala</div>
  </div>
</footer>
<script src="../assets/app.js"></script>
</body>
</html>
```

## 📊 Statistik views (tanpa daftar)

- Setiap artikel otomatis menghitung views via `assets/app.js` → API counter gratis Abacus (`https://abacus.jasoncameron.dev`, namespace `kabarkala`, key = slug). Tidak perlu akun.
- Span `<span class="viewcount" data-slug="[SLUG]">` WAJIB ada di `.article-meta` setiap artikel baru (sudah di template di atas). Ganti `[SLUG]` dengan slug artikel.
- Halaman `statistik.html` menampilkan peringkat artikel terpopuler (ambil dari `data/articles.json` + API `/get`). Jangan ubah logic-nya kecuali perlu.
- Catatan: angka menghitung setiap page load (termasuk kunjungan sendiri) — ini angka kasar, bukan Google Analytics.

## Format entri data/articles.json

```json
{
  "slug": "[slug-tanpa-ekstensi]",
  "title": "[JUDUL]",
  "category": "[Nasional|Dunia|Teknologi|Ekonomi|Olahraga|Hiburan]",
  "date": "[ISO 8601, mis. 2026-10-06T11:00:00+07:00]",
  "excerpt": "[1 kalimat ringkasan]",
  "read_time": "[X] menit baca",
  "image": "assets/img/[slug].jpg"
}
```
