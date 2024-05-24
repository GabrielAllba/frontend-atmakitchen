import { Product, ProductFetch } from './product';

interface ProdukHampers {
    id?: number;
    product: Product | ProductFetch;
    jumlah: number;
}

const hampers_data: ProdukHampers[] = [];

export { hampers_data };
export type { ProdukHampers };
