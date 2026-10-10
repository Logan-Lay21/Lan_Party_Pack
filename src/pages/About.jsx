import { Link } from 'react-router-dom';
import team from '../data/team.json';
import { ALL_GAMES, byId } from '../games.js';

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);

const VALUES = [
  { k: '01', t: 'Same room, same game', b: 'The best game nights happen side by side. Almost every game here lets friends on the same Wi-Fi jump in together.' },
  { k: '02', t: 'Open a tab, play', b: 'No installs, no accounts, no launcher. If you have a browser and an internet connection, you are already set up.' },
  { k: '03', t: 'Built in the open', b: 'Each game lives in its creator\'s own repo. Anyone can read the code, file an issue, or add a game to the pack.' },
];

function Member({ m }) {
  const games = m.games.map(byId).filter(Boolean);
  const c = games.length ? games[0].accent : 'var(--orange)';
  return (
    <article className="member" style={{ '--c': c }}>
      <div className="member-top">
        <div className="mono-tile" aria-hidden="true">{initials(m.name)}</div>
        <div className="grow">
          <h3>{m.name}</h3>
          <div className="mono small member-role">{m.role}</div>
          {m.school && <div className="small muted">{m.school}</div>}
        </div>
      </div>
      <p className="muted">{m.bio}</p>
      <div className="row member-links">
        {m.linkedin && (
          <a className="btn sm" href={m.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        )}
        <a className="btn sm ghost" href={'https://github.com/' + m.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        {games.map((g) => <Link key={g.id} className="btn sm ghost" to={'/games/' + g.id}>Play {g.name.split(':')[0]}</Link>)}
      </div>
    </article>
  );
}

export default function About() {
  const maxPlayers = Math.max(...ALL_GAMES.map((g) => g.maxPlayers));
  const stats = [
    [team.length, 'builders'],
    [ALL_GAMES.length, 'games'],
    [maxPlayers, 'players max'],
    [0, 'installs'],
  ];

  return (
    <>
      <section className="hero about-hero">
        <div className="wrap about-in">
          <div className="eyebrow">About · a hackathon project</div>
          <h1>Three people who really, really like games.</h1>
          <p className="lead">The LAN Party Pack started at a hackathon with a simple question: what if game night needed nothing but a browser? We brought the games we had built, wired them into one hub, and made it easy to play them back to back with whoever is in the room.</p>
          <dl className="stats">
            {stats.map(([n, l]) => (
              <div key={l}><dt className="mono">{n}</dt><dd>{l}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <h2>The team</h2>
            <span className="mono small muted">Every game in the pack was made by one of us</span>
          </div>
          <div className="team">
            {team.map((m) => <Member key={m.github} m={m} />)}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>What we care about</h2>
          <div className="steps">
            {VALUES.map((v) => (
              <div key={v.k} className="step">
                <div className="step-n">{v.k}</div>
                <h3>{v.t}</h3>
                <p className="muted">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta-in">
          <div>
            <h2>Made a game? Bring it to the party.</h2>
            <p>The pack is meant to grow. Add one entry to <code>src/data/games.json</code> with a pull request and your game joins the lineup.</p>
          </div>
          <Link className="btn alt" to="/games">See the games</Link>
        </div>
      </section>
    </>
  );
}
