'use client'
import PropertyOverview from "@/app/[locale]/_components/PropertyOverview";
import { useState, useEffect } from "react";

export default function PropertyBox({
    property
  }: {
    property: any;
  }){
    const properties = JSON.parse(property);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {properties.length > 0 && (
                <>
                {properties.map((post:any,index:any) => { 
                    return (
                        <div key={index}>
                            <PropertyOverview propertyId={post}/>
                        </div>
                    );
                })}
                </>
            )}
        </div>
    );
};