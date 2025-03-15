import { Suspense } from "react";
import { Metadata } from "next";
import { CharacterTable } from "@/components/character-table";
import { Pagination } from "@/components/ui/pagination";
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Character } from "@/types/rick-and-morty";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Characters | Rick and Morty Explorer",
  description: "Browse and filter through all characters in the Rick and Morty universe",
};

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

async function getCharacters(page: number = 1, status?: string, gender?: string) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (status) params.set("status", status);
  if (gender) params.set("gender", gender);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${params.toString()}`
  );
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json() as Promise<CharacterResponse>;
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = await Promise.resolve(searchParams || {});
  
  let currentPage = Number(params.page) || 1;
  const status = typeof params.status === 'string' ? params.status : undefined;
  const gender = typeof params.gender === 'string' ? params.gender : undefined;
  
  try {
    const { info, results } = await getCharacters(currentPage, status, gender);

    if (currentPage > info.pages && info.pages > 0) {
      const redirectUrl = `/characters?${new URLSearchParams({
        ...(status ? { status } : {}),
        ...(gender ? { gender } : {}),
        page: info.pages.toString(),
      }).toString()}`;
      
      redirect(redirectUrl);
    }

    const createPageUrl = (page: number) => {
      const urlParams = new URLSearchParams();
      urlParams.set("page", page.toString());
      if (status) urlParams.set("status", status);
      if (gender) urlParams.set("gender", gender);
      return `/characters?${urlParams.toString()}`;
    };

    const getPageNumbers = (current: number, total: number, display: number = 5) => {
      if (total <= display) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      const middle = Math.floor(display / 2);
      let start = current - middle;
      
      if (start < 1) {
        start = 1;
      }
      
      if (start + display - 1 > total) {
        start = total - display + 1;
      }
      
      return Array.from({ length: display }, (_, i) => start + i);
    };

    const pageNumbers = getPageNumbers(currentPage, info.pages);

    return (
      <main className="container py-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight rick-morty-gradient">Characters</h1>
          <p className="text-muted-foreground">
            Browse through all the characters from Rick and Morty universe.
            Use the filters to find specific characters.
          </p>
        </div>

        <Suspense 
          fallback={
            <div className="w-full h-[400px] rounded-lg border animate-pulse bg-card/50" />
          }
        >
          <CharacterTable
            characters={results}
            totalPages={info.pages}
            currentPage={currentPage}
          />
        </Suspense>

        <Pagination className="my-6 overflow-x-auto pb-2">
          <PaginationContent className="flex-wrap justify-center gap-1 sm:flex-nowrap">
            {currentPage > 1 && (
              <PaginationItem className="hidden sm:flex">
                <PaginationPrevious href={createPageUrl(currentPage - 1)} />
              </PaginationItem>
            )}

            {currentPage > 1 && (
              <PaginationItem className="sm:hidden">
                <PaginationLink href={createPageUrl(currentPage - 1)} aria-label="Previous Page">
                  <span className="sr-only">Previous</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage > 3 && info.pages > 5 && (
              <>
                <PaginationItem>
                  <PaginationLink href={createPageUrl(1)}>1</PaginationLink>
                </PaginationItem>
                {currentPage > 4 && (
                  <PaginationItem className="hidden sm:flex">
                    <span className="flex h-9 w-9 items-center justify-center text-sm">...</span>
                  </PaginationItem>
                )}
              </>
            )}

            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={createPageUrl(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < info.pages - 2 && info.pages > 5 && (
              <>
                {currentPage < info.pages - 3 && (
                  <PaginationItem className="hidden sm:flex">
                    <span className="flex h-9 w-9 items-center justify-center text-sm">...</span>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink href={createPageUrl(info.pages)}>{info.pages}</PaginationLink>
                </PaginationItem>
              </>
            )}

            {currentPage < info.pages && (
              <PaginationItem className="sm:hidden">
                <PaginationLink href={createPageUrl(currentPage + 1)} aria-label="Next Page">
                  <span className="sr-only">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage < info.pages && (
              <PaginationItem className="hidden sm:flex">
                <PaginationNext href={createPageUrl(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </main>
    );
  } catch (error) {
    console.error(error);
  }
}
