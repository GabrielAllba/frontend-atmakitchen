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
const produk_data: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        description: 'Description of Product 1',
        stock: 100,
        daily_quota: 50,
        reward_poin: 5,
        status: 'active',
        product_type_id: 1,
        consignation_id: null,
        photo: null, // You can add the file object here if needed
    },
    {
        id: 2,
        name: 'Product 2',
        price: 20.5,
        description: 'Description of Product 2',
        stock: 50,
        daily_quota: 25,
        reward_poin: 3,
        status: 'inactive',
        product_type_id: 2,
        consignation_id: 1,
        photo: null, // You can add the file object here if needed
    },
];

export { produk_data };
export type { Product };
