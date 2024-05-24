interface Transaction {
    id?: number | null;
    user_id?: number | null;
    invoice_number?: string | null;
    lunas_pada?: string | null;
    tanggal_ambil?: string | null;
    nama_penerima?: string | null;
    alamat_penerima?: string | null;
    no_telp_penerima?: string | null;
    delivery?: string | null;
    transaction_status?: string | null;
    distance?: number | null;
    delivery_fee?: number | null;
    total_price?: number | null;
    transfer_nominal?: number | null;
    point_user?: number | null;
    point_income?: number | null;
    payment_date?: string | null;
    payment_proof?: File | null;
    total_poin_user?: number | null;
}

interface TransactionFetch {
    id?: number | null;
    user_id?: number | null;
    invoice_number?: string | null;
    lunas_pada?: string | null;
    tanggal_ambil?: string | null;
    nama_penerima?: string | null;
    alamat_penerima?: string | null;
    no_telp_penerima?: string | null;
    delivery?: string | null;
    transaction_status?: string | null;
    distance?: number | null;
    delivery_fee?: number | null;
    total_price?: number | null;
    transfer_nominal?: number | null;
    point_user?: number | null;
    point_income?: number | null;
    payment_date?: string | null;
    payment_proof?: string | null | null;

    total_poin_user?: number | null;
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
