import axios from 'axios';

import { GameResponse } from '../types/igdbReponseTypes';

export const fetchGames = () => {
  return axios.get(`https://api.rawg.io/api/games?key=66079383234d4dcb920bcfc26e2fb8ae&platforms=187`)
    .then((res) => res.data);
};
