import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { BiHome, BiShoppingBag, BiLogOut } from 'react-icons/bi';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { BsArrowRightShort, BsListNested } from 'react-icons/bs';
import { GiFlour } from "react-icons/gi";
import Image from 'next/image';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames({ ...classes }) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    return (
        <div className="fixed z-10 w-full">
            <Disclosure as="nav" className="bg-white border-b">
                {({ open }: { open: any }) => (
                    <>
                        <div className="font-poppins mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4 items-center text-black">
                                            <p className="font-semibold text-[#AA2B2B]">AtmaKitchen</p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4 items-center text-black">
                                            <p>Senin, 28 Maret 2024</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex items-center">
                                    {/* Profile dropdown */}
                                    <div className="flex justify-center items-center text-black">
                                        <p className="ml-2 hidden md:block">admin@gmail.com</p>
                                    </div>
                                </div>
                                <div className="drawer-content ml-4">
                                    <label
                                        htmlFor="my-drawer"
                                        className="btn border border-[#dedede] shadow-none btn-primary drawer-button"
                                    >
                                        <BsListNested></BsListNested>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>
            <div className="drawer ">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                    <ul className="menu p-4 md:w-96 sm:w-80 min-h-full text-base-content bg-[#FFFFFF] flex flex-col justify-between">
                        <div>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <BiHome className="w-4 h-4"></BiHome>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <BiShoppingBag className="w-4 h-4"></BiShoppingBag>
                                    <span>Produk Toko</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Produk Toko</span>
                                        </a>
                                    </li>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Produk Toko</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <RiLuggageDepositLine className="w-4 h-4"></RiLuggageDepositLine>
                                    <span>Titipan</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Titipan</span>
                                        </a>
                                    </li>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Titipan</span>
                                        </a>
                                    </li>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Penitip</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <GiFlour className="w-4 h-4"></GiFlour>
                                    <span>Bahan Baku</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Bahan Baku</span>
                                        </a>
                                    </li>
                                    <li className="py-2">
                                        <a className="text-[#7D848C] font-poppins flex items-center">
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Bahan Baku</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </div>

                        <li className="py-2 ">
                            <a className="text-black font-poppins flex items-center">
                                <BiLogOut className="w-4 h-4"></BiLogOut>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}