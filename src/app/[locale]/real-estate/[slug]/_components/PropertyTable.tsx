'use client'
import PropertyOverviewTable from "@/app/[locale]/_components/PopertyOverviewTable";

export default function PropertyTable({
    property
  }: {
    property: any;
  }){
    const properties = JSON.parse(property);
    return (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="relative min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead>
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[500px]">
                                Image
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Project
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Community
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Developer Name
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Unit Types
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Sub Community
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Completion Date
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Finishing
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Bedrooms
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200" >
                    {properties.length > 0 && (
                        <>
                        {properties.map((post:any,index:any) => { 
                            return (
                                    <PropertyOverviewTable key={index} propertyId={post}/>
                            );
                        })}
                        </>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};