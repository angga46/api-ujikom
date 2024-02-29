const db = require("../database/models");
const produk = require("../database/models/produk");
const Produk = db.Produk;

// CREATE: Menambahkan data ke dalam tabel kategoris
exports.create = (req, res) => {
    // Validasi permintaan
    if (!req.body.nama_produk) {
        return res.status(400).send({
            message: "Nama produk tidak boleh kosong",
        });
    }

    // Data yang diperoleh dari inputan oleh pengguna
    const produk = {
        nama_produk: req.body.nama_produk,
        description: req.body.description,
        gambar: req.body.gambar,
        harga: req.body.harga,
        size_chart: req.body.size_chart,
        stok: req.body.stok,
    };

    // Proses menyimpan ke dalam database
    Produk.create(produk).then((result) => {
        res.json({
            message: "Kategori berhasil dibuat.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat membuat kategori.",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    Produk.findAll()
        .then((result) => {
            res.json({
                message: "Data Produks berhasil diambil.",
                data: result,
            });
        })
        .catch((err) => {
            console.error(err); // Tambahkan log error di sini
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat mengambil data Produks.",
                data: null,
            });
        });
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = (req, res) => {
    const id = req.params.id;

    // Field untuk memperbarui data produk
    const produkData = {
        nama_produk: req.body.nama_produk,
        description: req.body.description,
        gambar: req.body.gambar,
        harga: req.body.harga,
        size_chart: req.body.size_chart,
        stok: req.body.stok,
        // Tambahkan bidang lain sesuai kebutuhan
    };

    Produk.update(produkData, {
        where: { id },
    })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Produk berhasil diperbarui.",
                    data: produkData,
                });
            } else {
                res.json({
                    message: `Tidak dapat memperbarui produk dengan id=${id}. Mungkin produk tidak ditemukan atau req.body kosong!`,
                    data: produkData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat memperbarui produk.",
                data: null,
            });
        });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Produk.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Kategori berhasil dihapus.",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat menghapus kategori dengan id=${id}. Mungkin kategori tidak ditemukan!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus kategori.",
            data: null,
        });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
    Produk.findByPk(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).json({
                message: `Kategori dengan id=${req.params.id} tidak ditemukan.`,
                data: result,
            });
        }
        res.json({
            message: "Kategori berhasil ditemukan.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil kategori.",
            data: null,
        });
    });
};