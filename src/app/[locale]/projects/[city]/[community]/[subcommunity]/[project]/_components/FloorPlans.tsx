'use client'
import { useTranslations } from "next-intl";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import Image from "next/image";
import slugify from "react-slugify";
export default function FloorPlans(props:any) {
    const mt = useTranslations('MainTranslation');
    const project = props.data;
    const t = useTranslations('PropertyPage');
    const [fancyboxRef] = useFancybox({
        // Your custom options
    });
    return (
        <>
            {project?.length > 0 && (
                <>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full h-92 py-2 align-middle sm:px-6 lg:px-8" ref={fancyboxRef}>
                            <table className="relative min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr>
                                    <th
                                        scope="col"
                                        className="sticky top-0 z-10 bg-white py-3.5 pr-3 pl-4 text-left font-normal text-sm text-gray-900 sm:pl-0 "
                                    >
                                        {mt("floor_plan")}
                                    </th>
                                    <th scope="col" className="sticky top-0 z-10 bg-white px-3 py-3.5 text-left font-normal text-sm text-gray-900 ">
                                        {mt("unit_size")}
                                    </th>
                                    <th scope="col" className="sticky top-0 z-10 bg-white px-3 py-3.5 text-left font-normal text-sm text-gray-900 ">
                                        {mt("unit_type")}
                                    </th>
                                    <th scope="col" className="sticky top-0 z-10 bg-white px-3 py-3.5 text-left font-normal text-sm text-gray-900 ">
                                        {mt("bedrooms")}
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {project?.map((post:any,index:any) => { 
                                        const title = post.name;
                                        const href = `https://admin.elbayt.com/${post.media[0].path}`;
                                        return (
                                            <tr key={index}>
                                                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <a
                                                    data-fancybox="floorplans" 
                                                    data-caption={`${title} <br/> ${post.media[0].facilities}`} 
                                                    href={href}
                                                    className="text-indigo-600 hover:text-indigo-900 "
                                                >
                                                    <Image src={href} width={100} height={100} alt={title}/>
                                                </a>
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
                                                {post.size}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
                                                {mt(slugify(post.type, { delimiter: '_' }))}
                                                </td>
                                                <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 ">
                                                {post.bedrooms}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </>
            )}
        </>
    );
}