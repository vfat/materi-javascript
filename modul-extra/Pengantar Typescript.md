
## Bagian 1: Pengantar TypeScript
### 1. Apa itu TypeScript?
TypeScript adalah bahasa pemrograman open-source yang dikembangkan oleh Microsoft. TypeScript adalah superset dari JavaScript yang menambahkan tipe statis opsional.

### 2. Instalasi TypeScript
Untuk menginstal TypeScript, pastikan Node.js sudah terpasang di sistem Anda, kemudian jalankan perintah berikut di terminal:

```bash
npm install -g typescript
```

### 3. Menulis dan Menjalankan Kode TypeScript
Buat file dengan ekstensi `.ts`, misalnya `hello.ts`, dan tambahkan kode berikut:

```typescript
let message: string = 'Hello, TypeScript!';
console.log(message);
```

Untuk mengkompilasi file TypeScript menjadi JavaScript, gunakan perintah:

```bash
tsc hello.ts
```

Jalankan file JavaScript yang dihasilkan dengan Node.js:

```bash
node hello.js
```

## Bagian 2: Dasar-Dasar TypeScript
### 1. Tipe Data Dasar
TypeScript memiliki tipe data dasar seperti `string`, `number`, `boolean`, `array`, `tuple`, `enum`, dan `any`.

### 2. Deklarasi Variabel
```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // Tuple
```
Deklarasi variabel di TypeScript memungkinkan Anda untuk mendefinisikan tipe variabel secara eksplisit, yang meningkatkan keandalan dan keterbacaan kode. Berikut adalah penjelasan detail tentang berbagai tipe variabel yang didukung oleh TypeScript beserta contoh penggunaannya.

### 2.1. Boolean

Deklarasi variabel dengan tipe boolean.

```typescript
let isDone: boolean = false;
```

**Penjelasan**:
- `let`: Kata kunci untuk mendeklarasikan variabel dengan cakupan blok (block scope).
- `isDone`: Nama variabel.
- `boolean`: Tipe dari variabel `isDone`.
- `false`: Nilai awal dari variabel `isDone`.

**Penggunaan**:
```typescript
if (isDone) {
    console.log("Task is completed.");
} else {
    console.log("Task is not completed.");
}
```

### 2.2. Number

Deklarasi variabel dengan tipe number.

```typescript
let decimal: number = 6;
```

**Penjelasan**:
- `let`: Kata kunci untuk mendeklarasikan variabel dengan cakupan blok.
- `decimal`: Nama variabel.
- `number`: Tipe dari variabel `decimal`.
- `6`: Nilai awal dari variabel `decimal`.

**Penggunaan**:
```typescript
let result = decimal * 2;
console.log(result); // Output: 12
```

### 2.3. String

Deklarasi variabel dengan tipe string.

```typescript
let color: string = "blue";
```

**Penjelasan**:
- `let`: Kata kunci untuk mendeklarasikan variabel dengan cakupan blok.
- `color`: Nama variabel.
- `string`: Tipe dari variabel `color`.
- `"blue"`: Nilai awal dari variabel `color`.

**Penggunaan**:
```typescript
let message = `The color is ${color}.`;
console.log(message); // Output: The color is blue.
```

### 2.4. Array

Deklarasi variabel dengan tipe array yang berisi elemen bertipe number.

```typescript
let list: number[] = [1, 2, 3];
```

**Penjelasan**:
- `let`: Kata kunci untuk mendeklarasikan variabel dengan cakupan blok.
- `list`: Nama variabel.
- `number[]`: Tipe dari variabel `list`, menunjukkan bahwa ini adalah array dari angka.
- `[1, 2, 3]`: Nilai awal dari variabel `list`.

**Penggunaan**:
```typescript
for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
}
// Output: 1 2 3
```

### 2.5. Tuple

Deklarasi variabel dengan tipe tuple yang berisi elemen dengan tipe yang berbeda.

```typescript
let x: [string, number] = ["hello", 10];
```

