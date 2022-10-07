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

export const fetchMovies = (type: string): Promise<Movie[]> => {
  return fetch(
    `${KINOPOISK_API.url}/v2.2/films?type=${type}`, {
      method: 'GET',
      headers: HEADERS,
    },
  )
  .then((res) => processResult(res))
  .then((data) => data.items);
};

// export const fetchTvShows = (): Promise<Movie[]> => {
//   return fetch(
//     `${KINOPOISK_API.url}/v2.2/films?type=TV_SHOW`, {
//       method: 'GET',
//       headers: HEADERS,
//     },
//   )
//   .then((res) => processResult(res))
//   .then((data) => data.items);
// };