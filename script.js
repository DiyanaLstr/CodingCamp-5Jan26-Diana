// Ambil Semua Elemen yang Dibutuhkan dari HTML
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const todoContainer = document.getElementById('todoContainer');
const filterBtn = document.getElementById('filterBtn');

// Ambil Data Todo dari LocalStorage atau Buat Array Baru
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Fungsi Simpan Data ke LocalStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi Tampilkan Semua Todo
function renderTodos(daftarTodo = todos) {
    // Kosongkan Konten Sebelumnya
    todoContainer.innerHTML = '';

    // Jika Tidak Ada Todo
    if (daftarTodo.length === 0) {
        todoContainer.innerHTML = '<p>Tidak ada task ditemukan</p>';
        return;
         }

    // Tambahkan Setiap Todo ke Halaman
    daftarTodo.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.innerHTML = `
            <div>${todo.task}</div>
            <div>${new Date(todo.date).toLocaleDateString('id-ID')}</div>
            <button class="delete-btn" data-index="${index}">Hapus</button>
        `;
        todoContainer.appendChild(todoItem);
    });
}

// Fungsi Tambah Todo Baru
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Jangan Reload Halaman

    const namaTask = taskInput.value.trim();
    const tanggalTask = dateInput.value;

    // Validasi Input
    if (namaTask.length < 3) {
        alert('Task harus minimal 3 karakter ya!');
        return;
  }
    if (!tanggalTask) {
        alert('Silakan pilih tanggal jatuh tempo!');
        return;
    }

    // Tambah Todo ke Array
    todos.push({ task: namaTask, date: tanggalTask });
    saveTodos(); // Simpan ke LocalStorage
    renderTodos(); // Tampilkan Kembali

    // Reset Form Setelah Ditambah
    todoForm.reset();
});

// Fungsi Hapus Todo
todoContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const indexTodo = parseInt(event.target.dataset.index);
        todos.splice(indexTodo, 1); // Hapus dari Array
        saveTodos(); // Simpan Perubahan
        renderTodos(); // Tampilkan Kembali
    }
});
// Fungsi Filter Todo Hari Ini
filterBtn.addEventListener('click', () => {
    const tanggalHariIni = new Date().toISOString().split('T')[0];
    const todoHariIni = todos.filter(todo => todo.date === tanggalHariIni);
    renderTodos(todoHariIni);
});

// Tampilkan Todo Saat Halaman Dimasukkan
renderTodos();