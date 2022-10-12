import axios from 'axios';

import { GameResponse } from '../types/igdbReponseTypes';

interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

export const fetchGames = (): Promise<RawgApiResponse> => {
  return axios.get(`https://api.rawg.io/api/games?key=66079383234d4dcb920bcfc26e2fb8ae&platforms=187`)
    .then((res) => {console.log(res); return res.data});
};
