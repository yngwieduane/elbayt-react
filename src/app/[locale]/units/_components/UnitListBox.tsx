'use client'
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function UnitListBox(props:any){
    let images, price;
    {props.data.sale_price !== null
        ? price = props.data.sale_price
        : price = props.data.rent_price;
    }

    const [setModal, setSetModal] = useState(false);
    const modalHandler = (event:any) => {
        console.log("clicked = " + setModal);
        setSetModal(true);
    };

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
        };
    return (
        <>
        <article className="relative isolate flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center">
            <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                <img
                alt=""
                src={props.img}
                className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                <div className="absolute left-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {props.data.project}
                </div>
                <div className="absolute right-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {props.data.project}
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center gap-x-4 text-xs">
                    <Link
                        href="#"
                        className="flex items-center gap-2 left-7 top-7 md:left-0 md:top-0 md:relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                    >
                        <MapPin /> {props.data.area}
                    </Link>
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/unit/${props.seoUrl}`} >
                            <span className="absolute inset-0 " />
                            <p className="">{props.data.project}</p>
                        </Link>
                    </h3>
                    <p className="mt-2 md:mt-5 text-normal/6 text-gray-600 truncate">{props.data.district}, {props.data.area}, {props.data.city}</p>
                    <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-500">{props.data.type} | {props.data.rooms} Beds | {props.data.finishing}</p>
                </div>
            </div>
        </article>
        </>
    );
}