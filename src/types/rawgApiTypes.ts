export interface Platforms {
  platform: {
    id: number;
    name: string;
    slug: string;
  }
}

export interface GameResponse {
  added: number;
  added_by_status: {
    beaten: number;
    dropped?: number;
    owned?: number;
    playing?: number;
    toplay: number;
    yet?: number; 
  };
  background_image: string;
  clip: string | null;
  community_rating: number;
  dominant_color: string;
  esrb_rating: {
    id: number;
    name: string;
    name_en: string;
    name_ru: string;
    slug: string;
  } | null;
  genres: {
    id: number;
    name: string;
    slug: string;
  }[];
  id: number;
  metacritic: number | null;
  name: string;
  parent_platforms: Platforms[];
  platforms: Platforms[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: {
    count: number;
    id: number;
    percent: number;
    title: string;
  }[];
  ratings_count: number;
  released: string | null;
  reviews_text_count: number;
  saturated_color: string;
  score: number | null;
  short_screenshots: {
    id: number;
    image: string;
  }[];
  slug: string;
  stores: {
    store: {
      id: number;
      name: string;
      slug: string;
    }
  }[] | null;
  suggestions_count: number;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  tba: boolean;
  updated: string;
  user_game: null;
}

export interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

