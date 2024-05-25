interface PengeluaranLain {
    id?: number;
    deskripsi: string;
    harga: number;
    metode: string;
    tanggal_pengeluaran: string;
}

const pengeluaranLain_data: PengeluaranLain[] = [];

export type { PengeluaranLain };
export { pengeluaranLain_data };
