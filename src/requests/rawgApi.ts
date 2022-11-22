import axios from 'axios';

import {
  GameDetails,
  GameResponse,
  ScreenshotsResponse,
} from '../types/rawgApiTypes';
import { RAWG_API } from '../utils/contants';

const { baseLink, key } = RAWG_API;

interface RawgApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameResponse[];
  user_platforms: boolean;
}

class RawgApi {
  getGamesList(
    page: number,
    platformId: number | null,
    releaseDates: string
  ): Promise<RawgApiResponse> {
    return axios
      .get(baseLink, {
        params: {
          key: key,
          parent_platforms: platformId,
          dates: releaseDates,
          page,
        },
      })
      .then((res) => res.data);
  }

  getGameDetails(id: string): Promise<GameDetails> {
    return axios
      .get(`${baseLink}/${id}`, {
        params: {
          key: key,
        },
      })
      .then((res) => res.data);
  }

  getGameScreenshots(id: string): Promise<ScreenshotsResponse> {
    return axios
      .get(`${baseLink}/${id}/screenshots`, {
        params: {
          key: key,
        },
      })
      .then((res) => res.data);
  }
}

const rawgApi = new RawgApi();

export default rawgApi;
