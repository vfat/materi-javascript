### Bagian 1: Pengantar NestJS

#### 1. Apa itu NestJS?
NestJS adalah framework progresif Node.js untuk membangun aplikasi server-side yang efisien dan skalabel. Dibangun dengan TypeScript (meskipun mendukung JavaScript), NestJS menggabungkan elemen-elemen terbaik dari OOP (Object Oriented Programming), FP (Functional Programming), dan FRP (Functional Reactive Programming).

**Perbedaan dengan framework lain:**
- **Express:** NestJS menggunakan Express sebagai default HTTP engine tetapi menambahkan lapisan abstraksi yang lebih tinggi dan fitur bawaan seperti Dependency Injection, modul yang mudah diatur, dan struktur proyek yang jelas.
- **Koa:** Koa lebih minimalis dan modular, tetapi NestJS menyediakan solusi lengkap dengan konsep yang kuat dari framework backend yang lebih besar seperti Angular di sisi frontend.

**Keunggulan NestJS:**
- Arsitektur modular dan dapat diperluas.
- Mendukung TypeScript sepenuhnya.
- Dependency Injection yang kuat.
- Dukungan out-of-the-box untuk GraphQL, WebSockets, dan Microservices.
- Dokumentasi yang baik dan komunitas yang aktif.

#### 2. Instalasi dan Setup Lingkungan

**Prasyarat:**
- **Node.js:** Versi terbaru LTS atau Current.
- **npm/yarn:** Npm biasanya sudah terinstal dengan Node.js, atau Anda bisa menggunakan yarn.

**Instalasi NestJS CLI:**
NestJS CLI membantu membuat proyek baru dan menghasilkan kode boilerplate dengan cepat.

```bash
npm install -g @nestjs/cli
```

**Membuat Proyek Baru:**
Setelah CLI terinstal, Anda dapat membuat proyek baru dengan perintah berikut:

```bash
nest new my-nestjs-project
```

CLI akan meminta Anda untuk memilih manajer paket (npm atau yarn). Pilih sesuai preferensi Anda, dan CLI akan mengatur struktur proyek dasar.

**Struktur Direktori Proyek NestJS:**
Setelah proyek dibuat, Anda akan melihat struktur direktori seperti berikut:

```
my-nestjs-project/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

**Penjelasan File dan Direktori:**
- **src/**: Direktori utama untuk kode aplikasi.
  - **app.controller.ts:** Contoh controller.
  - **app.controller.spec.ts:** File tes untuk controller.
  - **app.module.ts:** Root module aplikasi.
  - **app.service.ts:** Contoh service.
  - **main.ts:** Entry point aplikasi.
- **test/**: Direktori untuk tes end-to-end.
- **.eslintrc.js**: Konfigurasi ESLint.
- **.prettierrc**: Konfigurasi Prettier.
- **nest-cli.json**: Konfigurasi Nest CLI.
- **package.json**: Manajer dependensi dan skrip npm.
- **tsconfig.build.json**: Konfigurasi TypeScript untuk build.
- **tsconfig.json**: Konfigurasi utama TypeScript.

---

Setelah memahami pengantar ini, Anda akan lebih siap untuk mempelajari dasar-dasar dan fitur-fitur lanjutan dari NestJS. Pada bagian berikutnya, kita akan masuk ke dalam konsep dasar seperti Controllers, Services, dan Modules.
