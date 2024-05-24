interface Transaction {
    id: number;
    user_id?: number;
    invoice_number?: string;
    lunas_pada?: string;
    tanggal_ambil?: string;
    nama_penerima?: string;
    alamat_penerima?: string;
    delivery?: string;
    transaction_status?: string;
    distance?: number;
    delivery_fee?: number;
    total_price?: number;
    transfer_nominal?: number;
    point_user?: number;
    point_income?: number;
    payment_date?: string;
    payment_proof?: File | null;
    ongkos_kirim?: number;
    poin_user?: number;
    total_poin_user?: number;
}

interface TransactionFetch {
    id: number;
    user_id?: number;
    invoice_number?: string;
    lunas_pada?: string;
    tanggal_ambil?: string;
    nama_penerima?: string;
    alamat_penerima?: string;
    delivery?: string;
    transaction_status?: string;
    distance?: number;
    delivery_fee?: number;
    total_price?: number;
    transfer_nominal?: number;
    point_user?: number;
    point_income?: number;
    payment_date?: string;
    payment_proof?: string | null;
    ongkos_kirim?: number;
    poin_user?: number;
    total_poin_user?: number;
}

export type { Transaction, TransactionFetch };
