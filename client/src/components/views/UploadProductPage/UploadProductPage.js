import React, { useState } from 'react'
// import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

// const { Title } = Typography;
// const { TextArea } = Input;

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)
    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            price: PriceValue,
            images: Images,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }

    return (
        <div style={{ maxWidth: '100%', margin: '2rem auto' }}>
            <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{fontFamily: 'Permanent Marker', color:'white', fontSize: '100px'}}>Upload Product</h1>
                </div>
                    <div className="md:grid md:grid-cols-4 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={onSubmit} >
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                    onChange={onTitleChange}
                                    value={TitleValue}
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                                    placeholder="Title"
                                    />
                                </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price($)
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    onChange={onPriceChange}
                                    value={PriceValue}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md sm:text-sm border-gray-300"
                                    placeholder="price"
                                    defaultValue={''}
                                />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                    >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" refreshFunction={updateImages} />

                                        {/* DropZone */}
                                        {/* <FileUpload refreshFunction={updateImages} /> */} 
                                        {/* <input class="form-control" type="file" id="formFile" refreshFunction={updateImages} /> */}
                                    

                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                            <button
                                type="submit"
                                onSubmit={onSubmit} 
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-white hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200"
                            >
                                SUBMIT
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadProductPage
