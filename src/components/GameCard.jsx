import { Link } from 'react-router-dom';
import { CONNECTION, isMobile, playersLabel, playLink } from '../games.js';
import { useParty } from '../party.jsx';

export function Thumb({ game, tall }) {
  if (game.thumbnail) return <img className={'thumb' + (tall ? ' tall' : '')} src={game.thumbnail} alt={game.name + ' screenshot'} />;
  return (
    <div className={'thumb ph' + (tall ? ' tall' : '')} style={{ '--c': game.accent }} aria-hidden="true">
      <span>{game.name}</span>
    </div>
  );
}

export default function GameCard({ game }) {
  const { inQueue, addGame, removeGame } = useParty();
  const queued = inQueue(game.id);
  const conn = CONNECTION[game.connection];
  const play = playLink(game);
  return (
    <article className="card" style={{ '--c': game.accent }}>
      <Link to={'/games/' + game.id} aria-label={game.name}><Thumb game={game} /></Link>
      <div className="card-body">
        <h3><Link to={'/games/' + game.id}>{game.name}</Link></h3>
        <p className="muted clamp">{game.tagline}</p>
        <div className="tags">
          <span className="tag">{playersLabel(game)}</span>
          <span className="tag">{game.genres.join(', ')}</span>
          <span className="tag">{conn.icon} {conn.badge}</span>
          {isMobile(game) && <span className="tag">📱 Mobile friendly</span>}
        </div>
        <div className="row">
          <a className="btn sm" href={play.href} target="_blank" rel="noreferrer">{play.label}</a>
          <button className={'btn sm ghost' + (queued ? ' on' : '')} onClick={() => (queued ? removeGame(game.id) : addGame(game.id))}>
            {queued ? '✓ In party' : '+ Party'}
          </button>
        </div>
      </div>
    </article>
  );
}
