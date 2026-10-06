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
3. **Tulis artikel** (Bahasa Indonesia, gaya sesuai panduan di bawah):
   - Judul jelas dan catchy, tidak clickbait murahan.
   - Lead 1 paragraf: apa, siapa, kapan, di mana.
   - 3–6 paragraf isi: fakta dari multi-sumber, konteks untuk pembaca Indonesia.
   - 1 paragraf "Konteks"/"Kenapa penting" bila relevan.
   - **Verifikasi silang**: nama, angka, tanggal harus muncul di ≥2 sumber. Yang tidak terverifikasi → jangan tulis.
   - Estimasi waktu baca: 3–5 menit.
4. **Buat file** `artikel/<slug>.html` per artikel memakai TEMPLATE di bawah.
   Slug: huruf kecil, strip, tanpa tanggal. Contoh: `indonesia-lolos-piala-dunia-2026`.
5. **Update** `data/articles.json`: prepend semua entri baru (terbaru di index 0).
6. **Commit & push** ke repo `kabarkala`, branch `main` (satu commit berisi semua artikel).
7. **Laporkan** ke user: daftar judul + link + 1 kalimat ringkasan per artikel.

## Gaya bahasa ✍️

- Bahasa Indonesia yang **muda dan gaul, tapi tetap sopan** — enak dibaca remaja sampai orang tua.
- Pakai "kamu", kalimat pendek-pendek, nada energetic kayak lagi cerita ke teman.
- Boleh slang ringan yang umum (mis. "gas", "auto", "bikin heboh", "nggak nyangka").
- JANGAN: kata kasar, umpatan, bahasa vulgar, atau slang yang menyinggung SARA.
- Judul boleh catchy tapi tetap informatif — jangan clickbait murahan.
- Gaya boleh santai, tapi **fakta tetap serius**: angka, nama, tanggal, kutipan harus akurat dan netral.
- Topik sensitif (bencana, kriminal, politik panas): gaya boleh ringan tapi nada tetap empati dan hormat — jangan bercanda soal korban.

## Batasan kualitas (wajib)

- Jangan menerbitkan topik yang tidak bisa diverifikasi dari ≥2 sumber independen.
- Jangan menulis opini sebagai fakta. Pisahkan jelas: fakta vs analisis.
- Jangan mengarang kutipan. Hanya kutip jika ada di sumber, dengan atribusi.
- Topik sensitif (bencana, kriminal, politik panas): tetap faktual, nada netral, hindari spekulasi.
- Jika ragu → lewati topik itu, pilih topik lain. Melewatkan 1 jam lebih baik daripada menerbitkan yang salah.

## TEMPLATE artikel/<slug>.html

Ganti [HURUF_BESAR] dengan isi. Warna kategori: Nasional #c1121f, Dunia #1d4ed8,
Teknologi #7c3aed, Ekonomi #047857, Olahraga #ea580c, Hiburan #db2777.
Emoji kategori: Nasional 🏛️, Dunia 🌍, Teknologi 💻, Ekonomi 💰, Olahraga ⚽, Hiburan 🎬.

```html
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[JUDUL] — KabarKala</title>
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
    <h1>[JUDUL]</h1>
    <div class="article-meta"><span>📅 [TANGGAL ID]</span><span>⏱️ [X] menit baca</span></div>
  </div>
  <div class="article-hero" style="background:linear-gradient(135deg,[WARNA],#111)">[EMOJI]</div>
  <div class="article-body">
    <p><strong>[LEAD: apa, siapa, kapan, di mana — 1 paragraf]</strong></p>
    <p>[Isi paragraf 1]</p>
    <p>[Isi paragraf 2]</p>
    <h2>[Subjudul bila perlu]</h2>
    <p>[Isi paragraf 3]</p>
    <p>[Konteks / kenapa penting]</p>
  </div>
  <div class="ai-note">🤖 Artikel ini disusun dengan bantuan AI dari berbagai sumber publik dan telah disunting manusia. Lihat daftar sumber di bawah.</div>
  <div class="sources"><h3>📚 Sumber</h3><ul>
    <li><a href="[URL1]">[Nama Media 1] — [judul referensi]</a></li>
    <li><a href="[URL2]">[Nama Media 2] — [judul referensi]</a></li>
  </ul></div>
  <a class="backlink" href="../index.html">← Berita lainnya</a>
</main>
<footer>
  <div class="wrap">
    <div class="brand">Kabar<span>Kala</span></div>
    <div class="disclaimer">KabarKala adalah blog kurasi berita. Artikel disusun dengan bantuan AI dari berbagai sumber publik dan disunting manusia.</div>
    <div style="margin-top:10px">© 2026 KabarKala</div>
  </div>
</footer>
<script src="../assets/app.js"></script>
</body>
</html>
```

## Format entri data/articles.json

```json
{
  "slug": "[slug-tanpa-ekstensi]",
  "title": "[JUDUL]",
  "category": "[Nasional|Dunia|Teknologi|Ekonomi|Olahraga|Hiburan]",
  "date": "[ISO 8601, mis. 2026-10-06T11:00:00+07:00]",
  "excerpt": "[1 kalimat ringkasan]",
  "read_time": "[X] menit baca"
}
```
