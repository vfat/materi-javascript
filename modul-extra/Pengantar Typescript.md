
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
TypeScript memperkenalkan beberapa tipe data dasar yang digunakan untuk memastikan bahwa nilai-nilai yang ditangani sesuai dengan tipe yang diharapkan. Ini membantu dalam pencegahan kesalahan dan meningkatkan keandalan kode. Berikut adalah penjelasan detail terkait tipe data dasar di TypeScript.

### 1.1. String

Tipe `string` digunakan untuk merepresentasikan teks.

### 1.2. Number

Tipe `number` digunakan untuk merepresentasikan angka, baik bilangan bulat maupun desimal.

### 1.3. Boolean

Tipe `boolean` digunakan untuk merepresentasikan nilai benar (`true`) atau salah (`false`).

### 1.4. Array

Tipe `array` digunakan untuk merepresentasikan daftar elemen dengan tipe yang sama.

### 1.5. Tuple

Tipe `tuple` digunakan untuk merepresentasikan array dengan elemen-elemen yang memiliki tipe berbeda.

### 1.6. Enum

Tipe `enum` digunakan untuk mendefinisikan sekumpulan nama konstanta.

### 1.7. Any

Tipe `any` digunakan ketika Anda tidak tahu tipe data apa yang akan digunakan. Ini berguna untuk migrasi dari JavaScript atau untuk bekerja dengan data dinamis.

### 1.8. Void

Tipe `void` digunakan untuk merepresentasikan ketiadaan tipe, sering digunakan sebagai tipe kembalian fungsi yang tidak mengembalikan nilai.


### 1.9. Never

Tipe `never` digunakan untuk tipe yang tidak pernah memiliki nilai. Ini sering digunakan pada fungsi yang selalu melemparkan pengecualian atau tidak pernah mengembalikan nilai.

### 2. Deklarasi Variabel
```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // Tuple
```
Deklarasi variabel di TypeScript memungkinkan Anda untuk mendefinisikan tipe variabel secara eksplisit, yang meningkatkan keandalan dan keterbacaan kode. Berikut adalah penjelasan detail tentang berbagai tipe variabel yang didukung oleh TypeScript beserta contoh penggunaannya.

### 2.1. String

Deklarasi variabel dengan tipe `string` digunakan untuk merepresentasikan teks.

```typescript
let color: string = "blue";
```

**Contoh Penggunaan**:
```typescript
let message: string = `The color is ${color}`;
console.log(message); // Output: The color is blue
```

### 2.2. Number

Deklarasi variabel dengan tipe `number` digunakan untuk merepresentasikan angka, baik bilangan bulat maupun desimal.

```typescript
let decimal: number = 6;
let hex: number = 0xf00d; // hexadecimal
let binary: number = 0b1010; // binary
let octal: number = 0o744; // octal
```

**Contoh Penggunaan**:
```typescript
let total: number = decimal + hex;
console.log(total); // Output: 61485
```

### 2.3. Boolean

Deklarasi variabel dengan tipe `boolean` digunakan untuk merepresentasikan nilai benar (`true`) atau salah (`false`).

```typescript
let isDone: boolean = false;
```

**Contoh Penggunaan**:
```typescript
if (isDone) {
    console.log("Task is completed.");
} else {
    console.log("Task is not completed.");
}
```

### 2.4. Array

Deklarasi variabel dengan tipe `array` digunakan untuk merepresentasikan daftar elemen dengan tipe yang sama.

```typescript
let list: number[] = [1, 2, 3];
```

**Contoh Penggunaan**:
```typescript
for (let i: number = 0; i < list.length; i++) {
    console.log(list[i]); // Output: 1 2 3
}
```

TypeScript juga menyediakan cara alternatif untuk mendeklarasikan array:

```typescript
let list: Array<number> = [1, 2, 3];
```

### 2.5. Tuple

Deklarasi variabel dengan tipe `tuple` digunakan untuk merepresentasikan array dengan elemen-elemen yang memiliki tipe berbeda.

```typescript
let x: [string, number] = ["hello", 10];
```

**Contoh Penggunaan**:
```typescript
console.log(x[0]); // Output: hello
console.log(x[1]); // Output: 10
```

### 2.6. Enum

Deklarasi variabel dengan tipe `enum` digunakan untuk mendefinisikan sekumpulan nama konstanta.

```typescript
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
```

**Contoh Penggunaan**:
```typescript
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2];
console.log(colorName); // Output: Green
```

### 2.7. Any

Deklarasi variabel dengan tipe `any` digunakan ketika Anda tidak tahu tipe data apa yang akan digunakan. Ini berguna untuk migrasi dari JavaScript atau untuk bekerja dengan data dinamis.

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

