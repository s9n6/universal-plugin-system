# Universal Plugin System

Universal Plugin System adalah framework yang memungkinkan pengembang untuk menambahkan atau mengganti fitur secara dinamis melalui penggunaan plugin. Framework ini mendukung **plugin sinkron**, **callback**, dan **Promise** sehingga cocok untuk berbagai kebutuhan pengembangan.

## Fitur Utama

-   **Mendukung Plugin Dinamis:** Tambahkan atau modifikasi plugin saat runtime tanpa memengaruhi alur kerja lainnya.
-   **Eksekusi Fleksibel:** Jalankan plugin dengan metode sinkron, callback, atau berbasis Promise sesuai kebutuhan.
-   **Multi-Instance:** Kelola pipeline plugin terpisah untuk beberapa instance framework dalam satu aplikasi.
-   **Dapat Disesuaikan:** Sesuaikan framework untuk kebutuhan spesifik Anda melalui arsitektur modular.

## Instalasi

```bash
npm install universal-plugin-system
```

## Penggunaan

Framework ini dirancang untuk menjalankan plugin yang memperluas fungsionalitasnya.

### Contoh Penggunaan

```js
import framework from 'universal-plugin-system';

// Buat instance framework
const fw = framework();

// Plugin sinkron
fw.use({
    run: () => {
        console.log('Plugin sinkron dijalankan!');
    },
});

// Plugin callback
fw.use({
    run: () => {
        console.log('Plugin callback mulai...');
        setTimeout(() => {
            console.log('Plugin callback selesai!');
        }, 15);
    },
});

// Plugin Promise
fw.use({
    run: async () => {
        console.log('Plugin Promise mulai...');
        await new Promise((resolve) => setTimeout(resolve, 15));
        console.log('Plugin Promise selesai!');
    },
});

// Jalankan framework
fw.run(() => {
    console.log('Semua plugin selesai dijalankan!');
});
```

### Output:

```bash
Plugin sinkron dijalankan!
Plugin callback mulai...
Plugin Promise mulai...
Plugin callback selesai!
Plugin Promise selesai!
Semua plugin selesai dijalankan!
```

## API Referensi

### `framework()`

Fungsi utama untuk membuat instance framework.

-   **Return:** Instance framework baru.

### `use(plugin: { run: Function })`

Menambahkan plugin ke pipeline framework.

-   **plugin:** Objek dengan fungsi `run`, yang menentukan logika plugin.

### `run(callback?: Function)`

Menjalankan semua plugin di pipeline framework.

-   **callback:** Fungsi opsional yang dipanggil setelah semua plugin selesai.

## Membuat Instance Framework

Framework menyediakan fungsi `framework()` untuk membuat instance baru. Setiap instance memiliki pipeline plugin independen.

### Contoh

```js
import framework from 'universal-plugin-system';

const fw1 = framework(); // Instance pertama
const fw2 = framework(); // Instance kedua
```

## Multi-Instance Framework

Beberapa instance framework dapat berjalan secara paralel atau terpisah, memungkinkan pengelolaan plugin yang modular dan fleksibel.

### Contoh

```js
const fw1 = framework();
const fw2 = framework();

fw1.use({
    run: () => console.log('Plugin di fw1 dijalankan!'),
});

fw2.use({
    run: () => console.log('Plugin di fw2 dijalankan!'),
});

fw1.run(); // Output: Plugin di fw1 dijalankan!
fw2.run(); // Output: Plugin di fw2 dijalankan!
```

## Catatan

-   **Pipeline Terpisah:** Setiap instance framework memiliki pipeline plugin yang independen.
-   **Fleksibilitas Modular:** Instance framework dapat digunakan untuk kebutuhan aplikasi yang berbeda.

## Lisensi

[MIT](LICENSE)
