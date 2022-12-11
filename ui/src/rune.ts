import * as eth from "ethers";

import { applyColors } from "./cards";
import { Deck, DeckData } from "./types";

export const getRuneDeck = (): Deck => applyColors(JSON.parse(JSON.stringify([

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

])) as DeckData)
