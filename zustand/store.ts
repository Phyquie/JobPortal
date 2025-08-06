// store/searchStore.ts
import { create } from 'zustand';
import { debounce } from 'lodash';

interface SearchState {
    query: string;
    setQuery: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => {
    const debouncedSetQuery = debounce((value: string) => {
        set({ query: value });
    }, 500);

    return {
        query: '',
        setQuery: debouncedSetQuery,
    };
});
