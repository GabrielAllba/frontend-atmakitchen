interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    daily_quota: number;
    status: string;
    product_type_id: number;
    consignation_id: number | null;
    photo: File | null;
    tag?: string;
}

interface ProductFetch {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    daily_quota: number;
    status: string;
    product_type_id: number;
    consignation_id: number | null;
    photo: string | null;
    tag?: string;
}

const produk_data: Product[] = [];

export { produk_data };
export type { Product, ProductFetch };
