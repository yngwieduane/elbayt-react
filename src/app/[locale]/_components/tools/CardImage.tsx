import { Link } from "@/i18n/navigation";

export default function CardImage(props:any) {
    return (
        <Link href={props.href} className="group">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm group-hover:bg-ebGreen">
                <div className="p-0">
                    <img
                        alt=""
                        src={props.image}
                        className="aspect-3/2 w-full rounded-lg object-cover outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10"
                    />
                </div>
                <div className="px-4 py-4 sm:px-6 text-center group-hover:text-white">
                    {props.name}
                </div>
            </div>
        </Link>
    )
}