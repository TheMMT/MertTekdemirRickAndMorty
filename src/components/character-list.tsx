'use client';

import { useFilterParams } from '@/hooks/use-filter-params';
import { useCharacters } from '@/hooks/api/use-characters';
import CharacterCard from './character-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { StatusFilter, GenderFilter } from '@/types/rick-and-morty';
import { Loader2, AlertCircle } from 'lucide-react';

interface CharacterListProps {
  initialStatus?: string;
  initialGender?: string;
  initialPage?: string;
}

export default function CharacterList({
  initialStatus = '',
  initialGender = '',
  initialPage = '1',
}: CharacterListProps) {
  const { status, gender, page, setPage } = useFilterParams({
    initialStatus: initialStatus as StatusFilter,
    initialGender: initialGender as GenderFilter,
    initialPage,
  });
  const pageNumber = parseInt(page, 10);
  
  const { data, isLoading, isError } = useCharacters({
    page: pageNumber,
    status: status || undefined,
    gender: gender || undefined,
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-rick-green mx-auto" />
          <p className="text-lg font-medium text-muted-foreground">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <div>
            <p className="text-lg font-semibold text-destructive">Error loading characters</p>
            <p className="mt-2 text-muted-foreground">Please try again or adjust your filters</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <p className="text-lg font-semibold">No characters found</p>
            <p className="mt-2 text-muted-foreground">Try adjusting your filters</p>
          </div>
        </div>
      </div>
    );
  }

  const generatePaginationItems = () => {
    const items = [];
    const totalPages = data.info.pages;
    const maxVisiblePages = 5;

    if (pageNumber > 1) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious 
            href={`?page=${pageNumber - 1}${status ? `&status=${status}` : ''}${gender ? `&gender=${gender}` : ''}`}
            className="hover:bg-background/80 transition-colors"
          />
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="1">
        <PaginationLink 
          href={`?page=1${status ? `&status=${status}` : ''}${gender ? `&gender=${gender}` : ''}`}
          isActive={pageNumber === 1}
          className={pageNumber === 1 ? "bg-rick-green/20 hover:bg-rick-green/30" : "hover:bg-background/80"}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (pageNumber > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, pageNumber - 1);
      i <= Math.min(totalPages - 1, pageNumber + 1);
      i++
    ) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href={`?page=${i}${status ? `&status=${status}` : ''}${gender ? `&gender=${gender}` : ''}`}
            isActive={pageNumber === i}
            className={pageNumber === i ? "bg-rick-green/20 hover:bg-rick-green/30" : "hover:bg-background/80"}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (pageNumber < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            href={`?page=${totalPages}${status ? `&status=${status}` : ''}${gender ? `&gender=${gender}` : ''}`}
            isActive={pageNumber === totalPages}
            className={pageNumber === totalPages ? "bg-rick-green/20 hover:bg-rick-green/30" : "hover:bg-background/80"}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (pageNumber < totalPages) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext 
            href={`?page=${pageNumber + 1}${status ? `&status=${status}` : ''}${gender ? `&gender=${gender}` : ''}`}
            className="hover:bg-background/80 transition-colors"
          />
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {data.info.pages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent className="bg-card/50 backdrop-blur-sm rounded-lg border border-[hsl(var(--border))] p-2">
            {generatePaginationItems()}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
