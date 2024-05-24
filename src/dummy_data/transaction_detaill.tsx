interface TransactionDetail {
    id?: number | null;
    invoice_number?: string | null;
    product_id?: number | null;
    product_quantity?: number | null;
    product_price?: number | null;
    hampers_id?: number | null;
    hampers_quantity?: number | null;
    hampers_price?: number | null;
}

export type { TransactionDetail };
