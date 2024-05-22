import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';

interface Address {
    name: string;
    phone: string;
    street: string;
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    main: boolean;
}

const ShippingAddress: React.FC = () => {
    const [isDropshipper, setIsDropshipper] = useState(false);

    const address: Address = {
        name: 'Thessalonica Angelina Meil',
        phone: '+62 88216099529',
        street: 'Jalan Gatot Subroto No.566, RT.54/RW.5',
        subdistrict: 'Randudongkal',
        district: 'Randudongkal',
        city: 'KAB. PEMALANG',
        province: 'JAWA TENGAH',
        postalCode: '52353',
        main: true,
    };

    return (
        <div className="border rounded-lg p-8 shadow-sm mt-4 font-poppins w-full">
            <h2 className="text-lg font-bold text-red-500 flex items-center">
                <CiLocationOn className="hidden md:flex h-5 w-5 mr-2 text-red-500"></CiLocationOn>
                Alamat Pengiriman
            </h2>

            <hr className="my-4" />
            <div className="flex justify-start items-center mb-2 gap-4 flex-wrap">
                <div className="pt-2">
                    <label className="mb-2 block font-poppins text-sm font-medium text-[#111827]" htmlFor="nama_produk">
                        Nama Penerima
                    </label>
                    <input
                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                        id="nama_penerima"
                        placeholder="Nama Penerima"
                        required
                        type="text"
                    ></input>
                </div>
                <div className="pt-2">
                    <label
                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                        htmlFor="no_telp_penerima"
                    >
                        No Telp Penerima
                    </label>
                    <input
                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                        id="no_telp_penerima"
                        placeholder="No Telp Penerima"
                        required
                        type="text"
                    ></input>
                </div>
                <div className="pt-2">
                    <label
                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                        htmlFor="alamat_pengiriman"
                    >
                        Alamat Pengiriman
                    </label>
                    <input
                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                        id="alamat_pengiriman"
                        placeholder="Alamat Pengiriman"
                        required
                        type="text"
                    ></input>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddress;
