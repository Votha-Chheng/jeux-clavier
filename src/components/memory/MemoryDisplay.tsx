import { OptionsMemoryProps } from '@/pages/memory'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import MemoryCard from './MemoryCard'
import styled from 'styled-components'
import { toggleBooleanState } from '@/utils/displaySuccess'
import { shuffleArrayPiece } from '@/utils/shuffleArrayPiece'

type Memorydisplay = {
  setNumberOfCards: Dispatch<SetStateAction<number>>
  setNbCardsFlipped: Dispatch<SetStateAction<number>>
  nbCardsFlipped: number
  setEnd: Dispatch<SetStateAction<"endLevel"|"endGame"|null>>
  setResetFlipped: Dispatch<SetStateAction<boolean>>
  resetFlipped: boolean
  firstImageFlipped: number|null
  secondImageFlipped: number|null
  cardsWon: number[]
  setCardsWon: Dispatch<SetStateAction<number[]>>
  setBackImagesList: Dispatch<SetStateAction<number[]>>
  backImagesList: number[]
  setFirstImageFlipped: Dispatch<SetStateAction<number|null>>
  setSecondImageFlipped:Dispatch<SetStateAction<number|null>>
  setLevel: Dispatch<SetStateAction<number>>
  reset: ()=> void
}

const MemoryDisplay: FC<OptionsMemoryProps & Memorydisplay> = ({ 
  setNumberOfCards,
  numberOfCards,  
  progression, 
  setNbCardsFlipped, 
  nbCardsFlipped, 
  setEnd,
  setResetFlipped, 
  resetFlipped, 
  firstImageFlipped, 
  secondImageFlipped, 
  cardsWon, 
  setCardsWon, 
  setBackImagesList,
  backImagesList,
  setFirstImageFlipped,
  setSecondImageFlipped,
  setLevel,
  reset
}) => {

  const arrayOfBackImages = shuffleArrayPiece(getArrayOfNumbers(12)) 

  useEffect(() => {
    if(nbCardsFlipped === 2) {
      setTimeout(()=> {
        toggleBooleanState(setResetFlipped, true, 200)
        setNbCardsFlipped(0)
      }, 1000)

      setTimeout(()=> {
        if((firstImageFlipped === secondImageFlipped) && firstImageFlipped !== null){
          setCardsWon([...cardsWon, firstImageFlipped])
        }
      }, 800)
    }
      
  }, [nbCardsFlipped, setNbCardsFlipped])

  useEffect(()=> {
    const halfArrayImages = arrayOfBackImages.slice(0, numberOfCards/2)
    setBackImagesList(shuffleArrayPiece([...halfArrayImages, ...halfArrayImages]))

  }, [numberOfCards])

  useEffect(()=> {
    if(cardsWon.length === numberOfCards/2){
      progression === "automatic" && numberOfCards !==0 ? endLevelAndGoNext() : setEnd("endGame")
    }
  }, [cardsWon, numberOfCards, setEnd])
  
  const cardArray = getArrayOfNumbers(numberOfCards)

  const endLevelAndGoNext = ()=> {
    setEnd("endLevel")
    setTimeout(()=> {
      if(numberOfCards !== 0){
        setEnd(null)
        setLevel(prev => prev + 1)
        reset()
      }
      //Si le nombre de cartes est égal à 0, le jeu est fini
      setNumberOfCards(prev => prev === 12 ? 16 : prev === 16 ? 20 : prev === 20 ? 24 : prev=== 24 ? 0:0)
    }, 3000)
  }

  return (
    <MemoryDisplayContainer style={{width: `${numberOfCards === 20 ? "775px" : numberOfCards === 24 ? "930px" : "620px"}`}}>
      { 
        backImagesList.length >0 &&
        cardArray.map((number: number)=> (
          <MemoryCard 
            key={number} 
            image={numberOfCards === 12 ? "koala": numberOfCards === 16 ? "astronaut" : numberOfCards === 20 ? "rabbit" : "dog"} 
            setNbCardsFlipped={setNbCardsFlipped} 
            resetFlipped={resetFlipped} 
            nbCardsFlipped={nbCardsFlipped}
            reverseImage={backImagesList[number]}
            setFirstImageFlipped={setFirstImageFlipped}
            setSecondImageFlipped={setSecondImageFlipped}
            firstImageFlipped={firstImageFlipped}
            cardsWon={cardsWon}
          />
        ))
      }
    </MemoryDisplayContainer>
  )
}

const MemoryDisplayContainer = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default MemoryDisplay