'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, MenuIcon, Phone, X } from 'lucide-react'
import AutocompleteSearch from './functions/Autocomplete'
import LanguageSwitcher from './functions/LanguageSwitcher'
import Drawers from './tools/Drawers'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

const navigation = [
    { name: 'Communities', href: '/projects' },
    // { name: 'Residential', href: '#' },
    // { name: 'Commercial', href: '#' },
    { name: 'Units', href: '/units' },
    { name: 'Developers', href: '/developers' },
    // { name: 'Interactive Map', href: '#' },
    // { name: 'Neighborhood', href: '#' },
    { name: 'Egypt Real Estate', href: '/real-estate' },
    { name: 'List My Property', href: '/list-your-property' },
    // { name: 'FAQs', href: '#' },
    // { name: 'Offers', href: '#' },
]

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [reset, setReset] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('menu');
    const [dwDataTitle, setDwDataTitle] = useState('menu');
    const drawerHandler = (content:string,valuesarray:any) => (e:any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">elbayt.com</span>
                    <Image
                    alt=""
                    src="/elbayt-name-only.png"
                    className="h-8 w-auto dark:hidden"
                    width={200}
                    height={200}
                    />
                    <Image
                    alt=""
                    src="/elbayt-name-only.png"
                    width={200}
                    height={200}
                    className="h-8 w-auto not-dark:hidden"
                    />
                </Link>
                </div>
                <div className="flex lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
                >
                    <span className="sr-only">Open main menu</span>
                    <Menu size={30} />
                </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {/* {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                        {item.name}
                        </a>
                    ))} */}
                    <AutocompleteSearch isReset={reset}/>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
                    <LanguageSwitcher/>
                    <Link
                        href='#'
                        className="px-3 py-1.5 rounded-lg border border-gray-400 bg-transparent hover:bg-gray-200 cursor-pointer"
                    >
                        <Phone size={20}/>
                    </Link>
                    <Link
                        href='#'
                        className="px-3 py-1.5 rounded-lg border border-[#25D366] bg-[#25D366] hover:opacity-50 cursor-pointer"
                    >
                        <SiWhatsapp color='#ffffff' size={20} />
                    </Link>
                    <button
                        type="button"
                        onClick={drawerHandler('menu', navigation)}
                        name="details"
                        className=" px-3 py-0 rounded-lg border border-gray-400 bg-transparent hover:bg-gray-200 cursor-pointer"
                    >
                        <MenuIcon size={20}/>
                    </button>
                {/* <a href="#" className="text-sm/6 font-semibold text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                </a> */}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">elbayt.com</span>
                    <Image
                        alt=""
                        src="/elbayt-name-only.png"
                        className="h-8 w-auto dark:hidden"
                        width={200}
                        height={200}
                    />
                    <Image
                        alt=""
                        src="/elbayt-name-only.png"
                        className="h-8 w-auto not-dark:hidden"
                        width={200}
                        height={200}
                    />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-700 "
                        >
                        <span className="sr-only">Close menu</span>
                        <X size={30}/>
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10 ">
                    <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 "
                        >
                            {item.name}
                        </Link>
                        ))}
                    </div>
                    <div className="py-6">
                        {/* <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                        Log in
                        </a> */}
                    </div>
                    </div>
                </div>
                </DialogPanel>
            </Dialog>
            <Drawers open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent}/>
        </header>
    )
}