import React, { useState } from 'react';
import { charList } from '../rune';

export const CharTile = (tile: charList) => {

    const [isFlipped, setFlipped] = useState(false);
    const [difficulty, setDifficulty] = useState(0);

    const frontRotateX = `rotateX(${ isFlipped ? 180 : 0 }deg)`;
    const backRotateX = `rotateX(${ isFlipped ? 0 : -180 }deg)`;
    
    const handleDifficultyChange = (event: React.MouseEvent<HTMLDivElement>) => {
        const star = Number(event.currentTarget.dataset.star);
        setDifficulty(star);
    };

    const styles: any = {
        back: {
          backgroundColor: tile.color,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          height: '100%',
          left: '0',
          position: isFlipped ? 'relative' : 'absolute',
          top: '0',
          transform: backRotateX,
          transformStyle: 'preserve-3d',
          transition: '0.5s',
          width: '60%',
          zIndex: '2',
        },
        container: {
          perspective: '100px',
        },
        flipper: {
          height: '100%',
          position: 'relative',
          width: '100%',
        },
        front: {
          backgroundColor: tile.color,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          height: '100%',
          left: '0',
          position: isFlipped ? 'absolute' : 'relative',
          top: '0',
          transform: frontRotateX,
          transformStyle: 'preserve-3d',
          transition: '0.5s',
          width: '60%',
          zIndex: '2',
        },
      };

    return (
        <div className="relative" style={styles.flipper}>
            <div
                className="block relative w-32 h-32 rounded-lg bg-gray-200 overflow-hidden"
                style={styles.front}
                onClick={()=> setFlipped(!isFlipped)}
            >
                <div className="flex items-center justify-center mt-1">
                    <h1 className="text-md font-bold">
                        Character
                    </h1>
                </div>

                <div className="flex items-center justify-center m-5">
                    <h1 className="text-3xl font-bold">
                        {tile.character}
                    </h1>
                </div>
            </div>
            <div
                className="block relative w-32 h-32 rounded-lg bg-gray-200 overflow-hidden"
                style={styles.back}
                onClick={()=> setFlipped(!isFlipped)}
            >
                <div className="flex items-center justify-center mt-1">
                    <h1 className="text-md font-bold">
                        Name
                    </h1>
                </div>
                <div className="flex items-center justify-center mt-5">
                    <h1 className="text-3xl font-bold">
                        {tile.name}
                    </h1>
                </div>
            </div>
            {
                isFlipped ?
                <div className="flex">
                    <label> Difficulty: &nbsp; </label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} data-star={star} onClick={handleDifficultyChange}
                            className={`star ${star <= difficulty ? "selected" : ""}`}
                        >
                            &#9733;
                        </div>
                    ))}
                </div>
                : null
            }
          
        </div>
    )
}