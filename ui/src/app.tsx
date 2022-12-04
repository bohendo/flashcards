import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';
import { charList } from './rune';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [currentChallenge, setCurrentChallenge] = useState({} as charList);
  const [newChallenges, setNewChallenges] = useState(JSON.parse(JSON.stringify(charList)));
  const [oldChallenges, setOldChallenges] = useState(Array<charList>);

  const handleNext = () => {
    if (newChallenges.length === 1) {
      setCurrentChallenge(newChallenges[0]);
      setNewChallenges(JSON.parse(JSON.stringify(charList)));
      setOldChallenges([] as Array<charList>);
      return;
    }
    const index = Math.floor(Math.random() * newChallenges.length);
    const challenge = newChallenges[index];
    setCurrentChallenge(challenge);
    setNewChallenges(newChallenges.filter((_: any,i: number)=> i !== index));
    setOldChallenges(oldChallenges.concat(challenge));
  }

  useEffect(() => {
    async function init() {
      handleNext();
    }

    init();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <CharTile {...currentChallenge} />
        <button className="rounded-xl p-1 justify-center"
          style={{ backgroundColor: "pink" }}
          onClick={handleNext}> Next ▶</button>
      </div>
    </main>
  );
}
