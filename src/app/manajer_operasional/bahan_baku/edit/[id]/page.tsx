'use client';

import React, { useEffect, useState } from 'react';
import { Bahan } from '@/dummy_data/bahan';
import axios from 'axios';
import { Alert } from '@mui/material';
import { PembelianBahanBaku } from '@/dummy_data/pembelian_bahan_baku';
import { Listbox } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function EditBahanBaku({ params }: { params: { id: number } }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [isPosting, setIsPosting] = useState<boolean>(false);

    const [pembelianBahanBaku, setPembelianBahanBaku] = useState<PembelianBahanBaku>({
        bahan_id: 0,
        jumlah: 0,
        keterangan: '',
        tanggal_pembelian: '',
        id: 0,
    });

    const [bahanSelected, setBahanSelected] = useState<Bahan>();
    const [bahanData, setBahanData] = useState<Bahan[]>([]);

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(pembelianBahanBaku);

        setIsPosting(true);

        axios({
            method: 'put',
            url: apiUrl + '/pembelian_bahan_baku/' + params.id,
            data: pembelianBahanBaku,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => {
                console.log(response);
                setPembelianBahanBaku({
                    bahan_id: 0,
                    jumlah: 0,
                    keterangan: '',
                    tanggal_pembelian: '',
                    id: 0,
                });

                setAlert(true);

                setTimeout(() => {
                    router.push('/manajer_operasional/bahan_baku/list');
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsPosting(false);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPembelianBahanBaku((prevPembelian) => ({
            ...prevPembelian,
            [name]: value,
        }));
        console.log(pembelianBahanBaku);
    };

    useEffect(() => {
        const fetchBahanBaku = async () => {
            try {
                const [bahanResponse, pembelianResponse] = await Promise.all([
                    axios.get(apiUrl + '/bahan'),
                    axios.get(apiUrl + '/pembelian_bahan_baku/' + params.id),
                ]);

                const bahanList = bahanResponse.data.bahan;
                setBahanData(bahanList);

                const res_pb = pembelianResponse.data.pembelian_bahan_baku;

                setPembelianBahanBaku({
                    id: res_pb.id,
                    bahan_id: res_pb.bahan_id,
                    jumlah: res_pb.jumlah,
                    keterangan: res_pb.keterangan,
                    tanggal_pembelian: res_pb.tanggal_pembelian,
                });

                const matchedBahan = bahanList.find((bahan: Bahan) => bahan.id === res_pb.bahan_id);
                if (matchedBahan) {
                    setBahanSelected(matchedBahan);
                    setPembelianBahanBaku((prevPembelian) => ({
                        ...prevPembelian,
                        bahan_id: matchedBahan.id,
                    }));
                } else if (bahanList.length > 0) {
                    setBahanSelected(bahanList[0]);
                    setPembelianBahanBaku((prevPembelian) => ({
                        ...prevPembelian,
                        bahan_id: bahanList[0].id,
                    }));
                }
            } catch (error) {
                console.error('Error fetching bahan:', error);
            }
        };

        fetchBahanBaku();
    }, [params.id, apiUrl]);

    return (
        <>
            <div className="flex justify-center bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
                {alert && (
                    <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                        <Alert
                            severity="success"
                            className="font-poppins mb-4"
                            onClose={() => {
                                setAlert(false);
                            }}
                        >
                            <p>Berhasil mengedit bahan baku!</p>
                        </Alert>
                    </div>
                )}
                <div className="w-full max-w-xl">
                    <div className="card bg-primary border pb-8 rounded ">
                        <div className="card-body">
                            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                                <div className="">
                                    <div className="h-min rounded-md border bg-white">
                                        <div className="border-b p-4">
                                            <p className=" text-[#AA2B2B] ">Beli Bahan Baku</p>
                                        </div>

                                        <div className="p-4">
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_produk"
                                                >
                                                    Bahan
                                                </label>
                                                <Listbox
                                                    value={bahanSelected}
                                                    onChange={(value: Bahan) => {
                                                        setBahanSelected(value);
                                                        setPembelianBahanBaku({
                                                            ...pembelianBahanBaku,
                                                            bahan_id: value.id!,
                                                        });
                                                    }}
                                                >
                                                    <div className="relative mt-1">
                                                        <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                            <span className="block truncate text-[#A5A5A5]">
                                                                {bahanSelected?.nama}
                                                            </span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                <svg
                                                                    className="h-5 w-5 text-gray-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10 12a1 1 0 01-.7-.29l-3-3a1 1 0 111.4-1.42L10 10.59l2.3-2.3a1 1 0 111.4 1.42l-3 3a1 1 0 01-.7.29z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </Listbox.Button>
                                                        <Listbox.Options className=" absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                            {bahanData.map((opt) => (
                                                                <Listbox.Option
                                                                    key={opt?.nama}
                                                                    value={opt}
                                                                    className={({ active, selected }) =>
                                                                        `${
                                                                            active
                                                                                ? 'text-white bg-indigo-600'
                                                                                : 'text-gray-900'
                                                                        }
                                        cursor-default select-none relative py-2 pl-3 pr-9`
                                                                    }
                                                                >
                                                                    {({ selected }) => (
                                                                        <span
                                                                            className={`${
                                                                                selected
                                                                                    ? 'font-semibold'
                                                                                    : 'font-normal'
                                                                            } block truncate`}
                                                                        >
                                                                            {opt?.nama}
                                                                        </span>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </div>
                                                </Listbox>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="satuan_bahan"
                                                >
                                                    Satuan
                                                </label>
                                                <input
                                                    className="disabled cursor-not-allowed block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="satuan_bahan"
                                                    placeholder="Satuan Bahan"
                                                    required
                                                    value={bahanSelected?.satuan!}
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="jumlah"
                                                >
                                                    Jumlah
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="jumlah"
                                                    placeholder="Jumlah"
                                                    required
                                                    name="jumlah"
                                                    type="number"
                                                    value={pembelianBahanBaku.jumlah}
                                                    onChange={(e) => {
                                                        setPembelianBahanBaku({
                                                            ...pembelianBahanBaku,
                                                            jumlah: parseFloat(e.target.value),
                                                        });
                                                    }}
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="keterangan"
                                                >
                                                    Keterangan
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="keterangan"
                                                    placeholder="Keterangan"
                                                    name="keterangan"
                                                    required
                                                    type="text"
                                                    value={pembelianBahanBaku.keterangan}
                                                    onChange={handleChange}
                                                ></input>
                                            </div>
                                            <div className="flex justify-between flex-wrap">
                                                <label
                                                    htmlFor="tanggal_pembelian"
                                                    className="block text-sm font-poppins font-medium leading-6 text-gray-900 mb-2"
                                                >
                                                    Tanggal Pembelian
                                                </label>
                                            </div>
                                            <label>
                                                <input
                                                    type="date"
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    placeholder="Tanggal Pembelian"
                                                    name="tanggal_pembelian"
                                                    value={pembelianBahanBaku.tanggal_pembelian}
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                                <div className="mt-4 flex w-full items-center">
                                    <button
                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#913a3a]"
                                        type="submit"
                                        disabled={isPosting}
                                    >
                                        {isPosting ? 'Mengedit pembelian bahan...' : 'Edit pembelian bahan'}{' '}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