**Contoh Penggunaan**:
```typescript
let list: any[] = [1, true, "free"];
list[1] = 100;
console.log(list); // Output: [1, 100, "free"]
```

### 2.8. Void

Deklarasi variabel dengan tipe `void` digunakan untuk merepresentasikan ketiadaan tipe, sering digunakan sebagai tipe kembalian fungsi yang tidak mengembalikan nilai.

```typescript
function warnUser(): void {
    console.log("This is a warning message");
}
```

**Contoh Penggunaan**:
```typescript
warnUser(); // Output: This is a warning message
```

### 2.9. Null dan Undefined

Deklarasi variabel dengan tipe `null` dan `undefined` yang merupakan subtipe dari semua tipe lainnya.

```typescript
let u: undefined = undefined;
let n: null = null;
```

### 2.10. Never

Deklarasi variabel dengan tipe `never` digunakan untuk tipe yang tidak pernah memiliki nilai. Ini sering digunakan pada fungsi yang selalu melemparkan pengecualian atau tidak pernah mengembalikan nilai.

```typescript
function error(message: string): never {
    throw new Error(message);
}
```

### 2.11. Kesimpulan

Dengan menggunakan tipe data dasar di TypeScript, Anda bisa:
- Meningkatkan keandalan kode dengan memastikan nilai sesuai dengan tipe yang diharapkan.
- Meningkatkan keterbacaan kode dengan memberikan informasi tipe yang eksplisit.
- Menangkap kesalahan lebih awal dalam proses pengembangan melalui pemeriksaan tipe.

Mendeklarasikan tipe data secara eksplisit di TypeScript membantu dalam pencegahan kesalahan yang sulit ditemukan dan memungkinkan pengembangan kode yang lebih terstruktur dan teratur.

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

Dalam TypeScript, konsep kelas dan objek memungkinkan kita untuk mendefinisikan struktur dan perilaku entitas dalam program dengan cara yang lebih terorganisir dan modular. Berikut adalah penjelasan lebih detail terkait kelas dan objek, termasuk konsep inheritance, encapsulation, dan polymorphism.

#### 1.1. Kelas dan Objek

**Kelas** adalah cetak biru untuk membuat objek. Kelas mendefinisikan properti dan metode yang akan dimiliki oleh objek yang dibuat dari kelas tersebut.

**Objek** adalah instance dari kelas. Ketika objek dibuat, objek tersebut mendapatkan properti dan metode yang didefinisikan oleh kelasnya.

Contoh:
```typescript
class Animal {
    private name: string; // Properti 'name' bersifat private

    constructor(name: string) {
        this.name = name;
    }

    public move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

let dog = new Animal("Dog"); // Membuat objek baru dari kelas Animal
dog.move(10); // Output: Dog moved 10 meters.
```

#### 1.2. Encapsulation

**Encapsulation** adalah konsep untuk menyembunyikan data atau informasi dari pengguna luar dengan cara mengontrol akses terhadap properti atau metode kelas melalui modifier akses seperti `private`, `protected`, dan `public`.

- **private**: Hanya dapat diakses dari dalam kelas itu sendiri.
- **protected**: Dapat diakses dari dalam kelas itu sendiri dan kelas turunannya.
- **public**: Dapat diakses dari mana saja.

Contoh:
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
// dog.name = "Cat"; // Error: Property 'name' is private and only accessible within class 'Animal'.
dog.move(10); // Output: Dog moved 10 meters.
```

#### 1.3. Inheritance

**Inheritance** memungkinkan sebuah kelas (subclass) untuk mewarisi properti dan metode dari kelas lain (superclass). Ini memungkinkan penggunaan kembali kode dan pembuatan hierarki kelas yang logis.

Contoh:
```typescript
class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name); // Memanggil konstruktor dari kelas induk
    }

    public bark(): void {
        console.log("Woof! Woof!");
    }
}

let dog = new Dog("Dog");
dog.bark(); // Output: Woof! Woof!
dog.move(10); // Output: Dog moved 10 meters.
```

#### 1.4. Polymorphism

**Polymorphism** adalah konsep di mana satu metode dapat memiliki banyak bentuk. Dalam konteks objek, ini berarti bahwa metode yang sama dapat berperilaku berbeda tergantung pada objek yang memanggilnya.

Contoh:
```typescript
class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }
}

class Bird extends Animal {
    constructor(name: string) {
        super(name);
    }

    public move(distance: number): void {
        console.log(`${this.name} flew ${distance} meters.`);
    }
}

let dog = new Animal("Dog");
let bird = new Bird("Bird");

