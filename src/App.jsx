import { useState } from 'react'
import { shuffle } from 'lodash';
import './App.css'

function App() {
  const N = 8;
  const arr = Array.from({length: N}, (_, index) => index + 1);
  
  const [cards, setCards] = useState(shuffle([...arr, ...arr]));
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);

  function flipCard(index) {
    if(won) {
      setCards(shuffle([...arr, ...arr]));
      setFoundPairs([]);
      setWon(false);
      setClicks(1);
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    }

    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }

        setFoundPairs([...foundPairs, firstIndex, secondIndex])
      }

      setActiveCards([...activeCards, index])
    }

    if (activeCards.length === 2) {
      setActiveCards([index]);
    }

    if(!won) {
      setClicks(clicks + 1);
    }
  }

  return (
    <div>
      <h1>Match the Numbers</h1>
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront = activeCards.indexOf(index) !== -1 || foundPairs.indexOf(index) !== -1;
          return(
            <div
              key={index}
              className={"card-outer " + (flippedToFront ? 'flipped' : '')}
              onClick={() => flipCard(index)}
            >
              <div className="card">
                <div className="front">
                  <p>{card}</p>
                </div>
                <div className="back"/>
              </div>
            </div>
        )})}
      </div>
      <div className="gameStats">
        {won && (<>You Won the Game! <br/></>)}
        clicks: {clicks} Found Pairs: {foundPairs.length/2}
      </div>
    </div>
  )
}

export default App
