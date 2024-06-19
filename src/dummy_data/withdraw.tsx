interface Withdraw {
    id?: number;
    user_id: number;
    amount: number;
    created_at: string;
    status: string;
    bank_name: string;
    account_no: string;
}

const withdraw_data: Withdraw[] = [];

export type { Withdraw };
export { withdraw_data };
