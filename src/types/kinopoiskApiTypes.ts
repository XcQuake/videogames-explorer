export interface Film {
  countries: {
    country: string;
  }[];
  genres: {
    genre: string;
  }[];
  imbId: string;
  kinopoiskId: number;
  nameEn: string | null;
  nameOriginal: string;
  nameRu: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  ratingKinoposk: number;
  type: string;
  year: number;
};

export interface KinopoiskResponse {
  total: number;
  totalPages: number;
  items: Film[];
};