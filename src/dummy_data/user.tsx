interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    born_date: string;
    phone_number: string;
    total_point: number;
    role_id: number;
}
const user_data: User[] = [];

export type { User };
export default { user_data };
