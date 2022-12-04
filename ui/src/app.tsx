import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';
import { charList } from './rune';

import { CharList } from './types';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [allChallenges, setAllChallenges] = useState(JSON.parse(JSON.stringify(charList)));

  const [currentChallenge, setCurrentChallenge] = useState({} as CharList);
  const [newChallenges, setNewChallenges] = useState(JSON.parse(JSON.stringify(charList)));
  const [oldChallenges, setOldChallenges] = useState([] as Array<CharList>);
  const [isFlipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    if (newChallenges.length === 1) {
      setCurrentChallenge(newChallenges[0]);
      setNewChallenges(JSON.parse(JSON.stringify(charList)));
      setOldChallenges([] as Array<CharList>);
      return;
    }
    const index = Math.floor(Math.random() * newChallenges.length);
    const challenge = newChallenges[index];
    setCurrentChallenge(challenge);
    setNewChallenges(newChallenges.filter((_: any,i: number)=> i !== index));
    setOldChallenges(oldChallenges.concat(challenge));
  }

  enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
  };

  const setDifficulty = (diffculty: Difficulty) => {
    console.log(`Difficulty set to ${diffculty}`);
    handleNext();
  }

  useEffect(() => {
    (async () => {
      handleNext();
    })();

  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <CharTile tile={currentChallenge} isFlipped={isFlipped} setFlipped={setFlipped} />
        {
          isFlipped ?
          <div className="flex">
              <button className="rounded-xl mt-2 mr-2 p-1 justify-center"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => setDifficulty(Difficulty.Easy)}
              > Easy </button>
              <button className="rounded-xl mt-2 mr-2 p-1 justify-center"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => setDifficulty(Difficulty.Medium)}
              > Medium </button>
              <button className="rounded-xl mt-2 p-1 justify-center"
                  style={{ backgroundColor: "pink" }}
                  onClick={() => setDifficulty(Difficulty.Hard)}
              > Hard </button>
          </div>
          : null
        }
      </div>
    </main>
  );
}
