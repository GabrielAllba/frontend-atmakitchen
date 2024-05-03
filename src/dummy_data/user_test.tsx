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

const user_data: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        username: "john_doe",
        password: "password123",
        born_date: "1990-01-01",
        phone_number: "123456789",
        total_point: 100,
        role_id: 1,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        username: "jane_smith",
        password: "password456",
        born_date: "1995-05-15",
        phone_number: "987654321",
        total_point: 150,
        role_id: 2,
    },
];

export { user_data };
export type { User };
