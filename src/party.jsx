import { createContext, useContext, useEffect, useState } from 'react';

// Party state lives in localStorage on the host's device. No backend.
const KEY = 'lpp-party-v1';
const empty = { queue: [], players: ['Player 1'], scores: {} };

const PartyCtx = createContext(null);
export const useParty = () => useContext(PartyCtx);

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && Array.isArray(raw.queue) && Array.isArray(raw.players)) return { ...empty, ...raw };
  } catch (e) {}
  return empty;
}

export function PartyProvider({ children }) {
  const [party, setParty] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(party)); } catch (e) {}
  }, [party]);

  const api = {
    party,
    inQueue: (id) => party.queue.includes(id),
    addGame: (id) => setParty((p) => (p.queue.includes(id) ? p : { ...p, queue: [...p.queue, id] })),
    removeGame: (id) => setParty((p) => ({ ...p, queue: p.queue.filter((x) => x !== id) })),
    move: (id, dir) =>
      setParty((p) => {
        const q = [...p.queue];
        const i = q.indexOf(id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= q.length) return p;
        [q[i], q[j]] = [q[j], q[i]];
        return { ...p, queue: q };
      }),
    shuffle: () =>
      setParty((p) => {
        const q = [...p.queue];
        for (let i = q.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [q[i], q[j]] = [q[j], q[i]];
        }
        return { ...p, queue: q };
      }),
    addPlayer: (name) =>
      setParty((p) => (p.players.length >= 8 || !name.trim() || p.players.includes(name.trim()) ? p : { ...p, players: [...p.players, name.trim()] })),
    removePlayer: (name) =>
      setParty((p) => {
        const scores = { ...p.scores };
        Object.keys(scores).forEach((k) => { if (k.startsWith(name + '::')) delete scores[k]; });
        return { ...p, players: p.players.filter((x) => x !== name), scores };
      }),
    setScore: (player, gameId, value) =>
      setParty((p) => ({ ...p, scores: { ...p.scores, [player + '::' + gameId]: value } })),
    reset: () => setParty(empty),
  };

  return <PartyCtx.Provider value={api}>{children}</PartyCtx.Provider>;
}
