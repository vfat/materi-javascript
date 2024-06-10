## Modul 3: Manipulasi DOM dan Event Handling

### Sesi 1: Manipulasi DOM

#### Memahami DOM (Document Object Model)
DOM adalah representasi objek dari dokumen HTML. Ini adalah antarmuka yang memungkinkan JavaScript untuk mengakses dan memanipulasi konten, struktur, dan gaya dari halaman web.

**Struktur Dasar DOM:**
- **Dokumen**: Akar dari DOM, merepresentasikan seluruh dokumen HTML.
- **Elemen**: Setiap tag HTML menjadi elemen dalam DOM.
- **Node**: Setiap elemen, atribut, dan teks dalam dokumen dianggap sebagai node dalam DOM.

#### Seleksi Elemen
Untuk memanipulasi elemen HTML, kita perlu memilih elemen tersebut terlebih dahulu. Beberapa metode yang sering digunakan adalah:

- **getElementById**: Memilih elemen berdasarkan ID.
- **getElementsByClassName**: Memilih elemen berdasarkan kelas.
- **getElementsByTagName**: Memilih elemen berdasarkan tag.
- **querySelector**: Memilih elemen berdasarkan selektor CSS.
- **querySelectorAll**: Memilih semua elemen yang sesuai dengan selektor CSS.

**Contoh:**
```javascript
let elemenId = document.getElementById('myId');
let elemenKelas = document.getElementsByClassName('myClass');
let elemenTag = document.getElementsByTagName('div');
let elemenSelektor = document.querySelector('.myClass');
let elemenSemuaSelektor = document.querySelectorAll('.myClass');
```

#### Mengubah Konten dan Atribut Elemen
Setelah elemen dipilih, kita dapat mengubah konten dan atributnya.

**Mengubah Konten:**
```javascript
let elemen = document.getElementById('myId');
elemen.innerHTML = 'Konten Baru';
elemen.textContent = 'Konten Baru';
```

**Mengubah Atribut:**
```javascript
elemen.setAttribute('class', 'kelasBaru');
elemen.removeAttribute('class');
elemen.className = 'kelasBaru';
elemen.id = 'idBaru';
```

#### Menambah dan Menghapus Elemen
Kita juga dapat menambah dan menghapus elemen dari DOM.

**Menambah Elemen:**
```javascript
let elemenBaru = document.createElement('div');
elemenBaru.textContent = 'Elemen Baru';
document.body.appendChild(elemenBaru);
```

**Menghapus Elemen:**
```javascript
let elemenUntukDihapus = document.getElementById('myId');
elemenUntukDihapus.remove();
```

---

### Sesi 2: Event Handling

#### Menangani Event
Event adalah tindakan yang terjadi di halaman web, seperti klik, input, atau scroll. JavaScript dapat menangani event ini untuk membuat halaman lebih interaktif.

**Event Umum:**
- **click**: Terjadi ketika elemen diklik.
- **mouseover**: Terjadi ketika mouse bergerak di atas elemen.
- **mouseout**: Terjadi ketika mouse meninggalkan elemen.
- **keydown**: Terjadi ketika tombol ditekan.
- **submit**: Terjadi ketika formulir dikirim.

#### Event Listeners dan Event Handlers
Event listener adalah fungsi yang menunggu terjadinya event dan meresponsnya dengan menjalankan event handler.

**Contoh Menambahkan Event Listener:**
```javascript
let tombol = document.getElementById('myButton');
tombol.addEventListener('click', function() {
  alert('Tombol diklik!');
});
```

**Menghapus Event Listener:**
```javascript
function klikHandler() {
  alert('Tombol diklik!');
}

tombol.addEventListener('click', klikHandler);
tombol.removeEventListener('click', klikHandler);
```

#### Delegasi Event
Delegasi event adalah teknik di mana satu event listener ditambahkan ke elemen induk untuk menangani event di elemen anak. Ini berguna ketika bekerja dengan elemen yang dinamis (diciptakan/dihapus).

**Contoh:**
```javascript
let daftar = document.getElementById('myList');

daftar.addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'LI') {
    console.log('Item diklik: ' + event.target.textContent);
  }
});
```

#### Praktik Membangun Aplikasi Interaktif Sederhana
Mari kita buat aplikasi to-do list sederhana untuk mempraktikkan manipulasi DOM dan event handling.

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>To-Do List</title>
</head>
<body>
  <input type="text" id="todoInput" placeholder="Tambahkan to-do">
  <button id="addButton">Tambah</button>
  <ul id="todoList"></ul>

  <script src="script.js"></script>
</body>
</html>
```

**JavaScript (script.js):**
```javascript
document.getElementById('addButton').addEventListener('click', function() {
  let input = document.getElementById('todoInput');
  let nilaiInput = input.value;

  if (nilaiInput.trim() !== '') {
    let itemBaru = document.createElement('li');
    itemBaru.textContent = nilaiInput;

    document.getElementById('todoList').appendChild(itemBaru);
    input.value = '';
  }
});

document.getElementById('todoList').addEventListener('click', function(event) {
  if (event.target && event.target.nodeName === 'LI') {
    event.target.remove();
  }
});
```

---

Dengan materi ini, siswa akan memahami bagaimana memanipulasi DOM, menangani event, dan membangun aplikasi interaktif sederhana menggunakan JavaScript. Setiap sesi harus diikuti dengan latihan praktis untuk memperkuat pemahaman konsep.
