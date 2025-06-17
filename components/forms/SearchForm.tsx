'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { debounce } from '@/lib/debounce';

const defaultValues = {
    search: '',
};

const errorValidation = z.object({
    search: z.string().min(3, 'Search query is too short'),
});

const SearchForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: zodResolver(errorValidation),
    });

    const handleSearch = (values: typeof defaultValues) => {
        const trimSearch = values.search.trim();
        router.push(`/search?query=${encodeURIComponent(trimSearch)}`);
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

    return (
        <form
            data-testid="search-form"
            onSubmit={handleSubmit(debouncedSearch)}
            className="flex-1 mx-4"
        >
            <Input
                type="text"
                placeholder="Search movies..."
                className={cn('w-full max-w-md outline-none', {
                    'focus-visible:ring-rose-400': errors.search,
                })}
                {...register('search')}
            />
        </form>
    );
};

export default SearchForm;
