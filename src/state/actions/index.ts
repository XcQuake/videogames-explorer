import { GameResponse, RawgApiResponse } from '../../types/rawgApiTypes';

export enum ActionType {
  FETCH_GAMESLIST = 'fetch_gameslist',
  CLEAR_GAMESLIST = 'clear_gameslist',
}

export interface FetchGamesListAction {
  type: ActionType.FETCH_GAMESLIST,
  payload: RawgApiResponse,
}

export interface ClearGamesListAction {
  type: ActionType.CLEAR_GAMESLIST,
}