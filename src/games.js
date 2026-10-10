import games from './data/games.json';

export const ALL_GAMES = games;
export const byId = (id) => games.find((g) => g.id === id);

// Every game is hosted on GitHub Pages, so all of them need internet to load.
export const NEEDS_INTERNET = 'Needs an internet connection to load. The game is hosted on GitHub Pages.';

export const CONNECTION = {
  lan: { badge: 'LAN multiplayer', icon: '●', note: 'Play together on the same Wi-Fi or hotspot. Some school, work or hotspot networks block direct connections.' },
  online: { badge: 'Online multiplayer', icon: '◐', note: 'Players connect over the internet with a join code.' },
  'solo-only': { badge: 'Solo only', icon: '○', note: 'Single player.' },
};

// Games without a hosted playUrl link to their repo for download instead.
export const NOT_HOSTED = 'Not on the web yet. Download it from GitHub and open index.html to play solo.';
export const playLink = (g) => (g.playUrl ? { href: g.playUrl, label: 'Play' } : { href: g.repo, label: 'Download' });

export const isMobile =(g) => (g.platforms || []).includes('Mobile');

export const playersLabel = (g) =>
  g.minPlayers === g.maxPlayers
    ? `${g.maxPlayers} player${g.maxPlayers > 1 ? 's' : ''}`
    : `${g.minPlayers} to ${g.maxPlayers} players`;

export const ALL_CONNECTIONS = Object.keys(CONNECTION).filter((c) => games.some((g) => g.connection === c));
export const ALL_GENRES =[...new Set(games.flatMap((g) => g.genres))].sort();
export const ALL_LENGTHS = ['Under 10 min', '10 to 30 min', '30+ min'];
