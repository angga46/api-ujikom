const db = require("../database/models");
const Galeri = db.Galeri;

// CREATE: Menambahkan data ke dalam tabel kategoris
exports.create = (req, res) => {
    // Validasi permintaan
    if (!req.body.gambar) {
        return res.status(400).send({
            message: "Galeri tidak boleh kosong",
        });
    }

    // Data yang diperoleh dari inputan oleh pengguna
    const galeri = {
        gambar: req.body.gambar,
    };

    // Proses menyimpan ke dalam database
    Galeri.create(galeri).then((result) => {
        res.json({
            message: "Galeri berhasil dibuat.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat membuat Galeri.",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    Galeri.findAll()
        .then((result) => {
            res.json({
                message: "Data Galeri berhasil diambil.",
                data: result,
            });
        })
        .catch((err) => {
            console.error(err); // Tambahkan log error di sini
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat mengambil data Galeri.",
                data: null,
            });
        });
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = (req, res) => {
    const id = req.params.id;

    // Field untuk memperbarui data produk
    const galeriData = {
        gambar: req.body.gambar,
        // Tambahkan bidang lain sesuai kebutuhan
    };

    Galeri.update(galeriData, {
        where: { id },
    })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Galeri berhasil diperbarui.",
                    data: galeriData,
                });
            } else {
                res.json({
                    message: `Tidak dapat memperbarui Galeri dengan id=${id}. Mungkin produk tidak ditemukan atau req.body kosong!`,
                    data: galeriData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat memperbarui galeri.",
                data: null,
            });
        });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Galeri.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Galeri berhasil dihapus.",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat menghapus galeri dengan id=${id}. Mungkin kategori tidak ditemukan!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus Galeri.",
            data: null,
        });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
    Galeri.findByPk(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).json({
                message: `Galeri dengan id=${req.params.id} tidak ditemukan.`,
                data: result,
            });
        }
        res.json({
            message: "Galeri berhasil ditemukan.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil Galeri.",
            data: null,
        });
    });
};