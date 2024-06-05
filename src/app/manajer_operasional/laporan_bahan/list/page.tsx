'use client';
import React, { useState, useEffect, use, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';
import { ProductFetch } from '@/dummy_data/product';
import axios from 'axios';
import { Alert } from '@mui/material';
import { PembelianBahanBaku } from '@/dummy_data/pembelian_bahan_baku';
import { Bahan } from '@/dummy_data/bahan';
import ListBahan from '@/app/components/manajer_operasional/ListBahan';
import { ProductSale } from '@/dummy_data/product_sale';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { IoPrintOutline } from 'react-icons/io5';
import { PemakaianBahanBaku } from '@/dummy_data/pemakaian_bahan_baku';

const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

const List: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [alertError, setAlertError] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<PemakaianBahanBaku[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const formatMonthYear = (date: any) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;

        return [year, month].join('-');
    };

    const period = formatMonthYear(new Date());

    const [fromDate, setFromDate] = useState(period);

    const handleFromDateChange = (event: any) => {
        setFromDate(event.target.value);
    };

    const fetchSearchResults = async () => {
        setFilteredData([]);
        setLoading(true);
        try {
            setLoading(true);
            axios({
                method: 'get',
                url: `${apiUrl}/pemakaian_bahan_baku`,
            }).then((response) => {
                setFilteredData(response.data.pemakaian_bahan_baku);
                const data = response.data.pemakaian_bahan_baku;

                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching bahans:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSearchResults();
        if (fromDate) console.log(fromDate);
    }, [fromDate]);

    const getToday = (): string => {
        const today = new Date();
        today.setDate(today.getDate());
        return today.toISOString().split('T')[0];
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const getMonthName = (monthNumber: any) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        return monthNames[monthNumber - 1];
    };
    const [year, month] = fromDate.split('-');
    const monthName = getMonthName(parseInt(month, 10));
    const componentRef = useRef(null);

    const onBeforeGetContentResolve = useRef<any>(null);

    const [text, setText] = useState('old boring text');

    const handleAfterPrint = useCallback(() => {
        console.log('`onAfterPrint` called');
    }, []);

    const handleBeforePrint = useCallback(() => {
        console.log('`onBeforePrint` called');
    }, []);

    const handleOnBeforeGetContent = useCallback(() => {
        console.log('`onBeforeGetContent` called');
        setLoading(true);
        setText('Loading new text...');

        return new Promise<void>((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText('New, Updated Text!');
                resolve();
            }, 2000);
        });
    }, []);

    useEffect(() => {
        if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current();
        }
    }, [text]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        onBeforeGetContent: handleOnBeforeGetContent,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
    });
    const reactToPrintTrigger = React.useCallback(() => {
        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return (
            <button className="flex items-center justify-center border bg-[#AA2B2B]  text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer outline-none m-4">
                Print
                <span className="ml-1">
                    <IoPrintOutline></IoPrintOutline>
                </span>
            </button>
        );
    }, []);
    return (
        <div className="flex bg-[#FFFCFC] min-h-screen w-full font-poppins text-black p-8" ref={componentRef}>
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
            <div className="grid grid-cols-1 gap-4 w-full">
                <div className="w-full">
                    <div className="card bg-primary border pb-8 rounded ">
                        <div className="card-body ">
                            <div className="pb-4 flex justify-between flex-wrap">
                                <div>
                                    <div className="flex gap-2 flex-wrap">
                                        <div className="flex items-center">
                                            <p>Periode</p>
                                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                                <input
                                                    type="month"
                                                    className="text-sm font-poppins font-normal text-[#555555]"
                                                    placeholder="Select Month and Year"
                                                    name="from_date"
                                                    value={fromDate}
                                                    onChange={handleFromDateChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* start laporan penjualan */}

                            <div className="overflow-auto">
                                <div className="my-4">
                                    <b>
                                        <p>Atma Kitchen</p>
                                    </b>
                                    <p className="mb-8">Jl. Central Park No. 25</p>
                                    <b>
                                        <p>Laporan Stok Bahan Baku</p>
                                    </b>

                                    <p>Tanggal Cetak : {formatDate(getToday())}</p>
                                </div>
                                <ReactToPrint
                                    content={reactToPrintContent}
                                    documentTitle="penjualan"
                                    onAfterPrint={handleAfterPrint}
                                    onBeforeGetContent={handleOnBeforeGetContent}
                                    onBeforePrint={handleBeforePrint}
                                    removeAfterPrint
                                    trigger={reactToPrintTrigger}
                                />

                                <table className="table-auto w-full overflow-auto">
                                    <thead>
                                        <tr className="border">
                                            <th className="p-8 border text-start font-semibold">ID</th>
                                            <th className="p-8 border text-start font-semibold">Nama Bahan</th>
                                            <th className="p-8 border text-start font-semibold">Satuan</th>
                                            <th className="p-8 border text-start font-semibold">Stok</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData &&
                                            filteredData.map((item) => (
                                                <tr key={item.id} className="border text-[#7D848C]">
                                                    <td className="p-4 border">{item.id}</td>
                                                    <td className="p-4 border">{item.bahan?.nama}</td>
                                                    <td className="p-4 border">{item.bahan?.satuan}</td>
                                                    <td className="p-4 border">{item.bahan?.stok}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                {!filteredData && (
                                    <div className="flex justify-center items-center font-poppins text-black text-center mt-10">
                                        <p className="font-poppins text-gray-400">Data tidak ditemukan</p>
                                    </div>
                                )}
                            </div>
                            {/* end laporan penjualan */}
                            {loading && (
                                <div className="flex justify-center items-center font-poppins text-black text-center mt-4">
                                    <span className="loading loading-ring loading-lg"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
