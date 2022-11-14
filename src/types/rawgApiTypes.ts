export type ParentPlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Platform = {
  platform: {
    id: number;
    games_count: number;
    image: string | null;
    image_background: string | null;
    name: string;
    slug: string;
    year_end: string | null;
    year_start: string | null;
  };
  released_at: string;
};

export type Store = {
  id: number;
  store: {
    domain: string;
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  };
};

export type Developer = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

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
  parent_platforms: ParentPlatform[];
  platforms: ParentPlatform[];
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
  stores:
    | {
        store: {
          id: number;
          name: string;
          slug: string;
        };
      }[]
    | null;
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

export interface GameDetails {
  achievements_count: number;
  added: number;
  added_by_status: {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
  };
  additions_count: number;
  alternative_names: string[];
  background_image: string | null;
  background_image_additional: string | null;
  clip: string | null;
  creators_count: number;
  description: string;
  description_raw?: string;
  developers: Developer[];
  dominant_color: string;
  esrb_rating: {
    id: number;
    name: string;
    name_en: string;
    name_ru: string;
    slug: string;
  } | null;
  game_series_count: number;
  genres: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  id: number;
  metacritic: number;
  metacritic_platforms: [];
  metacritic_url: string;
  movies_count: number;
  name: string;
  name_original: string;
  parent_achievements_count: number;
  parent_platforms: ParentPlatform[];
  parents_count: number;
  platforms: Platform[];
  playtime: number;
  publishers: {
    games_count: number;
    id: number;
    image_background: string | null;
    name: string;
    slug: string;
  }[];
  rating: number;
  rating_top: number;
  ratings: {
    count: number;
    id: number;
    percent: number;
    title: string;
  }[];
  ratings_count: number;
  reactions: {
    [key: number]: number;
  };
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  screenshots_count: number;
  slug: string;
  stores: Store[];
  suggestion_count: number;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  tba: boolean;
  twitch_count: number;
  updated: string;
  website: string;
  suggestions_count: number;
  user_game: null;
  community_rating: number;
  youtube_count: number;
}

export interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}
