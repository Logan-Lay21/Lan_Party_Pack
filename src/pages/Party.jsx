import { useState } from 'react';
import { Link } from 'react-router-dom';
import { byId, playersLabel } from '../games.js';
import { useParty } from '../party.jsx';
import { Thumb } from '../components/GameCard.jsx';

export default function Party() {
  const { party, removeGame, move, shuffle, addPlayer, removePlayer, setScore, reset } = useParty();
  const [name, setName] = useState('');
  const queue = party.queue.map(byId).filter(Boolean);
  const total = (p) => queue.reduce((s, g) => s + (Number(party.scores[p + '::' + g.id]) || 0), 0);
  const ranked = [...party.players].sort((a, b) => total(b) - total(a));

  const submit = (e) => { e.preventDefault(); addPlayer(name); setName(''); };

  return (
    <div className="wrap section">
      <div className="sec-head">
        <h1>Your party</h1>
        <div className="mono small">HOST VIEW · put this on the big screen</div>
      </div>
      <div className="party">
        <div className="col">
          <section className="box">
            <div className="sec-head tight">
              <h2>Players</h2><span className="mono small">{party.players.length} / 8</span>
            </div>
            <ul className="plist">
              {party.players.map((p) => (
                <li key={p}>
                  <span className="dot" />
                  <span className="grow">{p}</span>
                  {party.players.length > 1 && (
                    <button className="iconbtn" aria-label={'Remove ' + p} onClick={() => removePlayer(p)}>✕</button>
                  )}
                </li>
              ))}
            </ul>
            <form className="row" onSubmit={submit}>
              <label className="sr" htmlFor="pn">Player name</label>
              <input id="pn" className="input grow" placeholder="Add a player" value={name} onChange={(e) => setName(e.target.value)} maxLength={20} />
              <button className="btn sm" type="submit">Add</button>
            </form>
          </section>
          <button className="linkbtn" onClick={() => { if (window.confirm('Clear the playlist, players and scores?')) reset(); }}>Reset party</button>
        </div>

        <div className="col wide">
          <section className="box">
            <div className="sec-head tight">
              <h2>Tonight's playlist</h2>
              <div className="row">
                <button className="btn sm ghost" onClick={shuffle} disabled={queue.length < 2}>Shuffle</button>
                <Link className="btn sm ghost" to="/games">+ Add game</Link>
              </div>
            </div>
            {queue.length === 0 ? (
              <div className="empty">Nothing queued yet. <Link to="/games">Pick some games</Link> and tap + Party.</div>
            ) : (
              <ol className="queue">
                {queue.map((g, i) => (
                  <li key={g.id} className={i === 0 ? 'next' : ''} style={{ '--c': g.accent }}>
                    <span className="qn mono">{i + 1}</span>
                    <div className="qthumb"><Thumb game={g} /></div>
                    <div className="grow">
                      <div className="strong">{g.name}</div>
                      <div className="mono small">{playersLabel(g)}</div>
                    </div>
                    <div className="row tight">
                      <button className="iconbtn" aria-label={'Move ' + g.name + ' up'} onClick={() => move(g.id, -1)} disabled={i === 0}>↑</button>
                      <button className="iconbtn" aria-label={'Move ' + g.name + ' down'} onClick={() => move(g.id, 1)} disabled={i === queue.length - 1}>↓</button>
                      <a className="btn sm" href={g.playUrl} target="_blank" rel="noreferrer">Launch</a>
                      <button className="iconbtn" aria-label={'Remove ' + g.name} onClick={() => removeGame(g.id)}>✕</button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <p className="muted small">Launch opens each game in a new tab. Use that game's own join steps, shown on its <Link to={queue[0] ? '/games/' + queue[0].id : '/games'}>game page</Link>.</p>
          </section>

          <section className="box alt">
            <h2>Scoreboard for the night</h2>
            {queue.length === 0 ? (
              <p className="muted">Add games to start tracking scores.</p>
            ) : (
              <div className="tablewrap">
                <table className="score">
                  <thead>
                    <tr><th>Player</th>{queue.map((g) => <th key={g.id}>{g.name}</th>)}<th>Total</th></tr>
                  </thead>
                  <tbody>
                    {ranked.map((p, i) => (
                      <tr key={p}>
                        <td>{i === 0 && total(p) > 0 ? '👑 ' : ''}{p}</td>
                        {queue.map((g) => (
                          <td key={g.id}>
                            <input className="input num" type="number" aria-label={p + ' score in ' + g.name}
                              value={party.scores[p + '::' + g.id] ?? ''} placeholder="0"
                              onChange={(e) => setScore(p, g.id, e.target.value)} />
                          </td>
                        ))}
                        <td className="strong">{total(p)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
