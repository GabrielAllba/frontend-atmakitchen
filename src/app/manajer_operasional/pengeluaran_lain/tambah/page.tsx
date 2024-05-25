'use client';

import React, { useState } from 'react';
import { PengeluaranLain } from '@/dummy_data/pengeluaran_lain';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function TambahPengeluaranLain() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isPosting, setIsPosting] = useState<boolean>(false);

    const [pengeluaranLain, setPengeluaranLain] = useState<PengeluaranLain>({
        deskripsi: '',
        harga: 0,
        metode: '',
        tanggal_pengeluaran: '',
    });

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(pengeluaranLain);

        setIsPosting(true);

        axios({
            method: 'post',
            url: apiUrl + '/pengeluaran_lain',
            data: pengeluaranLain,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => {
                console.log(response);
                setPengeluaranLain({
                    deskripsi: '',
                    harga: 0,
                    metode: '',
                    tanggal_pengeluaran: '',
                });

                setAlert(true);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsPosting(false);
            });
    };

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
                            <p>Berhasil menambah pengeluaran lain!</p>
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
                                            <p className=" text-[#AA2B2B] ">Detail Pengeluaran Lain</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="deskripsi"
                                                >
                                                    Deskripsi
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="deskripsi"
                                                    placeholder="Deskripsi"
                                                    required
                                                    type="text"
                                                    value={pengeluaranLain.deskripsi}
                                                    onChange={(e) => setPengeluaranLain({ ...pengeluaranLain, deskripsi: e.target.value })}
                                                ></input>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="harga"
                                                >
                                                    Harga
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="harga"
                                                    placeholder="Harga"
                                                    required
                                                    type="number"
                                                    value={pengeluaranLain.harga}
                                                    onChange={(e) => {
                                                        setPengeluaranLain({
                                                            ...pengeluaranLain,
                                                            harga: parseFloat(e.target.value),
                                                        });
                                                    }}
                                                ></input>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="metode_pembayaran"
                                                >
                                                    Metode Pembayaran
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="metode_pembayaran"
                                                    placeholder="Metode Pembayaran"
                                                    required
                                                    type="text"
                                                    value={pengeluaranLain.metode}
                                                    onChange={(e) => setPengeluaranLain({ ...pengeluaranLain, metode: e.target.value })}
                                                ></input>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="tanggal_pengeluaran"
                                                >
                                                    Tanggal Pengeluaran
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="tanggal_pengeluaran"
                                                    placeholder="Tanggal Pengeluaran"
                                                    required
                                                    type="date"
                                                    value={pengeluaranLain.tanggal_pengeluaran}
                                                    onChange={(e) => setPengeluaranLain({ ...pengeluaranLain, tanggal_pengeluaran: e.target.value })}
                                                ></input>
                                            </div>

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
                                        {isPosting ? 'Menambahkan pengeluaran lain...' : 'Tambah Pengeluaran Lain'}{' '}
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