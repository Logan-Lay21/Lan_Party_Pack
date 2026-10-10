import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import Game from './pages/Game.jsx';
import Party from './pages/Party.jsx';
import About from './pages/About.jsx';
import { useParty } from './party.jsx';

function ScrollTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state && state.scrollTo) {
      const t = setTimeout(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);
  return null;
}

export default function App() {
  const { party } = useParty();
  const navigate = useNavigate();
  return (
    <div className="shell">
      <ScrollTop />
      <header className="nav">
        <div className="wrap nav-in">
          <Link to="/" className="logo"><span className="logo-mark">▚</span> LAN PARTY PACK</Link>
          <nav className="nav-links" aria-label="Main">
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/party">
              Party Mode{party.queue.length > 0 && <span className="pill">{party.queue.length}</span>}
            </NavLink>
            <button className="linkbtn" onClick={() => navigate('/', { state: { scrollTo: 'how' } })}>How it works</button>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Browse />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="/party" element={<Party />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div className="wrap section"><h1>Lost in the lobby</h1><Link className="btn" to="/">Back home</Link></div>} />
        </Routes>
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span className="mono">LAN PARTY PACK · <Link to="/about">made at a hackathon</Link></span>
          <span>Games live in their own repos. Add yours with a pull request to <code>src/data/games.json</code>.</span>
        </div>
      </footer>
    </div>
  );
}
