'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';

const BreadcrumbUnit = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter((segment) => segment);
    pathSegments.shift();
    return (
        <nav className="bg-ebLightGreen py-2 px-4 text-gray-600 text-sm sm:text-xs md:text-sm lg:text-base overflow-x-auto  max-w-full whitespace-nowrap scrollbar-hide">
            <ul className="flex items-center space-x-2 text-gray-500 truncate">
                <li>
                    <Link href="/" className="hover:text-ebGreen">
                        Home
                    </Link>
                </li>
                <li className="flex items-center space-x-2">
                    <span>/</span>
                    <Link href="/units" className="hover:text-blue-600">
                        Units
                    </Link>
                </li>
                {pathSegments.slice(1,2).map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                const href =  '/' + pathSegments.slice(0, index + 1).join('/');
                return (
                    <li key={index} className="flex items-center space-x-2">
                    <span>/</span>
                    {isLast ? (
                        <span className="text-gray-900 capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                        {segment.replaceAll('-', ' ')}
                        </span>
                    ) : (
                        <Link href={href} className="hover:text-ebGreen capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                        {segment.replaceAll('-', ' ')}
                        </Link>
                    )}
                    </li>
                );
                })}
            </ul>
        </nav>
    );
}

export default BreadcrumbUnit;