import { Link, useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard.jsx';
import { ALL_GAMES } from '../games.js';

const STEPS = [
  { n: '01', t: 'Build a party', b: 'Add games from the pack to your playlist and add everyone\'s name. It all saves on the host\'s device.' },
  { n: '02', t: 'Everyone joins', b: 'Each game has its own join flow: a short code, a link, or a QR scan. We show the steps on the game page.' },
  { n: '03', t: 'Play and keep score', b: 'Launch games back to back from the party screen and track who is winning the night.' },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-copy">
            <div className="eyebrow">1 to 4 players · LAN multiplayer · runs in your browser</div>
            <h1>A pile of games for the room you are actually in.</h1>
            <p className="lead">The LAN Party Pack is a growing collection of browser games. Play solo, but it is way better with friends on the same Wi-Fi. No installs, just an internet connection to load the games.</p>
            <div className="row">
              <Link className="btn" to="/party">Start a party</Link>
              <Link className="btn ghost" to="/games">Browse games</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            {ALL_GAMES.slice(0, 3).map((g, i) => (
              <div key={g.id} className={'hero-tile t' + i} style={{ '--c': g.accent }}>{g.name}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>In the pack</h2>
            <Link to="/games">See all games →</Link>
          </div>
          <div className="grid">
            {ALL_GAMES.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </div>
      </section>

      <section className="section alt" id="how">
        <div className="wrap">
          <h2>How a party works</h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <div className="step-n">{s.n}</div>
                <h3>{s.t}</h3>
                <p className="muted">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two">
          <div>
            <h2>Will it work on our Wi-Fi?</h2>
            <p className="muted">Every game is hosted on GitHub Pages, so you need an internet connection to open it. Multiplayer connects players on the same Wi-Fi or hotspot straight to each other. That works on most home networks, but some school, work and phone-hotspot networks block it. Each game page tells you what it needs.</p>
          </div>
          <div className="tags big">
            <span className="tag">● LAN multiplayer</span>
            <span className="tag">📱 Mobile friendly</span>
            <span className="tag">🌐 Needs internet to load</span>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-in">
          <div>
            <h2>Built a game? Add it to the pack.</h2>
            <p>Open a pull request that adds one entry to <code>src/data/games.json</code>. The site rebuilds and your card appears.</p>
          </div>
          <button className="btn alt" onClick={() => navigate('/games')}>See the catalog</button>
        </div>
      </section>
    </>
  );
}
