const db = require("../database/models");
const Kontak = db.kontak;

// CREATE: Menambahkan data ke dalam tabel kategoris
exports.create = (req, res) => {
    // Validasi permintaan
    if (!req.body.email) {
        return res.status(400).send({
            message: "Kontak tidak boleh kosong",
        });
    }

    // Data yang diperoleh dari inputan oleh pengguna
    const kontak = {
        email: req.body.email,
        nama: req.body.nama,
        pesan: req.body.pesan,
    };

    // Proses menyimpan ke dalam database
    Kontak.create(kontak).then((result) => {
        res.json({
            message: "kontak berhasil dibuat.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat membuat kontak.",
            data: null,
        });
    });
};

exports.findAll = (req, res) => {
    Kontak.findAll()
        .then((result) => {
            res.json({
                message: "Data Kontak berhasil diambil.",
                data: result,
            });
        })
        .catch((err) => {
            console.error(err); // Tambahkan log error di sini
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat mengambil data Kontak.",
                data: null,
            });
        });
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = (req, res) => {
    const id = req.params.id;

    // Field untuk memperbarui data produk
    const kontakData = {
        email: req.body.email,
        nama: req.body.nama,
        pesan: req.body.pesan,
        // Tambahkan bidang lain sesuai kebutuhan
    };

    Kontak.update(kontakData, {
        where: { id },
    })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Kontak berhasil diperbarui.",
                    data: kontakData,
                });
            } else {
                res.json({
                    message: `Tidak dapat memperbarui kontak dengan id=${id}. Mungkin produk tidak ditemukan atau req.body kosong!`,
                    data: kontakData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat memperbarui kontak.",
                data: null,
            });
        });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Kontak.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "kontak berhasil dihapus.",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat menghapus kontak dengan id=${id}. Mungkin kategori tidak ditemukan!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus kontak.",
            data: null,
        });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
    Kontak.findByPk(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).json({
                message: `kontak dengan id=${req.params.id} tidak ditemukan.`,
                data: result,
            });
        }
        res.json({
            message: "Kontak berhasil ditemukan.",
            data: result,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil kontak.",
            data: null,
        });
    });
};