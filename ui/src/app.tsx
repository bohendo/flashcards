import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';
import { runeDeck } from './rune';

import { Card, Deck } from './types';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [currentCard, setCurrentCard] = useState({} as Card);
  const [currentDeck, setCurrentDeck] = useState(JSON.parse(JSON.stringify(runeDeck)));
  const [discardDeck, setDiscardDeck] = useState([] as Deck);
  const [isFlipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    if (currentDeck.length === 1) {
      setCurrentCard(currentDeck[0]);
      setCurrentDeck(JSON.parse(JSON.stringify(runeDeck)));
      setDiscardDeck([] as Deck);
      return;
    }
    const index = Math.floor(Math.random() * currentDeck.length);
    const challenge = currentDeck[index];
    setCurrentCard(challenge);
    setCurrentDeck(currentDeck.filter((_: any,i: number)=> i !== index));
    setDiscardDeck(discardDeck.concat(challenge));
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
        <CharTile tile={currentCard} isFlipped={isFlipped} setFlipped={setFlipped} />
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
