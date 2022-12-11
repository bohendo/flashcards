import * as eth from "ethers";

import { Deck } from "./types";

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

export const getRuneDeck = () => (JSON.parse(JSON.stringify([
  {
    front: "␣",
    back: "ace",
  },
  {
    front: "|",
    back: "bar",
  },
  {
    front: "\\",
    back: "bas",
  },
  {
    front: "$",
    back: "buc",
  },
  {
    front: "_",
    back: "cab",
  },
  {
    front: "%",
    back: "cen",
  },
  {
    front: ":",
    back: "col",
  },
  {
    front: ",",
    back: "com",
  },
  {
    front: "\"",
    back: "doq",
  },
  {
    front: ".",
    back: "dot",
  },
  {
    front: "/",
    back: "fas",
  },
  {
    front: ")",
    back: "par",
  },
  {
    front: "␣␣, \\n",
    back: "gap",
  },
  {
    front: ">",
    back: "gar",
  },
  {
    front: "#",
    back: "hax",
  },
  {
    front: "-",
    back: "hep",
  },
  {
    front: "{",
    back: "kel",
  },
  {
    front: "}",
    back: "ker",
  },
  {
    front: "^",
    back: "ket",
  },
  {
    front: "+",
    back: "lus",
  },
  {
    front: ";",
    back: "mic",
  },
  {
    front: "(",
    back: "pal",
  },
  {
    front: "&",
    back: "pam",
  },
  {
    front: "@",
    back: "pat",
  },
  {
    front: "[",
    back: "sel",
  },
  {
    front: "]",
    back: "ser",
  },
  {
    front: "~",
    back: "sig",
  },
  {
    front: "'",
    back: "soq",
  },
  {
    front: "*",
    back: "tar",
  },
  {
    front: "`",
    back: "tic",
  },
  {
    front: "=",
    back: "tis",
  },
  {
    front: "?",
    back: "wut",
  },
  {
    front: "!",
    back: "zap",
  },
  {
    front: "<",
    back: "gal",
  },
])) as Array<{ back: string; front: string; }>).map(card => ({
  front: card.front,
  back: card.back,
  color: getColor(card.front),
  difficulty: 100,
})) as Deck;
