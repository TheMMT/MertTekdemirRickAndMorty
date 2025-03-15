import { useQuery } from '@tanstack/react-query';
import { ApiResponse, StatusFilter, GenderFilter } from '@/types/rick-and-morty';
import { fetchFromAPI } from '@/lib/api';

interface UseCharactersParams {
  page: number;
  status?: StatusFilter;
  gender?: GenderFilter;
}

async function fetchCharacters({ page, status, gender }: UseCharactersParams): Promise<ApiResponse> {
  const params: Record<string, string> = {
    page: page.toString(),
  };
  
  if (status) params.status = status;
  if (gender) params.gender = gender;
  
  return fetchFromAPI<ApiResponse>('/character', params);
}

export function useCharacters({ page, status, gender }: UseCharactersParams) {
  return useQuery({
    queryKey: ['characters', { page, status, gender }],
    queryFn: () => fetchCharacters({ page, status, gender }),
    staleTime: 5 * 60 * 1000,
  });
}
