'use client'
import { Link } from "@/i18n/navigation";
import { useFormatter } from "next-intl";
import slugify from "react-slugify";
export default function TableDetails(props: any) {
    const format = useFormatter();
    const main = props.data;
    let HOdate;
    if(main.expiration_date){
      HOdate = new Date(main.expiration_date);
      HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short',day: 'numeric'});
    }else{
      HOdate = false;
    }
    const projectURL = '/projects/' + slugify(main.city) + "/" + slugify(main.area) + "/" + slugify(main.district) + "/" + slugify(main.project);

    return (
        <>
        <div className="grid grid-cols-2 my-10">
            <div className="">
                <table className="relative min-w-full  ">
                    <tbody>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Property Type
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.type}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Bedrooms
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.rooms}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Property Size
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.bua} Sqm
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Completion
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {HOdate}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Finishing
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.finishing}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="">
                <table className="relative min-w-full  ">
                    <tbody>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Project Name
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            <Link href={projectURL}>{main.project}</Link>
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Developer
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.supplier}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            District
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.district}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            City
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.city}
                        </td>
                    </tr>
                    <tr>
                        <td
                            scope="col"
                            className="py-3.5 pr-3 pl-4 text-left text-xl text-gray-900 sm:pl-0 "
                        >
                            Status
                        </td>
                        <td scope="col" className="px-3 py-3.5 text-left text-xl font-semibold text-gray-900 ">
                            {main.status_2}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );  
}