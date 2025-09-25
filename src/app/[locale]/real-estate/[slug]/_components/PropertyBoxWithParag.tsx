'use client'
import PropertyOverviewWithParag from "@/app/[locale]/_components/PropertyOverviewWithParag";

export default function PropertyBoxWithParag({
    property
  }: {
    property: any;
  }){
    const properties = JSON.parse(property);
    return (
        <div className="grid grid-cols-1 gap-10">
            {properties.length > 0 && (
                <>
                {properties.map((post:any,index:any) => { 
                    return (
                        <div key={index}>
                            <PropertyOverviewWithParag propertyId={post}/>
                        </div>
                    );
                })}
                </>
            )}
        </div>
    );
};