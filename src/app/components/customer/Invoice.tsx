import { Transaction } from '@/dummy_data/transaction';
import { TransactionDetail } from '@/dummy_data/transaction_detaill';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { IoPrintOutline } from 'react-icons/io5';
import { usePDF } from 'react-to-pdf';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
interface Nota {
    transaksi: Transaction[];
    detail_transaksi: TransactionDetail[];
}

export default function Invoice({ id, email, nota }: { id: string; email: string; nota: Nota }) {
    const [poinPotongan, setPoinPotongan] = useState<number>(0);
    const [nominalPotongan, setNominalPotongan] = useState<number>(0);
    const [totalHarusBayar, setTotalHarusBayar] = useState<number>(0);
    const [poinDariPesananIni, setPoinDariPesananIni] = useState<number>(0);
    const [totalPoinCustomer, setTotalPoinCustomer] = useState<number>(0);
    const componentRef = useRef(null);

    const onBeforeGetContentResolve = useRef<any>(null);

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('old boring text');

    const handleAfterPrint = useCallback(() => {
        console.log('`onAfterPrint` called');
    }, []);

    const handleBeforePrint = useCallback(() => {
        console.log('`onBeforePrint` called');
    }, []);

    const handleOnBeforeGetContent = useCallback(() => {
        console.log('`onBeforeGetContent` called');
        setLoading(true);
        setText('Loading new text...');

        return new Promise<void>((resolve) => {
            onBeforeGetContentResolve.current = resolve;

            setTimeout(() => {
                setLoading(false);
                setText('New, Updated Text!');
                resolve();
            }, 2000);
        });
    }, []);

    useEffect(() => {
        if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
            onBeforeGetContentResolve.current();
        }
    }, [text]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, []);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        onBeforeGetContent: handleOnBeforeGetContent,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
    });
    const reactToPrintTrigger = React.useCallback(() => {
        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return (
            <button className="flex items-center justify-center border bg-[#AA2B2B]  text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer outline-none m-4">
                Print
                <span className="ml-1">
                    <IoPrintOutline></IoPrintOutline>
                </span>
            </button>
        );
    }, []);
    return (
        <div>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="invoice"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div ref={componentRef} className="max-w-3xl mx-auto p-6 bg-white rounded my-6" id="invoice font-poppins">
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
                        <p className="text-gray-500">{email}</p>
                        <p className="text-gray-500">Penerima : {nota.transaksi[0].nama_penerima}</p>
                        <p className="text-gray-500">{nota.transaksi[0].alamat_penerima}</p>
                        <p className="text-gray-500">Delivery: {nota.transaksi[0].delivery}</p>
                    </div>
                    <div className="md:text-right text-base">
                        <p className="text-gray-500">
                            Invoice number :<span className="text-[#AA2B2B]"> {nota.transaksi[0].invoice_number}</span>
                        </p>
                        <p className="text-gray-500">
                            Lunas Pada :
                            <span className="text-[#AA2B2B]">
                                {' '}
                                {nota.transaksi[0].lunas_pada ? nota.transaksi[0].lunas_pada : '-'}
                            </span>
                        </p>
                        <p className="text-gray-500">
                            Tanggal Pemesanan :
                            <span className="text-[#AA2B2B]">
                                {' '}
                                {nota.transaksi[0].tanggal_pemesanan ? nota.transaksi[0].tanggal_pemesanan : '-'}
                            </span>
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
                            {nota.detail_transaksi.map((item, index) => {
                                if (item.hampers) {
                                    return (
                                        <tr className="border-b border-gray-200" key={index}>
                                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="font-medium text-gray-900">
                                                    {item.hampers.hampers_name}
                                                </div>
                                                <div className="mt-1 truncate text-gray-500">
                                                    {item.hampers.deskripsi}
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                {item.hampers_quantity}
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                Rp. {item.hampers_price?.toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                                Rp.{' '}
                                                {(item.hampers_price! * item.hampers_quantity!).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    );
                                } else if (item.product) {
                                    return (
                                        <tr className="border-b border-gray-200" key={index}>
                                            <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="font-medium text-gray-900">{item.product.name}</div>
                                                <div className="mt-1 truncate text-gray-500">
                                                    {item.product.description}
                                                </div>
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                {item.product_quantity}
                                            </td>
                                            <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                                                Rp. {item.product_price?.toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                                                Rp.{' '}
                                                {(item.product_price! * item.product_quantity!).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
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
                                <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                    Rp. {nota.transaksi[0].total_price?.toLocaleString('id-ID')}
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                >
                                    Ongkir
                                    {nota.transaksi[0].distance ? ' (' + nota.transaksi[0].distance + ' km)' : ' (km) '}
                                </th>
                                <th
                                    scope="row"
                                    className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                                >
                                    Ongkir
                                    {nota.transaksi[0].distance ? nota.transaksi[0].distance + '(km)' : ' (km) '}
                                </th>
                                {nota.transaksi[0].distance ? (
                                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                        Rp. {nota.transaksi[0].delivery_fee?.toLocaleString('id-ID')}
                                    </td>
                                ) : (
                                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                                        Rp. {nota.transaksi[0].delivery_fee?.toLocaleString('id-ID')}
                                    </td>
                                )}
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                                >
                                    Potongan ({nota.transaksi[0].point_used}) Poin
                                </th>
                                <th
                                    scope="row"
                                    className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                                >
                                    Potongan ({nota.transaksi[0].point_used}) Poin
                                </th>
                                <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                                    -Rp.
                                    {(nota.transaksi[0].point_used! * 100).toLocaleString('id-ID')}
                                </td>
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
                                    Rp. {nota.transaksi[0].transfer_nominal!.toLocaleString('id-ID')}
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
                                <td className="pl-3 pr-4 pt-4 text-right text-sm  text-gray-900 sm:pr-0">
                                    {nota.transaksi[0].point_income}
                                </td>
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
                                <td className="pl-3 pr-4 pt-4 text-right text-sm  text-gray-900 sm:pr-0">
                                    {nota.transaksi[0].total_poin_user}
                                </td>
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
        </div>
    );
}
