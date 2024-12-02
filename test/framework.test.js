import assert from 'assert';
import framework from '../lib/index.js';

// Buat instance framework
const fw = framework();

// Variabel untuk melacak urutan eksekusi
let log = [];

// Tambahkan plugin sinkron
fw.use({
    run: () => {
        log.push('Plugin sinkron dijalankan!');
    },
});

// Tambahkan plugin dengan callback
fw.use({
    run: () => {
        log.push('Plugin callback mulai...');
        setTimeout(() => {
            log.push('Plugin callback selesai!');
        }, 15);
    },
});

// Tambahkan plugin Promise
fw.use({
    run: async () => {
        log.push('Plugin Promise mulai...');
        await new Promise((resolve) => setTimeout(resolve, 15));
        log.push('Plugin Promise selesai!');
    },
});

// Jalankan framework dan lakukan pengecekan
async function runTests() {
    await fw.run(() => {
        log.push('Semua plugin selesai dijalankan!');
    });

    // Cek urutan eksekusi
    assert.deepStrictEqual(
        log,
        [
            'Plugin sinkron dijalankan!',
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
