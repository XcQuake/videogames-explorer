import { KINOPOISK_URL } from '../utils/contants';
import { KinopoiskResponse, Film } from '../types/kinopoiskApiTypes';

const processResult = (res: Response): Promise<KinopoiskResponse> => {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const fetchFilms = (): Promise<Film[]> => {
  return fetch(
    `${KINOPOISK_URL}/v2.2/films`, {
      method: 'GET',
      headers: {
        'X-API-KEY': '0b2c3b1c-b3ff-4e2d-af91-37ca88e49e01',
        'Content-Type': 'application/json',
      },
    },
  )
  .then((res) => processResult(res))
  .then((data) => data.items);
}