'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function TambahTitipan() {
    return (
        <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
            <div className="w-full">
                <div className="card bg-primary border pb-8 rounded ">
                    <div className="card-body">
                        <form className="font-poppins">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                <div className="h-min rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">Data Penitip</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Penitip
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="nama_produk"
                                                placeholder="Nama Penitip"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="nama_produk"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="Alamat"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                No Telp
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="No Telp"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="No Telp"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="kata_kunci"
                                            >
                                                Nomer Bank
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="Nomer Bank"
                                                required
                                                type="text"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md border bg-white">
                                    <div className="border-b p-4">
                                        <p className=" text-[#AA2B2B] ">Detail Lebih Lanjut</p>
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="ready_stock"
                                            >
                                                Ready Stock
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="harga_produk"
                                                placeholder="Ready Stock"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="quota"
                                            >
                                                Quota Harian PO
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="quota"
                                                placeholder="Quota Harian PO"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="reward_poin"
                                            >
                                                Reward Poin
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="reward_poin"
                                                placeholder="Reward Poin"
                                                required
                                                type="number"
                                            ></input>
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                htmlFor="foto_produk"
                                            >
                                                Foto Produk
                                            </label>
                                            <input
                                                className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                id="reward_poin"
                                                placeholder="Reward Poin"
                                                required
                                                type="file"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-4" />
                            <div className="mt-4 flex w-full items-center">
                                <button
                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#236f6f]"
                                    type="submit"
                                >
                                    Tambah Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
