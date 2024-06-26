import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { CiUser } from 'react-icons/ci';

import { CiSearch } from 'react-icons/ci';
import { CiShoppingCart } from 'react-icons/ci';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navigation = [{ name: 'Home', href: '/', current: true }];

function classNames(...classes: (string | undefined | null | false | 0)[]): string {
    return classes.filter(Boolean).join(' ');
}

interface NavbarCustomerProps {
    isAuth: boolean;
}

const NavbarCustomer: React.FC<NavbarCustomerProps> = ({ isAuth }: { isAuth: boolean }) => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if (searchQuery == '') {
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        router.push('/');
        window.location.reload();
    };
    return (
        <Disclosure as="nav" className="bg-white border-[#FOF3F7] border fixed w-full z-50">
            {({ open }) => (
                <>
                    <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between gap-2">
                            <div className="inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#aa2b2b] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start gap-2">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="hidden sm:flex h-8 w-auto"
                                        src="/images/logo/logo.jpg"
                                        height={50}
                                        width={50}
                                        alt="Your Company"
                                    />
                                    <form className="flex sm:hidden items-center border border-gray-300 rounded-md ">
                                        <input
                                            name="search"
                                            type="text"
                                            placeholder="Cari di atma kitchen"
                                            className="search p-2 text-sm bg-white  flex-grow"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </form>

                                    <h2 className="hidden md:flex font-semibold font-poppins text-sm text-black">
                                        Atma Kitchen
                                    </h2>
                                </div>

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4 items-center">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-[#AA2B2B] text-white'
                                                        : 'text-gray-300 hover:bg-[#9e1f1f] hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <form className="w-full hidden sm:flex items-center border border-gray-300 rounded-md px-2">
                                    <div className="">
                                        <CiSearch className="w-4 h-4 text-black" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari di atma kitchen "
                                        className="search p-2 text-sm bg-white outline-none w-full text-black "
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    ></input>
                                </form>

                                <div className="flex items-center">
                                    {isAuth && (
                                        <div className="flex items-center">
                                            <div>
                                                <div className="flex items-center relative">
                                                    <Link href="/pemesanan">
                                                        <CiShoppingCart className="w-5 h-5 text-black "></CiShoppingCart>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Menu as="div" className="relative">
                                                <div>
                                                    <Menu.Button className="flex items-center relative">
                                                        <CiUser className="ml-1 w-5 h-5 text-black"></CiUser>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="/profile"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 ',
                                                                    )}
                                                                >
                                                                    Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="/transaksi"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 ',
                                                                    )}
                                                                >
                                                                    Transaksi Saya
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="/history"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 ',
                                                                    )}
                                                                >
                                                                    History Pesanan
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <p
                                                                    onClick={handleLogout}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 cursor-pointer' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700',
                                                                    )}
                                                                >
                                                                    Log out
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    )}
                                    {!isAuth && (
                                        <div className="hidden md:flex">
                                            <Link
                                                href="/login"
                                                className="bg-[#AA2B2B] text-white  rounded-md px-3 py-2 text-sm font-medium"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/register/customer"
                                                className="border border-[#AA2B2B] ml-1 bg-white text-[#AA2B2B] rounded-md px-3 py-2 text-sm font-medium"
                                            >
                                                Daftar
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!isAuth && (
                            <div className="flex md:hidden mb-4 justify-around">
                                <div className="flex flex-shrink-0 items-center gap-1">
                                    <Image
                                        className="h-8 w-auto"
                                        src="/images/logo/logo.jpg"
                                        height={50}
                                        width={50}
                                        alt="Your Company"
                                    />
                                    <div className="flex flex-col items-start justify-center text-black font-poppins">
                                        <h2 className="text-sm font-semibold">Halo, gan!</h2>
                                        <p className="text-sm text-gray-500">Akses semua fitur, yuk!</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                    <Link
                                        href="/login"
                                        className="bg-[#AA2B2B] text-center text-white  rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-[#AA2B2B] text-white' : '',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default NavbarCustomer;
