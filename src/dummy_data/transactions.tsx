interface Transaction {
    id: number;
    nomor_transaksi: number;
    nama_pemesan: string;
    alamat: string;
    jarak: number;
    biaya: number;
    total: number;

}

const transaction_data: Transaction[] = [
    {
        id: 1,
        nomor_transaksi: 1001,
        nama_pemesan: "Andi Susanto",
        alamat: "Kaliurang",
        jarak: 0,
        biaya: 0,
        total: 30000
    },
    {
        id: 2,
        nomor_transaksi: 1002,
        nama_pemesan: "Budi Santoso",
        alamat: "Godean",
        jarak: 0,
        biaya: 0,
        total: 21000
    },
    {
        id: 3,
        nomor_transaksi: 1003,
        nama_pemesan: "Citra Dewi",
        alamat: "Gamping",
        jarak: 15.3,
        biaya: 30000,
        total: 35000
    },
    {
        id: 4,
        nomor_transaksi: 1004,
        nama_pemesan: "Dedi Pratama",
        alamat: "Bantul",
        jarak: 0,
        biaya: 0,
        total: 15000
    },
    {
        id: 5,
        nomor_transaksi: 1005,
        nama_pemesan: "Eka Sari",
        alamat: "Jombor",
        jarak: 0,
        biaya: 0,
        total: 45000
    }
];


export { transaction_data};
export type { Transaction };
