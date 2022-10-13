import axios from 'axios';

import { GameResponse } from '../types/igdbReponseTypes';

interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

export const fetchGames = (link: string): Promise<RawgApiResponse> => {
  return axios.get(link)
    .then((res) => res.data);
};
