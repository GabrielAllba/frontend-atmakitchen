interface Bahan {
    id?: number;
    nama: string;
    merk: string;
    harga: number;
    stok: number;
    satuan: string;
}

const bahan_data: Bahan[] = [];

export type { Bahan };
export { bahan_data };
