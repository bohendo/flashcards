import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { CharTile } from './components/CharTile';
import { charList } from './rune';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [currentChallenge, setCurrentChallenge] = useState({} as charList);
  const [choices, setChoices] = useState(Array<string>);
  const [newChallenges, setNewChallenges] = useState(JSON.parse(JSON.stringify(charList)));
  const [oldChallenges, setOldChallenges] = useState(Array<charList>);
  const [selected, setSelected] = useState("");

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  const randomChoices = (correctChoice: string) => {
    const filteredArray = charList.filter((obj: charList) => obj.name !== correctChoice)
                                  .sort(() => Math.random() - 0.5);
    const randomChoices = filteredArray.map((obj: charList) => obj.name)
                          .slice(0,3);
    
    return [...randomChoices, correctChoice].sort(() => Math.random() - 0.5);
  }

  const handleNext = () => {
    if (newChallenges.length === 1) {
      setCurrentChallenge(newChallenges[0]);
      setNewChallenges(JSON.parse(JSON.stringify(charList)));
      setOldChallenges([] as Array<charList>);
      setChoices(randomChoices(newChallenges[0].name));
      return;
    }
    const index = Math.floor(Math.random() * newChallenges.length);
    const challenge = newChallenges[index];
    setCurrentChallenge(challenge);
    setNewChallenges(newChallenges.filter((_: any,i: number)=> i !== index));
    setOldChallenges(oldChallenges.concat(challenge));
    setChoices(randomChoices(challenge.name));
  }

  useEffect(() => {
    async function init() {
      handleNext();
    }
    init();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="block justify-center items-center max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to flashcards</h1>
        <div className="flex">
          <CharTile tile={currentChallenge} isFlipped={selected === "" ? false : true} />
          <form>
            {choices.map((choice: any) => (
              <label className="block" key={choice}>
                <div className="flex">
                  <input
                    type="radio"
                    name="choice"
                    value={choice}
                    checked={selected === choice}
                    onChange={handleAnswer}
                  /> &nbsp;
                  {choice}
                </div>
              </label>
            ))}
          </form>
          {selected ? (
            <div className="multiple-choice-result">
              {selected === currentChallenge.name ? "Correct!" : "Incorrect"}
            </div>
          ) : null}
        </div>
        <button className="rounded-xl p-1 justify-center"
          style={{ backgroundColor: "pink" }}
          onClick={handleNext}> Next ▶</button>
      </div>
    </main>
  );
}
