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
    poin_user?: number;
    total_poin_user?: number;
}

const transaction_data: Transaction[] = [
    {
        id: 1,
        invoice_number: '1001',
        nama_penerima: 'Andi Susanto',
        alamat_penerima: 'Kaliurang',
        distance: 0,
        delivery_fee: 0,
        total_price: 30000,
    },
    {
        id: 2,
        invoice_number: '1002',
        nama_penerima: 'Budi Santoso',
        alamat_penerima: 'Godean',
        distance: 0,
        delivery_fee: 0,
        total_price: 21000,
    },
    {
        id: 3,
        invoice_number: '1003',
        nama_penerima: 'Citra Dewi',
        alamat_penerima: 'Gamping',
        distance: 15.3,
        delivery_fee: 30000,
        total_price: 35000,
    },
    {
        id: 4,
        invoice_number: '1004',
        nama_penerima: 'Dedi Pratama',
        alamat_penerima: 'Bantul',
        distance: 0,
        delivery_fee: 0,
        total_price: 15000,
    },
    {
        id: 5,
        invoice_number: '1005',
        nama_penerima: 'Eka Sari',
        alamat_penerima: 'Jombor',
        distance: 0,
        delivery_fee: 0,
        total_price: 45000,
    },
];

export type { Transaction, TransactionFetch };
export { transaction_data };
