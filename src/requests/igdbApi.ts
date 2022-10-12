import axios from 'axios';

import { IGDB_API } from '../utils/contants';
import { KinopoiskResponse, Movie } from '../types/kinopoiskApiTypes';
import { GameResponse } from '../types/igdbReponseTypes';

const processResult = (res: Response): Promise<KinopoiskResponse> => {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const HEADERS = {
  'Authorization': `Bearer ${IGDB_API.accessToken}`,
};

interface ServerResponse {
  data: KinopoiskResponse;
}

export const fetchGames = () => {
  return axios.get(`https://api.rawg.io/api/games?key=66079383234d4dcb920bcfc26e2fb8ae&platforms=187`)
    .then((res) => res.data);
};
