# Universal Plugin System

Tambahkan atau ganti plugin secara dinamis. Mendukung `sync`, `callback`, dan `promise`, sehingga fleksibel untuk berbagai kebutuhan pengembangan.

## Api

```js
// import
import ups from 'universal-plugin-system';

// buat instance ups
const system = ups();

// plugin sync
system.use({
    run: () => console.log('Plugin sync dijalankan!'),
});

// plugin callback
system.use({
    run: () => {
        console.log('Plugin callback mulai...');
        setTimeout(() => console.log('Plugin callback selesai!'), 15);
    },
});

// plugin Promise
system.use({
    run: async () => {
        console.log('Plugin Promise mulai...');
        await new Promise((resolve) => setTimeout(resolve, 15));
        console.log('Plugin Promise selesai!');
    },
});

// jalankan semua plugin
system.run(() => {
    console.log('Semua plugin selesai dijalankan!');
});
```

### Output:

```bash
Plugin sync dijalankan!
Plugin callback mulai...
Plugin Promise mulai...
Plugin callback selesai!
Plugin Promise selesai!
Semua plugin selesai dijalankan!
```
