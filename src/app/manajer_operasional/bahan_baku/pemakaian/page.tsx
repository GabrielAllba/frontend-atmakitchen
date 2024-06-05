'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import { Alert } from '@mui/material';
import { PembelianBahanBaku } from '@/dummy_data/pembelian_bahan_baku';
import { Bahan } from '@/dummy_data/bahan';
import ListBahan from '@/app/components/manajer_operasional/ListBahan';
import ListPemakaianBahan from '@/app/components/manajer_operasional/ListPemakaianBahan';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const PemakaianBahanBaku: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [alertError, setAlertError] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<PembelianBahanBaku[]>([]);

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

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    const handleFromDateChange = (event: any) => {
        setFromDate(event.target.value);
        if (new Date(event.target.value) > new Date(toDate)) {
            setToDate(event.target.value);
        }
    };

    const handleToDateChange = (event: any) => {
        setToDate(event.target.value);
    };

    const fetchSearchResults = async () => {
        setLoading(true);

        try {
            const response = await axios.get(apiUrl + '/pembelian_bahan_baku/search', {
                params: {
                    from_date: fromDate,
                    to_date: toDate,
                    query: searchQuery,
                },
            });

            if (response.status !== 400) {
                setFilteredData(response.data.pembelian_bahan_baku);
            } else {
                console.error('Received status 400 from server');
            }
        } catch (error) {
            console.error('Error fetching pembelian bahan baku:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
        if (fromDate) console.log(fromDate);
        console.log(toDate);
    }, [fromDate, toDate, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if (searchQuery == '') {
        }
    };
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(apiUrl + `/pembelian_bahan_baku/${id}`);
            fetchSearchResults();
        } catch (error) {
            console.error('Error deleting pembelian bahan baku:', error);
            setAlertError(true);
        }
    };

    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            {alertError && (
                <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                    <Alert
                        severity="error"
                        className="font-poppins mb-4"
                        onClose={() => {
                            setAlertError(false);
                        }}
                    >
                        <p>Gagal menghapus pembelian bahan baku!</p>
                    </Alert>
                </div>
            )}

            <ListPemakaianBahan></ListPemakaianBahan>
        </div>
    );
};

export default PemakaianBahanBaku;
