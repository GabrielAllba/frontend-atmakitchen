interface TransactionDetail {
    id?: number;
    invoice_number?: string;
    product_id?: number;
    product_quantity?: number;
    product_price?: number;
    hampers_id?: number;
    hampers_quantity?: number;
    hampers_price?: number;
}

export type { TransactionDetail };
