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

const HOON_DECK = "HOON_DECK"
const hardCount = 8;
const hardThreshold = 75;

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
};

const applyDifficulty = (oldDiff: number, diff: Difficulty): number => {
  const diffDiff =
    diff ===   Difficulty.Easy   ? -10
    : diff === Difficulty.Medium ? -2
    : diff === Difficulty.Hard   ? +2
    : 0; // Error
  let newDiff = oldDiff + diffDiff;
  return newDiff > 100 ? 100 : newDiff < 1 ? 1 : newDiff;
};

// Quadratic difficulty
// Square & sum difficulties of all cards to get sqTotal
// each card's chance of being selected is difficulty**2/sqTotal
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

const getHard = (deck: Deck): Deck => {
  return deck.filter(c => c.difficulty > hardThreshold);
}

const countHard = (deck: Deck): number => {
  return getHard(deck).length
}

// Checks that hardCount difficult cards exists in deck
// Otherwise adds/removes cards to fit
const refreshDeck = (deck: Deck): Deck => {
  const nHard = countHard(deck);
  // If we already have the correct number of hard cards then we're done
  if (nHard === hardCount) return deck;
  // If we have too many hard cards
  if (nHard > hardCount) {
    // Loop through current deck from end to beginning
    for (let i = deck.length - 1; i >= 0; i--) {
      // If this card is too hard
      if (deck[i].difficulty > hardThreshold) {
        // Remove it from the deck
        deck.splice(i, 1);
        // if we have the right number of hard cards then we're done
        if (countHard(deck) === hardCount) return deck;
      }
    }
  }
  // If we have too few hard cards
  if (nHard < hardCount) {
    // Loop through full deck from beginning to end
    const fullDeck = getRuneDeck();
    for (let i = 0; i < fullDeck.length; i++) {
      // For each card from the full deck
      const candidate = fullDeck[i];
      // Skip it if it's already in our deck
      const inMyDeck = deck.reduce((cum, cur) => {
        return cum || cur.front == candidate.front;
      }, false);
      if (inMyDeck) continue;
      // Add it to our deck
      deck.splice(i + 1, 0, candidate);
      // if we have the right number of hard cards then we're done
      if (countHard(deck) === hardCount) return deck;
    }
  }
  throw new Error(`Error: refreshDeck expected ${countHard(deck)} == ${hardCount}`);
};

const getMyDeck = (): Deck => {
  const savedDeck = localStorage.getItem(HOON_DECK);
  return refreshDeck(savedDeck ? (JSON.parse(savedDeck) as Deck) : getRuneDeck());
};

const setMyDeck = (deck?: Deck): void => {
  return localStorage.setItem(HOON_DECK, JSON.stringify(deck || []));
};

const deckToString = (deck: Deck): string =>
  `"${deck?.length ? deck.map(c => c.front).join('",  "') : ""}"`;

export const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [currentDeck, setCurrentDeck] = useState(getMyDeck());
  // const [viewedIndex, setViewedIndex] = useState(0);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const newDeck = getMyDeck();
    setCurrentDeck(newDeck);
    setCurrentCard(selectRandomWithBias(newDeck));
    console.log(`Initialized with deck: [${deckToString(newDeck)}]`);
  }, []);

  const resetMyDeck = () => {
    setMyDeck();
    const freshDeck = getMyDeck();
    setCurrentDeck(freshDeck);
    setCurrentCard(selectRandomWithBias(freshDeck));
    console.log(`Reset deck to: [${deckToString(freshDeck)}]`);
  }

  const setDifficulty = (difficulty: Difficulty) => {
    setFlipped(false);
    const oldDiff = currentDeck[currentCard].difficulty;
    const newDiff = applyDifficulty(oldDiff, difficulty);
    console.log(`Got response of ${difficulty} for "${
      currentDeck[currentCard].front
    }", difficulty updated from ${oldDiff} to ${newDiff}`);
    const newDeck = refreshDeck([
      ...currentDeck.slice(0, currentCard),
      { ...currentDeck[currentCard], difficulty: newDiff },
      ...currentDeck.slice(currentCard + 1)
    ]);
    setMyDeck(newDeck); // save to localstorage
    setCurrentDeck(newDeck); // save to app state
    setCurrentCard(selectRandomWithBias(newDeck)); // update currentCard
    console.log(`New deck with difficulty applied: [${deckToString(newDeck)}]`);
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <h3 className="text-l font-bold">Showing {hardCount} hard cards at a time, working on:</h3>
        <h3 className="text-l font-bold">"{
          getHard(currentDeck).map(c => c.front).join('", "')
        }"</h3>
        <Button
          onClick={() => resetMyDeck()}
          endIcon={<CleaningServicesIcon />}
        >
          Reset
        </Button>
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
