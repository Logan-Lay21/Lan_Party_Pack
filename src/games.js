import games from './data/games.json';

export const ALL_GAMES = games;
export const byId = (id) => games.find((g) => g.id === id);

export const CONNECTION = {
  'offline-capable': { badge: 'Works offline', icon: '●', note: 'Can connect without internet using the in-game offline option.' },
  'join-code': { badge: 'Needs internet to join', icon: '◐', note: 'Uses a join code. Some school, work or hotspot networks block direct connections.' },
  'solo-only': { badge: 'Solo only', icon: '○', note: 'Single player.' },
};

export const playersLabel = (g) =>
  g.minPlayers === g.maxPlayers
    ? `${g.maxPlayers} player${g.maxPlayers > 1 ? 's' : ''}`
    : `${g.minPlayers} to ${g.maxPlayers} players`;

export const ALL_GENRES = [...new Set(games.flatMap((g) => g.genres))].sort();
export const ALL_LENGTHS = ['Under 10 min', '10 to 30 min', '30+ min'];
