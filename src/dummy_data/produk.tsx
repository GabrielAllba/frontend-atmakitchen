interface Produk {
    id: number;
    nama: string;
    ready_stock: number;
    harga: number;
    foto: string;
}

const produk_data: Produk[] = [
    {
        id: 1,
        nama: 'Produk 1',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 2,
        nama: 'Produk 2',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 3,
        nama: 'Produk 3',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    {
        id: 4,
        nama: 'Produk 4',
        ready_stock: 2,
        harga: 100000,
        foto: '/images/produk/kue.jpg',
    },
    {
        id: 5,
        nama: 'Produk 5',
        ready_stock: 2,
        harga: 150000,
        foto: '/images/produk/kue2.jpg',
    },
    {
        id: 6,
        nama: 'Produk 6',
        ready_stock: 2,
        harga: 200000,
        foto: '/images/produk/kue3.jpg',
    },
    // Add more data if needed
];

export { produk_data };
export type { Produk };
