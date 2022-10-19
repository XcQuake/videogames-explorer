import axios from 'axios';

import { GameResponse } from '../types/rawgApiTypes';
import { RAWG_API } from '../utils/contants';


const { baseLink, key } = RAWG_API;

interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

export const fetchGames = (page: number, platformId: number | null): Promise<RawgApiResponse> => {
  return axios.get(baseLink, {
    params: {
      key: key,
      parent_platforms: platformId,
      dates: '2022-10-01,2022-10-15',
      page,
    },
  })
    .then((res) => res.data);
};
