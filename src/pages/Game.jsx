import { Link, useParams } from 'react-router-dom';
import { Thumb } from '../components/GameCard.jsx';
import { byId, CONNECTION, playersLabel } from '../games.js';
import { useParty } from '../party.jsx';

export default function Game() {
  const { id } = useParams();
  const game = byId(id);
  const { inQueue, addGame, removeGame } = useParty();

  if (!game) {
    return (
      <div className="wrap section">
        <h1>Game not found</h1>
        <Link className="btn" to="/games">Browse games</Link>
      </div>
    );
  }
  const conn = CONNECTION[game.connection];
  const queued = inQueue(game.id);
  const meta = [
    ['Players', playersLabel(game)],
    ['Modes', game.modes.join(', ')],
    ['Genre', game.genres.join(', ')],
    ['Session length', game.length],
    ['Author', game.author],
  ];

  return (
    <div className="wrap section" style={{ '--c': game.accent }}>
      <div className="crumbs mono small"><Link to="/games">Games</Link> / {game.name}</div>
      <div className="detail">
        <div className="detail-main">
          <h1>{game.name}</h1>
          <p className="lead">{game.tagline}</p>
          <div className="stage">
            <Thumb game={game} tall />
            <a className="btn big" href={game.playUrl} target="_blank" rel="noreferrer">Play now</a>
            <div className="mono small">Opens the game in a new tab</div>
          </div>
          <div className="two-up">
            <section className="box">
              <h2>How to play together</h2>
              <ol>{game.howToJoin.map((s, i) => <li key={i}>{s}</li>)}</ol>
            </section>
            <section className="box">
              <h2>Controls</h2>
              <p>{game.controls}</p>
            </section>
          </div>
          <section className="box">
            <h2>About</h2>
            <p className="muted">The code, README and issues for {game.name} live in its own repository.</p>
            <a href={game.repo} target="_blank" rel="noreferrer">Read the README on GitHub →</a>
          </section>
        </div>
        <aside className="detail-side">
          <div className="box alt">
            <div className="mono small strong">GAME INFO</div>
            <dl className="meta">
              {meta.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            </dl>
          </div>
          <button className={'btn big' + (queued ? ' on' : '')} onClick={() => (queued ? removeGame(game.id) : addGame(game.id))}>
            {queued ? '✓ In your party' : '+ Add to my party'}
          </button>
          {queued && <Link className="btn ghost" to="/party">Open party</Link>}
          <a className="btn ghost" href={game.repo} target="_blank" rel="noreferrer">View repo on GitHub</a>
          <div className="box">
            <div className="strong">{conn.icon} {conn.badge}</div>
            <p className="muted small">{conn.note}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
