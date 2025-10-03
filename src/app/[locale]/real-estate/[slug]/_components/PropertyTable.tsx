'use client'
import PropertyOverviewTable from "@/app/[locale]/_components/PopertyOverviewTable";
import { useTranslations } from "next-intl";

export default function PropertyTable({
    property
  }: {
    property: any;
  }){
    const mt = useTranslations('MainTranslation');
    const properties = JSON.parse(property);
    return (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead>
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal w-[500px]">
                                {mt('image')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('project')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('community')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('developer_name')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('unit_types')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('sub_community')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('completion_date')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('finishing')}
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm text-black font-normal">
                                {mt('bedrooms')}
                            </th>
                        </tr>
                    </thead>
                    {properties.length > 0 && (
                        <tbody className="divide-y divide-gray-200" >
                        {properties.map((post:any,index:any) => { 
                            return (
                                    <PropertyOverviewTable key={index} propertyId={post}/>
                            );
                        })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};