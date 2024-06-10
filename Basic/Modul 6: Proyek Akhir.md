## Modul 6: Proyek Akhir

### Sesi 1: Perencanaan Proyek

#### Pengantar
Proyek akhir adalah kesempatan bagi Anda untuk mengaplikasikan semua yang telah dipelajari selama kursus ini. Anda akan merancang, mengembangkan, dan menyajikan sebuah aplikasi lengkap.

#### Langkah-Langkah Perencanaan
1. **Pilih Topik Proyek:** Pilih topik yang menarik dan menantang. Contoh proyek termasuk To-do List App, Weather App, atau Blog Sederhana.
2. **Definisikan Fitur Utama:** Tentukan fitur-fitur utama yang akan ada dalam aplikasi. Buat daftar fitur dan prioritasnya.
3. **Buat Wireframe:** Buat wireframe atau sketsa dari antarmuka pengguna (UI) aplikasi Anda.
4. **Tentukan Teknologi yang Digunakan:** Pilih teknologi dan alat yang akan digunakan, seperti HTML, CSS, JavaScript, framework (React, Vue), dan API.

#### Contoh Perencanaan Proyek
**Proyek: To-do List App**

**Fitur Utama:**
- Menambah tugas baru
- Mengedit tugas yang ada
- Menghapus tugas
- Menandai tugas sebagai selesai

**Wireframe:**
- Halaman utama dengan daftar tugas
- Formulir untuk menambah tugas
- Tombol untuk mengedit dan menghapus tugas

**Teknologi:**
- HTML untuk struktur
- CSS untuk styling
- JavaScript untuk interaksi
- LocalStorage untuk penyimpanan data tugas

---

### Sesi 2: Implementasi Proyek

#### Memulai Proyek
1. **Setup Proyek:** Buat folder proyek dan inisialisasi dengan npm.
    ```bash
    mkdir todo-app
    cd todo-app
    npm init -y
    ```

2. **Install Dependency:** Instal alat dan pustaka yang diperlukan.
    ```bash
    npm install react react-dom
    npm install --save-dev parcel
    ```

3. **Struktur Direktori:**
    ```
    todo-app/
    ├── src/
    │   ├── components/
    │   │   └── TodoItem.js
    │   │   └── TodoList.js
    │   └── App.js
    ├── index.html
    └── package.json
    ```

#### Mengembangkan Fitur Utama
1. **HTML dan CSS:**
    **File: index.html**
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>To-do List App</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="src/App.js"></script>
    </body>
    </html>
    ```

    **File: style.css**
    ```css
    body {
        font-family: Arial, sans-serif;
    }
    .todo-container {
        max-width: 600px;
        margin: 0 auto;
    }
    ```

2. **JavaScript:**
    **File: src/App.js**
    ```javascript
    import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    import TodoList from './components/TodoList';

    function App() {
        const [todos, setTodos] = useState([]);
        
        const addTodo = (text) => {
            const newTodo = { text, completed: false };
            setTodos([...todos, newTodo]);
        };

        return (
            <div className="todo-container">
                <h1>To-do List</h1>
                <input type="text" placeholder="Add a new task" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTodo(e.target.value);
                        e.target.value = '';
                    }
                }} />
                <TodoList todos={todos} />
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

    **File: src/components/TodoList.js**
    ```javascript
    import React from 'react';

    function TodoList({ todos }) {
        return (
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.text}
                    </li>
                ))}
            </ul>
        );
    }

    export default TodoList;
    ```

