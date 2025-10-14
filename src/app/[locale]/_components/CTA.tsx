'use client';

import { Link } from '@/i18n/navigation';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { Mail, Phone, PhoneCall } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Modal from './tools/Modal';
import { useState } from 'react';

export default function CTA() {
    const mt = useTranslations('MainTranslation');
    const [setModal, setSetModal] = useState(false);
    const [popContent, setPopContent] = useState('map');
    const [popData, setPopData] = useState('map');
    const modalHandler = (content:string,valuesarray:any) => (e:any) => {
        console.log("clicked = " + setModal);
        setPopContent(content);
        setPopData(valuesarray);
        setSetModal(true);
    };

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
    };
    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;
    return (
        <div className='sticky bottom-0 right-0 left-0  bg-white md:hidden '>
            <div className='mx-auto w-100 '>
                <div className="grid grid-cols-3 text-center items-center justify-end gap-3 mt-3 border-t border-gray-900/5 p-4">
                    <Link href={`tel:${phoneNumber}`} className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg items-center flex justify-center"><Phone size={20} /></Link>
                    <button
                        onClick={modalHandler('contactform', 'Contact Us')}
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg flex justify-center cursor-pointer"
                    ><Mail size={20} />
                    </button>
                    <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20.`} className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white text-lg flex justify-center"><SiWhatsapp color='#ffffff' size={20} /></Link>
                </div>
                 <Modal modalState={setModal} onModalUpdate={modalUpdate} content={popContent} data={popData}/>
            </div>
        </div>
    );
}