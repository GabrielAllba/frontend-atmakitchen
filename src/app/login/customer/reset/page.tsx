import Image from 'next/image';
import { RiLockPasswordLine } from "react-icons/ri";


export default function Login() {
    return (
        <div className="flex justify-center items-center bg-[#FFFCFC] min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
                <div className="card w-100 md:w-6/12 bg-primary border pb-8 rounded ">
                    <div className="card-body">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                            <h2 className="mt-8 text-wrap text-center text-2xl font-bold text-accent break-words">
                                Atmakitchen
                            </h2>
                            <p className="mt-4 text-center text-sm text-[#555555]">Reset Password Akun Anda </p>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
                                    >
                                        Email
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2 bg-white">
                                        <RiLockPasswordLine className="w-4 h-4"/>
                                        <input
                                            type="text"
                                            className="text-sm font-poppins font-normal text-[#555555]"
                                            placeholder="Email"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
                                    >
                                        Reset Password Melalui Email
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}