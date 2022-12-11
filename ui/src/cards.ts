import * as eth from "ethers";

import { Card, CardData, Deck, DeckData } from "./types";

const getColor = (key: string): string => {
  const seed = eth.utils.keccak256(eth.utils.toUtf8Bytes(key)); // use hash for deterministic randomness
  const prns = seed.substring(2).match(/.{1,20}/g); // split hash into a few random hex strings
  if (!prns) throw new Error(`Invalid random seed: ${seed}`); // throw if keccak output changes
  const color = "#" + prns
    .map(n => eth.BigNumber.from("0x" + n)) // convert each pseudo-random number info a BigNumber
    .map(n => n.mod(128).add(128).toHexString().substring(2)) // convert to random hex between 80 and ff
    .join(""); // compose the full hex color string
  // console.log(`Color for key "${key}" = ${color}`);
  return color;
}

export const applyColors = (deck: DeckData | Deck): Deck =>
  deck.map((card: Card | CardData) => ({
    front: card.front,
    backTitle: card.backTitle,
    backDescription: card.backDescription,
    color: (card as Card).color || getColor(card.front),
    difficulty: (card as Card).difficulty || 100,
  })) as Deck;

