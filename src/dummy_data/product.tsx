interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    daily_quota: number;
    reward_poin: number;
    status: string;
    product_type_id: number;
    consignation_id: number | null;
    photo: File | null;
}

interface ProductFetch {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    daily_quota: number;
    reward_poin: number;
    status: string;
    product_type_id: number;
    consignation_id: number | null;
    photo: string | null;
}

const produk_data: Product[] = [];

export { produk_data };
export type { Product, ProductFetch };
