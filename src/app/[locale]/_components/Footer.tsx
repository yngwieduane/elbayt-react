'use client';

import { Link } from '@/i18n/navigation';
import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';

export default function Footer() {
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
                        <Link href="/about">About Us</Link>
                        <span>|</span>
                        <Link href="/privacy">Privacy</Link>
                        <span>|</span>
                        <Link href="/terms">Terms of Use</Link>
                    </div>
                    <p className="text-sm">All Rights Reserved.</p>
                    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                        <img
                        src="/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        className="h-12 mt-2"
                        />
                    </a>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">Explore</h3>
                    <ul className="space-y-5">
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/developers">Developers</Link></li>
                        <li><Link href="/interactive-map">Interactive Map</Link></li>
                        <li><Link href="/neighborhoods">Neighborhood</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">Residential</h3>
                    <ul className="space-y-5">
                    <li><Link href="/apartment">Apartment</Link></li>
                    <li><Link href="/villa">Villa</Link></li>
                    <li><Link href="/townhouse">Townhouse</Link></li>
                    <li><Link href="/duplex">Duplex</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">New Cities Projects</h3>
                    <ul className="space-y-5">
                    <li><Link href="/new-cairo">New Cairo</Link></li>
                    <li><Link href="/6th-october">6th October</Link></li>
                    <li><Link href="/new-capital">New Capital</Link></li>
                    <li><Link href="/sheikh-zayed">Sheikh Zayed</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-5">Shore Line Projects</h3>
                    <ul className="space-y-5">
                    <li><Link href="/north-coast">North Coast</Link></li>
                    <li><Link href="/hurghada">Hurghada</Link></li>
                    <li><Link href="/sokhna">Sokhna</Link></li>
                    <li><Link href="/ras-sudr">Ras Sudr</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 border-t border-white/30 pt-4 text-sm flex flex-col md:flex-row justify-between">
            <span className="font-bold">Commercial Registration No 105300600191786</span>
            <span className="font-bold text-center md:text-right">Smart solutions for Real Estate brokerage</span>
            <span className="font-bold">Tax card: 697262103</span>
        </div>
    </footer>
);
}