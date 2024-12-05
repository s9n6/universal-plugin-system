import assert from 'assert';
import ups from '../lib/index.js';

// buat instance ups
const system = ups();

// variabel untuk melacak urutan eksekusi
let log = [];

// plugin sync
system.use({
    run: () => log.push('Plugin sync dijalankan!'),
});

// plugin callback
system.use({
    run: () => {
        log.push('Plugin callback mulai...');
        setTimeout(() => log.push('Plugin callback selesai!'), 15);
    },
});

// plugin Promise
system.use({
    run: async () => {
        log.push('Plugin Promise mulai...');
        await new Promise((resolve) => setTimeout(resolve, 15));
        log.push('Plugin Promise selesai!');
    },
});

// jalankan ups dan lakukan pengecekan
async function runTests() {
    // jalankan semua plugin
    await system.run(() => {
        log.push('Semua plugin selesai dijalankan!');
    });

    // cek urutan eksekusi
    assert.deepStrictEqual(
        log,
        [
            'Plugin sync dijalankan!',
            'Plugin callback mulai...',
            'Plugin Promise mulai...',
            'Plugin callback selesai!',
            'Plugin Promise selesai!',
            'Semua plugin selesai dijalankan!',
        ],
        'Urutan eksekusi plugin tidak sesuai'
    );
    console.log('Semua pengujian berhasil!');
}

runTests().catch((error) => {
    console.error('Pengujian gagal:', error);
});
