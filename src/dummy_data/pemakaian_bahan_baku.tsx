import { Bahan } from './bahan';
import { TransactionDetail } from './transaction_detaill';

interface PemakaianBahanBaku {
    id?: number;
    bahan_id: number;
    bahan?: Bahan;
    transaction_detail?: TransactionDetail;
    transaction_detail_id: number;
    jumlah: number;
    tanggal: string;
}

export type { PemakaianBahanBaku };