dog.move(10); // Output: Dog moved 10 meters.
bird.move(20); // Output: Bird flew 20 meters.
```

### 1.5. Kesimpulan

- **Kelas dan Objek**: Kelas adalah cetak biru untuk membuat objek, sedangkan objek adalah instance dari kelas tersebut.
- **Encapsulation**: Menyembunyikan detail implementasi dengan menggunakan modifier akses (`private`, `protected`, `public`).
- **Inheritance**: Memungkinkan kelas untuk mewarisi properti dan metode dari kelas lain, memungkinkan penggunaan kembali kode.
- **Polymorphism**: Memungkinkan metode yang sama untuk berperilaku berbeda tergantung pada objek yang memanggilnya.

Dengan menggunakan konsep-konsep ini, TypeScript memungkinkan pembuatan kode yang lebih terstruktur, modular, dan mudah di-maintain.

### 2. Generic


**Generic** di TypeScript memungkinkan kita untuk membuat komponen yang dapat bekerja dengan berbagai tipe data. Ini memberikan fleksibilitas dalam pembuatan fungsi, kelas, atau interface yang dapat menangani tipe data yang berbeda tanpa kehilangan tipe informasi.

#### 2.1. Konsep Dasar Generic

Generic memungkinkan pembuatan komponen yang dapat bekerja dengan tipe data yang ditentukan saat pemanggilan, bukan pada saat definisi. Ini sangat berguna saat kita ingin membuat fungsi atau kelas yang dapat bekerja dengan berbagai tipe data tetapi tetap memiliki keamanan tipe.

#### 2.2. Fungsi Generic

Mari kita lihat contoh fungsi generic:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

- `identity` adalah fungsi generic.
- `T` adalah parameter tipe generic. Ini adalah placeholder untuk tipe data yang akan kita gunakan.
- `arg: T` berarti argumen `arg` akan memiliki tipe `T`.
- `: T` setelah tanda kurung menandakan bahwa fungsi ini akan mengembalikan nilai dengan tipe `T`.

Contoh penggunaan:

```typescript
let outputString = identity<string>("myString"); // `outputString` akan bertipe `string`
let outputNumber = identity<number>(100); // `outputNumber` akan bertipe `number`
```

#### 2.3. Contoh Lebih Lanjut

1. **Array Generic**

   Fungsi generic dapat digunakan untuk bekerja dengan array berbagai tipe data.

   ```typescript
   function getArray<T>(items: T[]): T[] {
       return new Array<T>().concat(items);
   }

   let stringArray = getArray<string>(["Hello", "World"]);
   let numberArray = getArray<number>([1, 2, 3, 4]);

   stringArray.push("!");
   numberArray.push(5);

   console.log(stringArray); // Output: ["Hello", "World", "!"]
   console.log(numberArray); // Output: [1, 2, 3, 4, 5]
   ```

2. **Generic Interface**

   Kita juga dapat menggunakan generic dalam interface.

   ```typescript
   interface KeyValuePair<K, V> {
       key: K;
       value: V;
   }

   let keyValue: KeyValuePair<number, string> = { key: 1, value: "Hello" };

   console.log(keyValue); // Output: { key: 1, value: "Hello" }
   ```

3. **Generic Class**

   Kita bisa membuat kelas yang menggunakan generic untuk bekerja dengan berbagai tipe data.

   ```typescript
   class DataHolder<T> {
       private _data: T;

       constructor(data: T) {
           this._data = data;
       }

       getData(): T {
           return this._data;
       }

       setData(data: T): void {
           this._data = data;
       }
   }

   let stringHolder = new DataHolder<string>("Hello");
   console.log(stringHolder.getData()); // Output: Hello

   stringHolder.setData("World");
   console.log(stringHolder.getData()); // Output: World

   let numberHolder = new DataHolder<number>(123);
   console.log(numberHolder.getData()); // Output: 123

   numberHolder.setData(456);
   console.log(numberHolder.getData()); // Output: 456
   ```

4. **Generic Constraints**

   Terkadang kita ingin memaksakan batasan pada tipe data yang dapat digunakan dalam generic. Ini bisa dilakukan dengan menggunakan constraints.

   ```typescript
   interface Lengthwise {
       length: number;
   }

   function loggingIdentity<T extends Lengthwise>(arg: T): T {
       console.log(arg.length); // Sekarang kita tahu bahwa 'arg' pasti memiliki properti 'length'
       return arg;
   }

   loggingIdentity({ length: 10, value: "Hello" }); // Output: 10
   ```

#### 2.4. Kesimpulan

Generic adalah fitur powerful di TypeScript yang memungkinkan pembuatan komponen yang fleksibel dan reusable dengan tetap menjaga keamanan tipe. Dengan generic, kita dapat membuat fungsi, kelas, dan interface yang dapat bekerja dengan berbagai tipe data tanpa mengorbankan keamanan dan kejelasan kode.

### 3. Modul dan Namespace


**Modul** dan **Namespace** adalah fitur di TypeScript yang digunakan untuk mengorganisasikan dan mengelola kode, terutama dalam proyek besar. Mereka memiliki fungsi dan tujuan yang berbeda.

#### 3.1. Modul

**Modul** adalah unit kode yang dapat diimpor atau diekspor dari satu file ke file lain. Modul membantu dalam pengorganisasian dan pembagian kode menjadi potongan-potongan kecil yang dapat digunakan kembali.

- **Ekspor**: Menentukan bagian dari modul yang dapat diakses oleh modul lain.
- **Impor**: Mengambil fitur dari modul lain ke dalam modul saat ini.

##### Contoh Modul

**module1.ts**
```typescript
export class Greeter {
    constructor(public greeting: string) {}
    greet() {
        return `Hello, ${this.greeting}`;
    }
}

