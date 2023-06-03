import { useState } from 'react'
import { shuffle } from 'lodash';
import './App.css'

function App() {
  const N = 8;
  const arr = Array.from({length: N}, (_, index) => index + 1);
  
  const [cards, setCards] = useState(shuffle([...arr, ...arr]));
  const [clicks, setClicks] = useState(0);
  const [won, setWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  
  function flipCard(index) {
    if(won) {
      setCards(shuffle([...arr, ...arr]));
      setFoundPairs([]);
      setWon(false);
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    }

    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        setFoundPairs([...foundPairs, firstIndex, secondIndex])
       
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
      }

      setActiveCards([...activeCards, index])
    }

    if (activeCards.length === 2) {
      setActiveCards([index]);
    }

    setClicks(clicks + 1);
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
