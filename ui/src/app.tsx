import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';
import { getRuneDeck } from './rune';

import { Card, Deck } from './types';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const shuffle = (deck: Deck): Deck => {
  const shuffled = [...deck];
  for (let i = 0; i < shuffled.length; i++) {
    const r = Math.floor(Math.random() * shuffled.length);
    const tmp = shuffled[i]
    shuffled[i] = shuffled[r]
    shuffled[r] = tmp;
  }
  return shuffled;
};

// sorted by decreasing difficulty
// ties are randomized
const sortByDifficulty = (deck: Deck): Deck => {
  const groupedByDif = {} as any;
  for (let i = 0; i < deck.length; i++) {
    const dif = deck[i].difficulty.toString();
    if (!groupedByDif[dif]) groupedByDif[dif] = [];
    groupedByDif[dif].push(deck[i]);
  }
  const difficulties = Object.keys(groupedByDif).sort((a, b) => parseInt(b) - parseInt(a));
  console.log(difficulties);
  const sorted = [] as Deck;
  for (let i = 0; i < difficulties.length; i++) {
    const difficulty = difficulties[i];
    sorted.push(...shuffle(groupedByDif[difficulty]));
  }
  return sorted;
};

const getMyDeck = (): Deck => {
  const savedDeck = localStorage.getItem(HOON_DECK);
  return savedDeck ? (JSON.parse(savedDeck) as Deck) : getRuneDeck();
};

const setMyDeck = (deck: Deck): void => {
  return localStorage.setItem(HOON_DECK, JSON.stringify(deck || []));
};

const HOON_DECK = "HOON_DECK"

export const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentDeck, setCurrentDeck] = useState(getMyDeck());
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const newDeck = sortByDifficulty(getMyDeck()).slice(0, 16);
    console.log(`Sorted deck:`, newDeck);
    setCurrentDeck(newDeck);
    setCurrentCard(0);
  }, []);

  const handleNext = () => {
    setFlipped(false);
    let newCard = currentCard + 1;
    if (newCard > currentDeck.length - 1) newCard = 0; // wrap back to beginning
    setCurrentCard(newCard);
  }

  enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
  };

  const setDifficulty = (difficulty: Difficulty) => {
    console.log(`Difficulty set to ${difficulty}`);
    const diffDiff = difficulty === Difficulty.Easy ? -10
      : difficulty === Difficulty.Medium ? -2
      : +2; // Hard
    const newDiff = currentDeck[currentCard].difficulty + diffDiff;
    const newDeck = [
      ...currentDeck.slice(0, currentCard),
      { ...currentDeck[currentCard], difficulty: newDiff },
      ...currentDeck.slice(currentCard + 1)
    ];
    setMyDeck(newDeck);
    setCurrentDeck(newDeck);
    handleNext();
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <CharTile card={currentDeck[currentCard]} isFlipped={isFlipped} setFlipped={setFlipped} />
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
