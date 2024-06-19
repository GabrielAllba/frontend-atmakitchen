'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

interface Login {
    email: string;
    password: string;
    confirmPassword: string;
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
        confirmPassword: '',
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
    };

    const updatePassword = async () => {
        try {
            const response = await axios.put(`${apiUrl}/customer/updatepassword/${login.email}`, {
                password: login.confirmPassword
            });
            return response.data;
        } catch (error) {

        }
    };

    const newLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (login.password !== login.confirmPassword) {
            setAlert({ type: true, alertType: 'error', message: 'Passwords do not match' });
            return;
        }
        try {
            await updatePassword();
            setAlert({ type: true, alertType: 'success', message: 'Password updated successfully!' });
            router.push('/login');
            // Redirect to appropriate page after password update
        } catch (error) {
            console.error(error);
            setAlert({ type: true, alertType: 'error', message: 'Failed to update password' });
        }
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
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                                <h2 className=" text-wrap text-center text-2xl font-bold text-accent break-words">
                                    Atmakitchen
                                </h2>
                                <p className="mt-4 text-center text-sm text-[#555555]">Masukan Password Baru </p>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={newLogin} className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins placeholder:"
                                        >
                                            Email
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white ring-1 ring-slate-200">
                                            <input
                                                value={login.email}
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555] w-full"
                                                placeholder="Masukan Email"
                                                name="email"
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            New Password
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white ring-1 ring-slate-200">
                                            <input
                                                type="password"
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Masukan Password baru"
                                                name="password"
                                                value={login.password}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Confirm Password
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white ring-1 ring-slate-200">
                                            <input
                                                type="password"
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                value={login.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
                                        >
                                            Update Password
                                        </button>
                                        <div className='flex justify-center mt-4'>
                                            <a
                                                href="/login/"
                                                className="block text-sm font-poppins font-medium leading-6  mb-2 text-slate-500 hover:text-accent"
                                            >
                                                Sudah Punya Akun?
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