import axios from 'axios';

import { KINOPOISK_API } from '../utils/contants';
import { KinopoiskResponse, Movie } from '../types/kinopoiskApiTypes';

const processResult = (res: Response): Promise<KinopoiskResponse> => {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

const HEADERS = {
  'X-API-KEY': KINOPOISK_API.key,
  'Content-Type': 'application/json', 
};

interface ServerResponse {
  data: KinopoiskResponse;
}

export const fetchMovies = (type: string, page: number): Promise<KinopoiskResponse> => {
  return axios.get<KinopoiskResponse>(
    `${KINOPOISK_API.url}/v2.2/films?order=NUM_VOTE&type=${type}&page=${page}`,{
      // transformResponse: (res: ServerResponse) => res.data,
      headers: HEADERS,
  })
  .then((res) => res.data);
};
