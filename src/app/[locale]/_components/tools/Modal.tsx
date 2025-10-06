'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import MapComponent from '../functions/MapComponent';
import InquiryForm from '../InquiryForm';
import { X } from 'lucide-react';

export default function Modal({ modalState, onModalUpdate ,content, data }: { modalState:any;onModalUpdate:any;content: any;data: any }) {
    const [open, setOpen] = useState(modalState);
    const onCloseModal = (event: any) => {
        onModalUpdate(false);
    };

    const saveFormDataHandler = (formData: any) => {
        console.log(formData);
    };
    let popsize,popContent,coordinates,title,textprop;
    switch (content) {
        case 'map':
            coordinates = data.split(",")?? "";
            title = "Map";
            popsize = "sm:max-w-7xl";
            textprop = "hidden";
            popContent = <MapComponent latitude={coordinates['1']} longitude={coordinates['0']} fallbackImage="" height="100%" />;
            break;
        case 'marketingtext':
            title = data.marketDate;
            popsize = "sm:max-w-md";
            textprop = "";
            popContent = data.marketText;
            break;
        case 'brochure':
            title = 'Brochure';
            popsize = "sm:max-w-7xl";
            textprop = "hidden";
            popContent = <iframe src={data} className="w-full h-[700px]" />;
            break;
        case 'contactform':
            title = 'Contact Form';
            popsize = "sm:max-w-md";
            textprop = "";
            popContent = <InquiryForm hideFeedbackButton={true}/>;
            break;
        default:
            coordinates = data.split(",")?? "";
            title = "Map";
            popContent = ""
    }
    return (
        <div>
            <Dialog open={modalState} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in "
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={onCloseModal}>
                        <DialogPanel
                        transition
                        className={`relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full ${popsize} sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95`}
                    
                        >   
                            <div className="ml-3 flex h-7 items-center justify-end">
                                <button
                                type="button"
                                onClick={onCloseModal}
                                className="relative rounded-md text-gray-400 hover:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <X size={30} />
                                </button>
                            </div>
                            <DialogTitle as="h3" className={`text-xl font-semibold text-gray-900 text-center mb-5 ${textprop}`}>
                                {title}
                            </DialogTitle>
                            <div className='whitespace-break-spaces'>{popContent}</div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
