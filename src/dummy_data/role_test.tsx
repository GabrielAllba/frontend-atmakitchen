interface Role {
    id: number;
    name: string;
    gaji_harian: number;
}

const role_data: Resep[] = [
    {
        id: 1,
        name: 'manajer',
        gaji_harian: 100.000,
    },
    {
        id: 2,
        name: 'CEO',
        gaji_harian: 200.000,
    },
    
];

export { role_data };
export type { Role };
