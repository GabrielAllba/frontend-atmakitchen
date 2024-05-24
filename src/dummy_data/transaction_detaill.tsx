import { HampersFetch } from './hampers';
import { Product, ProductFetch } from './product';

interface TransactionDetail {
    id?: number | null;
    invoice_number?: string | null;
    product?: ProductFetch;
    product_id?: number | null;
    product_quantity?: number | null;
    product_price?: number | null;
    hampers?: HampersFetch;
    hampers_id?: number | null;
    hampers_quantity?: number | null;
    hampers_price?: number | null;
    jenis?: string | null;
    tanggal_pengiriman?: string | null;
    transaction_status?: string | null;
    jenis_item?: string | null;
}

export type { TransactionDetail };
