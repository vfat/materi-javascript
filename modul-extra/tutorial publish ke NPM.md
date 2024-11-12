Sebagai seorang senior developer Node.js, berikut adalah tutorial lengkap dan bertahap untuk membuat dan mempublikasikan package atau modul Anda ke npm.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** dan **npm** di komputer Anda.
- Akun **npm**. Jika belum punya, Anda bisa membuatnya di [npmjs.com](https://www.npmjs.com/).

## Langkah 1: Siapkan Lingkungan Pengembangan

Buat direktori baru untuk package Anda.

```bash
mkdir nama-package-anda
cd nama-package-anda
```

## Langkah 2: Inisialisasi Package

Inisialisasi package dengan perintah berikut:

```bash
npm init
```

Ikuti instruksi yang muncul atau gunakan `-y` untuk mengisi dengan nilai default:

```bash
npm init -y
```

Ini akan membuat file `package.json` dengan konfigurasi default.

## Langkah 3: Tulis Kode Modul Anda

Buat file utama untuk modul Anda, misalnya `index.js` atau sesuai dengan yang ditentukan di `package.json`.

Contoh `index.js`:

```javascript
function haloDunia(nama) {
  return `Halo, ${nama}! Selamat datang di dunia Node.js.`;
}

module.exports = haloDunia;
```

## Langkah 4: Tambahkan Metadata Penting ke package.json

Pastikan `package.json` Anda memiliki informasi yang lengkap. Beberapa bidang penting meliputi:

- **name**: Nama unik package Anda di npm.
- **version**: Versi package Anda.
- **description**: Deskripsi singkat tentang package Anda.
- **main**: Titik masuk utama untuk modul Anda (misalnya, `index.js`).
- **keywords**: Kata kunci yang membantu orang menemukan package Anda.
- **author**: Nama Anda atau tim Anda.
- **license**: Lisensi untuk package Anda (misalnya, `MIT`).

Contoh `package.json` yang diperbarui:

```json
{
  "name": "nama-package-anda",
  "version": "1.0.0",
  "description": "Deskripsi singkat tentang package Anda.",
  "main": "index.js",
  "keywords": ["nodejs", "package", "contoh"],
  "author": "Nama Anda",
  "license": "MIT"
}
```

## Langkah 5: Uji Package Anda Secara Lokal

Buat proyek baru di luar direktori package Anda untuk menguji instalasi lokal.

```bash
mkdir test-package
cd test-package
npm init -y
```

Di dalam direktori `test-package`, instal package Anda secara lokal:

```bash
npm install ../nama-package-anda
```

Kemudian, gunakan package Anda dalam kode:

```javascript
// test.js
const haloDunia = require('nama-package-anda');

console.log(haloDunia('Developer'));
```

Jalankan kode:

```bash
node test.js
```

Pastikan outputnya sesuai dengan yang diharapkan.

## Langkah 6: Buat Akun npm (Jika Belum Ada)

Jika Anda belum memiliki akun npm, daftarlah di [npmjs.com/signup](https://www.npmjs.com/signup).

## Langkah 7: Login ke npm melalui Command Line

Login ke akun npm Anda menggunakan perintah:

```bash
npm login
```

Masukkan **username**, **password**, dan **email** yang terkait dengan akun npm Anda.

## Langkah 8: Publikasikan Package Anda

Pastikan Anda berada di direktori root package Anda, lalu jalankan:

```bash
npm publish
```

Jika package Anda bersifat publik dan ingin mempublikasikannya secara publik, pastikan tidak ada kesalahan.

**Catatan:** Jika Anda mendapatkan kesalahan terkait nama package yang sudah ada, ganti nama package Anda di `package.json` dengan nama yang unik.

## Langkah 9: Perbarui Package Anda (Versi)

Setiap kali Anda melakukan perubahan dan ingin mempublikasikan versi baru, perbarui nomor versi di `package.json`.

Untuk mempermudah, Anda bisa menggunakan perintah:

```bash
npm version patch
```

Pilihan lainnya:

- `npm version patch` untuk peningkatan versi patch (1.0.0 → 1.0.1)
- `npm version minor` untuk peningkatan versi minor (1.0.0 → 1.1.0)
- `npm version major` untuk peningkatan versi major (1.0.0 → 2.0.0)

Setelah memperbarui versi, publikasikan kembali:

```bash
npm publish
```

## Tips Tambahan

- **.gitignore**: Jika Anda menggunakan Git, pastikan untuk membuat file `.gitignore` untuk mengecualikan `node_modules` dan file lain yang tidak perlu.
- **README.md**: Tambahkan file `README.md` yang menjelaskan cara menggunakan package Anda.
- **Testing**: Pertimbangkan untuk menambahkan tes otomatis menggunakan framework seperti Jest atau Mocha.
- **Continuous Integration**: Gunakan layanan CI/CD untuk otomatisasi pengujian dan publikasi.

## Kesimpulan

Anda telah berhasil membuat dan mempublikasikan package Node.js Anda ke npm! Sekarang, developer lain dapat menginstal dan menggunakan package Anda dengan perintah:

```bash
npm install nama-package-anda
```

Selalu ingat untuk menjaga package Anda tetap terbarui dan responsif terhadap masukan dari komunitas.

---

Baik, saya akan membantu Anda membuat package Node.js yang dapat mengonversi angka menjadi format mata uang sesuai dengan simbol yang diberikan. Berikut adalah langkah-langkah lengkap untuk membuat package tersebut.

## Langkah 1: Siapkan Direktori Package

Buat direktori baru untuk package Anda dan masuk ke dalamnya:

```bash
mkdir konversi-mata-uang
cd konversi-mata-uang
```

## Langkah 2: Inisialisasi Package

Inisialisasi package dengan `npm`:

```bash
npm init -y
```

Ini akan membuat file `package.json` dengan pengaturan default.

## Langkah 3: Tulis Kode Fungsi

Buat file `index.js` sebagai titik masuk utama:

```javascript
// index.js

function konversiMataUang(angka, simbolMataUang, lokal = 'id-ID') {
  if (typeof angka !== 'number' || isNaN(angka)) {
    throw new Error('Parameter pertama harus berupa angka yang valid.');
  }

  if (typeof simbolMataUang !== 'string' || simbolMataUang.trim() === '') {
    throw new Error('Parameter kedua harus berupa string yang valid.');
  }

  // Format angka sesuai dengan lokal yang diberikan
  const formattedNumber = angka.toLocaleString(lokal, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Buat simbol mata uang sesuai dengan konvensi penulisan
  let symbolFormatted = simbolMataUang.trim().toUpperCase();

  // Jika simbol adalah 'rp', formatnya 'Rp.' (dengan titik)
  if (symbolFormatted === 'RP') {
    symbolFormatted = 'Rp.';
  } else {
    symbolFormatted += '.';
  }

  // Gabungkan simbol mata uang dengan angka yang telah diformat
  const result = `${symbolFormatted} ${formattedNumber}`;

  return result;
}

module.exports = konversiMataUang;
```

**Penjelasan:**

- **Parameter `angka`**: Angka yang akan dikonversi ke format mata uang.
- **Parameter `simbolMataUang`**: Simbol mata uang yang ingin ditambahkan (contoh: 'rp', '$', '€').
- **Parameter `lokal` (opsional)**: Lokal untuk format angka (default adalah 'id-ID' untuk Indonesia).
- **Validasi Input**: Memastikan bahwa parameter yang diberikan valid.
- **Format Angka**: Menggunakan `toLocaleString` untuk memformat angka sesuai lokal.
- **Penyesuaian Simbol**: Mengubah simbol mata uang menjadi format yang sesuai.

## Langkah 4: Tambahkan Metadata ke package.json

Perbarui `package.json` dengan informasi yang relevan:

```json
{
  "name": "konversi-mata-uang",
  "version": "1.0.0",
  "description": "Package untuk mengonversi angka menjadi format mata uang sesuai simbol yang diberikan.",
  "main": "index.js",
  "keywords": ["currency", "formatting", "number", "konversi", "mata uang", "nodejs"],
  "author": "Nama Anda",
  "license": "MIT"
}
```

## Langkah 5: Tambahkan README.md

Buat file `README.md` untuk dokumentasi:

```markdown
# Konversi Mata Uang

Package untuk mengonversi angka menjadi format mata uang sesuai simbol yang diberikan.

## Instalasi

```bash
npm install konversi-mata-uang
```

## Penggunaan

```javascript
const konversiMataUang = require('konversi-mata-uang');

let hasil = konversiMataUang(200.22, 'rp');
console.log(hasil); // Output: 'Rp. 200,22'

hasil = konversiMataUang(1500000, '$', 'en-US');
console.log(hasil); // Output: '$. 1,500,000.00'
```

## Parameter

- **angka** (Number): Angka yang akan dikonversi.
- **simbolMataUang** (String): Simbol mata uang yang akan ditambahkan.
- **lokal** (String, opsional): Lokal untuk format angka (default: 'id-ID').

## Lisensi

MIT
```

## Langkah 6: Uji Package Secara Lokal

Buat direktori baru untuk pengujian:

```bash
cd ..
mkdir test-konversi-mata-uang
cd test-konversi-mata-uang
npm init -y
```

Instal package Anda:

```bash
npm install ../konversi-mata-uang
```

Buat file `test.js`:

```javascript
const konversiMataUang = require('konversi-mata-uang');

try {
  let hasil = konversiMataUang(200.22, 'rp');
  console.log(hasil); // Output: 'Rp. 200,22'

  hasil = konversiMataUang(1500000, '$', 'en-US');
  console.log(hasil); // Output: '$. 1,500,000.00'

  hasil = konversiMataUang(1234567.89, '€', 'de-DE');
  console.log(hasil); // Output: '€. 1.234.567,89'
} catch (error) {
  console.error(error.message);
}
```

Jalankan pengujian:

```bash
node test.js
```

Pastikan output sesuai dengan yang diharapkan.

## Langkah 7: Tambahkan .gitignore (Opsional)

Jika Anda menggunakan Git, buat file `.gitignore` untuk mengecualikan `node_modules`:

```
node_modules/
```

## Langkah 8: Publikasikan Package ke npm

### Login ke npm

Jika belum login, lakukan:

```bash
npm login
```

### Publikasikan Package

```bash
npm publish
```

**Catatan:** Pastikan nama package Anda unik di npm registry. Jika nama sudah digunakan, Anda perlu mengubah nama package di `package.json`.

## Langkah 9: Perbarui Package (Jika Diperlukan)

Jika Anda melakukan perubahan dan ingin mempublikasikan versi baru:

1. Perbarui versi dengan:

   ```bash
   npm version patch
   ```

2. Publikasikan kembali:

   ```bash
   npm publish
   ```

## Langkah 10: Tips Tambahan

- **Penanganan Error Lebih Lanjut**: Anda dapat menambahkan lebih banyak validasi untuk memastikan fungsi Anda robust.
- **Pengujian Otomatis**: Pertimbangkan untuk menambahkan tes menggunakan framework seperti Jest atau Mocha.
- **Continuous Integration**: Gunakan CI/CD untuk otomatisasi pengujian dan publikasi.

## Kesimpulan

Anda sekarang memiliki package Node.js yang dapat mengonversi angka menjadi format mata uang sesuai dengan simbol dan lokal yang diberikan. Package ini dapat membantu banyak developer yang memerlukan fungsi serupa dalam proyek mereka.

Jika Anda memiliki pertanyaan atau memerlukan bantuan lebih lanjut, jangan ragu untuk menghubungi saya. Selamat berkoding!

---

Baik, saya akan membantu Anda menyimpan skrip tersebut ke GitHub. Berikut adalah langkah-langkah untuk menyimpan kode proyek Anda ke GitHub.

## Prasyarat

- **Git** harus terinstal di komputer Anda.
  - Anda dapat memeriksa dengan menjalankan `git --version` di terminal.
  - Jika belum terinstal, unduh dan instal dari [sini](https://git-scm.com/downloads).
- **Akun GitHub**.
  - Jika belum memiliki akun, daftar di [github.com](https://github.com/join).

## Langkah 1: Inisialisasi Repositori Git di Proyek Anda

Masuk ke direktori proyek Anda:

```bash
cd /path/to/konversi-mata-uang
```

Inisialisasi repositori Git:

```bash
git init
```

Ini akan membuat folder `.git` tersembunyi yang melacak perubahan dalam proyek Anda.

## Langkah 2: Tambahkan .gitignore

Buat file `.gitignore` untuk mengecualikan folder atau file yang tidak perlu diunggah ke GitHub, seperti `node_modules`:

```bash
echo "node_modules/" > .gitignore
```

Atau buat file `.gitignore` dan tambahkan baris berikut:

```
node_modules/
```

## Langkah 3: Tambahkan File ke Staging Area

Tambahkan semua file proyek Anda ke staging area Git:

```bash
git add .
```

Anda dapat memeriksa status dengan:

```bash
git status
```

## Langkah 4: Commit Perubahan

Buat commit pertama Anda dengan pesan yang menjelaskan perubahan:

```bash
git commit -m "Initial commit: Menambahkan fungsi konversi mata uang"
```

## Langkah 5: Buat Repositori di GitHub

1. Masuk ke akun GitHub Anda.
2. Klik ikon **+** di sudut kanan atas dan pilih **New repository**.
3. Isi detail repositori:
   - **Repository name**: `konversi-mata-uang`
   - **Description**: (opsional) "Package untuk mengonversi angka menjadi format mata uang sesuai simbol yang diberikan."
   - **Public** atau **Private**: Pilih sesuai kebutuhan Anda.
   - **Initialize this repository with a README**: Jangan dicentang (karena kita sudah memiliki file README.md).
4. Klik **Create repository**.

## Langkah 6: Hubungkan Repositori Lokal dengan Repositori GitHub

Setelah repositori dibuat, Anda akan diberikan URL untuk repositori tersebut, misalnya:

```bash
https://github.com/username/konversi-mata-uang.git
```

Di terminal, tambahkan URL repositori GitHub sebagai remote origin:

```bash
git remote add origin https://github.com/username/konversi-mata-uang.git
```

Ganti `username` dengan nama pengguna GitHub Anda.

## Langkah 7: Push Kode ke GitHub

Kirim (push) kode Anda ke repositori GitHub:

```bash
git push -u origin master
```

Atau jika Anda menggunakan branch `main`:

```bash
git push -u origin main
```

Anda mungkin diminta memasukkan nama pengguna dan kata sandi GitHub Anda. Jika Anda menggunakan autentikasi dua faktor, Anda perlu menggunakan [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) sebagai pengganti kata sandi.

## Langkah 8: Verifikasi di GitHub

Buka repositori Anda di GitHub (`https://github.com/username/konversi-mata-uang`) dan pastikan semua file telah diunggah dengan benar.

## Langkah 9: Memperbarui Kode di Masa Depan

Setiap kali Anda melakukan perubahan pada kode Anda, Anda dapat mengunggah perubahan tersebut ke GitHub dengan langkah-langkah berikut:

1. **Tambahkan perubahan ke staging area:**

   ```bash
   git add .
   ```

2. **Commit perubahan dengan pesan yang sesuai:**

   ```bash
   git commit -m "Deskripsi perubahan yang dilakukan"
   ```

3. **Push perubahan ke GitHub:**

   ```bash
   git push
   ```

## Langkah Tambahan: Mengelola Versi dan Kolaborasi

- **Branching:** Anda dapat membuat branch baru untuk fitur atau perbaikan bug sebelum menggabungkannya ke branch utama.
  
  ```bash
  git checkout -b nama-branch-baru
  ```

- **Pull Requests:** Jika Anda bekerja dengan tim, Anda dapat menggunakan pull request di GitHub untuk mengulas dan menggabungkan perubahan.

## Tips Penting

- **Keamanan:** Jangan pernah mengunggah informasi sensitif seperti kata sandi, token API, atau kunci pribadi ke GitHub.
- **README.md:** Pastikan file `README.md` Anda informatif, karena ini adalah dokumentasi pertama yang dilihat orang lain.
- **Lisensi:** Jika Anda ingin orang lain menggunakan atau berkontribusi pada proyek Anda, sertakan lisensi seperti MIT, Apache, atau GNU GPL.
- **Issues dan Discussions:** Gunakan fitur **Issues** dan **Discussions** di GitHub untuk melacak bug atau ide peningkatan.
- **Continuous Integration (CI):** Integrasikan layanan CI seperti GitHub Actions untuk otomatisasi pengujian dan deployment.

## Troubleshooting

- **Autentikasi Gagal:** Jika mengalami masalah saat push karena autentikasi, pertimbangkan untuk menggunakan SSH keys atau Personal Access Token.
  
  - **Menggunakan SSH keys:**
    - Buat SSH key dengan `ssh-keygen`.
    - Tambahkan public key ke GitHub melalui pengaturan akun Anda.
    - Ubah URL remote menjadi SSH:

      ```bash
      git remote set-url origin git@github.com:username/konversi-mata-uang.git
      ```

- **Merge Conflicts:** Jika terjadi konflik saat merge, Git akan meminta Anda untuk menyelesaikan konflik tersebut secara manual.

## Referensi

- [Dokumentasi GitHub](https://docs.github.com/)
- [Git - Book](https://git-scm.com/book/en/v2)

## Kesimpulan

Dengan mengikuti langkah-langkah di atas, Anda telah berhasil menyimpan skrip Anda ke GitHub. Ini memungkinkan Anda untuk:

- Mengelola versi kode Anda.
- Berkolaborasi dengan developer lain.
- Mempublikasikan proyek Anda kepada komunitas.

Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan tambahan, jangan ragu untuk bertanya. Selamat berkarya!

---

Baik, saya akan membantu Anda menyimpan skrip tersebut ke GitHub. Berikut adalah langkah-langkah untuk menyimpan kode proyek Anda ke GitHub.

## Prasyarat

- **Git** harus terinstal di komputer Anda.
  - Anda dapat memeriksa dengan menjalankan `git --version` di terminal.
  - Jika belum terinstal, unduh dan instal dari [sini](https://git-scm.com/downloads).
- **Akun GitHub**.
  - Jika belum memiliki akun, daftar di [github.com](https://github.com/join).

## Langkah 1: Inisialisasi Repositori Git di Proyek Anda

Masuk ke direktori proyek Anda:

```bash
cd /path/to/konversi-mata-uang
```

Inisialisasi repositori Git:

```bash
git init
```

Ini akan membuat folder `.git` tersembunyi yang melacak perubahan dalam proyek Anda.

## Langkah 2: Tambahkan .gitignore

Buat file `.gitignore` untuk mengecualikan folder atau file yang tidak perlu diunggah ke GitHub, seperti `node_modules`:

```bash
echo "node_modules/" > .gitignore
```

Atau buat file `.gitignore` dan tambahkan baris berikut:

```
node_modules/
```

## Langkah 3: Tambahkan File ke Staging Area

Tambahkan semua file proyek Anda ke staging area Git:

```bash
git add .
```

Anda dapat memeriksa status dengan:

```bash
git status
```

## Langkah 4: Commit Perubahan

Buat commit pertama Anda dengan pesan yang menjelaskan perubahan:

```bash
git commit -m "Initial commit: Menambahkan fungsi konversi mata uang"
```

## Langkah 5: Buat Repositori di GitHub

1. Masuk ke akun GitHub Anda.
2. Klik ikon **+** di sudut kanan atas dan pilih **New repository**.
3. Isi detail repositori:
   - **Repository name**: `konversi-mata-uang`
   - **Description**: (opsional) "Package untuk mengonversi angka menjadi format mata uang sesuai simbol yang diberikan."
   - **Public** atau **Private**: Pilih sesuai kebutuhan Anda.
   - **Initialize this repository with a README**: Jangan dicentang (karena kita sudah memiliki file README.md).
4. Klik **Create repository**.

## Langkah 6: Hubungkan Repositori Lokal dengan Repositori GitHub

Setelah repositori dibuat, Anda akan diberikan URL untuk repositori tersebut, misalnya:

```bash
https://github.com/username/konversi-mata-uang.git
```

Di terminal, tambahkan URL repositori GitHub sebagai remote origin:

```bash
git remote add origin https://github.com/username/konversi-mata-uang.git
```

Ganti `username` dengan nama pengguna GitHub Anda.

## Langkah 7: Push Kode ke GitHub

Kirim (push) kode Anda ke repositori GitHub:

```bash
git push -u origin master
```

Atau jika Anda menggunakan branch `main`:

```bash
git push -u origin main
```

Anda mungkin diminta memasukkan nama pengguna dan kata sandi GitHub Anda. Jika Anda menggunakan autentikasi dua faktor, Anda perlu menggunakan [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) sebagai pengganti kata sandi.

## Langkah 8: Verifikasi di GitHub

Buka repositori Anda di GitHub (`https://github.com/username/konversi-mata-uang`) dan pastikan semua file telah diunggah dengan benar.

## Langkah 9: Memperbarui Kode di Masa Depan

Setiap kali Anda melakukan perubahan pada kode Anda, Anda dapat mengunggah perubahan tersebut ke GitHub dengan langkah-langkah berikut:

1. **Tambahkan perubahan ke staging area:**

   ```bash
   git add .
   ```

2. **Commit perubahan dengan pesan yang sesuai:**

   ```bash
   git commit -m "Deskripsi perubahan yang dilakukan"
   ```

3. **Push perubahan ke GitHub:**

   ```bash
   git push
   ```

## Langkah Tambahan: Mengelola Versi dan Kolaborasi

- **Branching:** Anda dapat membuat branch baru untuk fitur atau perbaikan bug sebelum menggabungkannya ke branch utama.
  
  ```bash
  git checkout -b nama-branch-baru
  ```

- **Pull Requests:** Jika Anda bekerja dengan tim, Anda dapat menggunakan pull request di GitHub untuk mengulas dan menggabungkan perubahan.

## Tips Penting

- **Keamanan:** Jangan pernah mengunggah informasi sensitif seperti kata sandi, token API, atau kunci pribadi ke GitHub.
- **README.md:** Pastikan file `README.md` Anda informatif, karena ini adalah dokumentasi pertama yang dilihat orang lain.
- **Lisensi:** Jika Anda ingin orang lain menggunakan atau berkontribusi pada proyek Anda, sertakan lisensi seperti MIT, Apache, atau GNU GPL.
- **Issues dan Discussions:** Gunakan fitur **Issues** dan **Discussions** di GitHub untuk melacak bug atau ide peningkatan.
- **Continuous Integration (CI):** Integrasikan layanan CI seperti GitHub Actions untuk otomatisasi pengujian dan deployment.

## Troubleshooting

- **Autentikasi Gagal:** Jika mengalami masalah saat push karena autentikasi, pertimbangkan untuk menggunakan SSH keys atau Personal Access Token.
  
  - **Menggunakan SSH keys:**
    - Buat SSH key dengan `ssh-keygen`.
    - Tambahkan public key ke GitHub melalui pengaturan akun Anda.
    - Ubah URL remote menjadi SSH:

      ```bash
      git remote set-url origin git@github.com:username/konversi-mata-uang.git
      ```

- **Merge Conflicts:** Jika terjadi konflik saat merge, Git akan meminta Anda untuk menyelesaikan konflik tersebut secara manual.

## Referensi

- [Dokumentasi GitHub](https://docs.github.com/)
- [Git - Book](https://git-scm.com/book/en/v2)

## Kesimpulan

Dengan mengikuti langkah-langkah di atas, Anda telah berhasil menyimpan skrip Anda ke GitHub. Ini memungkinkan Anda untuk:

- Mengelola versi kode Anda.
- Berkolaborasi dengan developer lain.
- Mempublikasikan proyek Anda kepada komunitas.

Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan tambahan, jangan ragu untuk bertanya. Selamat berkarya!

---

Berikut adalah pembaruan README.md yang mencakup panduan lengkap cara menggunakan package yang Anda buat:

```markdown
# Konversi Mata Uang

Package untuk mengonversi angka menjadi format mata uang sesuai simbol yang diberikan.

## Instalasi

Untuk menginstal package ini, gunakan perintah berikut di terminal:

```bash
npm install vq-konversi-mata-uang
```

## Penggunaan

Berikut adalah cara menggunakan package ini di dalam kode JavaScript atau Node.js Anda:

### 1. Import atau Require Package

Untuk menggunakan package ini, Anda harus mengimpornya terlebih dahulu ke dalam proyek Anda. Jika menggunakan Node.js, Anda bisa menggunakan `require()` seperti contoh di bawah ini.

### 2. Mengonversi Angka ke Format Mata Uang

```javascript
const konversiMataUang = require('vq-konversi-mata-uang');

// Contoh 1: Mengonversi angka ke mata uang Rupiah
let hasil = konversiMataUang(200.22, 'rp');
console.log(hasil); // Output: 'Rp. 200,22'

// Contoh 2: Mengonversi angka ke mata uang Dolar AS dengan lokal 'en-US'
hasil = konversiMataUang(1500000, '$', 'en-US');
console.log(hasil); // Output: '$. 1,500,000.00'

// Contoh 3: Mengonversi angka ke mata uang Euro dengan lokal 'de-DE' (Jerman)
hasil = konversiMataUang(1234567.89, '€', 'de-DE');
console.log(hasil); // Output: '€. 1.234.567,89'
```

### 3. Dokumentasi Fungsi

#### `konversiMataUang(angka, simbolMataUang, lokal)`

- **angka** (Number): Angka yang akan dikonversi menjadi format mata uang.
- **simbolMataUang** (String): Simbol mata uang yang akan ditambahkan (contoh: 'rp', '$', '€').
- **lokal** (String, opsional): Kode lokal untuk menentukan format penulisan angka (misalnya: 'id-ID' untuk Indonesia, 'en-US' untuk Amerika Serikat, atau 'de-DE' untuk Jerman). Jika tidak disertakan, nilai default adalah 'id-ID'.

### Contoh Penggunaan di Berbagai Lokal

- **Lokal Indonesia ('id-ID')**:

```javascript
let hasil = konversiMataUang(25000.75, 'rp');
console.log(hasil); // Output: 'Rp. 25.000,75'
```

- **Lokal Amerika Serikat ('en-US')**:

```javascript
let hasil = konversiMataUang(50000.50, '$', 'en-US');
console.log(hasil); // Output: '$. 50,000.50'
```

- **Lokal Jerman ('de-DE')**:

```javascript
let hasil = konversiMataUang(1200.99, '€', 'de-DE');
console.log(hasil); // Output: '€. 1.200,99'
```

## Kesalahan yang Mungkin Terjadi

Package ini dilengkapi dengan validasi input. Berikut adalah beberapa kesalahan umum yang mungkin muncul:

1. **Input bukan angka yang valid:**

   Jika parameter pertama bukan angka atau bukan angka yang valid (misalnya, string atau objek), akan muncul pesan error:
   
   ```javascript
   const hasil = konversiMataUang("invalid", 'rp'); // Error: Parameter pertama harus berupa angka yang valid.
   ```

2. **Simbol mata uang tidak valid:**

   Jika parameter kedua (simbol mata uang) tidak valid atau kosong, akan muncul pesan error:
   
   ```javascript
   const hasil = konversiMataUang(200.22, ''); // Error: Parameter kedua harus berupa string yang valid.
   ```

## Lisensi

Package ini dilisensikan di bawah **MIT License**. Silakan gunakan dan modifikasi sesuai kebutuhan Anda.
```

README.md di atas memberikan petunjuk langkah demi langkah cara menginstal dan menggunakan package Anda. Tutorial ini juga mencakup contoh penggunaan yang berbeda, penjelasan parameter fungsi, dan bagaimana menangani kesalahan yang mungkin terjadi. Anda dapat menggunakannya untuk memperjelas bagi pengguna bagaimana menggunakan package ini dalam proyek mereka.

---

Continuous Integration (CI) dan Continuous Deployment (CD) di GitHub dapat diatur menggunakan **GitHub Actions**, yang merupakan alat bawaan dari GitHub untuk menjalankan alur kerja otomatisasi seperti pengujian, build, dan deployment. Berikut ini langkah-langkah untuk menghubungkan CI/CD di GitHub menggunakan **GitHub Actions**.

### Langkah 1: Buat Repository di GitHub

Jika Anda belum memiliki repository, buat repository di GitHub:

1. Masuk ke akun GitHub Anda.
2. Klik tombol **+** di sudut kanan atas dan pilih **New repository**.
3. Isi detail seperti **Repository name** dan **Description**. Pastikan untuk membuat repository **Public** atau **Private** sesuai kebutuhan.
4. Klik **Create repository**.

Jika sudah memiliki repository, Anda bisa langsung ke langkah berikutnya.

### Langkah 2: Buat Workflow GitHub Actions

1. Di dalam repository Anda di GitHub, klik tab **Actions**.
2. GitHub akan menampilkan beberapa template alur kerja yang siap digunakan. Pilih template atau klik **set up a workflow yourself** jika ingin membuat dari awal.
3. Sebuah file `yaml` akan terbuka. Ini adalah file definisi untuk alur kerja CI/CD Anda.

Contoh dasar CI/CD dengan pengujian Node.js:

```yaml
name: CI/CD Workflow

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build
```

### Penjelasan:

- **name:** Nama dari workflow, dalam hal ini `CI/CD Workflow`.
- **on:** Workflow ini akan dijalankan setiap kali ada `push` atau `pull_request` pada branch `main`.
- **jobs:** Di dalam `jobs`, kita mendefinisikan beberapa langkah (`steps`) yang akan dijalankan oleh alur kerja.
- **runs-on:** Menentukan environment atau runner yang digunakan (contohnya `ubuntu-latest`).
- **matrix:** Menentukan beberapa versi Node.js yang akan diuji (dalam contoh ini versi 14.x dan 16.x).
- **steps:**
  - **actions/checkout:** Ini digunakan untuk melakukan checkout repository Anda di dalam workflow.
  - **setup-node:** Mengatur versi Node.js yang sesuai dengan matrix.
  - **npm install:** Menginstal semua dependensi di dalam project.
  - **npm test:** Menjalankan pengujian unit menggunakan `npm test`.
  - **npm run build:** Menjalankan proses build, jika ada (misalnya, untuk aplikasi frontend atau backend).

### Langkah 3: Simpan File Workflow

Simpan file alur kerja tersebut sebagai file `.yaml` atau `.yml` di dalam folder `.github/workflows/`. Nama filenya bisa misalnya `ci-cd.yml`. Anda dapat menyimpan file tersebut langsung dari editor GitHub atau membuat file tersebut di mesin lokal Anda, lalu meng-commit dan push ke repository GitHub.

```bash
git add .github/workflows/ci-cd.yml
git commit -m "Menambahkan konfigurasi CI/CD dengan GitHub Actions"
git push
```

### Langkah 4: Jalankan Workflow

Setelah file `ci-cd.yml` berada di repository Anda, GitHub akan secara otomatis menjalankan workflow tersebut setiap kali ada `push` atau `pull_request` ke branch `main` (atau branch lain yang Anda tentukan).

Untuk melihat proses CI/CD:

1. Masuk ke repository di GitHub.
2. Klik pada tab **Actions**.
3. Anda akan melihat status dari workflow yang berjalan. Jika terjadi kesalahan atau kegagalan, Anda dapat melihat detail log untuk memahami apa yang salah.

### Langkah 5: Continuous Deployment (Opsional)

Jika Anda ingin menambahkan CD (Continuous Deployment) ke CI/CD Anda, Anda bisa menambahkan langkah deployment setelah proses build. Misalnya, jika Anda ingin menggunakan **Heroku**, **AWS**, atau **Vercel**, Anda perlu menambahkan langkah-langkah deployment spesifik.

Berikut contoh sederhana deployment ke **Heroku**:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Login to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: heroku auth:token

      - name: Deploy to Heroku
        run: git push https://git.heroku.com/${{ secrets.HEROKU_APP_NAME }}.git HEAD:main
```

Penjelasan singkat:
- Anda perlu menambahkan **Heroku API Key** sebagai secret di repository GitHub Anda (`HEROKU_API_KEY`).
- Nama aplikasi Heroku juga harus ditambahkan sebagai secret (`HEROKU_APP_NAME`).

Untuk mengelola secrets, Anda bisa menambahkannya melalui:
1. Masuk ke repository GitHub Anda.
2. Pergi ke **Settings** > **Secrets** > **New repository secret**.

Masukkan nama dan nilai secret sesuai dengan kebutuhan deployment Anda.

### Langkah 6: Pengujian & Monitoring

Pastikan bahwa workflow Anda berjalan sesuai harapan dengan melakukan beberapa **push** atau **pull request**. Jika ada kesalahan dalam pengujian atau deployment, Anda dapat memantau detailnya di tab **Actions** di GitHub, di mana GitHub memberikan detail log yang cukup jelas.

### Langkah Tambahan: Notifikasi dan Optimasi

- **Notifikasi:** Anda dapat menambahkan notifikasi melalui integrasi dengan Slack, email, atau layanan lainnya jika ada kegagalan atau keberhasilan dalam workflow.
  
  Misalnya untuk integrasi Slack:
  
  ```yaml
  - name: Notify Slack
    uses: rtCamp/action-slack-notify@v2
    env:
      SLACK_CHANNEL: your-slack-channel
      SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
  ```

- **Optimasi:** Jika alur kerja CI/CD Anda memerlukan proses build yang memakan waktu lama, pertimbangkan untuk menggunakan cache untuk `node_modules` atau artefak lain untuk mempercepat waktu build.

Contoh caching `node_modules`:

```yaml
- name: Cache Node.js modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Kesimpulan

Dengan menggunakan **GitHub Actions**, Anda bisa dengan mudah mengatur alur kerja CI/CD untuk mengotomatiskan pengujian dan deployment aplikasi Node.js (atau aplikasi lainnya). GitHub Actions memberikan fleksibilitas yang sangat tinggi untuk mengatur pipeline sesuai dengan kebutuhan proyek Anda.

Jika Anda ingin menyesuaikan lebih lanjut alur kerja, Anda bisa menambahkan job atau steps lainnya seperti linting, style checks, dan lainnya, sesuai dengan proses pengembangan aplikasi Anda.
