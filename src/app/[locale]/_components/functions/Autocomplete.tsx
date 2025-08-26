// components/Autocomplete.js
'use client'
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from "lucide-react";
type Project = {
  propertyName: string;
  propertyId: string; 
  city_name:string;
  community_name:string;
};
export default function AutocompleteSearch({ isReset }:{ isReset:any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(searchParams.get('propertyName')?.toString());
  const [iDValue, setIDValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [resetStatus, setResetStatus] = useState(isReset);
  const [propertyId, setPropertyId] = useState(searchParams.get('propertyId')?.toString());

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        setShowDropdown(true);
        setLoading(true);
        fetch(`/api/getprojects?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setResults([]);
        setLoading(false);
        setShowDropdown(false);
        setIDValue(0);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);
  
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
    setResetStatus('false');
    updateQuery('propertyName',e.target.value);
  };

  const updateQuery = useDebouncedCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    console.log(key + " = " + value );
    router.push(`${pathname}?${params.toString()}`);
  },300);

  const handleOptionClick = (property:string,id:any) => (e:any) => {
    setIDValue(id);
    setInputValue(property);
    setShowDropdown(false);
    updateQuery('propertyId',id);
    setPropertyId(propertyId)
  }
  // if(isReset){
  //   setResetStatus(isReset);
  // }

  return (
    <div className="w-[520px] relative">
      <label htmlFor="email" className="hidden">
          Property Name {isReset}
      </label>
      <div className="mt-0 grid grid-cols-1">
        <input
          type="text"
          id="propertyName"
          name="propertyName"
          placeholder="Keyword Search Ex. North Coast,Emaar,The Waterway"
          //value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          className="col-start-1 row-start-1 block w-full rounded-md bg-gray-50 md:bg-white py-1.5 pr-3 pl-10 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 placeholder:text-gray-500"
        />
        <Search
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-800 sm:size-4"
        />
      </div>
      {loading && <p className="absolute left-0 right-0 bg-white bg-gray-50 mt-1 z-10 max-h-60 overflow-auto shadow rounded-md">Searching...</p>}
      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white bg-gray-50 mt-1 z-10 max-h-60 overflow-auto shadow-xl rounded-md ">
          {results.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center">
              <strong>{item.propertyName}</strong>
              <span className="text-sm text-gray-500">({item.community_name}, {item.city_name})</span>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        id="propertyId"
        name="propertyId"
        defaultValue={propertyId}
        className="hidden"
        readOnly
      />
    </div>
  );
}