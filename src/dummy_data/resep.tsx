interface Resep {
    nomor: number;
    nama: string;
    foto: string;
    bahan: string;
}

const resep_data: Resep[] = [
    {
        nomor: 1,
        nama: 'Produk 1',
        foto: '/images/produk/kue.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    {
        nomor: 2,
        nama: 'Produk 2',
        foto: '/images/produk/kue2.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    {
        nomor: 3,
        nama: 'Produk 3',
        foto: '/images/produk/kue3.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    {
        nomor: 4,
        nama: 'Produk 4',
        foto: '/images/produk/kue.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    {
        nomor: 5,
        nama: 'Produk 5',
        foto: '/images/produk/kue2.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    {
        nomor: 6,
        nama: 'Produk 6',
        foto: '/images/produk/kue3.jpg',
        bahan: '500 gr mentega (butter) \n 50 gr krimer (creamer) \n 50 butir telur \n300 gr gula pasir \n100 gr susu bubuk \n20 gr tepung terigu'
    },
    // Add more data if needed
];

export { resep_data };
export type { Resep };
