import LetterTag from '@/components/range-alphabet/LetterTag'
import { positionTags } from '@/utils/positionTags'
import { letters } from '@/datas/trouve-la-lettre/letters'
import GameContainerLayout from '@/components/layouts/GameContainerLayout'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import ContainerTag from '@/components/range-alphabet/ContainerTag'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import { useDispatch, useSelector } from 'react-redux'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { RootState } from '@/store/store'
import OptionsRangeAlphabet from '@/components/range-alphabet/options/OptionsRangeAlphabet'
import { pickAListOfElements } from '@/utils/pickAListOfElements'
import Bravo from '@/components/shared-UI/Bravo'

const RangeAlphabet: FC = () => {
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false)
  const [letterHovered, setLetterHovered] = useState<string>("")
  const [nbLettresARanger, setNbLettresARanger] = useState<number>(26)
  const [startAlphabet, setStartAlphabet] = useState<string[]>([])
  const [lettersLeft, setLettersLeft] = useState<string[]>([])
  const [end, setEnd] = useState<boolean>(false)

  const { showUp } = useSelector((state: RootState)=> state.optionsPanel) 

  const { heightDimension } = useWindowDimensions()
  const dispatch = useDispatch()

  useEffect(()=> {
    if(lettersLeft.length < 1){
      setEnd(true)
    } else {
      setEnd(false)
    }
  }, [lettersLeft])

  useEffect(()=> {
    const tempArray = pickAListOfElements(letters, nbLettresARanger)
    setStartAlphabet(tempArray)
    setLettersLeft(tempArray)
  }, [nbLettresARanger, pickAListOfElements])

  const reset = ()=> {
    const tempArray = pickAListOfElements(letters, nbLettresARanger)
    setStartAlphabet(tempArray)
    setLettersLeft(tempArray)
  }

  return (
    <GameContainerLayout borderLeft='5px solid black' borderRight='5px solid black'>
      <ContainerDiv>
        <OptionsPanel onClickHandler={()=> dispatch(setShowUp(!showUp))}>
          <OptionsRangeAlphabet nbLettresARanger={nbLettresARanger} setNbLettresARanger={setNbLettresARanger}/>
        </OptionsPanel>
        {
          letters.map((letter: string, index: number)=> (
            <ContainerTag 
              key={index} 
              isGrabbing={isGrabbing} 
              letter={letter} 
              position={positionTags(heightDimension, 950, 7.5, 110, letters, 90)[index]} 
              setLetterHovered={setLetterHovered} 
              lettersLeft={lettersLeft} />
          ))
        }
        {
          end 
          ?
          <div className='bravo' style={{top:`${heightDimension - 500}px`}}>
            <Bravo/>
          </div>
          :
          startAlphabet.map((letter: string, index: number)=> (
            <LetterTag 
              key={index} 
              startAlphabet={startAlphabet}
              nbLettresARanger={nbLettresARanger}
              letter={letter} 
              position={positionTags(heightDimension, 950, 1.75, 90, startAlphabet, 90)[index]} 
              setIsGrabbing={setIsGrabbing} 
              letterHovered={letterHovered} 
              setLettersLeft={setLettersLeft} 
              lettersLeft={lettersLeft} 
            /> 
          ))
        } 
        <div className='icons-container' style={{top: `${heightDimension-75}px`, height:"100%"}}>
          <IconsFooter reset={()=>reset()} marginTop='0' width="940px"/>
        </div>
      </ContainerDiv>
    </GameContainerLayout>
  )
}

const ContainerDiv = styled.div`
  position: relative;

  .bravo{
    position: absolute;
    text-align: center;
    left:50%;
    transform: translateX(-50%)
  }

  .icons-container{
    position: absolute;

  }
`

export default RangeAlphabet