'use client';

import React, { useState } from 'react';
import { Bahan } from '@/dummy_data/bahan';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function TambahBahan()
{
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;    
   
    const [isPosting, setIsPosting] = useState<boolean>(false);

    const [bahan, setBahan] = useState<Bahan>({
        nama: '',
        harga: 0,
        merk: '',
        stok: 0,
        satuan: '',
    });

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(bahan);

        setIsPosting(true);

        axios({
            method: 'post',
            url: apiUrl + '/bahan',
            data: bahan,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then((response) => {
                console.log(response);
                setBahan({
                    nama: '',
                    harga: 0,
                    merk: '',
                    stok: 0,
                    satuan: '',
                });

                setAlert(true);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsPosting(false);
            });
    };

    return (
        <>
            <div className="flex justify-center bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
                {alert && (
                    <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                        <Alert
                            severity="success"
                            className="font-poppins mb-4"
                            onClose={() => {
                                setAlert(false);
                            }}
                        >
                            <p>Berhasil menambah bahan!</p>
                        </Alert>
                    </div>
                )}
                <div className="w-full max-w-xl">
                    <div className="card bg-primary border pb-8 rounded ">
                        <div className="card-body">
                            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                                <div className="">
                                    <div className="h-min rounded-md border bg-white">
                                        <div className="border-b p-4">
                                            <p className=" text-[#AA2B2B] ">Detail Bahan</p>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="nama_bahan"
                                                >
                                                    Nama Bahan
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="nama_bahan"
                                                    placeholder="Nama Bahan"
                                                    required
                                                    type="text"
                                                    value={bahan.nama}
                                                    onChange={(e) =>
                                                        setBahan({ ...bahan, nama: e.target.value })
                                                    }
                                                ></input>
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="merk_bahan"
                                                >
                                                    Merk Bahan
                                                </label>
                                                <input
                                                    className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="merk_bahan"
                                                    placeholder="Merk Bahan"
                                                    required
                                                    type="text"
                                                    value={bahan.merk}
                                                    onChange={(e) =>
                                                        setBahan({ ...bahan, merk: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="harga_bahan"
                                                >
                                                    Harga Bahan
                                                </label>
                                                <input
                                                    className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                    id="harga_bahan"
                                                    placeholder="Harga Bahan"
                                                    required
                                                    type="number"
                                                    value={bahan.harga.toString()}
                                                    onChange={(e) =>
                                                        setBahan({
                                                            ...bahan,
                                                            harga: parseFloat(e.target.value),
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="stok_bahan"
                                                >
                                                    Stok
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="stok_bahan"
                                                    placeholder="Stok Bahan"
                                                    required
                                                    value={bahan.stok.toString()}
                                                    onChange={(e) =>
                                                        setBahan({
                                                            ...bahan,
                                                            stok: parseFloat(e.target.value),
                                                        })
                                                    }
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                    htmlFor="satuan_bahan"
                                                >
                                                    Satuan
                                                </label>
                                                <input
                                                    className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                    id="satuan_bahan"
                                                    placeholder="Satuan Bahan"
                                                    required
                                                    value={bahan.satuan}
                                                    onChange={(e) =>
                                                        setBahan({ ...bahan, satuan: e.target.value })
                                                    }
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-4" />
                                <div className="mt-4 flex w-full items-center">
                                    <button
                                        className="w-full rounded-lg bg-[#AA2B2B] px-5  py-2.5 text-center font-poppins text-sm font-medium text-white outline-none  hover:bg-[#913a3a]"
                                        type="submit"
                                        disabled={isPosting}
                                    >
                                        {isPosting ? 'Menambahkan bahan...' : 'Tambah bahan'}{' '}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


// const option = [{ number: 5 }, { number: 10 }, { number: 20 }, { number: 50 }];

// const List: React.FC = () => {
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [filteredData, setFilteredData] = useState<Bahan[]>(data);

//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [itemsPerPage, setItemsPerPage] = useState<number>(5);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     useEffect(() => {
//         const filtered = data.filter(
//             (item) =>
//                 item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 item.harga.toString().toLowerCase().includes(searchQuery.toLowerCase()),
//         );
//         setFilteredData(filtered);
//     }, [searchQuery]);

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchQuery(e.target.value);
//     };

//     return (
//         <div className="flex justify-center bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
//             <div className="w-full max-w-xl">
//                 <div className="card bg-primary border pb-8 rounded">
//                     <div className="card-body">
//                         <div className="flex pb-4 flex-wrap">
//                             <p className="text-[#AA2B2B] font-semibold">Tambah Bahan Baku</p>
//                             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                                 <form className="space-y-6" action="#" method="POST">
//                                     <div>
//                                         <label
//                                             className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
//                                         >
//                                             Nama Bahan Baku
//                                         </label>
//                                         <label className="input input-bordered flex items-center gap-2 bg-white">
//                                             <input
//                                                 type="text"
//                                                 className="text-sm font-poppins font-normal text-[#555555] w-full"
//                                                 placeholder="Masukkan Nama Bahan"
//                                             />
//                                         </label>
//                                     </div>
//                                     <div>
//                                         <label
//                                             className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
//                                         >
//                                             Satuan Bahan Baku
//                                         </label>
//                                         <label className="input input-bordered flex items-center gap-2 bg-white">
//                                             <input
//                                                 type="text"
//                                                 className="text-sm font-poppins font-normal text-[#555555] w-full"
//                                                 placeholder="Masukkan Satuan Bahan"
//                                             />
//                                         </label>
//                                     </div>
//                                     <div>
//                                         <label
//                                             className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
//                                         >
//                                             Merk Bahan Baku
//                                         </label>
//                                         <label className="input input-bordered flex items-center gap-2 bg-white">
//                                             <input
//                                                 type="text"
//                                                 className="text-sm font-poppins font-normal text-[#555555] w-full"
//                                                 placeholder="Masukkan Merk Bahan"
//                                             />
//                                         </label>
//                                     </div>
//                                     <div className="flex justify-between space-x-4">
//                                         <div>
//                                             <label
//                                                 className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
//                                             >
//                                                 Harga Bahan Baku
//                                             </label>
//                                             <label className="input input-bordered flex items-center gap-2 bg-white">
//                                                 <input
//                                                     type="number"
//                                                     className="text-sm font-poppins font-normal text-[#555555] w-full"
//                                                     placeholder="Masukkan Harga Bahan"
//                                                     min='0'
//                                                 />
//                                             </label>
//                                         </div>
//                                         <div>
//                                             <label
//                                                 className="block text-sm font-medium leading-6 text-gray-900 mb-2 font-poppins"
//                                             >
//                                                 Stok Bahan Baku
//                                             </label>
//                                             <label className="input input-bordered flex items-center gap-2 bg-white">
//                                                 <input
//                                                     type="number"
//                                                     className="text-sm font-poppins font-normal text-[#555555] w-full"
//                                                     placeholder="Opsional"
//                                                     min='0'
//                                                 />
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <button
//                                             type="submit"
//                                             className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm font-normal leading-6 text-white shadow-sm hover:bg-[#b54545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  font-poppins"
//                                         >
//                                             Tambah Bahan Baku
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// }