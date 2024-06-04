import { BahanResep } from '@/dummy_data/resep_bahan';
import React, { useState, useEffect } from 'react';

interface TableCekBahanProps {
    bahan: BahanResep;
    jumlahBarang: number;
}

const TableCekBahan: React.FC<TableCekBahanProps> = ({ bahan, jumlahBarang }) => {
    const [kekurangan, setKekurangan] = useState(false);

    useEffect(() => {
        const result = bahan.quantity! * jumlahBarang - (bahan.bahan?.stok || 0);
        if (result < 0) {
            setKekurangan(true);
        } else {
            setKekurangan(false);
        }
    }, [bahan, jumlahBarang]);

    const result = bahan.quantity! * jumlahBarang - (bahan.bahan?.stok || 0);

    return (
        <td className="p-2 border border-gray-300 text-left  table-cell text-gray-500">
            {result < 0 ? '-' : result + ' ' + (bahan.bahan?.satuan || '')}
        </td>
    );
};

export default TableCekBahan;
