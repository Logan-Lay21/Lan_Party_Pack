import { useMemo, useState } from 'react';
import GameCard from '../components/GameCard.jsx';
import { ALL_GAMES, ALL_GENRES, ALL_LENGTHS } from '../games.js';

function Group({ title, options, selected, onToggle }) {
  return (
    <fieldset className="fgroup">
      <legend>{title}</legend>
      {options.map((o) => (
        <label key={o.value} className="check">
          <input type="checkbox" checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} />
          <span>{o.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

const toggle = (list, v) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function Browse() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('az');
  const [players, setPlayers] = useState([]);
  const [conn, setConn] = useState([]);
  const [genres, setGenres] = useState([]);
  const [lengths, setLengths] = useState([]);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = ALL_GAMES.filter((g) => {
      if (term && !(g.name + ' ' + g.tagline + ' ' + g.genres.join(' ')).toLowerCase().includes(term)) return false;
      if (players.includes('solo') && g.minPlayers > 1) return false;
      if (players.includes('group') && g.maxPlayers < 2) return false;
      if (conn.length && !conn.includes(g.connection)) return false;
      if (genres.length && !g.genres.some((x) => genres.includes(x))) return false;
      if (lengths.length && !lengths.includes(g.length)) return false;
      return true;
    });
    out = [...out].sort((a, b) => (sort === 'players' ? b.maxPlayers - a.maxPlayers : a.name.localeCompare(b.name)));
    return out;
  }, [q, sort, players, conn, genres, lengths]);

  const clear = () => { setQ(''); setPlayers([]); setConn([]); setGenres([]); setLengths([]); };

  return (
    <div className="wrap section">
      <div className="sec-head">
        <h1>All games</h1>
        <div className="row">
          <label className="sr" htmlFor="q">Search games</label>
          <input id="q" className="input" type="search" placeholder="Search games" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="sr" htmlFor="sort">Sort</label>
          <select id="sort" className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="az">A to Z</option>
            <option value="players">Most players</option>
          </select>
        </div>
      </div>
      <div className="browse">
        <aside className="filters">
          <Group title="Players" selected={players} onToggle={(v) => setPlayers(toggle(players, v))}
            options={[{ value: 'solo', label: 'Has solo mode' }, { value: 'group', label: 'Has multiplayer' }]} />
          <Group title="Connection" selected={conn} onToggle={(v) => setConn(toggle(conn, v))}
            options={[{ value: 'offline-capable', label: 'Works offline' }, { value: 'join-code', label: 'Join code' }, { value: 'solo-only', label: 'Solo only' }]} />
          <Group title="Genre" selected={genres} onToggle={(v) => setGenres(toggle(genres, v))}
            options={ALL_GENRES.map((g) => ({ value: g, label: g }))} />
          <Group title="Session length" selected={lengths} onToggle={(v) => setLengths(toggle(lengths, v))}
            options={ALL_LENGTHS.map((g) => ({ value: g, label: g }))} />
          <button className="linkbtn" onClick={clear}>Clear filters</button>
        </aside>
        <div>
          <div className="mono small" aria-live="polite">Showing {list.length} of {ALL_GAMES.length} games</div>
          {list.length ? (
            <div className="grid g2">{list.map((g) => <GameCard key={g.id} game={g} />)}</div>
          ) : (
            <div className="empty">No games match those filters. <button className="linkbtn" onClick={clear}>Clear filters</button></div>
          )}
          <div className="dashed">Missing a game? Add it with a pull request to <code>src/data/games.json</code>.</div>
        </div>
      </div>
    </div>
  );
}
