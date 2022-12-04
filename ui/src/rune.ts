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

export const runeDeck = [
  {
    name: "ace",
    character: "␣",
  },
  {
    name: "bar",
    character: "|",
  },
  {
    name: "bas",
    character: "\\",
  },
  {
    name: "buc",
    character: "$",
  },
  {
    name: "cab",
    character: "_",
  },
  {
    name: "cen",
    character: "%",
  },
  {
    name: "col",
    character: ":",
  },
  {
    name: "com",
    character: ",",
  },
  {
    name: "doq",
    character: "\"",
  },
  {
    name: "dot",
    character: ".",
  },
  {
    name: "fas",
    character: "/",
  },
  {
    name: "par",
    character: ")",
  },
  {
    name: "gap",
    character: "␣␣, \\n",
  },
  {
    name: "gar",
    character: ">",
  },
  {
    name: "hax",
    character: "#",
  },
  {
    name: "hep",
    character: "-",
  },
  {
    name: "kel",
    character: "{",
  },
  {
    name: "ker",
    character: "}",
  },
  {
    name: "ket",
    character: "^",
  },
  {
    name: "lus",
    character: "+",
  },
  {
    name: "mic",
    character: ";",
  },
  {
    name: "pal",
    character: "(",
  },
  {
    name: "pam",
    character: "&",
  },
  {
    name: "pat",
    character: "@",
  },
  {
    name: "sel",
    character: "[",
  },
  {
    name: "ser",
    character: "]",
  },
  {
    name: "sig",
    character: "~",
  },
  {
    name: "soq",
    character: "'",
  },
  {
    name: "tar",
    character: "*",
  },
  {
    name: "tic",
    character: "`",
  },
  {
    name: "tis",
    character: "=",
  },
  {
    name: "wut",
    character: "?",
  },
  {
    name: "zap",
    character: "!",
  },
  {
    name: "gal",
    character: "<",
  },
].map(card => ({
  character: card.character,
  name: card.name,
  color: getColor(card.character),
})) as Deck;
