const getRandomColor = () => {
  const colorList = ["#e3f2fd", "#f3e5f5", "#e57373", "#ffb74d", "#4fc3f7", "#81c784"]
  return colorList[Math.floor(Math.random() * 6 )]
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
    color: getRandomColor()
  },
  {
    name: "bar",
    character: "|",
    color: getRandomColor()
  },
  {
    name: "bas",
    character: "\\",
    color: getRandomColor()
  },
  {
    name: "buc",
    character: "$",
    color: getRandomColor()
  },
  {
    name: "cab",
    character: "_",
    color: getRandomColor()
  },
  {
    name: "cen",
    character: "%",
    color: getRandomColor()
  },
  {
    name: "col",
    character: ":",
    color: getRandomColor()
  },
  {
    name: "com",
    character: ",",
    color: getRandomColor()
  },
  {
    name: "doq",
    character: "\"",
    color: getRandomColor()
  },
  {
    name: "dot",
    character: ".",
    color: getRandomColor()
  },
  {
    name: "fas",
    character: "/",
    color: getRandomColor()
  },
  {
    name: "par",
    character: ")",
    color: getRandomColor()
  },
  {
    name: "gap",
    character: "␣␣, \\n",
    color: getRandomColor()
  },
  {
    name: "gar",
    character: ">",
    color: getRandomColor()
  },
  {
    name: "hax",
    character: "#",
    color: getRandomColor()
  },
  {
    name: "hep",
    character: "-",
    color: getRandomColor()
  },
  {
    name: "kel",
    character: "{",
    color: getRandomColor()
  },
  {
    name: "ker",
    character: "}",
    color: getRandomColor()
  },
  {
    name: "ket",
    character: "^",
    color: getRandomColor()
  },
  {
    name: "lus",
    character: "+",
    color: getRandomColor()
  },
  {
    name: "mic",
    character: ";",
    color: getRandomColor()
  },
  {
    name: "pal",
    character: "(",
    color: getRandomColor()
  },
  {
    name: "pam",
    character: "&",
    color: getRandomColor()
  },
  {
    name: "pat",
    character: "@",
    color: getRandomColor()
  },
  {
    name: "sel",
    character: "[",
    color: getRandomColor()
  },
  {
    name: "ser",
    character: "]",
    color: getRandomColor()
  },
  {
    name: "sig",
    character: "~",
    color: getRandomColor()
  },
  {
    name: "soq",
    character: "'",
    color: getRandomColor()
  },
  {
    name: "tar",
    character: "*",
    color: getRandomColor()
  },
  {
    name: "tic",
    character: "`",
    color: getRandomColor()
  },
  {
    name: "tis",
    character: "=",
    color: getRandomColor()
  },
  {
    name: "wut",
    character: "?",
    color: getRandomColor()
  },
  {
    name: "zap",
    character: "!",
    color: getRandomColor()
  },
  {
    name: "gal",
    character: "<",
    color: getRandomColor()
  },
]
