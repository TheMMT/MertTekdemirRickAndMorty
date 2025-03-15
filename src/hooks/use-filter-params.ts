'use client';

import { useQueryState } from 'nuqs';
import { StatusFilter, GenderFilter } from '@/types/rick-and-morty';

interface UseFilterParamsOptions {
  initialStatus?: StatusFilter;
  initialGender?: GenderFilter;
  initialPage?: string;
}

export function useFilterParams(options: UseFilterParamsOptions = {}) {
  const { initialStatus, initialGender, initialPage } = options;
  
  const [status, setStatus] = useQueryState<StatusFilter>('status', {
    defaultValue: initialStatus || 'all',
    parse: (value) => value as StatusFilter,
    shallow: false,
  });

  const [gender, setGender] = useQueryState<GenderFilter>('gender', {
    defaultValue: initialGender || 'all',
    parse: (value) => value as GenderFilter,
    shallow: false,
  });

  const [page, setPage] = useQueryState('page', {
    defaultValue: initialPage || '1',
    parse: (value) => value,
    shallow: false,
  });

  return {
    status: status === 'all' ? '' : status,
    setStatus,
    gender: gender === 'all' ? '' : gender,
    setGender,
    page,
    setPage,
  };
}
