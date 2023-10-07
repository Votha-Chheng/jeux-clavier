import GameContainerLayout from '@/components/layouts/GameContainerLayout'
import MemoryDisplay from '@/components/memory/MemoryDisplay'
import OptionsMemory from '@/components/memory/optionsMemory/OptionsMemory'
import Bravo from '@/components/shared-UI/Bravo'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { RootState } from '@/store/store'
import { blinkAnimation } from '@/styles/globalStyle'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

export type OptionsMemoryProps = {
  numberOfCards: number
  setNumberOfCards: Dispatch<SetStateAction<number>>
  progression: "automatic"|"manual"
  setProgression: Dispatch<SetStateAction<"manual"|"automatic">>
}

const Memory = () => {
  const [resetFlipped, setResetFlipped] = useState<boolean>(false)
  const [numberOfCards, setNumberOfCards] = useState<number>(12)
  const [progression, setProgression] = useState<"automatic"|"manual">("manual")
  const [nbCardsFlipped, setNbCardsFlipped] = useState<number>(0)
  const [end, setEnd] = useState<"endLevel"|"endGame"|null>(null)
  const [backImagesList, setBackImagesList] = useState<number[]>([])
  const [firstImageFlipped, setFirstImageFlipped] = useState<number|null>(null)
  const [secondImageFlipped, setSecondImageFlipped] = useState<number|null>(null)
  const [cardsWon, setCardsWon] = useState<number[]>([])
  const [level, setLevel] = useState<number>(0)

  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)

  const dispatch = useDispatch()  

  const reset = ()=> {
    setEnd(null)
    setResetFlipped(false)
    setBackImagesList([])
    setFirstImageFlipped(null)
    setSecondImageFlipped(null)
    setCardsWon([])
    setLevel(0)
  }
  
  return (
    <GameContainerLayout>
      <MemoryContainer>
        <OptionsPanel onClickHandler={()=> dispatch(setShowUp(!showUp)) } >
          <OptionsMemory numberOfCards={numberOfCards} setNumberOfCards={setNumberOfCards} progression={progression} setProgression={setProgression} />
        </OptionsPanel>
        {
          end === "endLevel"
          ?
          <div className="success-blink">
            <Bravo marginTop='-75px'/> 
          </div>
          :
          end === "endGame" || level > 3
          ?
          <>
            <Bravo/>
            <IconsFooter reset={()=>reset()} marginTop='0' width="940px"/>
          </>
          :
          <MemoryDisplay 
            numberOfCards={numberOfCards} 
            setNumberOfCards={setNumberOfCards} 
            setProgression={setProgression} 
            progression={progression} 
            setNbCardsFlipped={setNbCardsFlipped} 
            nbCardsFlipped={nbCardsFlipped} 
            setEnd={setEnd}
            resetFlipped={resetFlipped}
            firstImageFlipped={firstImageFlipped}
            secondImageFlipped={secondImageFlipped}
            cardsWon={cardsWon}
            setCardsWon={setCardsWon}
            setBackImagesList={setBackImagesList}
            backImagesList={backImagesList}
            setFirstImageFlipped={setFirstImageFlipped}
            setSecondImageFlipped={setSecondImageFlipped}
            setResetFlipped={setResetFlipped}
            setLevel={setLevel}
            reset={reset}
          />
        }
      </MemoryContainer>
    </GameContainerLayout>
  )
}

const MemoryContainer = styled.div`
  padding-top: 100px;

  .success-blink {
    padding-top: 25%;
    left: 50%;
    transform: translateX(-50%);
    animation: ${blinkAnimation} 4s ease-in;
    position: absolute;
  }
`

export default Memory