"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { Character } from "@/types/rick-and-morty";
import Image from "next/image";
import { Filter, ChevronDown } from "lucide-react";

interface CharacterTableProps {
  characters: Character[];
  totalPages: number;
  currentPage: number;
}

export function CharacterTable({
  characters,
  totalPages,
  currentPage,
}: CharacterTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || "");
  const [selectedGender, setSelectedGender] = useState(searchParams.get("gender") || "");

  const updateFilters = (type: "status" | "gender", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "") {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    
    params.set("page", "1");
    
    router.push(`/characters?${params.toString()}`);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "default";
      case "dead":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getGenderBadgeVariant = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "default";
      case "female":
        return "portal";
      case "genderless":
        return "morty";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-background/50 backdrop-blur-sm focus-within:outline-none"
            >
              <Filter className="w-4 h-4 mr-2" />
              Status
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-black backdrop-blur-sm">
            <DropdownMenuItem 
              onClick={() => updateFilters("status", "")}
              className={selectedStatus === "" ? "bg-accent" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("status", "alive")}
              className={selectedStatus === "alive" ? "bg-rick-green/20 text-rick-green" : ""}
            >
              Alive
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("status", "dead")}
              className={selectedStatus === "dead" ? "bg-destructive/20 text-destructive" : ""}
            >
              Dead
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("status", "unknown")}
              className={selectedStatus === "unknown" ? "bg-muted" : ""}
            >
              Unknown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="bg-background/50 backdrop-blur-sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Gender
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-background/95 backdrop-blur-sm">
            <DropdownMenuItem 
              onClick={() => updateFilters("gender", "")}
              className={selectedGender === "" ? "bg-accent" : ""}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("gender", "male")}
              className={selectedGender === "male" ? "bg-rick-green/20 text-rick-green" : ""}
            >
              Male
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("gender", "female")}
              className={selectedGender === "female" ? "bg-portal-blue/20 text-portal-blue" : ""}
            >
              Female
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("gender", "genderless")}
              className={selectedGender === "genderless" ? "bg-morty-yellow/20 text-morty-yellow" : ""}
            >
              Genderless
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => updateFilters("gender", "unknown")}
              className={selectedGender === "unknown" ? "bg-muted" : ""}
            >
              Unknown
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border border-[hsl(var(--border))] bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters.map((character) => (
              <TableRow key={character.id}>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{character.name}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(character.status)}>
                    {character.status}
                  </Badge>
                </TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>
                  <Badge variant={getGenderBadgeVariant(character.gender)}>
                    {character.gender}
                  </Badge>
                </TableCell>
                <TableCell>{character.origin.name}</TableCell>
                <TableCell>{character.location.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