export function add(x: number, y: number): number {
    return x + y;
}
```

**module2.ts**
```typescript
import { Greeter, add } from './module1';

let greeter = new Greeter("world");
console.log(greeter.greet()); // Output: Hello, world

let sum = add(2, 3);
console.log(sum); // Output: 5
```

- `export` digunakan untuk mengekspor kelas `Greeter` dan fungsi `add` dari `module1.ts`.
- `import` digunakan untuk mengimpor `Greeter` dan `add` ke dalam `module2.ts`.

##### Ekspor Default

Kita juga dapat menggunakan ekspor default untuk mengekspor satu nilai dari sebuah modul:

**module3.ts**
```typescript
export default function multiply(x: number, y: number): number {
    return x * y;
}
```

**module4.ts**
```typescript
import multiply from './module3';

let product = multiply(2, 3);
console.log(product); // Output: 6
```

Dalam kasus ini, `multiply` adalah ekspor default dari `module3.ts`, dan kita dapat mengimpornya tanpa menggunakan tanda kurung kurawal.

#### 3.2. Namespace

**Namespace** adalah cara lama untuk mengelompokkan logika yang terkait bersama-sama dalam satu ruang nama. Mereka digunakan sebelum sistem modul ECMAScript 2015 (ES6) menjadi standar. Namespace masih berguna untuk beberapa kasus penggunaan, terutama saat mengorganisasikan kode di dalam satu file atau ketika tidak menggunakan loader modul.

##### Contoh Namespace

**shapes.ts**
```typescript
namespace Shapes {
    export class Circle {
        constructor(public radius: number) {}
        area(): number {
            return Math.PI * this.radius * this.radius;
        }
    }

    export class Square {
        constructor(public sideLength: number) {}
        area(): number {
            return this.sideLength * this.sideLength;
        }
    }
}

let circle = new Shapes.Circle(10);
console.log(circle.area()); // Output: 314.159...

let square = new Shapes.Square(5);
console.log(square.area()); // Output: 25
```

- `namespace` digunakan untuk mendeklarasikan ruang nama `Shapes`.
- `export` digunakan untuk membuat kelas `Circle` dan `Square` dapat diakses di luar namespace.

##### Namespace Bersarang

Namespace dapat bersarang untuk pengorganisasian yang lebih baik.

**geometry.ts**
```typescript
namespace Geometry {
    export namespace Shapes {
        export class Triangle {
            constructor(public base: number, public height: number) {}
            area(): number {
                return 0.5 * this.base * this.height;
            }
        }
    }
}

let triangle = new Geometry.Shapes.Triangle(5, 10);
console.log(triangle.area()); // Output: 25
```

#### 3.3. Perbandingan Modul dan Namespace

- **Modul**:
  - Lebih modern dan digunakan di TypeScript dan JavaScript saat ini.
  - Menggunakan ekspor dan impor untuk berbagi kode antara file.
  - Mendukung sistem modul ES6 dan kompatibel dengan bundler seperti Webpack dan Rollup.

- **Namespace**:
  - Lebih tradisional dan digunakan sebelum sistem modul ES6.
  - Digunakan untuk mengelompokkan kode di dalam satu file.
  - Tidak memerlukan bundler, cocok untuk proyek yang tidak menggunakan sistem modul.

### 3.4. Kesimpulan

- **Modul** digunakan untuk mengorganisasikan dan membagi kode ke dalam file yang dapat diimpor dan diekspor.
- **Namespace** digunakan untuk mengelompokkan kode terkait dalam satu ruang nama, seringkali di dalam satu file.
- Modul lebih modern dan umum digunakan dalam pengembangan aplikasi besar yang menggunakan bundler modul, sementara namespace masih berguna dalam beberapa kasus tertentu di mana bundler tidak digunakan atau untuk pengorganisasian kode dalam satu file.

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
