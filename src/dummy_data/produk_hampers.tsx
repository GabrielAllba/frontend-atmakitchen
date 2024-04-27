import { Produk } from './product';

interface ProdukHampers {
    id: number;
    produk: Produk;
    jumlah: number;
}

const hampers_data: ProdukHampers[] = [];

export { hampers_data };
export type { ProdukHampers };
