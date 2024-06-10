## Modul 2: Pemrograman Lanjutan dengan JavaScript

### Sesi 1: Objek dan Array

#### Pengenalan Objek
Objek adalah koleksi pasangan kunci-nilai (key-value pairs). Setiap nilai bisa berupa tipe data apapun, termasuk objek atau array lainnya.

**Contoh Membuat Objek:**
```javascript
let orang = {
  nama: "John",
  umur: 30,
  pekerjaan: "Developer"
};
```

#### Properti dan Metode Objek
- **Properti** adalah nilai yang terkait dengan kunci dalam objek.
- **Metode** adalah fungsi yang menjadi properti dalam objek.

**Mengakses Properti:**
```javascript
console.log(orang.nama); // John
console.log(orang["umur"]); // 30
```

**Menambahkan dan Menghapus Properti:**
```javascript
orang.alamat = "Jakarta";
delete orang.pekerjaan;
```

**Metode Objek:**
```javascript
let mobil = {
  merk: "Toyota",
  kecepatan: 0,
  berjalan: function() {
    this.kecepatan += 10;
    console.log(`Mobil berjalan dengan kecepatan ${this.kecepatan} km/jam`);
  }
};

mobil.berjalan(); // Mobil berjalan dengan kecepatan 10 km/jam
```

#### Membuat dan Memanipulasi Array
Array adalah daftar terurut dari elemen. Elemen dapat berupa tipe data apapun.

**Contoh Membuat Array:**
```javascript
let buah = ["Apel", "Mangga", "Jeruk"];
```

**Mengakses Elemen:**
```javascript
console.log(buah[0]); // Apel
```

**Menambah dan Menghapus Elemen:**
```javascript
buah.push("Pisang"); // Menambah di akhir
buah.pop(); // Menghapus dari akhir
buah.unshift("Anggur"); // Menambah di awal
buah.shift(); // Menghapus dari awal
```

#### Metode Array
Beberapa metode berguna untuk bekerja dengan array:
- **map()**: Membuat array baru dengan hasil dari memanggil fungsi tertentu pada setiap elemen array.
- **filter()**: Membuat array baru dengan semua elemen yang lulus uji dari fungsi yang disediakan.
- **reduce()**: Menerapkan fungsi pada setiap elemen array untuk mengakumulasi satu nilai.

**Contoh Penggunaan Metode Array:**
```javascript
let angka = [1, 2, 3, 4, 5];

let kaliDua = angka.map(function(num) {
  return num * 2;
});
console.log(kaliDua); // [2, 4, 6, 8, 10]

let genap = angka.filter(function(num) {
  return num % 2 === 0;
});
console.log(genap); // [2, 4]

let jumlah = angka.reduce(function(total, num) {
  return total + num;
}, 0);
console.log(jumlah); // 15
```

---

### Sesi 2: Pemrograman Berorientasi Objek (OOP)

#### Konsep Dasar OOP
Pemrograman Berorientasi Objek (Object-Oriented Programming) adalah paradigma pemrograman yang didasarkan pada konsep "objek", yang dapat berisi data dan kode: data dalam bentuk properti (field), dan kode dalam bentuk metode (function).

**Konsep OOP:**
- **Class**: Template untuk membuat objek.
- **Object**: Instansi dari class.
- **Inheritance**: Pewarisan sifat dari class induk ke class anak.
- **Encapsulation**: Menyembunyikan detail implementasi dari luar.
- **Polymorphism**: Kemampuan untuk memproses objek secara berbeda berdasarkan class mereka.

#### Membuat Objek Menggunakan Constructor Function
Constructor function adalah cara lama untuk membuat class di JavaScript.

**Contoh:**
```javascript
function Orang(nama, umur) {
  this.nama = nama;
  this.umur = umur;
}

let john = new Orang("John", 30);
console.log(john.nama); // John
```

#### Prototype dan Pewarisan (Inheritance)
Setiap fungsi di JavaScript memiliki properti `prototype` yang memungkinkan kita untuk menambahkan metode ke semua objek yang dibuat dari fungsi tersebut.

**Contoh:**
```javascript
Orang.prototype.sapa = function() {
  console.log(`Halo, nama saya ${this.nama}`);
};

john.sapa(); // Halo, nama saya John
```

#### ES6 Class dan Syntax
ES6 memperkenalkan syntax class yang lebih modern dan bersih.

**Contoh Membuat Class:**
```javascript
class Orang {
  constructor(nama, umur) {
    this.nama = nama;
    this.umur = umur;
  }

  sapa() {
    console.log(`Halo, nama saya ${this.nama}`);
  }
}

let jane = new Orang("Jane", 25);
jane.sapa(); // Halo, nama saya Jane
```

**Pewarisan dengan Class:**
```javascript
class Pekerja extends Orang {
  constructor(nama, umur, pekerjaan) {
    super(nama, umur);
    this.pekerjaan = pekerjaan;
  }

  kerja() {
    console.log(`${this.nama} sedang bekerja sebagai ${this.pekerjaan}`);
  }
}

let mark = new Pekerja("Mark", 28, "Desainer");
mark.sapa(); // Halo, nama saya Mark
mark.kerja(); // Mark sedang bekerja sebagai Desainer
```

---

### Sesi 3: Asynchronous JavaScript

#### Callback
Callback adalah fungsi yang dilewatkan ke fungsi lain sebagai argumen dan dieksekusi setelah operasi selesai.

**Contoh:**
```javascript
function sapa(nama, callback) {
  console.log(`Halo, ${nama}`);
  callback();
}

function selamatDatang() {
  console.log("Selamat datang!");
}

sapa("John", selamatDatang);
// Output:
// Halo, John
// Selamat datang!
```

#### Promises
Promise adalah objek yang mewakili penyelesaian (atau kegagalan) operasi asynchronous.

**Membuat Promise:**
```javascript
let janji = new Promise(function(resolve, reject) {
  let sukses = true;
  
  if (sukses) {
    resolve("Berhasil!");
  } else {
    reject("Gagal!");
  }
});

janji.then(function(pesan) {
  console.log(pesan); // Berhasil!
}).catch(function(error) {
  console.log(error);
});
```

#### Async/Await
Async/await adalah sintaks modern untuk menangani operasi asynchronous. Ini memungkinkan kita untuk menulis kode asynchronous yang terlihat dan berperilaku seperti kode synchronous.

**Contoh:**
```javascript
function janji() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Berhasil!");
    }, 1000);
  });
}

async function jalankan() {
  console.log("Menunggu janji...");
  let hasil = await janji();
  console.log(hasil); // Berhasil!
}

jalankan();
```

#### Menangani Error dengan Try/Catch
Untuk menangani error dalam async/await, kita menggunakan blok try/catch.

**Contoh:**
```javascript
async function jalankan() {
  try {
    console.log("Menunggu janji...");
    let hasil = await janji();
    console.log(hasil); // Berhasil!
  } catch (error) {
    console.log("Ada error: ", error);
  }
}

jalankan();
```

---

Dengan materi ini, siswa akan mendapatkan pemahaman lebih dalam tentang objek dan array, pemrograman berorientasi objek, serta cara menangani operasi asynchronous di JavaScript. Setiap sesi harus diikuti dengan latihan praktis untuk memperkuat pemahaman konsep.
