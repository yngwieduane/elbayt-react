'use client'
import { useTranslations } from "next-intl";
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import Image from "next/image";
export default function FloorPlans(props:any) {
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
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" ref={fancyboxRef}>
                            <table className="relative min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 "
                                    >
                                        Floor Plan
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Unit Size
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Unit Type
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ">
                                        Bedrooms
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
                                                {post.type}
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