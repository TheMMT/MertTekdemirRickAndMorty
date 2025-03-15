import { create } from 'zustand';

interface CharacterState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedCharacterId: number | null;
  setSelectedCharacterId: (id: number | null) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  selectedCharacterId: null,
  setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),
}));
