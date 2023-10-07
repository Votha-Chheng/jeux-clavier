import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type MemoryCardProps = {
  image: string
  setNbCardsFlipped: Dispatch<SetStateAction<number>>
  resetFlipped: boolean
  nbCardsFlipped: number
  reverseImage: number
  setFirstImageFlipped: Dispatch<SetStateAction<number|null>>
  setSecondImageFlipped: Dispatch<SetStateAction<number|null>>
  firstImageFlipped: number|null
  cardsWon: number[]
}

const MemoryCard: FC<MemoryCardProps> = ({ image, setNbCardsFlipped, resetFlipped, nbCardsFlipped, reverseImage, setFirstImageFlipped, setSecondImageFlipped, firstImageFlipped, cardsWon }) => {
  const [flipped, setFlipped] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<"visible"|"hidden">("visible")

  const onClickHandler = ()=> {
    if(!flipped){
      setFlipped(prev=> !prev)
      setNbCardsFlipped(prev => prev + 1)
    }

    if(firstImageFlipped === null){
      setFirstImageFlipped(reverseImage)

    } else if(firstImageFlipped !== null){
      setSecondImageFlipped(reverseImage)

    }
  }

  useEffect(()=> {
    if(resetFlipped){
      setFlipped(false)
      setFirstImageFlipped(null)
      setSecondImageFlipped(null)
    } 

  }, [resetFlipped, setFlipped])

  useEffect(()=> {
    if(cardsWon.includes(reverseImage)){
      setVisibility("hidden")
    }
  }, [cardsWon])

  const resetCards = ()=> {
    setFlipped(false)
    setVisibility("visible")
  }

  return (
    <CardContainer className={`${flipped ? "flipped" : ""}`} style={{visibility}} onClick={()=> nbCardsFlipped === 2 ? null : onClickHandler()}>
      <div className="recto">
        <Image src={`/images/memory/${image}.jpg`} alt='koala' fill sizes='(max-width: 930px) 100vw' />
      </div>
      <div className="verso">
        <Image src={`/images/memory/nettoyage-${reverseImage}.jpg`} alt={`image numéro ${reverseImage}`} width={150} height={150} style={{objectFit:'cover'}} />
      </div>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  transition: all 0.3s ease-out;
  transform-style: preserve-3d;
  border: 5px solid white;
  border-radius: 5px;
  margin: 2.5px;

  &:hover {
    cursor: pointer;
  }

  &.flipped {
    transform: rotateY(180deg)
  }

  .recto, .verso {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
  }

  .recto{
    background-color: blue;
  }

  .verso{
    background-color: red;
    transform: rotateY(180deg)
  }
`

export default MemoryCard