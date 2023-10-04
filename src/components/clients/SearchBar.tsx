import { useDebounceValue } from '@/hooks/useDebounce';
import type { TUser } from '@/types/types';
import { ROUTE } from '@/utils/routes';
import { searchUsersByQuery } from '@/utils/searchUsers';
import Link from 'next/link';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export const SearchBar: FC = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<TUser[]>([]);
  const [cache, setCache] = useState<{ [query: string]: TUser[] }>({});

  const debouncedQuery = useDebounceValue(query.trim(), 500);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setQuery(searchValue);
    },
    [],
  );

  const fetchUsers = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const usersByQuery = await searchUsersByQuery(
        debouncedQuery,
        controller.signal,
      );
      if (!controller.signal.aborted) {
        setCache((prevCache) => ({
          ...prevCache,
          [debouncedQuery]: usersByQuery,
        }));
        setUsers(usersByQuery);
      }
    } catch (error) {
      toast.error('Error when search client.');
    } finally {
      abortControllerRef.current = null;
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      if (cache[debouncedQuery]) {
        setUsers(cache[debouncedQuery]);
      } else {
        fetchUsers();
      }
    } else {
      setUsers([]);
    }
  }, [debouncedQuery, cache, fetchUsers]);

  return (
    <div className="min-w-[450px] relative max-md:min-w-[250px] max-md500:w-full">
      <div className="relative">
        {query !== '' ? (
          <button
            onClick={() => setQuery('')}
            className="w-5 h-5 absolute left-6 top-1/2 transform -translate-y-1/2"
          >
            <img src="/icons/close-gray-icon.svg" alt="close btn" />
          </button>
        ) : (
          <img
            src="/icons/search-icon.svg"
            alt="search icon"
            className="w-6 absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        )}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search Clients"
          className="border-2 border-grayBtn px-4 py-2 text-sm16 text-black rounded-lg pl-16 w-full focus:outline-2 focus:outline-grayStroke-70"
        />
      </div>
      {users ? (
        <div className="absolute top-11 left-0 w-full shadow-md bg-white z-10 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <Link
              onClick={() => setQuery('')}
              key={user._id}
              href={`${ROUTE.USER_TASK_LIST}/${user._id}`}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-grayBg"
            >
              <div className="flex items-center">
                <span className="font-medium text-black text-sm16">
                  {user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.email}
                </span>
              </div>
              <span className="text-md20 text-black">&gt;</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};
