'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import { FaArrowCircleLeft } from 'react-icons/fa';
import Link from "next/link";

interface Login {
    email: string;
    password: string;
}
interface AlertI {
    type: boolean;
    alertType: string;
    message: string;
}

export default function AdminLogin() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const emptyLogin: Login = {
        email: '',
        password: '',
    };
    const emptyAlert: AlertI = {
        type: false,
        alertType: 'success',
        message: '',
    };
    const [login, setLogin] = useState<Login>(emptyLogin);
    const [alert, setAlert] = useState<AlertI>(emptyAlert);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value,
        }));
        console.log(login);
    };

    const newLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl + '/autologin/login', login);
            const { token, user } = response.data;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAlert({ type: true, alertType: 'success', message: 'Selamat! Berhasil Login!' });
            if (user.role.name == 'Admin') {
                router.push('/admin/produk/list');
            } else if (user.role.name == 'Customer') {
                router.push('/');
            } else if (user.role.name == 'Manajer Operasional') {
                router.push('/manajer_operasional/home');
            } else if (user.role.name == 'Owner') {
                router.push('/owner/home');
            }
        } catch (error) {
            console.error(error);
            setAlert({ type: true, alertType: 'error', message: 'Email dan Password harus benar' });
        }
    };

    const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newLogin(e);
    };
    return (
        <>
            {alert.type && (
                <div className="absolute top-4 right-4 z-50">
                    {alert.alertType == 'success' && (
                        <Alert severity="success" className="font-poppins">
                            {alert.message}
                        </Alert>
                    )}
                    {alert.alertType == 'error' && (
                        <Alert severity="error" className="font-poppins">
                            {alert.message}
                        </Alert>
                    )}
                </div>
            )}

            <div className="flex justify-center items-center bg-[#FFFCFC] min-h-screen">
                <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
                    <div className="card w-100 md:w-6/12 bg-primary border pb-8 rounded ">
                        <div className="card-body">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center flex">
                                <div className='flex-none'>
                                    <a href="/">
                                    <FaArrowCircleLeft size={32} style={{ color: '#b54545'}} />
                                    </a>
                                </div>
                                <div className='flex-auto'>
                                    <h2 className=" text-wrap text-center text-2xl font-bold text-accent break-words">
                                        Atmakitchen
                                    </h2>
                                    <p className="mt-4 text-center text-sm text-[#555555]">Masuk ke akun anda </p>
                                </div>
                                
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={handleSubmitPost} className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Email
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="w-4 h-4 opacity-70"
                                            >
                                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                            </svg>
                                            <input
                                                value={login.email}
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Email"
                                                name="email"
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div className="flex justify-between flex-wrap">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-poppins font-medium leading-6 text-gray-900 mb-2"
                                            >
                                                Password
                                            </label>
                                            <Link 
                                                href="/reset_password/"
                                                className="block text-sm font-poppins font-medium leading-6 text-accent mb-2"
                                                >
                                                    Lupa Password?
                                            </Link>
                                        </div>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="w-4 h-4 opacity-70"
                                            >
                                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                            </svg>
                                            <input
                                                type="password"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Password"
                                                name="password"
                                                value={login.password}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
                                        >
                                            Sign In
                                        </button>
                                        <div className='flex justify-center mt-2 '>
                                            <a href="/register/customer" className='text-slate-400 hover:text-[#b54545] text-sm font-poppins'>
                                                Belum Punya Akun ?
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
