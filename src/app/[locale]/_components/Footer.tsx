'use client';

import { Link } from '@/i18n/navigation';
import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
    const mt = useTranslations('MainTranslation');
return (
    <footer className="bg-[#007770] text-white px-6 md:px-16 py-10">
        <div className="justify-between py-10">
            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-4 text-xl">
                        <a href="#" target="_blank"><SiInstagram size={20}/></a>
                        <a href="#" target="_blank"><SiFacebook size={20}/></a>
                        <a href="#" target="_blank"><SiX size={20}/></a>
                        <a href="#" target="_blank"><SiYoutube size={20}/></a>
                    </div>
                    <div className="text-sm space-x-2">
                        <Link href="/about">{mt('about_us')}</Link>
                        <span>|</span>
                        <Link href="/privacy">{mt('privacy')}</Link>
                        <span>|</span>
                        <Link href="/terms">{mt('terms_of_use')}</Link>
                    </div>
                    <p className="text-sm">{mt('all_rights_reserved')}</p>
                    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                        <Image
                        width={200}
                        height={200}
                        src="/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        className="h-12 mt-2"
                        />
                    </a>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">{mt('explore')}</h3>
                    <ul className="space-y-5">
                        <li><Link href="/projects">{mt('projects')}</Link></li>
                        <li><Link href="/developers">{mt('developers')}</Link></li>
                        <li><Link href="/interactive-map">{mt('interactive_map')}</Link></li>
                        <li><Link href="/neighborhoods">{mt('neighborhood')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">{mt('residential')}</h3>
                    <ul className="space-y-5">
                    <li><Link href="/apartment">{mt('apartment')}</Link></li>
                    <li><Link href="/villa">{mt('villa')}</Link></li>
                    <li><Link href="/townhouse">{mt('townhouse')}</Link></li>
                    <li><Link href="/duplex">{mt('duplex')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">{mt('new_cities_projects')}</h3>
                    <ul className="space-y-5">
                    <li><Link href="/new-cairo">{mt('new_cairo')}</Link></li>
                    <li><Link href="/6th-october">{mt('6th_october')}</Link></li>
                    <li><Link href="/new-capital">{mt('new_capital')}</Link></li>
                    <li><Link href="/sheikh-zayed">{mt('sheikh_zayed')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">{mt('shore_line_projects')}</h3>
                    <ul className="space-y-5">
                    <li><Link href="/north-coast">{mt('north_coast')}</Link></li>
                    <li><Link href="/hurghada">{mt('hurghada')}</Link></li>
                    <li><Link href="/sokhna">{mt('sokhna')}</Link></li>
                    <li><Link href="/ras-sudr">{mt('ras_sudr')}</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 border-t border-white/30 pt-4 text-sm flex flex-col md:flex-row justify-between">
            <span className="font-bold">{mt('commercial_registration_no_105300600191786')}</span>
            <span className="font-bold text-center md:text-right">{mt('smart_solutions_for_real_estate_brokerage')}</span>
            <span className="font-bold">{mt('tax_card_697262103')}</span>
        </div>
    </footer>
);
}