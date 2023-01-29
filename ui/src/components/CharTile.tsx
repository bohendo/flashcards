import React, { useState } from 'react';

import { Card } from '../types';

export const CharTile = (props: {
    card: Card,
    isFlipped: boolean,
    setFlipped: (isFlipped: boolean) => void,
}) => {

  const { card, isFlipped, setFlipped } = props;

  console.log(`Rendering ${isFlipped ? "back" : "front"} of card "${card.front}" w difficulty ${card.difficulty}`);

  const frontRotateX = `rotateX(${ isFlipped ? 180 : 0 }deg)`;
  const backRotateX = `rotateX(${ isFlipped ? 0 : -180 }deg)`;
  
  const styles: any = {
    back: {
      backgroundColor: card?.color || "0xffffff",
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      left: '0',
      position: isFlipped ? 'relative' : 'absolute',
      top: '0',
      transform: backRotateX,
      transformStyle: 'preserve-3d',
      transition: '0.0s',
      height: '256px',
      width: '256px',
      zIndex: '2',
    },
    // container: { perspective: '100px', },
    flipper: {
      height: '100%',
      position: 'relative',
      width: '100%',
    },
    front: {
      backgroundColor: card?.color || "0xffffff",
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      left: '0',
      position: isFlipped ? 'absolute' : 'relative',
      top: '0',
      transform: frontRotateX,
      transformStyle: 'preserve-3d',
      transition: '0.5s',
      height: '256px',
      width: '256px',
      zIndex: '2',
    },
  };

  return card ? (
    <div className="relative" style={styles.flipper}>
      <div
        className="block relative w-64 h-256 rounded-lg bg-gray-200 overflow-hidden m-5"
        style={styles.front}
        onClick={()=> setFlipped(!isFlipped)}
      >

        <div className="flex items-center justify-center m-5">
          <h1 className="text-md font-bold">
            Character
          </h1>
        </div>

        <div className="flex items-center justify-center m-5">
          <h1 className="text-7xl font-bold">
            {card.front}
          </h1>
        </div>
      </div>
      <div
        className="block relative w-64 h-256 rounded-lg bg-gray-200 overflow-hidden"
        style={styles.back}
        onClick={()=> setFlipped(!isFlipped)}
      >

        <div className="flex items-center justify-center m-5">
          <h1 className="text-md font-bold">
            Name
          </h1>
        </div>

        <div className="block items-center justify-center m-5">

          <div className="flex items-center justify-center m-5">
            <h1 className="text-3xl font-bold">
              {card.backTitle}
            </h1>
          </div>

          <br/>
          <h3 className="text-3xl">
            {card.backDescription}
          </h3>
        </div>
      </div>
    </div>
  ) : (<div/>);

}
