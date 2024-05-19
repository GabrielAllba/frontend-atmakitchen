import { Bahan } from './bahan';

interface PembelianBahanBaku {
    id?: number;
    bahan?: Bahan;
    bahan_id: number;
    jumlah: number;
    keterangan: string;
    tanggal_pembelian: string;
}

export type { PembelianBahanBaku };
