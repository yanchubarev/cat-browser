import { CatInfo } from "@/types/cat";

export interface CatImageResponse {
  id?: string;
  url: string;
}

export interface CatInfoResponse {
  id?: string;
  url: string;
  breeds: CatInfo[];
}
