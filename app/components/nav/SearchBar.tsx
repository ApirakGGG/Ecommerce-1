'use client'

import Icon from "@mdi/react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { mdiMagnify, mdiClose } from '@mdi/js';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { formatPrice } from "@/untils/formatPrice";

const SearchBar = () => {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { searchTerm: '' }
  })

  const searchValue = watch('searchTerm');

  useEffect(() => {
    if (!searchValue || !searchValue.trim()) {
      setResults([]);
      setIsDropdownOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      axios.get(`/api/search?q=${encodeURIComponent(searchValue.trim())}`)
        .then((res) => {
          setResults(res.data);
          setIsDropdownOpen(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsDropdownOpen(false);
    if (!data.searchTerm?.trim()) return router.push('/')

    const url = queryString.stringifyUrl({
      url: '/',
      query: { searchTerm: data.searchTerm.trim() }
    }, { skipNull: true, skipEmptyString: true })

    router.push(url)
    reset()
    setResults([])
  }

  const handleClear = () => {
    reset()
    setResults([])
    setIsDropdownOpen(false)
    router.push('/')
  }

  const handleResultClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setIsDropdownOpen(false);
    reset();
    setResults([]);
  };

  return (
    <div className="relative w-full z-30" ref={dropdownRef}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full relative"
      >
        {/* Search icon */}
        <div className="absolute left-3 text-gray-400 pointer-events-none">
          <Icon path={mdiMagnify} size={0.85} />
        </div>

        <input
          {...register('searchTerm')}
          autoComplete="off"
          type="text"
          placeholder="Search products, brands..."
          onFocus={() => {
            if (results.length > 0) setIsDropdownOpen(true);
          }}
          className="w-full pl-9 pr-20 py-2 rounded-full bg-gray-100 border border-transparent
            focus:outline-none focus:bg-white focus:border-[#a0856a] focus:ring-1 focus:ring-[#a0856a] focus:shadow-sm
            text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200"
        />

        {/* Clear button — only show when there's text */}
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon path={mdiClose} size={0.7} />
          </button>
        )}

        {/* Search submit button */}
        <button
          type="submit"
          className="absolute right-1.5 bg-gray-900 hover:bg-[#a0856a] text-white
            rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
        >
          <Icon path={mdiMagnify} size={0.75} />
        </button>
      </form>

      {/* Dropdown Results */}
      {isDropdownOpen && (searchValue.trim().length > 0) && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden text-sm animate-fade-in-down py-2">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <div 
                  key={product.id} 
                  onClick={() => handleResultClick(product.id)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.images?.[0]?.image || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-gray-900 truncate">{product.name}</span>
                    <span className="text-[#a0856a] font-bold">{formatPrice(product.price)}</span>
                  </div>
                </div>
              ))}
              <div 
                className="w-full text-center py-3 border-t border-gray-100 text-[#a0856a] font-medium hover:bg-[#fdf8f3] cursor-pointer transition-colors"
                onClick={handleSubmit(onSubmit)}
              >
                ดูผลลัพธ์การค้นหาทั้งหมด 
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              ไม่พบสินค้าเกี่ยวกับ &quot;{searchValue}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar;