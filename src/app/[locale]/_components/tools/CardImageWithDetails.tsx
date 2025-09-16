import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function CardImageWithDetails(props:any) {
    return (
        <Link href={props.href} className="group">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm group-hover:bg-ebGreen h-full">
                <div className="p-0">
                    <Image
                        alt=""
                        src={props.image}
                        className="aspect-3/2 w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="px-2 py-4 group-hover:text-white divide-y divide-gray-200 gap-2 flex flex-wrap">
                    <div className="grid grid-cols-1 gap-2 w-full">
                        <p className="text-xl font-semibold">{props.name}</p>
                        <p className="text-sm mb-2">{props.community}</p>
                    </div>
                    <p className="text-sm">{props.developer}</p>
                </div>
            </div>
        </Link>
    )
}