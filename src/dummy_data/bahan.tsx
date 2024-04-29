interface Bahan {
    id: number;
    nama: string;
    merk: string;
    harga: number;
    stok: number;
    satuan: string;
}

const bahan_data: Bahan[] = [
    {
        id: 1,
        nama: 'Telur',
        merk: 'Super Omega 3',
        harga: 1500,
        stok: 90,
        satuan: 'butir',
    },
    {
        id: 2,
        nama: 'Tepung Terigu',
        merk: 'Segitiga Biru',
        harga: 12,
        stok: 4000,
        satuan: 'gram',
    },
    {
        id: 3,
        nama: 'Butter',
        merk: 'Wisman',
        harga: 329,
        stok: 1500,
        satuan: 'gram',
    },
    {
        id: 4,
        nama: 'Gula Pasir',
        merk: 'Rose Brand',
        harga: 18,
        stok: 1500,
        satuan: 'gram',
    },
    {
        id: 5,
        nama: 'Garam',
        merk: 'Dolphin',
        harga: 20,
        stok: 1500,
        satuan: 'gram',
    },
    {
        id: 6,
        nama: 'Susu Bubuk',
        merk: 'Dancow',
        harga: 34,
        stok: 1500,
        satuan: 'gram',
    },
    {
        id: 7,
        nama: 'Selai Strawberry',
        merk: 'Goldenfil',
        harga: 48,
        stok: 1500,
        satuan: 'gram',
    },
];

export { bahan_data };
export type { Bahan };