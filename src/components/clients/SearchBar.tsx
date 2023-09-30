import { useDebounceValue } from '@/hooks/useDebounce';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';

type SearchBarProps = {
  setDebouncedSearch: Dispatch<SetStateAction<string>>;
  isOpenSearch: boolean;
  handleToggleSearchValues: () => void;
};

export const SearchBar: FC<SearchBarProps> = ({
  setDebouncedSearch,
  isOpenSearch,
  handleToggleSearchValues,
}) => {
  const { pathname, query } = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounceValue(searchValue.trim(), 500);

  useEffect(() => {
    setDebouncedSearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchValue('');
  }, [pathname, query]);

  return (
    <input
      className={clsx(
        'w-full text-parS hidden md:block text-white bg-transparent placeholder:text-white font-medium pl-2 py-1 pr-7 md:border-b-2 md:border-b-white outline-none',
        isOpenSearch
          ? 'max-md:block max-md:absolute max-md:top-full max-md:left-0 max-md:text-black max-md:placeholder:text-darkGray-60 max-md:bg-white max-md:border-2 max-md:border-darkGray-100 max-md:py-2.5'
          : null,
      )}
      type="text"
      placeholder="Пошук"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onFocus={handleToggleSearchValues}
      onBlur={() => setTimeout(() => handleToggleSearchValues(), 300)}
    />
  );
};
