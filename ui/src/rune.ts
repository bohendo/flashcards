import * as eth from "ethers";

const getColor = (key: string): string => {
  const color = "#" + eth.utils.keccak256(eth.utils.toUtf8Bytes(key)).substring(2).match(/.{1,20}/g).map(n =>
    eth.BigNumber.from("0x" + n)
  ).map(n => n.mod(128).add(128).toHexString().substring(2)).join("");
  console.log(`Color for key "${key}" = ${color}`);
  return color;
}

export interface charList {
  name: string,
  character: string,
  color: string
}

export const charList = [
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
  ...card,
  color: getColor(card.character),
}));
