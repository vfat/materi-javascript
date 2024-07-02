
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

```typescript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

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
