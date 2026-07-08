'use client'

import Icon from "@mdi/react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { mdiMagnify, mdiClose } from '@mdi/js';

const SearchBar = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { searchTerm: '' }
  })

  const searchValue = watch('searchTerm')

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm?.trim()) return router.push('/')

    const url = queryString.stringifyUrl({
      url: '/',
      query: { searchTerm: data.searchTerm.trim() }
    }, { skipNull: true, skipEmptyString: true })

    router.push(url)
    reset()
  }

  const handleClear = () => {
    reset()
    router.push('/')
  }

  return (
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
        className="w-full pl-9 pr-20 py-2 rounded-full bg-gray-100 border border-transparent
          focus:outline-none focus:bg-white focus:border-gray-300 focus:shadow-sm
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
        className="absolute right-1.5 bg-gray-900 hover:bg-blue-600 text-white
          rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
      >
        <Icon path={mdiMagnify} size={0.75} />
      </button>
    </form>
  )
}

export default SearchBar;