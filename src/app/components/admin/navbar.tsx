'use client';

import { Disclosure } from '@headlessui/react';
import { BiHome, BiShoppingBag, BiLogOut } from 'react-icons/bi';
import { RiLuggageDepositLine } from 'react-icons/ri';
import { BsArrowRightShort, BsListNested } from 'react-icons/bs';
import { GiFlour } from 'react-icons/gi';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { useEffect } from 'react';

const handleClickLink = () => {
    const drawerToggle = document.getElementById('my-drawer');
    if (drawerToggle) {
        (drawerToggle as HTMLInputElement).checked = false;
    }
};
export default function Navbar() {
    const pathname = usePathname();
    const url = pathname;

    useEffect(() => {
        console.log(url);
    }, [pathname]);
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
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/produk/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/produk/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Produk Toko</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            onClick={handleClickLink}
                                            href={`/admin/produk/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/produk/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Produk Toko</span>
                                        </Link>
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
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/titipan/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/titipan/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Titipan</span>
                                        </Link>
                                    </li>

                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/titipan/penitip`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/titipan/penitip'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Penitip</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <RiLuggageDepositLine className="w-4 h-4"></RiLuggageDepositLine>
                                    <span>Hampers</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/hampers/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/hampers/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Hampers</span>
                                        </Link>
                                    </li>

                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/hampers/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/hampers/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Hampers</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <RiLuggageDepositLine className="w-4 h-4"></RiLuggageDepositLine>
                                    <span>Resep</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/resep/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/resep/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Resep</span>
                                        </Link>
                                    </li>

                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/admin/resep/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/resep/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Resep</span>
                                        </Link>
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
