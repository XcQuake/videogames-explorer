export const URLS = {
  playstation: '/games/playstation',
  pc: '/games/pc',
  xbox: '/games/xbox',
};

export const RAWG_API = {
  baseLink: 'https://api.rawg.io/api/games',
  key: process.env.REACT_APP_RAWG_API_KEY,
  platforms: {
    pc: 1,
    playstation: 2,
    xbox: 3,
  },
};

export const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
};