**Penjelasan**:
- `let`: Kata kunci untuk mendeklarasikan variabel dengan cakupan blok.
- `x`: Nama variabel.
- `[string, number]`: Tipe dari variabel `x`, menunjukkan bahwa ini adalah tuple yang berisi `string` di posisi pertama dan `number` di posisi kedua.
- `["hello", 10]`: Nilai awal dari variabel `x`.

**Penggunaan**:
```typescript
console.log(x[0]); // Output: hello
console.log(x[1]); // Output: 10
```

### 2.6. Contoh Keseluruhan

Berikut adalah contoh penggunaan semua tipe variabel di atas dalam satu program.

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10];

if (isDone) {
    console.log("Task is completed.");
} else {
    console.log("Task is not completed.");
}

let result = decimal * 2;
console.log(result); // Output: 12

let message = `The color is ${color}.`;
console.log(message); // Output: The color is blue.

for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
}
// Output: 1 2 3

console.log(x[0]); // Output: hello
console.log(x[1]); // Output: 10
```

### 2.7. Kesimpulan

- **Boolean**: Digunakan untuk nilai `true` atau `false`.
- **Number**: Digunakan untuk angka, baik bilangan bulat maupun desimal.
- **String**: Digunakan untuk teks.
- **Array**: Digunakan untuk daftar elemen dengan tipe yang sama.
- **Tuple**: Digunakan untuk daftar elemen dengan tipe yang berbeda.

Dengan mendefinisikan tipe variabel, TypeScript membantu dalam menangkap kesalahan lebih awal dalam proses pengembangan dan meningkatkan keandalan serta keterbacaan kode Anda.

### 3. Fungsi
TypeScript mendukung tipe untuk parameter fungsi dan nilai kembaliannya.

TypeScript menambahkan tipe statis ke JavaScript, memungkinkan pengembang untuk mendefinisikan tipe parameter dan nilai kembalian dari fungsi. Ini membantu dalam meningkatkan keandalan dan keterbacaan kode. Mari kita bahas detail tentang fungsi di TypeScript dengan dukungan tipe.

### 3.1 Tipe pada Parameter Fungsi dan Nilai Kembalian

TypeScript memungkinkan Anda untuk mendeklarasikan tipe parameter fungsi dan tipe nilai yang dikembalikan oleh fungsi. Ini membantu dalam mencegah kesalahan tipe yang umum terjadi dalam JavaScript.

### 3.2 Deklarasi Fungsi dengan Tipe

#### 3.2.1. Fungsi Biasa

Berikut adalah contoh fungsi biasa dengan tipe parameter dan nilai kembalian:

```typescript
function add(x: number, y: number): number {
    return x + y;
}

// Pemakaian
let result = add(5, 3); // result: 8
console.log(result);

