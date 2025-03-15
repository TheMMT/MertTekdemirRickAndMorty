import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/types/rick-and-morty';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const statusColor = {
    Alive: 'bg-rick-green text-background',
    Dead: 'bg-destructive text-destructive-foreground',
    unknown: 'bg-muted text-muted-foreground',
  }[character.status];

  return (
    <Link href={`/characters/${character.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group bg-card/50 backdrop-blur-sm border-[hsl(var(--border))]">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold truncate rick-morty-gradient">{character.name}</h3>
            <Badge variant="outline" className={`${statusColor}`}>
              {character.status}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Species:</span>
              <span className="text-sm font-medium">{character.species}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Gender:</span>
              <span className="text-sm font-medium">{character.gender}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Badge 
            variant="outline" 
            className="text-xs hover:bg-portal-blue/10 transition-colors"
          >
            {character.origin.name}
          </Badge>
          <Badge 
            variant="secondary" 
            className="text-xs bg-rick-green/10 hover:bg-rick-green/20 transition-colors"
          >
            {character.episode.length} episode{character.episode.length !== 1 ? 's' : ''}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
