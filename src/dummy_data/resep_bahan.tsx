import { Bahan } from './bahan';

interface ResepBahan {
    id?: number;
    recipe_id: number;
    bahan: Bahan;
    quantity: number;
    unit: string;
}

const resep_bahan_data: ResepBahan[] = [];

export { resep_bahan_data };
export type { ResepBahan };
