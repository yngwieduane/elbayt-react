'use client'
import useFancybox from "@/app/[locale]/_components/tools/useFancybox";
import { Button } from "@headlessui/react";
import { Compass, FileText, GalleryThumbnails, Info, MapIcon, MapPin, PaperclipIcon, PencilIcon, RectangleGoggles, RectangleGogglesIcon, Scan, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import MainFacts from "./MainFacts";
export default function MainContent(props:any) {
    const project = props.data;
    const t = useTranslations('PropertyPage');
    return (
        <>
            <MainFacts data={project}/>
        </>
    );
}