## Pembelajaran ES6 dan Fitur Modern JavaScript

### Tujuan Pembelajaran
Setelah mempelajari materi ini, siswa diharapkan mampu:
1. Memahami dan menggunakan variabel `let` dan `const`.
2. Menggunakan arrow functions untuk membuat fungsi.
3. Memanfaatkan template literals untuk string interpolation.
4. Menggunakan destructuring assignment untuk objek dan array.
5. Mengaplikasikan rest dan spread operator dalam berbagai konteks.
6. Menggunakan `Promises` dan `async/await` untuk menangani operasi asynchronous.
7. Memahami dan menggunakan modules (`import` dan `export`) dalam JavaScript.

### Materi Pembelajaran

#### 1. `let` dan `const`
- `let` dan `const` adalah cara baru untuk mendeklarasikan variabel di ES6.
- `let` memungkinkan deklarasi variabel dengan scope block, sementara `const` digunakan untuk mendeklarasikan konstanta yang tidak dapat di-assign ulang.

```javascript
let age = 25;
const name = "John";
```

#### 2. Arrow Functions
- Arrow functions memberikan cara penulisan fungsi yang lebih singkat dan tidak memiliki `this` sendiri.

```javascript
const add = (a, b) => a + b;
```

#### 3. Template Literals
- Template literals memungkinkan embedding ekspresi dalam string menggunakan backticks (`` ` ``) dan `${}`.

```javascript
const greeting = `Hello, ${name}! You are ${age} years old.`;
```

#### 4. Destructuring
- Destructuring assignment memudahkan ekstraksi data dari array atau objek.

```javascript
const person = { name: "John", age: 25 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second, third] = numbers;
```

#### 5. Rest dan Spread Operator
- Rest operator (`...`) mengumpulkan sisa elemen menjadi array, sementara spread operator (`...`) menyebarkan elemen array atau objek.

```javascript
const addNumbers = (a, b, ...rest) => {
  return rest.reduce((sum, num) => sum + num, a + b);
};

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
```

#### 6. Promises dan `async/await`
- `Promises` dan `async/await` digunakan untuk menangani operasi asynchronous dengan cara yang lebih bersih dan mudah dipahami.

```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

const getData = async () => {
  const data = await fetchData();
  console.log(data);
};
getData();
```

#### 7. Modules (`import` dan `export`)
- Modules memungkinkan pembagian kode menjadi file-file yang lebih kecil dan lebih mudah dikelola.

```javascript
// file1.js
export const add = (a, b) => a + b;

// file2.js
import { add } from './file1.js';
console.log(add(2, 3));
```

### Aktivitas Pembelajaran
1. **Diskusi Kelas**:
   - Diskusikan contoh-contoh penggunaan `let` dan `const` serta kapan waktu yang tepat untuk menggunakannya.
   
2. **Latihan Kode**:
   - Buat beberapa fungsi menggunakan arrow functions dan bandingkan dengan fungsi konvensional.
   
3. **Tugas Individu**:
   - Buat string dengan template literals yang mencakup variabel dan ekspresi sederhana.
   
4. **Proyek Kelompok**:
   - Gunakan destructuring untuk mengekstrak data dari objek dan array dalam proyek kecil seperti aplikasi todo list.
   
5. **Pembelajaran Terpadu**:
   - Implementasikan rest dan spread operator dalam fungsi yang lebih kompleks dan pahami bagaimana mereka membantu menyederhanakan kode.
   
6. **Eksperimen Asynchronous**:
   - Buat fungsi asynchronous menggunakan `Promises` dan `async/await` untuk melakukan operasi sederhana seperti fetching data dari API.
   
7. **Penggunaan Modules**:
   - Pecah kode menjadi beberapa file menggunakan `import` dan `export` dan buat proyek mini dengan struktur modular.

### Referensi
1. [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [ES6 Features](https://es6-features.org/)
3. [JavaScript Info - Modern JavaScript Tutorial](https://javascript.info/)
4. [You Don't Know JS (Book Series)](https://github.com/getify/You-Dont-Know-JS)
5. [Eloquent JavaScript (Book)](https://eloquentjavascript.net/)

Dengan mengikuti kurikulum ini, siswa akan memiliki pemahaman yang kuat tentang ES6 dan fitur modern JavaScript, yang merupakan fondasi penting untuk pengembangan aplikasi web modern.
