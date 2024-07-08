### Controllers

Controllers bertanggung jawab untuk menangani **requests** yang masuk dan mengembalikan **responses** ke klien.

<figure><img src="/assets/Controllers_1.png" /></figure>

Tujuan dari controller adalah menerima permintaan tertentu untuk aplikasi. Mekanisme **routing** mengontrol controller mana yang menerima permintaan mana. Seringkali, setiap controller memiliki lebih dari satu rute, dan rute yang berbeda dapat melakukan tindakan yang berbeda.

Untuk membuat controller dasar, kita menggunakan kelas dan **decorators**. Decorators mengasosiasikan kelas dengan metadata yang diperlukan dan memungkinkan Nest untuk membuat peta rute (menghubungkan permintaan dengan controller yang sesuai).

> info **Hint** Untuk cepat membuat CRUD controller dengan [validation](https://docs.nestjs.com/techniques/validation) bawaan, Anda dapat menggunakan CLI's [CRUD generator](https://docs.nestjs.com/recipes/crud-generator#crud-generator): `nest g resource [name]`.

#### Routing

Dalam contoh berikut kita akan menggunakan `@Controller()` decorator, yang **diperlukan** untuk mendefinisikan controller dasar. Kita akan menentukan awalan path rute opsional `cats`. Menggunakan awalan path dalam `@Controller()` decorator memungkinkan kita untuk dengan mudah mengelompokkan serangkaian rute terkait, dan meminimalkan kode yang berulang. Misalnya, kita dapat memilih untuk mengelompokkan serangkaian rute yang mengelola interaksi dengan entitas cat di bawah rute `/cats`. Dalam hal ini, kita dapat menentukan awalan path `cats` dalam `@Controller()` decorator sehingga kita tidak perlu mengulangi bagian path tersebut untuk setiap rute dalam file.

```typescript
@@filename(cats.controller)
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    return 'This action returns all cats';
  }
}
```

> info **Hint** Untuk membuat controller menggunakan CLI, cukup jalankan perintah `$ nest g controller [name]`.

`@Get()` HTTP request method decorator sebelum metode `findAll()` memberitahu Nest untuk membuat handler untuk endpoint tertentu untuk permintaan HTTP. Endpoint tersebut sesuai dengan metode permintaan HTTP (GET dalam hal ini) dan path rute. Apa itu path rute? Path rute untuk handler ditentukan dengan menggabungkan awalan yang diumumkan untuk controller, dan setiap path yang ditentukan dalam decorator metode. Karena kita telah mengumumkan awalan untuk setiap rute (`cats`), dan tidak menambahkan informasi path dalam decorator, Nest akan memetakan permintaan `GET /cats` ke handler ini. Seperti yang disebutkan, path mencakup baik awalan path controller opsional **dan** string path yang diumumkan dalam decorator metode permintaan. Misalnya, awalan path `cats` yang digabungkan dengan decorator `@Get('breed')` akan menghasilkan pemetaan rute untuk permintaan seperti `GET /cats/breed`.

Dalam contoh di atas, ketika permintaan GET dilakukan ke endpoint ini, Nest mengarahkan permintaan ke metode `findAll()` yang didefinisikan oleh pengguna. Perhatikan bahwa nama metode yang kita pilih di sini sepenuhnya sembarang. Kita jelas harus mendeklarasikan metode untuk menghubungkan rute, tetapi Nest tidak menempelkan signifikansi apa pun pada nama metode yang dipilih.

Metode ini akan mengembalikan status kode 200 dan respons terkait, yang dalam hal ini hanya string. Mengapa itu terjadi? Untuk menjelaskan, pertama-tama kita akan memperkenalkan konsep bahwa Nest menggunakan dua opsi **berbeda** untuk memanipulasi responses:

<table>
  <tr>
    <td>Standar (direkomendasikan)</td>
    <td>
      Menggunakan metode bawaan ini, ketika request handler mengembalikan objek atau array JavaScript, itu akan secara **otomatis** diserialisasi ke JSON. Namun, ketika mengembalikan tipe primitif JavaScript (misalnya, <code>string</code>, <code>number</code>, <code>boolean</code>), Nest akan mengirimkan nilai saja tanpa mencoba menserialisasikannya. Ini membuat penanganan respons sederhana: cukup kembalikan nilainya, dan Nest mengurus sisanya.
      <br />
      <br /> Selain itu, <strong>status code</strong> respons selalu 200 secara default, kecuali untuk permintaan POST yang menggunakan 201. Kita dapat dengan mudah mengubah perilaku ini dengan menambahkan <code>@HttpCode(...)</code>
      decorator pada tingkat handler (lihat <a href='controllers#status-code'>Status codes</a>).
    </td>
  </tr>
  <tr>
    <td>Khusus pustaka</td>
    <td>
      Kita dapat menggunakan objek [response](https://expressjs.com/en/api.html#res) khusus pustaka (misalnya, Express), yang dapat disuntikkan menggunakan <code>@Res()</code> decorator dalam tanda tangan metode handler (misalnya, <code>findAll(@Res() response)</code>). Dengan pendekatan ini, kita memiliki kemampuan untuk menggunakan metode penanganan respons asli yang terpapar oleh objek tersebut. Misalnya, dengan Express, kita dapat membangun responses menggunakan kode seperti <code>response.status(200).send()</code>.
    </td>
  </tr>
</table>

> warning **Warning** Nest mendeteksi ketika handler menggunakan `@Res()` atau `@Next()`, yang menunjukkan bahwa kita telah memilih opsi khusus pustaka. Jika kedua pendekatan digunakan pada saat yang sama, pendekatan Standar **secara otomatis dinonaktifkan** untuk rute tunggal ini dan tidak akan berfungsi seperti yang diharapkan. Untuk menggunakan kedua pendekatan secara bersamaan (misalnya, dengan menyuntikkan objek respons hanya untuk mengatur cookies/headers tetapi tetap menyerahkan sisanya ke framework), kita harus mengatur opsi `passthrough` ke `true` dalam decorator `@Res({ passthrough: true })`.

<app-banner-devtools></app-banner-devtools>

#### Request object

Handlers sering kali membutuhkan akses ke detail **request** klien. Nest menyediakan akses ke [request object](https://expressjs.com/en/api.html#req) dari platform dasar (Express secara default). Kita dapat mengakses request object dengan menginstruksikan Nest untuk menyuntikkannya dengan menambahkan `@Req()` decorator ke tanda tangan handler.

```typescript
@@filename(cats.controller)
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Bind, Get, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @Bind(Req())
  findAll(request) {
    return 'This action returns all cats';
  }
}
```

> info **Hint** Untuk memanfaatkan `express` typings (seperti dalam contoh parameter `request: Request` di atas), instal paket `@types/express`.

Request object mewakili permintaan HTTP dan memiliki properti untuk query string permintaan, parameter, headers HTTP, dan body (baca lebih lanjut [di sini](https://expressjs.com/en/api.html#req)). Dalam kebanyakan kasus, tidak perlu mengambil properti ini secara manual. Kita dapat menggunakan decorators khusus sebagai gantinya, seperti `@Body()` atau `@Query()`, yang tersedia langsung. Di bawah ini adalah daftar decorators yang disediakan dan objek platform khusus yang mereka wakili.

<table>
  <tbody>
    <tr>
      <td><code>@Request(), @Req()</code></td>
      <td><code>req</code></td></tr>
    <tr>
      <td><code>@Response(), @Res()</code><span class="table-code-asterisk">*</span></td>
      <td><code>res</code></td>
    </tr>
    <tr>
      <td><code>@Next()</code></td>
      <td><code>next</code></td>
    </tr>
    <tr>
      <td><code>@Session()</code></td>
      <td><code>req.session</code></td>
    </tr>
    <tr>
      <td><code>@Param(key?: string)</code></td>
      <td><code>req.params</code> / <code>req.params[key]</code></td>
    </tr>
    <tr>
      <td><code>@Body(key?: string)</code></td>
      <td><code>req.body</code> / <code>req.body[key]</code></td>
    </tr>
    <tr>
      <td><code>@Query(key?: string)</code></td>
      <td><code>req.query</code> / <code>req.query[key]</code></td>
    </tr>
    <tr>
      <td><code>@Headers(name?: string)</code></td>
      <td><code>req.headers</code> / <code>req.headers[name]</code></td>
    </tr>
    <tr>
      <td><code>@Ip()</code></td>
      <td><code>req.ip</code></td>
    </tr>
    <tr>
      <td><code>@HostParam()</code></td>
      <td><code

>req.hosts</code></td>
    </tr>
  </tbody>
</table>
<p><span class="table-code-asterisk">*</span> <code>@Res()</code> shortcut should not be used in combination with other <a href="https://docs.nestjs.com/controllers#route-parameters">shortcuts</a> or response handling decorators (e.g., <code>@HttpCode</code>, <code>@Header</code>, <code>@Render</code>, and <code>@Redirect</code>).<p>
