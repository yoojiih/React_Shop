/* eslint-disable jsx-a11y/anchor-is-valid */
// Fragment, useState -> tailwind
import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
// -------- tailwind ---------
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
// ---------------------------

const navigation = {
categories: [
    {
    id: 'women',
    name: 'Women',
    featured: [
        {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
        name: 'Basic Tees',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
        imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
    ],
    sections: [
        {
        id: 'clothing',
        name: 'Clothing',
        items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
        ],
        },
        {
        id: 'accessories',
        name: 'Accessories',
        items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
        ],
        },
        {
        id: 'brands',
        name: 'Brands',
        items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
        ],
        },
    ],
    },
    {
    id: 'men',
    name: 'Men',
    featured: [
        {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
        imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
        name: 'Artwork Tees',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
        imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
    ],
    sections: [
        {
        id: 'clothing',
        name: 'Clothing',
        items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
        ],
        },
        {
        id: 'accessories',
        name: 'Accessories',
        items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
        ],
        },
        {
        id: 'brands',
        name: 'Brands',
        items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
        ],
        },
    ],
    },
],
pages: [
    { name: 'Shop', href: '/product' },
    { name: 'Cart', href: '/user/cart' },
    { name: 'Upload', href: '/product/upload' },
],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Gnb(props) {
    const user = useSelector(state => state.user)
    // tailwind
    const [open, setOpen] = useState(false)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
            props.history.push("/login");
            } else {
            alert('Log Out Failed')
            }
    })}

    if (user.userData && !user.userData.isAuth) {
        return (
            <>
        <div className="bg-#C8BBAB">
            {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                        <div className="px-4 pt-5 pb-2 flex">
                            <button
                            type="button"
                            className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                            onClick={() => setOpen(false)}
                            >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Links */}
                        <Tab.Group as="div" className="mt-2">
                            <div className="border-b border-gray-200">
                            <Tab.List className="-mb-px flex px-4 space-x-8">
                                {navigation.categories.map((category) => (
                                <Tab
                                    key={category.name}
                                    className={({ selected }) =>
                                    classNames(
                                        selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                    )
                                    }
                                >
                                    {category.name}
                                </Tab>
                                ))}
                            </Tab.List>
                            </div>
                            <Tab.Panels as={Fragment}>
                            {navigation.categories.map((category) => (
                                <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                <div className="grid grid-cols-2 gap-x-4">
                                    {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-sm">
                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                        <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                        </div>
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                        {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                        Shop now
                                        </p>
                                    </div>
                                    ))}
                                </div>
                                {category.sections.map((section) => (
                                    <div key={section.name}>
                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                        {section.name}
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                        className="mt-6 flex flex-col space-y-6"
                                    >
                                        {section.items.map((item) => (
                                        <li key={item.name} className="flow-root">
                                            <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                            {item.name}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                ))}
                                </Tab.Panel>
                            ))}
                            </Tab.Panels>
                        </Tab.Group>
                        {/* Company Store */}
                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            {navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                                <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                                {page.name}
                                </a>
                            </div>
                            ))}
                        </div>
                        {/* 모바일 화면 시 nav sidebar 맨 밑에 들어감 */}
                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            <div className="flow-root">
                            <a href="/login" className="-m-2 p-2 block font-medium text-gray-900">
                                Sign in
                            </a>
                            </div>
                            <div className="flow-root">
                            <a href="/register" className="-m-2 p-2 block font-medium text-gray-900">
                                Sign up
                            </a>
                            </div>
                        </div>
                        </div>
                    </Transition.Child>
                    </Dialog>
                </Transition.Root>
                {/* Background Color */}
                {/* bg-transparent: 투명색 bg-white bg-red-500 (50,100-900숫자 커질수록 진해짐)*/}
                {/* w: width */}
                {/* w-full 	width: 100%; / w-screen	width: 100vw; / w-min	width: min-content; / w-max	width: max-content; */}
                <header className="relative bg-opacity-0">
                    {/* navbar 전체 */}
                    {/* max-w-7xl: 	max-width: 80rem; */}
                    {/* mx: margin-left & margin-right */}
                    {/* px: padding-left: 1rem; padding-right: 1rem; */}
                    {/* sm: 640px   max-width: 640px;  */}
                    {/* lg: 1024px	max-width: 1024px; */}
                    {/* container */}
                    {/* None	width: 100%; */}
                    {/* sm (640px)	max-width: 640px; */}
                    {/* md (768px)	max-width: 768px; */}
                    {/* lg (1024px)	max-width: 1024px; */}
                    {/* xl (1280px)	max-width: 1280px; */}
                    {/* 2xl (1536px)max-width: 1536px; */}
                    <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                        {/* Flex Direction */}
                        {/* flex-row, flex-row-reverse, flex-col, flex-col-reverse */}
                        {/* Display */}
                        {/* block, inline, flex, table, grid, contents, hidden */}
                        <div className="h-16 flex items-center">
                        <button
                            type="button"
                            className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {/* ============================ Logo ==================================== */}
                        {/* Font Size */}
                        {/* text-xs, sm, base, lg, xl, 2xl... 9xl  */}
                        {/* Font Weight */}
                        {/* font-thin(font-weight: 100), extralight, light, normal, medium, semibold, extrabold, black(font-weight: 900)   */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="/" className="text-white text-6xl py-9 m-1" style = {{fontFamily: 'Carter One'}}>YUJI</a>
                        </div>
                        {/* ============================ women men company stores ==================================== */}
                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex space-x-8">
                            {navigation.categories.map((category) => (
                                <Popover key={category.name} className="flex">
                                {({ open }) => (
                                    <>
                                    <div className="relative flex">
                                        <Popover.Button
                                        className={classNames(
                                            open
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-700 hover:text-gray-800',
                                            'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                        )}
                                        >
                                        {category.name}
                                        </Popover.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                        <div className="relative bg-white">
                                            <div className="max-w-7xl mx-auto px-8">
                                            <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <img
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt}
                                                        className="object-center object-cover"
                                                        />
                                                    </div>
                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                    <p aria-hidden="true" className="mt-1">
                                                        Shop now
                                                    </p>
                                                    </div>
                                                ))}
                                                </div>
                                                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${section.name}-heading`}
                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                        {section.items.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="hover:text-gray-800">
                                                            {item.name}
                                                            </a>
                                                        </li>
                                                        ))}
                                                    </ul>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </Popover.Panel>
                                    </Transition>
                                    </>
                                )}
                                </Popover>
                            ))}

                            {navigation.pages.map((page) => (
                                <a
                                key={page.name}
                                href={page.href}
                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                {page.name}
                                </a>
                            ))}
                            </div>
                        </Popover.Group>    
                        {/* ============================ Sign in Sign up CAD search shoppingbag ==================================== */}
                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800" style = {{fontFamily: 'LibreBarcode39'}}>
                                SIGN IN
                            </a>
                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                            <a href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800" style = {{fontFamily: 'LibreBarcode39'}}>
                                SIGN UP
                            </a>
                            </div>
                            {/* Search */}
                            <div className="flex lg:ml-6">
                            <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Search</span>
                                <SearchIcon className="w-6 h-6" aria-hidden="true" />
                            </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                            <a href="#" className="group -m-2 p-2 flex items-center">
                                <ShoppingBagIcon
                                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </nav>
                </header>
            </div>
            </>
        )} else {
            return (
                <>
                
            <div className="bg-opacity-0">
            {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                        <div className="px-4 pt-5 pb-2 flex">
                            <button
                            type="button"
                            className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                            onClick={() => setOpen(false)}
                            >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Links */}
                        <Tab.Group as="div" className="mt-2">
                            <div className="border-b border-gray-200">
                            <Tab.List className="-mb-px flex px-4 space-x-8">
                                {navigation.categories.map((category) => (
                                <Tab
                                    key={category.name}
                                    className={({ selected }) =>
                                    classNames(
                                        selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                    )
                                    }
                                >
                                    {category.name}
                                </Tab>
                                ))}
                            </Tab.List>
                            </div>
                            <Tab.Panels as={Fragment}>
                            {navigation.categories.map((category) => (
                                <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                <div className="grid grid-cols-2 gap-x-4">
                                    {category.featured.map((item) => (
                                    <div key={item.name} className="group relative text-sm">
                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                        <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                                        </div>
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                        {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                        Shop now
                                        </p>
                                    </div>
                                    ))}
                                </div>
                                {category.sections.map((section) => (
                                    <div key={section.name}>
                                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                        {section.name}
                                    </p>
                                    <ul
                                        role="list"
                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                        className="mt-6 flex flex-col space-y-6"
                                    >
                                        {section.items.map((item) => (
                                        <li key={item.name} className="flow-root">
                                            <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                            {item.name}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                ))}
                                </Tab.Panel>
                            ))}
                            </Tab.Panels>
                        </Tab.Group>

                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            {navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                                <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                                {page.name}
                                </a>
                            </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                            <div className="flow-root">
                            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                                Sign in
                            </a>
                            </div>
                            <div className="flow-root">
                            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                                Create account
                            </a>
                            </div>
                        </div>
                        </div>
                    </Transition.Child>
                    </Dialog>
                </Transition.Root>
                <header className="relative bg-opacity-0">
                    <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="h-16 flex items-center">
                        <button
                            type="button"
                            className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {/* ============================ Logo ==================================== */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="/" className="text-white text-6xl py-9 m-1" style = {{fontFamily: 'Carter One'}}>YUJI</a>
                        </div>
                        {/* style = {{fontFamily: 'Carter One', fontSize: '55px', padding:'10px'}} */}
                        {/* ============================ women men company stores ==================================== */}
                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex space-x-8">
                            {navigation.categories.map((category) => (
                                <Popover key={category.name} className="flex">
                                {({ open }) => (
                                    <>
                                    <div className="relative flex">
                                        <Popover.Button
                                        className={classNames(
                                            open
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-gray-700 hover:text-gray-800',
                                            'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                                        )}
                                        >
                                        {category.name}
                                        </Popover.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                        <div className="relative bg-white">
                                            <div className="max-w-7xl mx-auto px-8">
                                            <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                    <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <img
                                                        src={item.imageSrc}
                                                        alt={item.imageAlt}
                                                        className="object-center object-cover"
                                                        />
                                                    </div>
                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                        <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                    <p aria-hidden="true" className="mt-1">
                                                        Shop now
                                                    </p>
                                                    </div>
                                                ))}
                                                </div>
                                                <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${section.name}-heading`}
                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                        {section.items.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="hover:text-gray-800">
                                                            {item.name}
                                                            </a>
                                                        </li>
                                                        ))}
                                                    </ul>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </Popover.Panel>
                                    </Transition>
                                    </>
                                )}
                                </Popover>
                            ))}

                            {navigation.pages.map((page) => (
                                <a
                                key={page.name}
                                href={page.href}
                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                >
                                {page.name}
                                </a>
                            ))}
                            </div>
                        </Popover.Group>    
                        {/* ============================ Sign in Sign up CAD search shoppingbag ==================================== */}
                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <p className="text-sm font-medium text-gray-700 hover:text-gray-800" style = {{fontFamily: 'LibreBarcode39'}}>
                            {/* 🤎 {user.userData.name} 님 안녕하세요 🤎 */}
                            </p>
                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                            <a className="text-sm font-medium text-gray-700 hover:text-gray-800" style = {{fontFamily: 'LibreBarcode39'}} onClick={logoutHandler}>
                                LOGOUT
                            </a>
                            </div>
                            {/* Search */}
                            <div className="flex lg:ml-6">
                            <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Search</span>
                                <SearchIcon className="w-6 h-6" aria-hidden="true" />
                            </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                            <a href="/user/cart" className="group -m-2 p-2 flex items-center">
                                <ShoppingBagIcon
                                className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </nav>
                </header>
            </div>
            </>
            )
    }
}

export default withRouter(Gnb);