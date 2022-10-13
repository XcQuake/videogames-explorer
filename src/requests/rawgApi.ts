import axios from 'axios';

import { GameResponse } from '../types/rawgApiTypes';
import { RAWG_API } from '../utils/contants';


const { baseLink, key, platforms } = RAWG_API;

interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

export const fetchGames = (page: number): Promise<RawgApiResponse> => {
  return axios.get(baseLink, {
    params: {
      key: key,
      platforms: platforms.pc,
      page,
    },
  })
    .then((res) => res.data);
};
