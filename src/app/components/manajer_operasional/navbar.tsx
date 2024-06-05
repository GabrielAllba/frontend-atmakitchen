'use client';

import { Disclosure } from '@headlessui/react';
import { BiHome, BiShoppingBag, BiLogOut } from 'react-icons/bi';
import { RiLuggageDepositFill } from 'react-icons/ri';
import { BsArrowRightShort, BsListNested } from 'react-icons/bs';
import { GiFlour, GiPaper } from 'react-icons/gi';
import { usePathname, useRouter } from 'next/navigation';
import { GiTakeMyMoney } from 'react-icons/gi';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { BookOpenIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const handleClickLink = () => {
    const drawerToggle = document.getElementById('my-drawer');
    if (drawerToggle) {
        (drawerToggle as HTMLInputElement).checked = false;
    }
};

interface Admin {
    id: number;
    born_date: string;
    email: string;
    name: string;
    password: string;
    phone_number: string;
    role: { id: number; name: string; gaji_harian: number };
    role_id: number;
    total_point: number;
    username: string;
}

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const url = pathname;
    const [admin, setAdmin] = useState<Admin>({
        id: 0,
        born_date: '',
        email: '',
        name: '',
        password: '',
        phone_number: '',
        role: { id: 0, name: '', gaji_harian: 0 },
        role_id: 0,
        total_point: 0,
        username: '',
    });
    useEffect(() => {
        console.log(url);
    }, [pathname]);

    useEffect(() => {
        const admin = localStorage.getItem('user');
        setAdmin(JSON.parse(admin!));
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        router.push('/login');
    };
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
                                    <div className="flex justify-center items-center text-black">
                                        <p className="ml-2 hidden md:block">{`${admin.name} - ${admin.email}`}</p>
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
                                    <BookOpenIcon className="w-4 h-4"></BookOpenIcon>
                                    <span>Laporan</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/penjualan/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/penjualan/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Laporan Penjualan</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/laporan_bahan/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/laporan_bahan/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Laporan Bahan Baku</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <FaUserFriends className="w-4 h-4"></FaUserFriends>
                                    <span>Karyawan</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/karyawan/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/produk/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Karyawan</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/karyawan/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/admin/produk/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Karyawan</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <GiTakeMyMoney className="w-4 h-4"></GiTakeMyMoney>
                                    <span>Pengeluaran Lain</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/pengeluaran_lain/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/pengeluaran_lain/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Pengeluaran Lain</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/pengeluaran_lain/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/pengeluaran_lain/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Pengeluaran Lain</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <RiLuggageDepositFill className="w-4 h-4"></RiLuggageDepositFill>
                                    <span>Consignment</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/penitip/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/penitip/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Penitip</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/penitip/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/penitip/tambah'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Tambah Penitip</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-2">
                                <a className="text-black font-poppins flex items-center">
                                    <RiLuggageDepositFill className="w-4 h-4"></RiLuggageDepositFill>
                                    <span>Bahan Baku</span>
                                </a>
                                <ul>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/bahan_baku/tambah`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/penitip/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Beli Bahan Baku</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/bahan_baku/list`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/bahan_baku/list'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>List Pembelian Bahan Baku</span>
                                        </Link>
                                    </li>
                                    <li className="py-2">
                                        <Link
                                            passHref
                                            onClick={handleClickLink}
                                            href={`/manajer_operasional/bahan_baku/pemakaian`}
                                            className={`text-[#7D848C] font-poppins flex items-center ${
                                                pathname === '/manajer_operasional/bahan_baku/pemakaian'
                                                    ? 'bg-[#AA2B2B] text-white hover:bg-[#921f1f] hover:text-white'
                                                    : ''
                                            }`}
                                        >
                                            <BsArrowRightShort className="w-4 h-4"></BsArrowRightShort>
                                            <span>Pemakaian Bahan Baku</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </div>

                        <li className="py-2 " onClick={handleLogout}>
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
