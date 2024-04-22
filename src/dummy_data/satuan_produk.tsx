interface SatuanProduk {
    id?: number;
    nama?: string;
}

const satuan_produk_data: SatuanProduk[] = [
    {
        id: 1,
        nama: 'Loyang',
    },
    {
        id: 2,
        nama: 'Pieces',
    },
];

export { satuan_produk_data };
export type { SatuanProduk };
