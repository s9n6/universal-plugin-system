export default class Ups {
    constructor() {
        this.plugins = [];
    }

    // Tambahkan plugin ke dalam ups
    use(plugin) {
        this.plugins.push(plugin);
    }

    // Jalankan semua plugin (sinkron, callback, atau Promise)
    async run(callback) {
        for (const plugin of this.plugins) {
            if (plugin.run) {
                // Jalankan plugin
                const result = plugin.run();

                // Tunggu jika `run` mengembalikan Promise
                if (result instanceof Promise) {
                    await result;
                }
            }
        }

        // Panggil callback jika disediakan
        if (callback && typeof callback === 'function') {
            callback();
        }
    }
}
