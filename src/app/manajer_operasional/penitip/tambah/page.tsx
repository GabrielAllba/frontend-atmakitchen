'use client';

import React, { useState } from 'react';
import { Consignment } from '@/dummy_data/consignment';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function TambahConsign()
{
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;    
   
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const [consignment, setConsignment] = useState<Consignment>({
        name: '',
        address: '',
        phone_number: '',
        bank_account: '',
        bank_number: '',
    });

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(consignment);

        setIsPosting(true);

        axios({
            method: 'post',
            url: apiUrl + '/consignation',
            data: consignment,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => {
                console.log(response);
                setConsignment({
                    name: '',
                    address: '',
                    phone_number: '',
                    bank_account: '',
                    bank_number: '',
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
                            <p>Berhasil menambah penitip!</p>
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
                                            <p className=" text-[#AA2B2B] ">Detail Penitip</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_consignment"
                                                >
                                                    Nama Penitip
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="nama_consignment"
                                                    placeholder="Nama Penitip"
                                                    required
                                                    type="text"
                                                    value={consignment.name}
                                                    onChange={(e) =>
                                                        setConsignment({ ...consignment, name: e.target.value })
                                                    }
                                                ></input>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="merk_consignment"
                                                >
                                                    Alamat Penitip
                                                </label>
                                                <input
                                                    className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="alamat_consignment"
                                                    placeholder="Alamat Penitip"
                                                    required
                                                    type="text"
                                                    value={consignment.address}
                                                    onChange={(e) =>
                                                        setConsignment({ ...consignment, address: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="harga_consignment"
                                                >
                                                    Nomor Penitip
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="nomor_consignment"
                                                    placeholder="Nomor Penitip"
                                                    required
                                                    type="text"
                                                    value={consignment.phone_number}
                                                    onChange={(e) =>
                                                        setConsignment({ ...consignment, phone_number: e.target.value })
                                                    }
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="bank_account_consignment"
                                                >
                                                    Bank Account
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="bank_account_consignment"
                                                    placeholder="Bank Account Penitip"
                                                    required
                                                    value={consignment.bank_account}
                                                    onChange={(e) =>
                                                        setConsignment({
                                                            ...consignment,
                                                            bank_account: (e.target.value),
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="bank_number_consignment"
                                                >
                                                    Bank Number
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="bank_number_consignment"
                                                    placeholder="Bank Number Penitip"
                                                    required
                                                    value={consignment.bank_number}
                                                    onChange={(e) =>
                                                        setConsignment({ ...consignment, bank_number: e.target.value })
                                                    }
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
                                        {isPosting ? 'Menambahkan penitip...' : 'Tambah penitip'}{' '}
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