```

**Penjelasan**:
- `x: number`: Parameter `x` harus berupa `number`.
- `y: number`: Parameter `y` harus berupa `number`.
- `): number {`: Fungsi `add` harus mengembalikan nilai bertipe `number`.

Jika Anda mencoba memanggil fungsi ini dengan argumen yang bukan `number`, TypeScript akan memberikan kesalahan kompilasi.

#### 3.2.2. Fungsi Anonim (Anonymous Function)

Anda juga bisa mendefinisikan tipe untuk fungsi anonim:

```typescript
let myAdd = function(x: number, y: number): number {
    return x + y;
};

// Pemakaian
let result = myAdd(10, 20); // result: 30
console.log(result);

```

**Penjelasan**:
- `x: number`: Parameter `x` harus berupa `number`.
- `y: number`: Parameter `y` harus berupa `number`.
- `): number {`: Fungsi anonim harus mengembalikan nilai bertipe `number`.

### 3.3. Arrow Functions dengan Tipe

TypeScript juga mendukung tipe pada fungsi panah (arrow functions):

```typescript
let addArrow = (x: number, y: number): number => {
    return x + y;
};

// Pemakaian
let result = addArrow(7, 8); // result: 15
console.log(result);

```

**Penjelasan**:
- `(x: number, y: number)`: Parameter `x` dan `y` harus berupa `number`.
- `): number => {`: Fungsi panah harus mengembalikan nilai bertipe `number`.

### 3.4. Fungsi dengan Tipe yang Lebih Kompleks

TypeScript memungkinkan penggunaan tipe yang lebih kompleks untuk parameter dan nilai kembalian, termasuk tipe objek, union, dan lainnya.

#### 3.4.1. Tipe Objek sebagai Parameter

```typescript
function greet(person: { name: string, age: number }): string {
    return `Hello ${person.name}, you are ${person.age} years old.`;
}

// Pemakaian
let person = { name: "Alice", age: 30 };
let greeting = greet(person); // greeting: "Hello Alice, you are 30 years old."
console.log(greeting);

```

**Penjelasan**:
- `person: { name: string, age: number }`: Parameter `person` harus berupa objek dengan properti `name` bertipe `string` dan `age` bertipe `number`.
- `): string {`: Fungsi `greet` harus mengembalikan nilai bertipe `string`.

#### 3.4.2. Union Types sebagai Parameter

```typescript
function printId(id: number | string) {
    console.log(`Your ID is: ${id}`);
}

// Pemakaian
printId(101);  // Your ID is: 101
printId("202A"); // Your ID is: 202A

```

**Penjelasan**:
- `id: number | string`: Parameter `id` bisa berupa `number` atau `string`.

### 3.4.3. Tipe Fungsi

Anda bisa mendeklarasikan tipe fungsi untuk memastikan konsistensi di seluruh kode.

```typescript
type AddFunction = (x: number, y: number) => number;

let addFunction: AddFunction = (x, y) => {
    return x + y;
};

// Pemakaian
let result = addFunction(4, 6); // result: 10
console.log(result);

```

**Penjelasan**:
- `type AddFunction = (x: number, y: number) => number;`: Mendefinisikan tipe `AddFunction` sebagai fungsi yang menerima dua parameter `number` dan mengembalikan `number`.
- `let add: AddFunction = (x, y) => { ... };`: Mendeklarasikan variabel `add` dengan tipe `AddFunction`.

### 3.5. Default Parameters dan Optional Parameters

TypeScript juga mendukung parameter default dan parameter opsional.

#### 3.5.1. Default Parameters

```typescript
function multiply(a: number, b: number = 1): number {
    return a * b;
}

// Pemakaian
let result1 = multiply(5, 2); // result1: 10
let result2 = multiply(5);    // result2: 5, karena b menggunakan nilai default 1
console.log(result1);
console.log(result2);

```

**Penjelasan**:
- `b: number = 1`: Parameter `b` memiliki nilai default `1`.

#### 3.5.2. Optional Parameters

```typescript
function buildName(firstName: string, lastName?: string): string {
    return lastName ? `${firstName} ${lastName}` : firstName;
}

// Pemakaian
let fullName1 = buildName("John", "Doe"); // fullName1: "John Doe"
let fullName2 = buildName("Jane");        // fullName2: "Jane"
console.log(fullName1);
console.log(fullName2);

```

**Penjelasan**:
- `lastName?: string`: Parameter `lastName` bersifat opsional.

### 3.6. Kesimpulan

TypeScript memberikan dukungan yang kuat untuk tipe pada parameter dan nilai kembalian fungsi. Dengan mendefinisikan tipe ini, Anda bisa menangkap kesalahan lebih awal dalam proses pengembangan, meningkatkan kualitas kode, dan mempermudah pemeliharaan kode. TypeScript memungkinkan Anda untuk menambahkan tipe pada berbagai macam fungsi, dari fungsi biasa hingga fungsi anonim dan fungsi panah, serta mendukung fitur tambahan seperti parameter default dan opsional.

### 4. Interface
Interface adalah kontrak dalam kode yang menentukan sintaks untuk kelas yang mengimplementasikannya.

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "John", lastName: "Doe" };

console.log(greeter(user));
```
Interfaces di TypeScript adalah alat yang sangat kuat untuk mendefinisikan kontrak dalam kode Anda. Kontrak ini menentukan bentuk objek dan memastikan bahwa objek yang melewati atau menggunakan kode tertentu sesuai dengan bentuk yang diharapkan.

### 4.1. Penjelasan Konsep Interface

**Interface** adalah sebuah deklarasi tipe di TypeScript yang memungkinkan Anda untuk mendefinisikan struktur dari objek. Interface mendefinisikan sifat-sifat yang objek harus miliki dan tipe dari sifat-sifat tersebut. Kelas atau objek yang mengimplementasikan interface harus mengikuti struktur yang ditentukan oleh interface tersebut.

### 4.2. Contoh dan Penjelasan

Mari kita bahas contoh yang diberikan dengan lebih detail.

#### 4.2.1. Mendefinisikan Interface

```typescript
interface Person {
    firstName: string;
    lastName: string;
}
```

- **Person**: Nama interface.
- `firstName: string`: Properti `firstName` bertipe `string` yang wajib ada.
- `lastName: string`: Properti `lastName` bertipe `string` yang wajib ada.

Interface **Person** mendefinisikan bahwa objek bertipe **Person** harus memiliki dua properti: `firstName` dan `lastName`, keduanya bertipe `string`.

#### 4.2.2. Menggunakan Interface pada Fungsi

```typescript
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
```

- **greeter(person: Person)**: Fungsi `greeter` menerima parameter `person` yang harus mengikuti struktur yang ditentukan oleh interface **Person**.
- **return statement**: Fungsi ini mengembalikan string yang menggabungkan `firstName` dan `lastName` dari objek `person`.

#### 4.2.3. Membuat Objek yang Memenuhi Interface

```typescript
let user = { firstName: "John", lastName: "Doe" };
```

- **user**: Objek ini memiliki properti `firstName` dan `lastName` dengan tipe `string`, sehingga sesuai dengan interface **Person**.

#### 4.2.4. Menggunakan Fungsi dengan Objek yang Memenuhi Interface

```typescript
console.log(greeter(user)); // Output: "Hello, John Doe"
```

- **greeter(user)**: Memanggil fungsi `greeter` dengan objek `user`. Karena `user` memiliki struktur yang sesuai dengan interface **Person**, fungsi ini bekerja dengan benar dan menghasilkan output yang diharapkan.

### 4.3. Implementasi Interface pada Kelas

Selain objek langsung, interface juga bisa diimplementasikan oleh kelas. Kelas yang mengimplementasikan interface harus memiliki properti dan metode yang ditentukan oleh interface.

#### Contoh Implementasi Interface pada Kelas

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

class Employee implements Person {
    firstName: string;
    lastName: string;
    employeeId: number;

    constructor(firstName: string, lastName: string, employeeId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
    }
}

let employee = new Employee("Jane", "Smith", 123);
console.log(greeter(employee)); // Output: "Hello, Jane Smith"
```

- **Employee implements Person**: Kelas `Employee` mengimplementasikan interface `Person`.
- **firstName dan lastName**: Kelas `Employee` memiliki properti `firstName` dan `lastName`, sehingga sesuai dengan interface `Person`.
- **employeeId**: Kelas `Employee` juga memiliki properti tambahan `employeeId`.

### 4.4. Interface dengan Metode

Interface juga bisa mendefinisikan metode selain properti.

#### Contoh Interface dengan Metode

```typescript
interface Person {
    firstName: string;
    lastName: string;
    getFullName(): string;
}

class Employee implements Person {
    firstName: string;
    lastName: string;
    employeeId: number;

    constructor(firstName: string, lastName: string, employeeId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeId = employeeId;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

let employee = new Employee("Jane", "Smith", 123);
console.log(employee.getFullName()); // Output: "Jane Smith"
```

- **getFullName(): string**: Interface `Person` mendefinisikan metode `getFullName` yang mengembalikan `string`.
- **getFullName pada Employee**: Kelas `Employee` mengimplementasikan metode `getFullName`, sehingga sesuai dengan interface `Person`.

### 4.5. Kesimpulan

Interfaces di TypeScript membantu dalam:
- Menentukan kontrak yang jelas untuk objek dan kelas.
- Memastikan konsistensi tipe di seluruh aplikasi.
- Meningkatkan keandalan dan keterbacaan kode dengan mendefinisikan struktur yang diharapkan.

Dengan menggunakan interfaces, Anda bisa mengembangkan kode yang lebih kuat dan lebih mudah dipelihara, karena TypeScript akan memberikan kesalahan kompilasi jika objek atau kelas tidak sesuai dengan kontrak yang ditentukan.

## Bagian 3: TypeScript Lanjutan
### 1. Kelas dan Objek
TypeScript mendukung konsep kelas dan objek, termasuk pewarisan, enkapsulasi, dan polimorfisme.

```typescript
class Animal {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

let dog = new Animal("Dog");
dog.move(10);
```

### 2. Generic
Generic memungkinkan Anda membuat komponen yang dapat bekerja dengan berbagai tipe data.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let outputNumber = identity<number>(100);
```

### 3. Modul dan Namespace
TypeScript mendukung modul dan namespace untuk pengorganisasian kode yang lebih baik.

**Modul:**
```typescript
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

// app.ts
import { add } from "./math";
console.log(add(2, 3));
```

**Namespace:**
```typescript
namespace Geometry {
    export function area(radius: number): number {
        return Math.PI * radius * radius;
    }
}

console.log(Geometry.area(10));
```

### 4. Decorator
Decorator adalah fitur eksperimental yang digunakan untuk mengubah perilaku kelas atau anggota kelas.

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    constructor(public greeting: string) {}
    
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

## Bagian 4: TypeScript Mahir
### 1. Advanced Types
TypeScript menyediakan tipe-tipe lanjutan seperti intersection types, union types, type guards, dan banyak lagi.

```typescript
type NetworkLoadingState = {
    state: "loading";
};

type NetworkFailedState = {
    state: "failed";
    code: number;
};

type NetworkSuccessState = {
    state: "success";
    response: {
        title: string;
        duration: number;
        summary: string;
    };
};

type NetworkState = 
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;

function logger(state: NetworkState): string {
    switch (state.state) {
        case "loading":
            return "Downloading...";
        case "failed":
            return `Error ${state.code} downloading`;
        case "success":
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}
```

### 2. Mapped Types
Mapped types memungkinkan Anda membuat tipe baru dengan memodifikasi properti dari tipe yang ada.

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Person = {
    name: string;
    age: number;
};

let readonlyPerson: Readonly<Person> = {
    name: "Alice",
    age: 25
};

// readonlyPerson.age = 30; // Error: Cannot assign to 'age' because it is a read-only property.
```

### 3. Conditional Types
Conditional types memungkinkan Anda membuat tipe berdasarkan kondisi.

```typescript
type MessageOf<T extends { message: unknown }> = T["message"];

type Email = {
    message: string;
};

type Message = MessageOf<Email>; // string
```

### 4. Utility Types
TypeScript menyediakan berbagai tipe utilitas yang memudahkan pekerjaan dengan tipe-tipe.

```typescript
interface Person {
    name: string;
    age: number;
    address?: string;
}

type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
```

## Sumber Belajar Tambahan
- [Dokumentasi Resmi TypeScript](https://www.typescriptlang.org/docs/)
- Buku "Learning TypeScript" oleh Josh Goldberg
- Kursus online di platform seperti Udemy, Coursera, dan Pluralsight

Dengan mengikuti panduan ini dan terus berlatih, Anda akan bisa menguasai TypeScript dari dasar hingga mahir. Selamat belajar!

Jika Anda memerlukan panduan atau materi tambahan tentang topik tertentu, jangan ragu untuk bertanya!
