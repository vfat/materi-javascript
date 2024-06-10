## Modul 5: Pengembangan dan Produksi

### Sesi 1: Testing dan Debugging

#### Pengantar Testing
Testing adalah proses memeriksa apakah kode yang kita tulis berfungsi sebagaimana mestinya. Testing memastikan kualitas dan keandalan kode.

#### Pengantar Unit Testing
Unit testing adalah metode pengujian di mana bagian terkecil dari kode, yang disebut unit, diuji secara individual untuk memastikan bahwa mereka berfungsi sebagaimana mestinya.

#### Instalasi Jest
Jest adalah framework testing yang populer untuk JavaScript. Ini memungkinkan kita untuk menulis dan menjalankan tes dengan mudah.

**Instalasi Jest:**
```bash
npm install --save-dev jest
```

#### Menulis Tes Dasar
Tes ditulis dalam file terpisah dengan ekstensi `.test.js` atau `.spec.js`.

**Contoh:**
**File: sum.js**
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

**File: sum.test.js**
```javascript
const sum = require('./sum');

test('menambah 1 + 2 untuk mendapatkan 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

#### Menjalankan Tes
Jalankan tes dengan perintah berikut:
```bash
npx jest
```

#### Menggunakan Matcher
Jest menyediakan berbagai matcher untuk memeriksa nilai yang diharapkan.

**Contoh:**
```javascript
test('dua tambah dua adalah empat', () => {
  expect(2 + 2).toBe(4);
});

