'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Penitip } from '@/dummy_data/penitip';
import { Listbox } from '@headlessui/react';

interface CustomModalPenitipProps {
    open: boolean;
    setOpen: any;
    penitip: Penitip;
}

const bank = [{ name: 'BCA' }, { name: 'Mandiri' }];

export const CustomModalPenitip: React.FC<CustomModalPenitipProps> = ({ open, setOpen, penitip }) => {
    const cancelButtonRef = useRef(null);

    // bank
    const [bankSelected, setBankSelected] = useState<string>(() => {
        if (penitip && penitip.bank) {
            const matchingBank = bank.find((bankItem) => bankItem.name === penitip.bank);
            if (matchingBank) {
                return matchingBank.name;
            }
        }
        return '';
    });

    useEffect(() => {
        setBankSelected(penitip.bank || '');
    }, [penitip.bank]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <form className="font-poppins w-full">
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
                                                            value={penitip?.nama}
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
                                                            value={penitip?.alamat}
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
                                                            value={penitip?.no_telp}
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
                                                            value={penitip?.email}
                                                        ></input>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label
                                                            className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                            htmlFor="kata_kunci"
                                                        >
                                                            Bank
                                                        </label>
                                                        <Listbox
                                                            value={bankSelected}
                                                            onChange={(value: string) => setBankSelected(value)}
                                                        >
                                                            <div className="relative mt-1">
                                                                <Listbox.Button className="relative w-full bg-white border border-[#DADDE2] rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                    <span className="block truncate text-[#A5A5A5]">
                                                                        {bankSelected}
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
                                                                    {bank.map((opt) => (
                                                                        <Listbox.Option
                                                                            key={opt.name}
                                                                            value={opt.name}
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
                                                                                    {opt.name}
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
                                                            value={penitip?.alamat}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="mt-4" />
                                            <div className="mt-4 flex w-full items-center">
                                                <button
                                                    className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#236f6f]"
                                                    type="submit"
                                                >
                                                    Edit Penitip
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
