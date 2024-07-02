
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
```

**Penjelasan**:
- `x: number`: Parameter `x` harus berupa `number`.
- `y: number`: Parameter `y` harus berupa `number`.
- `): number {`: Fungsi `add` harus mengembalikan nilai bertipe `number`.

Jika Anda mencoba memanggil fungsi ini dengan argumen yang bukan `number`, TypeScript akan memberikan kesalahan kompilasi.

#### 3.2.2. Fungsi Anonim (Anonymous Function)

Anda juga bisa mendefinisikan tipe untuk fungsi anonim:

```typescript
let myAdd = function(x: number, y: number): number { return x + y; };
```

**Penjelasan**:
- `x: number`: Parameter `x` harus berupa `number`.
- `y: number`: Parameter `y` harus berupa `number`.
- `): number {`: Fungsi anonim harus mengembalikan nilai bertipe `number`.

### 3.3. Arrow Functions dengan Tipe

TypeScript juga mendukung tipe pada fungsi panah (arrow functions):

```typescript
let add = (x: number, y: number): number => {
    return x + y;
}
```

**Penjelasan**:
- `(x: number, y: number)`: Parameter `x` dan `y` harus berupa `number`.
- `): number => {`: Fungsi panah harus mengembalikan nilai bertipe `number`.

### 3.4. Fungsi dengan Tipe yang Lebih Kompleks

TypeScript memungkinkan penggunaan tipe yang lebih kompleks untuk parameter dan nilai kembalian, termasuk tipe objek, union, dan lainnya.

#### 3.5. Tipe Objek sebagai Parameter

```typescript
function greet(person: { name: string, age: number }): string {
    return `Hello ${person.name}, you are ${person.age} years old.`;
}
```

**Penjelasan**:
- `person: { name: string, age: number }`: Parameter `person` harus berupa objek dengan properti `name` bertipe `string` dan `age` bertipe `number`.
- `): string {`: Fungsi `greet` harus mengembalikan nilai bertipe `string`.

#### 3.6. Union Types sebagai Parameter

```typescript
function printId(id: number | string) {
    console.log(`Your ID is: ${id}`);
}
```

**Penjelasan**:
- `id: number | string`: Parameter `id` bisa berupa `number` atau `string`.

### 3.7. Tipe Fungsi

Anda bisa mendeklarasikan tipe fungsi untuk memastikan konsistensi di seluruh kode.

```typescript
type AddFunction = (x: number, y: number) => number;

let add: AddFunction = (x, y) => {
    return x + y;
};
```

**Penjelasan**:
- `type AddFunction = (x: number, y: number) => number;`: Mendefinisikan tipe `AddFunction` sebagai fungsi yang menerima dua parameter `number` dan mengembalikan `number`.
- `let add: AddFunction = (x, y) => { ... };`: Mendeklarasikan variabel `add` dengan tipe `AddFunction`.

### 3.8. Default Parameters dan Optional Parameters

TypeScript juga mendukung parameter default dan parameter opsional.

#### 3.9. Default Parameters

```typescript
function multiply(a: number, b: number = 1): number {
    return a * b;
}
```

**Penjelasan**:
- `b: number = 1`: Parameter `b` memiliki nilai default `1`.

#### 3.10. Optional Parameters

```typescript
function buildName(firstName: string, lastName?: string): string {
    return lastName ? `${firstName} ${lastName}` : firstName;
}
```

**Penjelasan**:
- `lastName?: string`: Parameter `lastName` bersifat opsional.

### 3.11. Kesimpulan

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
