## Modul 4: Teknologi Web Lanjutan

### Sesi 1: AJAX dan Fetch API

#### Pengantar AJAX
AJAX (Asynchronous JavaScript and XML) adalah teknik untuk mengirim dan menerima data dari server secara asynchronous tanpa perlu me-refresh halaman web. Ini memungkinkan halaman web untuk memperbarui konten secara dinamis berdasarkan interaksi pengguna.

#### Menggunakan XMLHttpRequest
`XMLHttpRequest` adalah objek yang digunakan untuk berinteraksi dengan server.

**Contoh:**
```javascript
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

#### Fetch API untuk Permintaan Jaringan
Fetch API adalah antarmuka modern yang menyediakan cara lebih mudah untuk melakukan permintaan jaringan.

**Contoh:**
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));
```

#### Memproses Data JSON
JSON (JavaScript Object Notation) adalah format data yang digunakan untuk pertukaran data antara server dan klien. Data yang diterima dari server sering dalam format JSON, dan kita perlu mengonversinya menjadi objek JavaScript.

**Contoh:**
```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => {
    data.forEach(post => {
      console.log(`Title: ${post.title}`);
      console.log(`Body: ${post.body}`);
    });
  })
  .catch(error => console.error("Error:", error));
```

---

### Sesi 2: Modul dan Bundling

#### Pengantar Modul di JavaScript
Modul memungkinkan kita untuk membagi kode JavaScript menjadi beberapa file yang dapat dikelola dan diimpor sesuai kebutuhan. Ini membuat kode lebih modular dan mudah dikelola.

#### Export dan Import
Kita dapat mengekspor fungsi, objek, atau nilai dari satu file dan mengimpornya ke file lain menggunakan kata kunci `export` dan `import`.

**Contoh:**

**File: math.js**
```javascript
export function tambah(a, b) {
  return a + b;
}

export const PI = 3.14;
```

**File: main.js**
```javascript
import { tambah, PI } from './math.js';

console.log(tambah(2, 3)); // 5
console.log(PI); // 3.14
```

#### Penggunaan Bundler (Webpack, Parcel)
Bundler adalah alat yang digunakan untuk menggabungkan berbagai file JavaScript dan aset lainnya (seperti CSS dan gambar) menjadi satu atau beberapa file bundle yang lebih kecil dan efisien.

**Penggunaan Webpack:**

**Langkah-langkah:**
1. **Instalasi Webpack:**
   ```bash
   npm install --save-dev webpack webpack-cli
   ```

2. **Buat File Konfigurasi (webpack.config.js):**
   ```javascript
   const path = require('path');

   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     },
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader']
         }
       ]
     }
   };
   ```

3. **Struktur Direktori:**
   ```
   project/
   ├── dist/
   ├── node_modules/
   ├── src/
   │   ├── index.js
   │   └── styles.css
   ├── package.json
   └── webpack.config.js
   ```

4. **Build Bundle:**
   ```bash
   npx webpack --config webpack.config.js
   ```

5. **Tambahkan bundle.js ke HTML:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>Webpack Example</title>
   </head>
   <body>
     <script src="dist/bundle.js"></script>
   </body>
   </html>
   ```

---

### Sesi 3: Menggunakan Library dan Framework

#### Pengantar Library dan Framework
Library dan framework adalah alat yang mempercepat pengembangan web dengan menyediakan fungsi dan struktur yang sudah jadi.

- **Library**: Kumpulan fungsi yang dapat digunakan untuk melakukan tugas tertentu (misalnya, jQuery).
- **Framework**: Struktur atau kerangka kerja yang menyediakan kerangka untuk mengembangkan aplikasi (misalnya, React, Vue).

#### Membuat Aplikasi Sederhana dengan jQuery
jQuery adalah library JavaScript yang mempermudah manipulasi DOM, penanganan event, dan AJAX.

**Contoh:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>jQuery Example</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <button id="myButton">Klik Saya</button>
  <p id="myText">Halo, Dunia!</p>

  <script>
    $(document).ready(function() {
      $("#myButton").click(function() {
        $("#myText").text("Tombol telah diklik!");
      });
    });
  </script>
</body>
</html>
```

#### Pengantar React
React adalah library JavaScript untuk membangun antarmuka pengguna. React menggunakan konsep komponen untuk membagi UI menjadi bagian-bagian kecil yang dapat digunakan kembali.

**Contoh Membuat Aplikasi Sederhana dengan React:**

**Langkah-langkah:**
1. **Instalasi React:**
   ```bash
   npx create-react-app my-app
   cd my-app
   npm start
   ```

2. **Modifikasi File App.js:**
   ```javascript
   import React, { useState } from 'react';

   function App() {
     const [count, setCount] = useState(0);

     return (
       <div>
         <h1>Hitungan: {count}</h1>
         <button onClick={() => setCount(count + 1)}>Tambah</button>
       </div>
     );
   }

   export default App;
   ```

3. **Jalankan Aplikasi:**
   Aplikasi akan berjalan di `http://localhost:3000`.

---

Dengan materi ini, siswa akan mendapatkan pemahaman tentang AJAX, Fetch API, modul, bundling, serta penggunaan library dan framework seperti jQuery dan React. Setiap sesi harus diikuti dengan latihan praktis untuk memperkuat pemahaman konsep.
