'use client';

import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

interface Login {
    email: string;
    password: string;
}
interface AlertI {
    type: boolean;
    alertType: string;
    message: string;
}

export default function Login() {
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
    function newLogin() {
        axios({
            method: 'post',
            url: apiUrl + '/customer/login',
            data: login,
        })
            .then((response) => {
                setLogin(emptyLogin);
                if (response.status == 200) {
                    setAlert({ type: true, alertType: 'success', message: 'Selamat! Berhasil Login!' });
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.status == 400) {
                    setAlert({ type: true, alertType: 'error', message: 'Email dan Password harus benar' });
                } else {
                    setAlert({ type: true, alertType: 'error', message: 'Email dan Password harus benar' });
                }
            });
    }

    const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newLogin();
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
                                <h2 className="mt-8 text-wrap text-center text-2xl font-bold text-accent break-words">
                                    Atmakitchen
                                </h2>
                                <p className="mt-4 text-center text-sm text-[#555555]">Masuk ke akun anda </p>
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
                                                type="text"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Email"
                                                name="email"
                                                onChange={handleChange}
                                                value={login.email}
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
                                            <a
                                                href=""
                                                className="block text-sm font-poppins font-medium leading-6 text-accent mb-2"
                                            >
                                                Lupa Password?
                                            </a>
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
                                                onChange={handleChange}
                                                value={login.password}
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
