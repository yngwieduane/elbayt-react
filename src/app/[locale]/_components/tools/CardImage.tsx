import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import slugify from "react-slugify";

export default function CardImage(props:any) {
    const mt = useTranslations('MainTranslation');
    return (
        <Link href={props.href} className="group">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm group-hover:bg-ebGreen">
                <div className="p-0">
                    <Image
                        alt=""
                        src={props.image}
                        className="aspect-3/2 w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                        width={200}
                        height={200}
                    />
                </div>
                <div className="px-2 py-4 text-sm text-center group-hover:text-white">
                    {mt(slugify(props.name, { delimiter: '_' }))}
                </div>
            </div>
        </Link>
    )
}