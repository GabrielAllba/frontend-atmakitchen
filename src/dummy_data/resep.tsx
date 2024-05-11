import { ResepBahan } from './resep_bahan';

interface Resep {
    id?: number;
    bahan_resep?: ResepBahan[];
    instruction: string;
    product_id: number;
}

const resep_data: Resep[] = [];

export { resep_data };
export type { Resep };
