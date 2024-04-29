import { Product } from './product';

interface ProdukHampers {
    id: number;
    produk: Product;
    jumlah: number;
}

const hampers_data: ProdukHampers[] = [];

export { hampers_data };
export type { ProdukHampers };
