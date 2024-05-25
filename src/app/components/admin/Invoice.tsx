'use client';
import Image from 'next/image';
import React from 'react';

export default function Invoice({ id }: { id: string }) {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded  my-6" id="invoice font-poppins">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <div>
                    <Image src="/images/logo/logo.jpg" alt="" width={100} height={100}></Image>
                </div>
                <div className="md:text-right text-black">
                    <p>Atma Kitchen</p>
                    <p className="text-gray-500 text-sm">Jl. Central Park 21, km 08</p>
                    <p className="text-gray-500 text-sm">admin@gmail.com</p>
                    <p className="text-gray-500 text-sm">+6288978932472</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-8 text-base gap-4">
                <div>
                    <p className="font-bold text-gray-800">Customer :</p>
                    <p className="text-gray-500">riel@gmail.com</p>
                    <p className="text-gray-500">Penerima : Riel</p>
                    <p className="text-gray-500">Kampung Sawah, RT 7 RW 27, No. 7 Bekasi, Indonesia</p>
                    <p className="text-gray-500">Delivery : Dikirim kurir</p>
                </div>
                <div className="md:text-right text-base">
                    <p className="text-gray-500">
                        Invoice number :<span className="text-[#AA2B2B]"> 21.01.01</span>
                    </p>
                    <p className="text-gray-500">
                        Lunas Pada :<span className="text-[#AA2B2B]"> 2023-10-10</span>
                    </p>
                    <p className="text-gray-500">
                        Tanggal Ambil :<span className="text-[#AA2B2B]"> 2023-10-10</span>
                    </p>
                </div>
            </div>

            <div className="-mx-4 mt-8 flow-root sm:mx-0">
                <table className="min-w-full">
                    <colgroup>
                        <col className="w-full sm:w-1/2" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                        <col className="sm:w-1/6" />
                    </colgroup>
                    <thead className="border-b border-gray-300 text-gray-900">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                Items
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                            >
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="font-medium text-gray-900">Kue Lapis</div>
                                <div className="mt-1 truncate text-gray-500">Diproduksi dari bekasi dengan baik</div>
                            </td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">5</td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                Rp. 5.000.000
                            </td>
                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">Rp. 25.000</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="font-medium text-gray-900">Tahu Walik</div>
                                <div className="mt-1 truncate text-gray-500">Tahu walik kas banjarmasin</div>
                            </td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">5</td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                Rp. 5.000.000
                            </td>
                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">Rp. 25.000</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="font-medium text-gray-900">Bakso Boraks</div>
                                <div className="mt-1 truncate text-gray-500">
                                    Bakso tikus yang dibumbui dengan boraks
                                </div>
                            </td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">5</td>
                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                Rp. 5.000.000
                            </td>
                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">Rp. 25.000</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                            >
                                Subtotal
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                            >
                                Subtotal
                            </th>
                            <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">Rp. 150.000</td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                            >
                                Ongkir (rad. 5km)
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                            >
                                Ongkir (rad. 5km)
                            </th>
                            <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">Rp. 25.000</td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                            >
                                Potongan 120 Poin
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                            >
                                Potongan 120 Poin
                            </th>
                            <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">-12.000</td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                            >
                                Total
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                            >
                                Total
                            </th>
                            <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                                Rp. 1.000.000
                            </td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal  text-gray-900 sm:table-cell sm:pl-0"
                            >
                                Poin Dari Pesanan Ini
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-4 text-left text-sm font-normal  text-gray-900 sm:hidden"
                            >
                                Poin Dari Pesanan Ini
                            </th>
                            <td className="pl-3 pr-4 pt-4 text-right text-sm  text-gray-900 sm:pr-0">10</td>
                        </tr>
                        <tr>
                            <th
                                scope="row"
                                colSpan={3}
                                className="hidden pl-4 pr-3 pt-4 text-right text-sm  text-gray-900 font-normal sm:table-cell sm:pl-0"
                            >
                                Total Poin Customer
                            </th>
                            <th
                                scope="row"
                                className="pl-6 pr-3 pt-4 text-left text-sm  text-gray-900 font-normal sm:hidden"
                            >
                                Total Poin Customer
                            </th>
                            <td className="pl-3 pr-4 pt-4 text-right text-sm  text-gray-900 sm:pr-0">115</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className=" pt-4 text-xs text-gray-500 text-center mt-16">
                <hr />
                <p className="mt-6">
                    Invoice ini sah dan diproses oleh komputer, Silahkan hubungan <b>Atma Kitchen </b>apabila kamu
                    membutuhkan bantuan
                </p>
            </div>
        </div>
    );
}
