interface Consignment {
    id?: number;
    name: string;
    address: string;
    phone_number: string;
    bank_account: string;
    bank_number: string;
}

const consignment_data: Consignment[] = [];

export type { Consignment };
export { consignment_data };