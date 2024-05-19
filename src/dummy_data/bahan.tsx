interface Bahan {
    id?: number;
    nama: string;
    stok: number;
    satuan: string;
}

const bahan_data: Bahan[] = [];

export type { Bahan };
export { bahan_data };
