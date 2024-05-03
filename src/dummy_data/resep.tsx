interface Resep {
    id?: number;
    instruction: string;
    product_id: number;
}

const resep_data: Resep[] = [];

export { resep_data };
export type { Resep };
