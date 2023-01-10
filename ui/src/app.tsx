import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';

import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { CharTile } from './components/CharTile';
import { getRuneDeck } from './rune';

import { Card, Deck } from './types';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const runeDeck = getRuneDeck();
// sorted by decreasing difficulty
// ties are randomized
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

const selectRandomWithBias = (deck: Deck): number => {
  const scale = (n: number): number => n ** 2;
  const maxDiff = deck.map(c => c.difficulty).reduce((cum, cur) => cur < cum ? cum : cur, 0);
  const minDiff = deck.map(c => c.difficulty).reduce((cum, cur) => cur > cum ? cum : cur, 100);
  const sqTotal = deck.map(c => c.difficulty).reduce((cum, cur) => cum + scale(cur), 0);
  const randomInt = Math.floor((Math.random() * sqTotal) + 0.5);

  let runningTot = 0;
  for (let i = 0; i < deck.length; i++) {
    runningTot += scale(deck[i].difficulty);
    if (runningTot >= randomInt) return i
  }

  throw new Error(`Error while selecing random card with bias: no card selected`);
}

// sorted by decreasing difficulty
// ties are provided in the same order as in the original deck
const sortByDifficulty = (deck: Deck): Deck => {
  return deck.sort((c1, c2) => c2.difficulty - c1.difficulty);
};

const getMyDeck = (): Deck => {
  const savedDeck = localStorage.getItem(HOON_DECK);
  return savedDeck ? (JSON.parse(savedDeck) as Deck) : runeDeck.slice(0,16);
};

const setMyDeck = (deck: Deck): void => {
  return localStorage.setItem(HOON_DECK, JSON.stringify(deck || []));
};

const HOON_DECK = "HOON_DECK"

export const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentDeck, setCurrentDeck] = useState(getMyDeck());
  // const [viewedIndex, setViewedIndex] = useState(0);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const newDeck = sortByDifficulty(getMyDeck());
    console.log(`Sorted deck:`, newDeck);
    setCurrentDeck(newDeck);
    setCurrentCard(selectRandomWithBias(newDeck));
  }, []);

  const resetMyDeck = () => {
    localStorage.setItem(HOON_DECK, "");
    setCurrentDeck(getMyDeck());
    setCurrentCard(0);
  }

  const handleNext = () => {
    setFlipped(false);
    // let newCard = currentCard + 1;
    let newCard = selectRandomWithBias(currentDeck)
    // if (newCard > currentDeck.length - 1) newCard = 0; // wrap back to beginning
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
    let newDiff = currentDeck[currentCard].difficulty + diffDiff;
    newDiff = newDiff > 100 ? 100 : newDiff < 0 ? 0 : newDiff;
    const newDeck = sortByDifficulty([
      ...currentDeck.slice(0, currentCard),
      { ...currentDeck[currentCard], difficulty: newDiff },
      ...currentDeck.slice(currentCard + 1)
    ]);
    if (difficulty === Difficulty.Easy && newDiff > 60 && newDiff <= 70
     && currentDeck.length < runeDeck.length) {
      newDeck.unshift(runeDeck[currentDeck.length]);
    }
    console.log(`Updated difficulty deck:`, newDeck);
    setMyDeck(newDeck);
    setCurrentDeck(newDeck);
    handleNext();
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <Button
          onClick={() => resetMyDeck()}
          endIcon={<CleaningServicesIcon />}
        >
          Reset
        </Button>
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
