import { ProdukHampers } from './produk_hampers';
import { Produk, produk_data } from './produk';

interface Hampers {
    id?: number;
    nama?: string;
    harga?: number;
    ready_stock?: number;
    quota_harian_po?: number;
    foto_hampers?: string;
    deskripsi?: string;
    produk_hampers?: ProdukHampers[];
}

const hampers_data: Hampers[] = [
    {
        id: 1,
        nama: 'Hampers A',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers A',
        produk_hampers: [
            { id: 1, produk: produk_data[0], jumlah: 2 },
            { id: 2, produk: produk_data[1], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Hampers B',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers B',
        produk_hampers: [
            { id: 1, produk: produk_data[1], jumlah: 2 },
            { id: 2, produk: produk_data[2], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
    {
        id: 3,
        nama: 'Hampers C',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers C',
        produk_hampers: [
            { id: 1, produk: produk_data[2], jumlah: 2 },
            { id: 2, produk: produk_data[3], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
    {
        id: 4,
        nama: 'Hampers D',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers D',
        produk_hampers: [
            { id: 1, produk: produk_data[3], jumlah: 2 },
            { id: 2, produk: produk_data[4], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Hampers E',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers E',
        produk_hampers: [
            { id: 1, produk: produk_data[3], jumlah: 2 },
            { id: 2, produk: produk_data[4], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
    {
        id: 6,
        nama: 'Hampers F',
        harga: 250000,
        deskripsi: 'Deskripsi Hampers F',
        produk_hampers: [
            { id: 1, produk: produk_data[3], jumlah: 2 },
            { id: 2, produk: produk_data[4], jumlah: 1 },
        ],
        ready_stock: 10,
        quota_harian_po: 10,
        foto_hampers: '/images/produk/kue.jpg',
    },
];

export { hampers_data };
export type { Hampers };
