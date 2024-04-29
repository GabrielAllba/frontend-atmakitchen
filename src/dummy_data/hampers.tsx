import { ProdukHampers } from './produk_hampers';
import { Product, produk_data } from './product';

interface Hampers {
    id?: number;
    hampers_name?: string;
    price?: number;
    stock?: number;
    daily_quota?: number;
    photo?: File | null;
    deskripsi?: string;
    produk_hampers?: ProdukHampers[];
}

const hampers_data: Hampers[] = [];

export { hampers_data };
export type { Hampers };
