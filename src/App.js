import React, { useState } from "react";
import "./styles.css";
import ReactCardFlip from "react-card-flip";
import reverse_icon from './reverse.png'
export default function App() {
  const [allCards, setAllCards] = useState([
    {
      question: "Question",
      answer: "answer",
      showAnswer: false
    }
  ]); 

  
  const [inpCard, setInpCard] = useState({
    question: "",
    answer: "",
    showAnswer: false
  })

  const addCard = () => {
setAllCards([...allCards,inpCard])
    setInpCard({
      question: "",
      answer: "",
      showAnswer: false
  })
  };
  const shuffle = () => {
    setAllCards([...allCards].sort(() => .5 - Math.random() ))
  };
  const deleteCard = (index) =>{
let arr = [...allCards]
    arr.splice(index, 1)
    setAllCards(arr)
  }
  
  
  const flippedCard = (e, index) => {
   
  setAllCards(
      allCards.map((el, i) =>
        i === index ? { ...el, showAnswer: !el.showAnswer } : el
      )
    );

  };
const inpQuestion = (e)=> {
  setInpCard({ ...inpCard, question: e.target.value})
}
  const inpAnswer = (e) => {
    setInpCard({ ...inpCard, answer: e.target.value })
  }
  return (
    <div className="App">
      <input
      autoFocus
      type="text"
        value={inpCard.question}
        onChange={(e) => inpQuestion(e)}
        placeholder="question"
      />
      <input
        value={inpCard.answer}
        onChange={(e) => inpAnswer(e)}
      placeholder="answer" />
      <button onClick={addCard} disabled={!inpCard.question || !inpCard.answer}>add card</button>
      <button onClick={shuffle}>Shuffle</button>
      <div className='container'>
      {allCards.map((card, index) => (
        <>
          <ReactCardFlip isFlipped={card.showAnswer} flipDirection="vertical">
          

          <div className="cardFrameQ" >
            {card.question}
              <button className="btn-close" onClick={(e) => deleteCard(e, index)}>&times;</button>
             
             
              <button className="btn-green" onClick={(e) => flippedCard(e, index)}>
                <img className="icon" src={reverse_icon}/> answer 
                </button>


          </div>

          <div className="cardFrameA" onMouseLeave={(e) => flippedCard(e, index)}>
            {card.answer}
            
          </div>



        </ReactCardFlip>
</>
      ))
      }
      </div>
    </div>
  );
}
