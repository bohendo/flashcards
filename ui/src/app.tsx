import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const getRandomColor = () => {
  const colorList = ["#e3f2fd", "#f3e5f5", "#e57373", "#ffb74d", "#4fc3f7", "#81c784"]
  return colorList[Math.floor(Math.random() * 6 )]
}

export function App() {
  const [apps, setApps] = useState<Charges>();

  const charList = [
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
    }
  ]

  useEffect(() => {
    async function init() {
      const charges = (await api.scry<ChargeUpdateInitial>(scryCharges)).initial;
      setApps(charges);
    }

    init();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <CharTile {...charList[Math.floor(Math.random() * 3)]} />
      </div>
    </main>
  );
}
