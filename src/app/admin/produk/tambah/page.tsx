'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/dummy_data/product';
import { ProductType } from '@/dummy_data/product_type';
import { Alert } from '@mui/material';
import { IoClose } from 'react-icons/io5';

export default function Produk() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [productType, setProductType] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isPosting, setIsPosting] = useState<boolean>(false);

    useEffect(() => {
        const fetchProductType = async () => {
            try {
                const response = await axios.get(apiUrl + '/product_type/');
                const productTypeData = response.data.product_type;
                setProductType(productTypeData);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductType();
    }, []);

    useEffect(() => {
        setProduct({
            ...product,
            product_type_id: productType.find((type) => type.name == 'Produk Toko')?.id || 0,
        });
    }, [productType]);

    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        description: '',
        stock: 0,
        daily_quota: 0,
        status: 'Aktif',
        product_type_id: 0,
        consignation_id: null,
        photo: null,
    });

    const [alert, setAlert] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(product);
        // Create FormData object
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', String(product.price));
        formData.append('description', product.description);
        formData.append('stock', String(product.stock));
        formData.append('daily_quota', String(product.daily_quota));
        formData.append('status', product.status);
        formData.append('product_type_id', String(product.product_type_id));
        formData.append('consignation_id', String(product.consignation_id));

        if (product.photo) {
            formData.append('photo', product.photo);
        }
        console.log(formData);
        setIsPosting(true);

        axios({
            method: 'post',
            url: apiUrl + '/product',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                setProduct({
                    name: '',
                    price: 0,
                    description: '',
                    stock: 0,
                    daily_quota: 0,
                    status: 'Aktif',
                    product_type_id: 0,
                    consignation_id: null,
                    photo: null,
                });

                const fileInput = document.getElementById('foto_produk') as HTMLInputElement;
                if (fileInput) {
                    fileInput.value = '';
                }
                setAlert(true);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsPosting(false);
            });
    };

    // Function to handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setProduct({ ...product, photo: file });
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center font-poppins text-black text-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    } else {
        return (
            <>
                <div className="flex bg-[#FFFCFC] min-h-screen font-poppins text-black p-8">
                    {alert && (
                        <div className="flex justify-center w-screen fixed top-20 left-0 z-50">
                            <Alert
                                severity="success"
                                className="font-poppins mb-4"
                                onClose={() => {
                                    setAlert(false);
                                }}
                            >
                                <p>Berhasil menambah produk!</p>
                            </Alert>
                        </div>
                    )}
                    <div className="w-full">
                        <div className="card bg-primary border pb-8 rounded ">
                            <div className="card-body">
                                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        <div className="h-min rounded-md border bg-white">
                                            <div className="border-b p-4">
                                                <p className=" text-[#AA2B2B] ">Detail Produk</p>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="nama_produk"
                                                    >
                                                        Tipe Produk
                                                    </label>
                                                    <input
                                                        className="block w-full rounded-lg border border-[#DADDE2] bg-white p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="tipe_produk"
                                                        placeholder="Tipe Produk"
                                                        required
                                                        type="text"
                                                        value={
                                                            productType.find((type) => type.name === 'Produk Toko')
                                                                ?.name || ''
                                                        }
                                                        readOnly
                                                        onChange={(e) =>
                                                            setProduct({
                                                                ...product,
                                                                product_type_id:
                                                                    productType.find(
                                                                        (type) => type.name === 'Produk Toko',
                                                                    )?.id || 0,
                                                            })
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="nama_produk"
                                                    >
                                                        Nama Produk
                                                    </label>
                                                    <input
                                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="nama_produk"
                                                        placeholder="Nama Produk"
                                                        required
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) =>
                                                            setProduct({ ...product, name: e.target.value })
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="nama_produk"
                                                    >
                                                        Harga Produk
                                                    </label>
                                                    <input
                                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="harga_produk"
                                                        placeholder="Harga Produk"
                                                        required
                                                        type="number"
                                                        value={product.price.toString()}
                                                        onChange={(e) =>
                                                            setProduct({
                                                                ...product,
                                                                price: parseFloat(e.target.value),
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="kata_kunci"
                                                    >
                                                        Deskripsi
                                                    </label>
                                                    <textarea
                                                        className=" block w-full resize-none rounded-lg border  border-[#DADDE2] p-2.5 font-poppins text-sm text-gray-900 outline-none bg-white"
                                                        id="kata_kunci"
                                                        placeholder="Deskripsi"
                                                        required
                                                        value={product.description}
                                                        onChange={(e) =>
                                                            setProduct({ ...product, description: e.target.value })
                                                        }
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-md border bg-white">
                                            <div className="border-b p-4">
                                                <p className=" text-[#AA2B2B] ">Detail Lebih Lanjut</p>
                                            </div>
                                            <div className="p-4">
                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="ready_stock"
                                                    >
                                                        Ready Stock
                                                    </label>
                                                    <input
                                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="harga_produk"
                                                        placeholder="Ready Stock"
                                                        required
                                                        type="number"
                                                        value={product.stock.toString()}
                                                        onChange={(e) =>
                                                            setProduct({
                                                                ...product,
                                                                stock: parseFloat(e.target.value),
                                                            })
                                                        }
                                                    ></input>
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="quota"
                                                    >
                                                        Quota Harian PO
                                                    </label>
                                                    <input
                                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="quota"
                                                        placeholder="Quota Harian PO"
                                                        required
                                                        type="number"
                                                        value={product.daily_quota.toString()}
                                                        onChange={(e) =>
                                                            setProduct({
                                                                ...product,
                                                                daily_quota: parseFloat(e.target.value),
                                                            })
                                                        }
                                                    ></input>
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        className="mb-2 block font-poppins text-sm font-medium text-[#111827]"
                                                        htmlFor="foto_produk"
                                                    >
                                                        Foto Produk
                                                    </label>
                                                    <input
                                                        className=" block w-full rounded-lg border border-[#DADDE2] bg-white  p-2.5 font-poppins text-sm text-black outline-none"
                                                        id="foto_produk"
                                                        type="file"
                                                        required
                                                        onChange={handleFileChange}
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
                                            {isPosting ? 'Menambahkan Product...' : 'Tambah Product'}{' '}
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
}
