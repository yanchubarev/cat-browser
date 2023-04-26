export interface CatImage {
  id?: string;
  image: string;
}

export interface CatInfo extends CatImage {
  name?: string;
  origin?: string;
  temperament?: string;
  description?: string;
  breed?: string;
}

export interface CatBreed {
  id: string;
  name: string;
}

export interface CatImages {
  items: CatImage[];
  totalImages: number;
}
