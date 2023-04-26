import { CatBreed, CatImage, CatInfo } from "@/types/cat";

export interface CatBrowserState {
  breeds: CatBreed[];
  selectedBreed: string;
  items: CatImage[];
  totalImages: number;
  isLoading: boolean;
  page: number;
  limitPerPage: number;
  loadedCatItem: CatInfo | null;
}

export interface RootState {
  cat: CatBrowserState;
}
