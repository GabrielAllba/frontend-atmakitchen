import { HampersFetch } from './hampers';
import { ProductFetch } from './product';

interface Cart {
    id?: number;
    user_id?: number;
    product_id?: number;
    product?: ProductFetch;
    jenis_item: string;
    hampers_id?: number;
    hampers?: HampersFetch;
    quantity: number;
    total_price: number;
    status?: string;
    jenis: string;
    tanggal_pengiriman?: string | null;
}
const cart_data: Cart[] = [
    {
        id: 1,
        jenis_item: 'Titipan',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 1,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,

            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Menunggu Jarak',
    },
    {
        id: 2,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 2,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,

            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Menunggu Pembayaran',
    },
    {
        id: 3,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 3,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'ready stock',

        status: 'Sudah Bayar',
    },
    {
        id: 4,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 4,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Pembayaran Terverifikasi',
    },
    {
        id: 5,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 5,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'ready stock',

        status: 'Diterima',
    },
    {
        id: 6,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 6,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Diproses',
    },
    {
        id: 7,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 7,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Siap di-pickup',
    },
    {
        id: 8,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 8,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'ready stock',

        status: 'Sedang dikirim',
    },
    {
        id: 9,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 9,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Sudah di-pickup',
    },
    {
        id: 10,
        jenis_item: 'Produk Toko',
        product: {
            photo: '/images/produk/kue.jpg',
            id: 10,
            name: 'Kue Stego',
            price: 259000,
            description: 'Kue Stego merupakan kue yang diproduksi di Bekasi menggunakan tepung maizena',
            stock: 100,
            daily_quota: 10,
            status: 'available',
            product_type_id: 1,
            consignation_id: null,
        },
        quantity: 1,
        total_price: 259000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',

        status: 'Selesai',
    },
    {
        id: 11,
        jenis_item: 'Hampers',
        hampers: {
            price: 210000,
            id: 1,
            hampers_name: 'Hampers A',
            photo: '/images/produk/kue3.jpg',
            deskripsi: 'Hampers A merupakan hampers yang diproduksi di Bekasi menggunakan tepung ',
            produk_hampers: [
                {
                    id: 1,
                    jumlah: 1,
                    product: {
                        id: 1,
                        name: 'Gourmet Wine',
                        price: 100000,
                        description: 'A fine selection of gourmet wine.',
                        stock: 20,
                        daily_quota: 5,
                        status: 'available',
                        product_type_id: 2,
                        consignation_id: null,
                        photo: '/images/produk/kue.jpg',
                    },
                },
                {
                    id: 2,
                    jumlah: 1,
                    product: {
                        id: 2,
                        name: 'Soto Babat',
                        price: 100000,
                        description: 'A fine selection of gourmet wine.',
                        stock: 20,
                        daily_quota: 5,
                        status: 'available',
                        product_type_id: 2,
                        consignation_id: null,
                        photo: '/images/produk/kue.jpg',
                    },
                },
            ],
        },
        quantity: 1,
        total_price: 260000,
        tanggal_pengiriman: '2022-10-10',

        jenis: 'pre-order',
        status: 'Menunggu Jarak',
    },
];

export type { Cart };
export { cart_data };
