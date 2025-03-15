import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import RickAndMortyLogo from "@/public/images/rickmorty.png"

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/50 backdrop-blur-sm" />
      <div className="relative container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
        <div className="relative w-64 h-64 mb-8">
          <Image
            src={RickAndMortyLogo}
            alt="Rick and Morty Logo"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 rick-morty-gradient drop-shadow-lg">
          Rick and Morty Explorer
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-muted-foreground">
          Discover and explore all characters from the Rick and Morty universe. Filter by status, gender, and more!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-rick-green to-portal-blue hover:opacity-90 text-white font-semibold shadow-lg"
          >
            <Link href="/characters">
              Explore Characters
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
