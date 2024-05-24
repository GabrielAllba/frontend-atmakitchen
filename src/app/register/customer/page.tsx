'use client';

import { User } from '@/dummy_data/user';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiPhone } from 'react-icons/ci';
import { FaArrowCircleLeft } from "react-icons/fa";

import axios from 'axios';

export default function Register() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const emptyUser: User = {
        id: 0,
        name: '',
        email: '',
        username: '',
        password: '',
        born_date: '',
        phone_number: '',
        total_point: 0,
        role_id: 2,
    };
    const [user, setUser] = useState<User>(emptyUser);
    const [alert, setAlert] = useState<boolean>(false);
    const [alertFailed, setAlertFailed] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(user);
    };

    function newUser() {
        // Check if the email already exists
        axios.get(apiUrl + '/customer/email-exists?email=' + user.email)
            .then((emailExistsResponse) => {
                console.log(user.email);
                if (emailExistsResponse.data.exists) {
                    // Email already exists, show an alert or handle accordingly
                    console.log('Email already exists');
                    setAlertFailed(true);
                } else {
                    // Email doesn't exist, proceed with user creation
                    axios({
                        method: 'post',
                        url: apiUrl + '/customer/signup',
                        data: user,
                    })
                    .then((response) => {
                        setUser(emptyUser);
                        if (response.status === 200) {
                            setAlert(true);
                            setTimeout(() => {
                                window.location.href = '/login';  // Change '/login' to your login page URL
                            }, 1000);  // Adjust timeout as needed
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newUser();
    };

    return (
        <>
            {alert && (
                <div className="absolute top-4 right-4 z-50">
                    <Alert severity="success" className="font-poppins">
                        Selamat! Akun kamu telah berhasil registrasi!
                    </Alert>
                </div>
            )}
            {alertFailed && (
                <div className="absolute top-4 right-4 z-50">
                    <Alert severity="error" className="font-poppins">
                        Email Anda Sudah Terdaftar !!!
                    </Alert>
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
                                    <h2 className="mt-8 text-wrap text-center text-2xl font-bold text-accent break-words">
                                        Atmakitchen
                                    </h2>
                                    <p className="mt-4 text-center text-sm text-[#555555]">Registrasikan akun anda </p>
                                </div>
                                
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmitPost}>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Nama
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <CgProfile></CgProfile>
                                            <input
                                                type="text"
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Nama"
                                                name="name"
                                                onChange={handleChange}
                                                value={user.name}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            Username
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <CgProfile></CgProfile>
                                            <input
                                                type="text"
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Username"
                                                name="username"
                                                onChange={handleChange}
                                                value={user.username}
                                            />
                                        </label>
                                    </div>
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
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                        >
                                            No Telp
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2 bg-white">
                                            <CiPhone></CiPhone>
                                            <input
                                                type="text"
                                                className="w-full text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="No Telp"
                                                name="phone_number"
                                                onChange={handleChange}
                                                value={user.phone_number}
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
                                                value={user.password}
                                                type="password"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <div className="flex justify-between flex-wrap">
                                            <label
                                                htmlFor="born_date"
                                                className="block text-sm font-poppins font-medium leading-6 text-gray-900 mb-2"
                                            >
                                                Tanggal Lahir
                                            </label>
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
                                                type="date"
                                                className="text-sm font-poppins font-normal text-[#555555]"
                                                placeholder="Konfirmasi Password"
                                                name="born_date"
                                                onChange={handleChange}
                                                value={user.born_date}
                                            />
                                        </label>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
                                        >
                                            Buat Akun
                                        </button>
                                        <div className='flex justify-center mt-2 '>
                                            <a href="/login" className='text-slate-400 hover:text-[#b54545] text-sm font-poppins'>
                                                Sudah Punya Akun ?
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
