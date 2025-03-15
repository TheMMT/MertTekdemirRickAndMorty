'use client';

import { useFilterParams } from '@/hooks/use-filter-params';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusFilter, GenderFilter } from '@/types/rick-and-morty';
import { Filter } from 'lucide-react';

export default function FilterSection() {
  const { status, setStatus, gender, setGender } = useFilterParams();

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-[hsl(var(--border))]">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-rick-green" />
          <CardTitle className="rick-morty-gradient">Filters</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-muted-foreground">
            Status
          </label>
          <Select
            value={status}
            onValueChange={(value: StatusFilter) => setStatus(value)}
          >
            <SelectTrigger 
              id="status-filter" 
              className="bg-background/50 backdrop-blur-sm border-[hsl(var(--border))] transition-colors hover:bg-background/80"
            >
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm">
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="alive" className="text-rick-green hover:bg-rick-green/10">Alive</SelectItem>
              <SelectItem value="dead" className="text-destructive hover:bg-destructive/10">Dead</SelectItem>
              <SelectItem value="unknown" className="text-muted-foreground hover:bg-muted/10">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="gender-filter" className="text-sm font-medium text-muted-foreground">
            Gender
          </label>
          <Select
            value={gender}
            onValueChange={(value: GenderFilter) => setGender(value)}
          >
            <SelectTrigger 
              id="gender-filter" 
              className="bg-background/50 backdrop-blur-sm border-[hsl(var(--border))] transition-colors hover:bg-background/80"
            >
              <SelectValue placeholder="All genders" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm">
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="female" className="text-portal-blue hover:bg-portal-blue/10">Female</SelectItem>
              <SelectItem value="male" className="text-rick-green hover:bg-rick-green/10">Male</SelectItem>
              <SelectItem value="genderless" className="text-morty-yellow hover:bg-morty-yellow/10">Genderless</SelectItem>
              <SelectItem value="unknown" className="text-muted-foreground hover:bg-muted/10">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
