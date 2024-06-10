## Modul 1: Pengenalan JavaScript

### Sesi 1: Pengenalan dan Setup

#### Apa itu JavaScript?
JavaScript adalah bahasa pemrograman yang terutama digunakan untuk pengembangan web. JavaScript memungkinkan pengembang untuk membuat halaman web yang interaktif dan dinamis. Berbeda dengan HTML yang mengatur struktur konten dan CSS yang mengatur tampilan, JavaScript mengatur perilaku halaman web.

#### Sejarah dan Evolusi JavaScript
- **1995**: Brendan Eich menciptakan JavaScript dalam waktu 10 hari di Netscape.
- **1996**: JavaScript dirilis dengan Netscape Navigator 2.0.
- **1997**: ECMA (European Computer Manufacturers Association) mengadopsi standar pertama untuk JavaScript, yang dikenal sebagai ECMAScript.
- Sejak itu, JavaScript terus berkembang dengan berbagai fitur dan peningkatan performa.

#### Instalasi Editor
Untuk menulis JavaScript, kita memerlukan editor teks. Beberapa pilihan populer termasuk:
- **Visual Studio Code (VSCode)**: Gratis, dengan banyak ekstensi.
- **Sublime Text**: Cepat dan ringan.
- **Atom**: Editor teks yang dapat disesuaikan.

**Langkah-langkah Instalasi VSCode:**
1. Unduh dari situs resmi [Visual Studio Code](https://code.visualstudio.com/).
2. Ikuti petunjuk instalasi sesuai sistem operasi Anda.
3. Buka VSCode dan buat file baru dengan ekstensi `.js`.

#### Menulis Program JavaScript Pertama (Hello World)
Buat file baru bernama `hello.js` dan tambahkan kode berikut:
```javascript
console.log("Hello, World!");
```
Untuk menjalankan program ini:
1. Buka browser, tekan `F12` atau klik kanan dan pilih `Inspect` untuk membuka Developer Tools.
2. Pergi ke tab `Console`.
3. Seret file `hello.js` ke dalam browser, atau gunakan ekstensi seperti Live Server di VSCode untuk memudahkan.

#### Memahami Console di Browser (DevTools)
Console di browser adalah alat penting untuk pengembangan JavaScript. Ini memungkinkan Anda untuk:
- Menjalankan perintah JavaScript secara langsung.
- Melihat output dan log dari kode Anda.
- Debugging kesalahan dan masalah.

---

### Sesi 2: Dasar-Dasar JavaScript

#### Sintaks Dasar
JavaScript memiliki sintaks yang sederhana dan mudah dipelajari. Beberapa elemen dasar meliputi:
- **Statement**: Instruksi yang dijalankan oleh browser. Setiap statement diakhiri dengan titik koma `;`.
- **Komentar**: Tambahkan komentar dengan `//` untuk satu baris atau `/* */` untuk beberapa baris.

Contoh:
```javascript
// Ini adalah komentar satu baris
/*
Ini adalah komentar
beberapa baris
*/
console.log("Halo, Dunia!"); // Statement ini mencetak teks ke console
```

#### Variabel dan Tipe Data
Variabel adalah tempat untuk menyimpan data. Tipe data dasar meliputi:
- **String**: Teks, diapit oleh tanda kutip (`"` atau `'`).
- **Number**: Angka, baik integer maupun float.
- **Boolean**: Nilai benar atau salah (`true` atau `false`).
- **Undefined**: Variabel yang dideklarasikan tapi belum diberi nilai.
- **Null**: Variabel dengan nilai kosong.

Deklarasi variabel menggunakan `var`, `let`, atau `const`:
```javascript
let nama = "John"; // String
const umur = 30; // Number
var aktif = true; // Boolean
```

#### Operator
Operator digunakan untuk melakukan operasi pada variabel dan nilai. Beberapa operator dasar meliputi:
- **Aritmatika**: `+`, `-`, `*`, `/`, `%`
- **Perbandingan**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Logika**: `&&` (dan), `||` (atau), `!` (tidak)

Contoh:
```javascript
let a = 5;
let b = 10;
console.log(a + b); // 15
console.log(a > b); // false
console.log(a == 5 && b == 10); // true
```

#### Struktur Kendali
Struktur kendali memungkinkan kita mengatur alur program berdasarkan kondisi tertentu.

**If, Else, dan Switch**:
```javascript
let nilai = 85;

if (nilai >= 90) {
  console.log("A");
} else if (nilai >= 80) {
  console.log("B");
} else {
  console.log("C");
}

let hari = "Senin";

switch(hari) {
  case "Senin":
    console.log("Hari ini Senin");
    break;
  case "Selasa":
    console.log("Hari ini Selasa");
    break;
  default:
    console.log("Hari ini bukan Senin atau Selasa");
}
```

---

### Sesi 3: Fungsi dan Scope

#### Definisi dan Pemanggilan Fungsi
Fungsi adalah blok kode yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil ulang. Fungsi dideklarasikan dengan kata kunci `function`:
```javascript
function sapa() {
  console.log("Halo!");
}

sapa(); // Memanggil fungsi sapa
```

Fungsi juga bisa menerima parameter dan mengembalikan nilai:
```javascript
function tambah(a, b) {
  return a + b;
}

let hasil = tambah(3, 4); // 7
console.log(hasil);
```

#### Parameter dan Nilai Kembali (Return)
Parameter adalah nilai yang diterima fungsi untuk diproses, dan `return` digunakan untuk mengembalikan hasil dari fungsi tersebut.

#### Scope Variabel (Global dan Lokal)
Scope menentukan di mana variabel dapat diakses. Ada dua jenis scope:
- **Global**: Variabel yang dideklarasikan di luar fungsi, dapat diakses di mana saja dalam kode.
- **Lokal**: Variabel yang dideklarasikan di dalam fungsi, hanya dapat diakses di dalam fungsi tersebut.

Contoh:
```javascript
let globalVar = "Saya global";

function contoh() {
  let localVar = "Saya lokal";
  console.log(globalVar); // Bisa diakses
  console.log(localVar); // Bisa diakses
}

contoh();
console.log(globalVar); // Bisa diakses
console.log(localVar); // Tidak bisa diakses, akan menghasilkan error
```

#### Closures
Closure adalah fungsi yang memiliki akses ke variabel dari scope luar meskipun fungsi tersebut dieksekusi di luar scope asalnya.

Contoh:
```javascript
function luar() {
  let angka = 10;
  
  function dalam() {
    console.log(angka);
  }
  
  return dalam;
}

let fungsiDalam = luar();
fungsiDalam(); // 10
```

Closure memungkinkan kita membuat fungsi yang "mengingat" lingkungan penciptaannya.

---

Dengan materi ini, siswa akan mendapatkan pemahaman dasar tentang JavaScript, termasuk sintaks dasar, variabel, operator, struktur kendali, fungsi, dan scope. Setiap sesi harus diikuti dengan latihan praktis untuk memperkuat pemahaman konsep.
