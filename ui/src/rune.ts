import * as eth from "ethers";

import { applyColors } from "./cards";
import { Deck, DeckData } from "./types";

export const getRuneDeck = (): Deck => applyColors(JSON.parse(JSON.stringify([

  // Simple character names
  {
    front: "␣",
    backTitle: "ace",
    backDescription: "",
  },

  {
    front: "␣␣, \\n",
    backTitle: "gap",
    backDescription: "",
  },

  {
    front: "|",
    backTitle: "bar",
    backDescription: "rune prefix for core expressions",
  },

  {
    front: "$",
    backTitle: "buc",
    backDescription: "rune prefix for structures",
  },

  {
    front: "%",
    backTitle: "cen",
    backDescription: "rune prefix for calls and samples",
  },

  {
    front: ":",
    backTitle: "col",
    backDescription: "rune prefix for cells",
  },

  {
    front: ".",
    backTitle: "dot",
    backDescription: "rune prefix for nock evaluations",
  },

  {
    front: "^",
    backTitle: "ket",
    backDescription: "rune prefix for type casting",
  },

  {
    front: "~",
    backTitle: "sig",
    backDescription: "rune prefix for interpreter hints",
  },

  {
    front: ";",
    backTitle: "mic",
    backDescription: "rune prefix for macros",
  },

  {
    front: "=",
    backTitle: "tis",
    backDescription: "rune prefix for subject modification",
  },

  {
    front: "?",
    backTitle: "wut",
    backDescription: "rune prefix for conditionals",
  },

  {
    front: "!",
    backTitle: "zap",
    backDescription: "rune prefix for wildcards",
  },

  {
    front: "/",
    backTitle: "fas",
    backDescription: "rune prefix for build operations eg imports",
  },

  {
    front: "+",
    backTitle: "lus",
    backDescription: "rune prefix for arm definitions",
  },

  {
    front: "-",
    backTitle: "hep",
    backDescription: "",
  },

  {
    front: "\\",
    backTitle: "bas",
    backDescription: "",
  },

  {
    front: "_",
    backTitle: "cab",
    backDescription: "",
  },

  {
    front: ",",
    backTitle: "com",
    backDescription: "",
  },

  {
    front: "\"",
    backTitle: "doq",
    backDescription: "",
  },

  {
    front: ")",
    backTitle: "par",
    backDescription: "",
  },

  {
    front: ">",
    backTitle: "gar",
    backDescription: "",
  },

  {
    front: "#",
    backTitle: "hax",
    backDescription: "",
  },

  {
    front: "{",
    backTitle: "kel",
    backDescription: "",
  },

  {
    front: "}",
    backTitle: "ker",
    backDescription: "",
  },

  {
    front: "(",
    backTitle: "pal",
    backDescription: "",
  },

  {
    front: "&",
    backTitle: "pam",
    backDescription: "",
  },

  {
    front: "@",
    backTitle: "pat",
    backDescription: "",
  },

  {
    front: "[",
    backTitle: "sel",
    backDescription: "",
  },

  {
    front: "]",
    backTitle: "ser",
    backDescription: "",
  },

  {
    front: "'",
    backTitle: "soq",
    backDescription: "",
  },

  {
    front: "*",
    backTitle: "tar",
    backDescription: "",
  },

  {
    front: "`",
    backTitle: "tic",
    backDescription: "",
  },

  {
    front: "<",
    backTitle: "gal",
    backDescription: "",
  },

  // Urbit Vocab

  {
    front: "bridge",
    backTitle: "Azimuth client",
    backDescription: "interface to the urbit id registry",
  },

  {
    front: "mold",
    backTitle: "types",
    backDescription: "type definition + a function for coercing data to the type",
  },

  {
    front: "core",
    backTitle: "cell of battery + payload",
    backDescription: "similar to methods + data of OOP objects",
  },

  {
    front: "cell",
    backTitle: "tuple",
    backDescription: "ordered pair of nouns eg [12 23]",
  },

  {
    front: "wing",
    backTitle: "limb aka arm or leg",
    backDescription: "piece of data or code that can be referenced in the subject",
  },

  {
    front: "arm",
    backTitle: "named hoon expression",
    backDescription: "",
  },

  {
    front: "leg",
    backTitle: "named data",
    backDescription: "",
  },

  // Hoon Runes

  {
    front: "::",
    backTitle: "Comment",
    backDescription: "for in-line code documentation",
  },

  {
    front: "=,",
    backTitle: "tiscom",
    backDescription: "expose namespace & define a bridge",
  },

  {
    front: "|%",
    backTitle: "barcen",
    backDescription: "produce a core aka battery + payload",
  },

  {
    front: "++",
    backTitle: "luslus",
    backDescription: "produce a normal arm",
  },

  {
    front: "|=",
    backTitle: "bartis",
    backDescription: "produce a dry gate, given ",
  },

  {
    front: "%+",
    backTitle: "cenlus",
    backDescription: "execute a function",
  },

  {
    front: "=/",
    backTitle: "tisfas",
    backDescription: "combined a named noun with the subject",
  },

  {
    front: "^-",
    backTitle: "kethep",
    backDescription: "cast to type according to explicit label",
  },

])) as DeckData)
