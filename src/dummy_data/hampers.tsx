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

interface HampersFetch {
    id?: number;
    hampers_name?: string;
    price?: number;
    stock?: number;
    daily_quota?: number;
    photo?: string | null;
    deskripsi?: string;
    produk_hampers?: ProdukHampers[];
}

export type { Hampers, HampersFetch };