test('objek assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});


#### Pengantar Integration Testing
Integration testing adalah metode pengujian di mana beberapa unit yang saling berinteraksi diuji bersama-sama untuk memastikan mereka berfungsi dengan baik.

#### Menulis Integration Test
Integration test menguji bagaimana beberapa unit bekerja bersama-sama.

**Contoh:**
**File: user.js**
```javascript
function getUser(id) {
  // Misalkan kita mendapatkan data dari database
  return { id, name: 'John Doe' };
}

module.exports = getUser;
```

**File: order.js**
```javascript
const getUser = require('./user');

function createOrder(userId, item) {
  const user = getUser(userId);
  return {
    user: user.name,
    item
  };
}

module.exports = createOrder;
```

**File: order.test.js**
```javascript
const createOrder = require('./order');

test('membuat pesanan untuk user', () => {
  const order = createOrder(1, 'Laptop');
  expect(order).toEqual({
    user: 'John Doe',
    item: 'Laptop'
  });
});
```

#### Mocking dengan Jest
Mocking adalah teknik untuk mengganti fungsi atau modul asli dengan versi tiruan untuk pengujian. Ini berguna untuk menguji unit tanpa harus bergantung pada implementasi eksternal.

**Contoh Mocking:**
**File: user.js**
```javascript
function getUser(id) {
  return { id, name: 'John Doe' };
}

module.exports = getUser;
```

**File: order.js**
```javascript
const getUser = require('./user');

function createOrder(userId, item) {
  const user = getUser(userId);
  return {
    user: user.name,
    item
  };
}

module.exports = createOrder;
```

**File: order.test.js**
```javascript
const createOrder = require('./order');
const getUser = require('./user');

jest.mock('./user'); // Mocking modul user

test('membuat pesanan untuk user', () => {
  getUser.mockReturnValue({ id: 1, name: 'Mocked User' });

  const order = createOrder(1, 'Laptop');
  expect(order).toEqual({
    user: 'Mocked User',
    item: 'Laptop'
  });
});
```

#### Debugging dengan DevTools
#### Pengantar Debugging
Debugging adalah proses menemukan dan memperbaiki kesalahan atau bug dalam kode. Debugging yang efektif dapat menghemat banyak waktu dan usaha dalam pengembangan perangkat lunak.

#### Alat Debugging di Browser
Kebanyakan browser modern memiliki alat debugging yang kuat. Google Chrome DevTools adalah salah satu yang paling populer.

**Membuka DevTools:**
- Tekan `F12` atau `Ctrl+Shift+I` (Windows/Linux).
- Tekan `Cmd+Opt+I` (Mac).

#### Menggunakan Console
Konsol adalah alat penting untuk debugging. Kita bisa mencetak pesan, variabel, dan objek untuk melihat apa yang terjadi dalam kode.

**Contoh:**
```javascript
let x = 10;
console.log("Nilai x adalah", x);
```

#### Breakpoints
Breakpoints memungkinkan kita untuk menghentikan eksekusi kode pada baris tertentu sehingga kita dapat memeriksa status program pada saat itu.

**Cara Menambahkan Breakpoint:**
1. Buka file JavaScript di tab `Sources` di DevTools.
2. Klik pada nomor baris di mana Anda ingin menambahkan breakpoint.

#### Menggunakan Watch Expressions
Watch expressions memungkinkan kita untuk memantau nilai variabel atau ekspresi saat eksekusi program.

**Menambahkan Watch Expression:**
1. Buka tab `Watch` di DevTools.
2. Klik ikon `+` dan tambahkan ekspresi yang ingin Anda pantau.

#### Langkah-langkah Debugging
1. **Identifikasi Masalah**: Temukan bagian kode yang tidak berfungsi sebagaimana mestinya.
2. **Tambahkan Breakpoints**: Tempatkan breakpoints di tempat yang relevan.
3. **Jalankan Kode**: Biarkan kode berjalan hingga mencapai breakpoint.
4. **Periksa State**: Gunakan watch expressions dan console untuk memeriksa nilai variabel.
5. **Perbaiki Kode**: Lakukan perubahan yang diperlukan untuk memperbaiki masalah.
6. **Uji Kembali**: Jalankan kode lagi untuk memastikan masalah telah teratasi.

---

### Sesi 2: Praktik Terbaik dalam Pengembangan JavaScript

#### Best Practices Coding
Menulis kode yang bersih dan dapat dipelihara adalah penting untuk pengembangan jangka panjang. Beberapa praktik terbaik meliputi:

- **Gunakan Nama Variabel yang Jelas:** Nama variabel harus deskriptif dan mencerminkan tujuan mereka.
- **Konsisten dengan Format Kode:** Gunakan alat seperti ESLint atau Prettier untuk memastikan konsistensi format kode.
- **Pisahkan Logika dan Tampilan:** Pisahkan logika bisnis dari tampilan untuk mempermudah pemeliharaan.
- **Komentar yang Jelas dan Berguna:** Tambahkan komentar yang menjelaskan bagian kode yang kompleks.

#### Konvensi Penamaan dan Struktur Proyek
Menjaga konsistensi dalam penamaan dan struktur proyek membantu dalam memahami dan mengelola kode.

- **Penamaan Variabel dan Fungsi:** Gunakan camelCase untuk variabel dan fungsi.
- **Penamaan Kelas dan Konstruktor:** Gunakan PascalCase untuk nama kelas dan konstruktor.
- **Struktur Direktori:** Organisir file berdasarkan fitur atau fungsionalitas.

**Contoh Struktur Proyek:**
```
project/
├── src/
│   ├── components/
│   ├── utils/
│   ├── styles/
│   └── index.js
├── tests/
│   └── component.test.js
├── package.json
└── webpack.config.js
```

#### Optimasi Performa
Optimasi performa adalah kunci untuk membuat aplikasi yang responsif dan cepat.

- **Minifikasi dan Uglifikasi:** Gunakan alat seperti Terser untuk mengurangi ukuran file JavaScript.
- **Lazy Loading:** Muat komponen atau modul hanya saat diperlukan.
- **Penggunaan Cache:** Manfaatkan cache untuk menyimpan data yang sering diakses.

#### Dokumentasi Kode
Dokumentasi yang baik membantu pengembang lain (atau diri kita sendiri di masa depan) untuk memahami kode dengan cepat.

- **Gunakan JSDoc:** Menambahkan komentar JSDoc untuk fungsi dan metode.
- **Buat README:** Sertakan file README yang menjelaskan proyek, cara instalasi, dan cara penggunaannya.

**Contoh JSDoc:**
```javascript
/**
 * Menambahkan dua angka.
 * @param {number} a - Angka pertama.
 * @param {number} b - Angka kedua.
 * @returns {number} Hasil penjumlahan.
 */
function tambah(a, b) {
  return a + b;
}
```

---

### Sesi 3: Penggunaan Git dan Deployment

#### Pengantar Git dan GitHub
Git adalah sistem kontrol versi yang memungkinkan kita melacak perubahan dalam kode. GitHub adalah platform untuk menyimpan dan mengelola repositori Git.

**Inisialisasi Repository:**
```bash
git init
git add .
git commit -m "Inisialisasi proyek"
```

**Membuat Repository di GitHub:**
1. Buka GitHub dan buat repository baru.
2. Hubungkan repository lokal ke GitHub:
   ```bash
   git remote add origin <URL_REPOSITORY_GITHUB>
   git push -u origin master
   ```

#### Commit, Push, dan Pull
- **Commit:** Menyimpan snapshot dari perubahan kode.
- **Push:** Mengirim commit lokal ke repository remote.
- **Pull:** Mengambil perubahan terbaru dari repository remote.

**Contoh:**
```bash
git add .
git commit -m "Menambahkan fitur baru"
git push origin master
```

#### Branching dan Merging
Branching memungkinkan kita untuk bekerja pada fitur atau perbaikan bug secara terpisah dari kode utama.

**Membuat dan Berpindah ke Branch Baru:**
```bash
git checkout -b fitur-baru
```

**Merging Branch:**
```bash
git checkout master
git merge fitur-baru
```

#### Deployment
Deployment adalah proses mempublikasikan aplikasi ke server atau layanan hosting agar dapat diakses oleh pengguna.

**Deployment ke Netlify:**
1. Buat akun di Netlify.
2. Hubungkan repository GitHub ke Netlify.
3. Konfigurasi build settings dan deploy.

**Deployment ke Vercel:**
1. Buat akun di Vercel.
2. Hubungkan repository GitHub ke Vercel.
3. Konfigurasi project settings dan deploy.

**Deployment ke Heroku:**
1. Buat akun di Heroku.
2. Instal Heroku CLI:
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```
3. Login ke Heroku:
   ```bash
   heroku login
   ```
4. Buat aplikasi baru dan deploy:
   ```bash
   heroku create nama-aplikasi
   git push heroku master
   ```

---

Dengan materi ini, siswa akan memahami proses pengembangan dan produksi dalam JavaScript, termasuk testing, debugging, praktik terbaik, penggunaan Git, dan deployment. Setiap sesi harus diikuti dengan latihan praktis untuk memperkuat pemahaman konsep.
