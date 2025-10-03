import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import slugify from "react-slugify";

export default function ListGroup(props:any) {
    const mt = useTranslations('MainTranslation');
    
    return (
        <>
        <ul role="list" className="divide-y divide-gray-200 ">
            {props.data.map((data:any, index: number) => {
                return (
                    <li key={index}>
                        <Link href={data.href} className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
                            {mt(slugify(data.name, { delimiter: '_' }))}
                        </Link>
                    </li>
                )}
            )}
        </ul>
        </>
    );
}