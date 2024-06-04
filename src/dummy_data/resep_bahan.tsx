import { Bahan } from './bahan';
import { Product } from './product';
import { Resep } from './resep';

interface ResepBahan {
    id?: number;
    recipe_id: number;
    bahan: Bahan;
    quantity: number;
    unit: string;
    product_id?: number;
}

interface BahanResep {
    id?: number;
    resep: Resep;
    resep_id?: number;
    bahan?: Bahan;
    quantity?: number;
    unit?: string;
    product?: Product;
    product_id?: number;
}

const resep_bahan_data: ResepBahan[] = [];

export { resep_bahan_data };
export type { ResepBahan, BahanResep };
