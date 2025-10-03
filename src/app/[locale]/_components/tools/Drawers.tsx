'use client'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { X } from 'lucide-react';
import ListGroup from './ListGroup';
import { useTranslations } from 'next-intl';

export default function DrawerDetails(props:any) {
    const mt = useTranslations('MainTranslation');
    let content,coordinates,images,details,video,title;
    const [open, setOpen] = useState(props.open);

    const onCloseModal = (event: any) => {
        props.onClose(false);
        setOpen(false);
    };
    switch (props.drawerTitle) {
        case 'details':
            details = props.drawerContent?? "";
            title = mt("menu");
            content = <ListGroup data={details} />;
            break;
    
        default:
            details = props.drawerContent?? "";
            title = mt("menu");
            content = <ListGroup data={details} />;
            break;
    }

    return (
        <Transition show={props.open} as={Fragment} appear={true} >
            <Dialog as="div" onClose={setOpen} className="relative z-100">
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden bg-black/20" onClick={onCloseModal}>
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" >
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                            >
                                <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold text-gray-900">
                                            {title}
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
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
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-0">
                                        {content}
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
