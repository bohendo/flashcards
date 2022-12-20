import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';

import IconButton from '@mui/material/IconButton'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { CharTile } from './components/CharTile';
import { getRuneDeck } from './rune';

import { Card, Deck } from './types';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const runeDeck = getRuneDeck();
// sorted by decreasing difficulty
// ties are randomized
const shuffleByDifficulty = (deck: Deck): Deck => {
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

const selectRandomWithBias = (deck: Deck): number => {
  const bias =  Math.random() * 10;
  const maxDiff = deck[0].difficulty;
  const minDiff = deck[deck.length - 1].difficulty;
  const diffDiff = maxDiff - minDiff;
  let rangeMax, rangeMin, i;
  console.log(`Max diff: ${maxDiff}, min diff: ${minDiff}`);

  if (bias < 2) {
    // Select next card with difficult in [ minDiff, minDiff + floor((maxDiff - minDiff)/3) ]

    rangeMax = rangeMin = deck.length - 1;
    for (i = rangeMax - 1; i > 0; i--) {
      if (deck[i].difficulty <= minDiff + Math.floor(diffDiff/3))
        rangeMin--;
      else
        break;
    }
  } else if (bias < 6) {
    // Select next card with difficulty in [minDiff + floor((maxDiff - minDiff)/3), minDiff + floor(2*(maxDiff - minDiff)/3) ]

    rangeMax = rangeMin = deck.length - 2;
    for (i = rangeMax; i > 0; i--) {
      if (deck[i].difficulty > minDiff + Math.floor(diffDiff/3)) {
        rangeMax = rangeMin = i;
        break;
      }
    }
    for (--i; i > 0; i--) {
      if (deck[i].difficulty <= minDiff + Math.floor(2*diffDiff/3))
        rangeMin--;
      else
        break;
    }

  } else {
    // Select next card with difficulty > minDiff + floor(2*(maxDiff - minDiff)/3)

    rangeMin = rangeMax = 0;
    for (i = 1; i < deck.length; i++) {
      if (deck[i].difficulty > minDiff + Math.floor(2*diffDiff/3))
        rangeMax++
      else
        break;
    }
  }

  console.log(`Bias: ${bias} Selecting from range [${rangeMin},${rangeMax}]`)
    
  if (rangeMax === rangeMin) return rangeMax;
  return Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin;
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
    if (difficulty === Difficulty.Easy && currentDeck.length < runeDeck.length) {
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
        <IconButton
          onClick={() => resetMyDeck()}
        >
          <RestartAltIcon />
        </IconButton>
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