3. **Mengelola State:**
    **File: src/App.js (update)**
    ```javascript
    import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    import TodoList from './components/TodoList';

    function App() {
        const [todos, setTodos] = useState([]);
        
        const addTodo = (text) => {
            const newTodo = { text, completed: false };
            setTodos([...todos, newTodo]);
        };

        const toggleTodo = (index) => {
            const newTodos = [...todos];
            newTodos[index].completed = !newTodos[index].completed;
            setTodos(newTodos);
        };

        const deleteTodo = (index) => {
            const newTodos = todos.filter((todo, i) => i !== index);
            setTodos(newTodos);
        };

        return (
            <div className="todo-container">
                <h1>To-do List</h1>
                <input type="text" placeholder="Add a new task" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTodo(e.target.value);
                        e.target.value = '';
                    }
                }} />
                <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

    **File: src/components/TodoList.js (update)**
    ```javascript
    import React from 'react';

    function TodoList({ todos, toggleTodo, deleteTodo }) {
        return (
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => toggleTodo(index)}>Toggle</button>
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        );
    }

    export default TodoList;
    ```

#### Menyimpan Data ke LocalStorage
**File: src/App.js (update)**
```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    const addTodo = (text) => {
        const newTodo = { text, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((todo, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="todo-container">
            <h1>To-do List</h1>
            <input type="text" placeholder="Add a new task" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTodo(e.target.value);
                    e.target.value = '';
                }
            }} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

---

### Sesi 3: Review Kode dan Penilaian Proyek

#### Review Kode
1. **Self Review:** Sebelum menyerahkan proyek, lakukan review kode Anda sendiri.
   - Apakah kode mudah dibaca dan dipahami?
   - Apakah ada komentar yang menjelaskan bagian kode yang kompleks?
   - Apakah ada potensi bug atau masalah performa?

2. **Peer Review:** Mintalah teman atau rekan untuk melakukan review kode Anda.
   - Dapatkan masukan tentang kualitas kode dan desain aplikasi.
   - Diskusikan perubahan atau perbaikan yang diperlukan.

#### Penilaian Proyek
Proyek akan dinilai berdasarkan beberapa kriteria, termasuk:
- **Fungsionalitas:** Apakah semua fitur utama berfungsi sebagaimana mestinya?
- **Kualitas Kode:** Apakah kode bersih, terstruktur, dan terdokumentasi dengan baik?
- **Desain UI/UX:** Apakah antarmuka pengguna intuitif dan mudah digunakan?
- **Inovasi:** Apakah ada fitur tambahan atau aspek unik dalam proyek Anda?

#### Contoh Rubrik Penilaian:
| Kriteria           | Poin Maksimal | Poin Dicapai |
|--------------------|----------------|--------------|
| Fungsionalitas     | 40             |              |
| Kualitas Kode      | 30             |              |
| Desain UI/UX       | 20             |              |
| Inovasi            | 10             |             

 |
| **Total**          | **100**        |              |

---

### Sesi 4: Presentasi Proyek

#### Menyiapkan Presentasi
1. **Buat Slide Presentasi:**
   - **Pendahuluan:** Perkenalkan diri dan proyek Anda.
   - **Fitur Utama:** Jelaskan fitur-fitur utama dari aplikasi Anda.
   - **Demo Aplikasi:** Tunjukkan aplikasi Anda secara langsung.
   - **Tantangan dan Solusi:** Ceritakan tantangan yang dihadapi dan bagaimana Anda mengatasinya.
   - **Penutup:** Sampaikan kesimpulan dan rencana pengembangan di masa depan.

2. **Latihan Presentasi:**
   - Latihan berbicara di depan teman atau rekan.
   - Minta masukan untuk perbaikan.

#### Pelaksanaan Presentasi
1. **Pendahuluan:** Sampaikan siapa Anda dan tujuan proyek Anda.
2. **Fitur Utama:** Jelaskan fitur-fitur utama secara singkat dan jelas.
3. **Demo Aplikasi:** Tunjukkan aplikasi Anda berfungsi. Fokus pada fitur utama.
4. **Tanya Jawab:** Bersiaplah untuk menjawab pertanyaan dari penonton atau penguji.

---

Dengan materi ini, siswa akan memiliki panduan lengkap untuk merencanakan, mengembangkan, mereview, menilai, dan mempresentasikan proyek akhir mereka. Proyek ini adalah kesempatan untuk mengintegrasikan semua pengetahuan dan keterampilan yang telah diperoleh selama kursus.
