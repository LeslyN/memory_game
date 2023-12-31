'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faAngular, faSquareJs, faReact, faVuejs } from '@fortawesome/free-brands-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const icons = [faHtml5, faCss3Alt, faAngular, faSquareJs, faReact, faVuejs];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Home() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledIcons = shuffleArray([...icons, ...icons]);
    setCards(shuffledIcons.map((icon, index) => ({ icon, id: index, isFlipped: false })));
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndices.includes(index) || flippedIndices.length === 2) {
      return;
    }

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].icon === cards[secondIndex].icon) {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        setTimeout(() => {
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          setCards(updatedCards);
          setFlippedIndices([]);
        }, 1000);
      }

      setMoves(moves + 1);
    }
  };

  const resetGame = () => {
    setMoves(0);
    setFlippedIndices([]);
    setCards(shuffleArray([...icons, ...icons]).map((icon, index) => ({ icon, id: index, isFlipped: false })));
  };

  const isGameWon = cards.every((card) => card.isFlipped);

  return (
    <div className="text-center p-3 md:p-36 min-h-screen flex flex-col justify-center max-w-full items-center text-white">
      <h1 className="py-10 text-xl font-semibold tracking-wide">Memory Matching Game</h1>
      <div className="flex flex-wrap max-w-md mx-auto justify-center">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-24 md:w-32 h-24 md:h-32 flex justify-center items-center cursor-pointer card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-icon">
              {card.isFlipped ? (
                <FontAwesomeIcon icon={card.icon} size="4x" />
              ) : (
                <FontAwesomeIcon icon={faQuestionCircle} size="4x" />
              )}
            </div>
          </div>
        ))}
      </div>
      <span className="flex flex-col md:flex-row text-md font-medium tracking-wide py-8 items-center">
        <p className="mx-6 mb-4 md:mb-0">Moves: {moves}</p>
        <button className="border-4 border-[#1565c0] rounded-lg px-6 py-2 mx-6 hover:border-[#42a5f5]" onClick={resetGame}>Reset Game</button>
      </span>
      {isGameWon && !(moves === 0) && <p className="py-4 text-xl font-semibold">Congratulations! You won!</p>}
    </div>
  );
}

export default Home;