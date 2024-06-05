'use client';

import { Bahan } from '@/dummy_data/bahan';
import { PemakaianBahanBaku } from '@/dummy_data/pemakaian_bahan_baku';
import { PembelianBahanBaku } from '@/dummy_data/pembelian_bahan_baku';
import { Listbox } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

export default function ListPemakaianBahan() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [alertError, setAlertError] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<PemakaianBahanBaku[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const formatDate = (date: any) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const today = formatDate(new Date());

    const fetchSearchResults = async () => {
        setLoading(true);

        try {
            const response = await axios.get(apiUrl + '/pemakaian_bahan_baku');

            if (response.status !== 400) {
                setFilteredData(response.data.pemakaian_bahan_baku);
            } else {
                console.error('Received status 400 from server');
            }
        } catch (error) {
            console.error('Error fetching bahan baku:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBahan = async () => {
        setLoading(true);

        try {
            const response = await axios.get(apiUrl + '/bahan');

            if (response.status !== 400) {
                setFilteredData(response.data.bahan);
            } else {
                console.error('Received status 400 from server');
            }
        } catch (error) {
            console.error('Error fetching bahan baku:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);

    useEffect(() => {
        fetchBahan();
    }, []);

    return (
        <div className=" w-full">
            <div className="card bg-primary border pb-8 rounded ">
                <div className="card-body ">
                    <div className="flex items-center pb-4 w-full justify-between">
                        <p className="text-[#AA2B2B] font-semibold">Pemakaian Bahan Baku</p>
                    </div>

                    <div className="overflow-auto">
                        <table className="table-auto w-full overflow-auto">
                            <thead>
                                <tr className="border">
                                    <th className="p-8 border text-start font-semibold">ID</th>
                                    <th className="p-8 border text-start font-semibold">Bahan Baku</th>
                                    <th className="p-8 border text-start font-semibold">Jumlah</th>
                                    <th className="p-8 border text-start font-semibold">Detail Transaksi</th>
                                    <th className="p-8 border text-start font-semibold">Tanggal Proses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id} className="border text-[#7D848C]">
                                        <td className="p-4 border">{item.id}</td>
                                        <td className="p-4 border">{item.bahan?.nama}</td>
                                        <td className="p-4 border">{item.jumlah + ' ' + item.bahan?.satuan}</td>
                                        <td className="p-4 border">
                                            {item.transaction_detail?.id} - {item.transaction_detail?.invoice_number}
                                        </td>
                                        <td className="p-4 border text-[#AA2B2B]">{item.tanggal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!loading && currentItems.length === 0 && (
                            <div className="flex justify-center items-center font-poppins text-black text-center mt-10">
                                <p className="font-poppins text-gray-400">Data tidak ditemukan</p>
                            </div>
                        )}

                        {!loading && (
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-4 border"
                                >
                                    Previous
                                </button>
                                {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`p-4 ${
                                            currentPage === index + 1
                                                ? 'bg-[#AA2B2B] text-white'
                                                : 'bg-white text-black border'
                                        } `}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                                    className="p-4 border"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                    {loading && (
                        <div className="flex justify-center items-center font-poppins text-black text-center mt-4">
                            <span className="loading loading-ring loading-lg"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
