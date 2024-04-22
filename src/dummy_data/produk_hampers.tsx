import { Produk } from './produk';

interface ProdukHampers {
    id: number;
    produk: Produk;
    jumlah: number;
}

const hampers_data: ProdukHampers[] = [];

export { hampers_data };
export type { ProdukHampers };
