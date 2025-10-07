'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { LinkIcon, MinusIcon, PlusIcon, Share, SquareArrowOutUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type AccordionItem = {
  title: string;
  url: string;
  projecturl: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
};

export default function AccordionTabs({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [schemaJson, setSchemaJson] = useState<string | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.title,
    acceptedAnswer: {
        '@type': 'Answer',
        text: item.content,
    },
    })),
  }

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* ... */}
    <div className="w-full relative">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return(
            <div key={index} className="border-b border-gray-200">
            <button
                onClick={() => toggleIndex(index)}
                className={`w-full text-left px-4 py-3 font-normal ${isOpen ? 'bg-blue-100 ' : 'text-gray-800 '} hover:bg-blue-100 cursor-pointer transition`}
            >
                <Link href={item.projecturl+item.url} className="absolute start-5 self-center"><SquareArrowOutUpRight size={15}/> </Link>
                <span className="ps-10">{item.title}</span>
                <span className="text-xl absolute end-5 text-gray-500">{isOpen ? <MinusIcon aria-hidden="true" className="size-4"/>: <PlusIcon aria-hidden="true" className="size-4"/>}</span>
            </button>
            {activeIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                {item.content}
                </div>
            )}
            </div>
        )
      })}
    </div>
    </>
  );
}