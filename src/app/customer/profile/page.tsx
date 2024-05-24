'use client';

  import axios from 'axios';
  import { Fragment} from 'react';
  import Alert from '@mui/material/Alert';
  import { useRouter } from 'next/navigation';
  import { FaArrowCircleLeft } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import React, { useState, useEffect, useRef } from 'react';
import { User} from '@/dummy_data/user';

  
  
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
  
  
      const handleSubmitPost = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
      };


      const [openUpdateModal, setopenUpdateModal] = useState<boolean>(false);
      const [updateModal, setUpdateModal] = useState<User>();
      const cancelButtonEdit = useRef(null);


      return (
          <>

              <div className="flex justify-center items-center bg-[#FFFCFC] min-h-screen">
                  <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
                      <div className="card w-100 md:w-6/12 bg-primary border pb-8 rounded ">
                          <div className="card-body">
                            <div className="bg-white overflow-hidden shadow rounded-lg border border-[#AA2B2B]">
                                <div className="px-4 py-5 sm:px-6">
                                    <div className='flex justify-center'>
                                        <h2 className="text-2xl font-bold font-poppins leading-6 text-[#AA2B2B]">
                                        Ayas Profile
                                        </h2>
                                    </div>
                                    <div className='flex justify-center'>
                                        <div className=''>
                                            <p className="mt-2 text-center text-xs font-poppins text-gray-500 mx-0">
                                                Selamat datang Ayas, klik Edit Profile ya untuk mengedit profile kamu :)
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="border-t border-[#AA2B2B] px-4 py-5 sm:p-0">
                                    <dl className="sm:divide-y sm:divide-[#AA2B2B]">
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-[#AA2B2B] font-poppins">Full name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        John Doe
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-[#AA2B2B] font-poppins">Email address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        johndoe@example.com
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-[#AA2B2B] font-poppins">Phone number</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        (123) 456-7890
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-[#AA2B2B] font-poppins">Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        123 Main St
                                        <br />
                                        Anytown, USA 12345
                                        </dd>
                                    </div>
                                    </dl>
                                </div>
                            </div>
                            <div className='flex justify-center mt-2'>
                                <button className="rounded-md relative h-8 w-36 overflow-hidden border border-[#AA2B2B] text-[#AA2B2B]  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#AA2B2B] before:duration-300 before:ease-out hover:text-white hover:before:h-40 hover:before:w-40 hover:before:opacity-80"
                                onClick={() => {
                                    setUpdateModal(item);
                                    setopenUpdateModal(true);
                                }}>                                                        
                                    <span className="relative z-10">Edit Profile</span>
                                </button>
                            </div>
                          </div>
                          <Transition.Root show={openUpdateModal} as={Fragment}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                initialFocus={cancelButtonEdit}
                                onClose={setopenUpdateModal}
                            >
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
                                                    <div className="sm:items-start">
                                                        <form
                                                            className="space-y-6"
                                                            action="#"
                                                            method="PUT"
                                                            // onSubmit={(e) => handleUpdate(e, editBahan?.id!)}
                                                        >
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div className="h-min rounded-md border bg-white">
                                                                    <div className="border-b p-4">
                                                                        <p className=" text-[#AA2B2B] ">
                                                                            Edit Jarak pada Transaksi nomor {updateModal?.nomor_transaksi}
                                                                        </p>
                                                                    </div>
                                                                    <div className="p-4 overflow-auto">
                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="nama"
                                                                            >
                                                                                Jarak
                                                                            </label>
                                                                            <input
                                                                                className=" w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="nama_bahan"
                                                                                placeholder="Nama Bahan"
                                                                                required
                                                                                value={updateModal?.jarak}
                                                                                type="number"
                                                                                // onChange={(e) => {
                                                                                //     const { value } = e.target;

                                                                                //     setSubmitEditBahan({
                                                                                //         ...submitEditBahan!,
                                                                                //         nama: value,
                                                                                //     });
                                                                                // }}
                                                                            ></input>
                                                                        </div>

                                                                        <div className="mb-4">
                                                                            <label
                                                                                className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                                                htmlFor="stok"
                                                                            >
                                                                                Biaya Jarak
                                                                            </label>
                                                                            <input
                                                                                className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                                                id="stok_bahan"
                                                                                placeholder="Stok Bahan"
                                                                                required
                                                                                value={updateModal?.biaya}
                                                                                type="text"
                                                                                // onChange={(e) => {
                                                                                //     const { value } = e.target;

                                                                                //     setSubmitEditBahan({
                                                                                //         ...submitEditBahan!,
                                                                                //         stok: parseFloat(value) || 0,
                                                                                //     });
                                                                                // }}
                                                                            ></input>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    className=" rounded-md bg-[#AA2B2B] px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-white outline-none  hover:bg-[#832a2a]"
                                                                    type="submit"
                                                                    onClick={() => setopenUpdateModal(false)}
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    className="mx-3 rounded-md bg-white px-5  py-2.5 text-center font-semibold font-poppins text-sm  text-[#AA2B2B] outline-none  hover:bg-gray-100 shadow-sm ring-2 ring-inset ring-[#AA2B2B]"
                                                                    type="button"
                                                                    onClick={() => setopenUpdateModal(false)}
                                                                    ref={cancelButtonEdit}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                      </div>
                  </div>
              </div>
              
          </>
      );
  }
  
    