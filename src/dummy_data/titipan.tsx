interface Titipan {
    id: number;
    id_penitip: number;
    nama_titipan: string;
    foto_titipan: string;
    kuantitas: string;
    satuan: string;
    harga: number;
}

const titipan_data: Titipan[] = [
    {
        id: 1,
        id_penitip: 1,
        nama_titipan: 'Buku',
        foto_titipan: '/images/produk/kue.jpg',
        kuantitas: '2',
        satuan: 'Pieces',
        harga: 200000,
    },
    {
        id: 2,
        id_penitip: 2,
        nama_titipan: 'Laptop',
        foto_titipan: '/images/produk/kue.jpg',
        kuantitas: '1',
        satuan: 'Kg',
        harga: 200000,
    },
    {
        id: 3,
        id_penitip: 3,
        nama_titipan: 'Pakaian',
        foto_titipan: '/images/produk/kue.jpg',
        kuantitas: '5',
        satuan: 'Pieces',
        harga: 200000,
    },
];

export { titipan_data };
export type { Titipan };
