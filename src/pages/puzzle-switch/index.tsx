import GameContainerLayout from '@/components/layouts/GameContainerLayout'
import Puzzle from '@/components/puzzle-switch/Puzzle'
import OptionsPuzzleSwitch from '@/components/puzzle-switch/options/OptionsPuzzleSwitch'
import Bravo from '@/components/shared-UI/Bravo'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import { roboto } from '@/fonts/roboto'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { RootState } from '@/store/store'
import { dealSetterArray } from '@/utils/dealSetterArray'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'
import { returnArraySetter, returnArrayStates } from '@/utils/returnArrayStatesSetters'
import { shuffleArrayPiece } from '@/utils/shuffleArrayPiece'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const PuzzleSwitch: FC = () => {
  const [levelMode, setLevelMode] = useState<boolean>(false)
  const [level, setLevel] = useState<number>(0)
  const [nextLevel, setNextLevel] = useState<boolean>(false)
  const [nbPieces, setNbPieces] = useState<number>(9)
  const [start, setStart] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  const [image, setImage] = useState<string>("taquin-1.png")
  const [positionTemporaireElement0, setPositionTemporaireElement0] = useState<number>(0)
  const [positionTemporaireElement1, setPositionTemporaireElement1] = useState<number>(0)
  const [positionTemporaireElement2, setPositionTemporaireElement2] = useState<number>(0)
  const [positionTemporaireElement3, setPositionTemporaireElement3] = useState<number>(0)
  const [positionTemporaireElement4, setPositionTemporaireElement4] = useState<number>(0)
  const [positionTemporaireElement5, setPositionTemporaireElement5] = useState<number>(0)
  const [positionTemporaireElement6, setPositionTemporaireElement6] = useState<number>(0)
  const [positionTemporaireElement7, setPositionTemporaireElement7] = useState<number>(0)
  const [positionTemporaireElement8, setPositionTemporaireElement8] = useState<number>(0)
  const [positionTemporaireElement9, setPositionTemporaireElement9] = useState<number>(0)
  const [positionTemporaireElement10, setPositionTemporaireElement10] = useState<number>(0)
  const [positionTemporaireElement11, setPositionTemporaireElement11] = useState<number>(0)
  const [positionTemporaireElement12, setPositionTemporaireElement12] = useState<number>(0)
  const [positionTemporaireElement13, setPositionTemporaireElement13] = useState<number>(0)
  const [positionTemporaireElement14, setPositionTemporaireElement14] = useState<number>(0)
  const [positionTemporaireElement15, setPositionTemporaireElement15] = useState<number>(0)

  const [positionToSwitch, setPositionToSwitch] = useState<{positionTemporaire: number|null, index: number|null}>({positionTemporaire: null, index: null})
  const [targetPosition, setTargetPosition] = useState<{positionTemporaire: number|null, index: number|null}>({positionTemporaire: null, index: null})

  const [mounted, setMounted] = useState<boolean>(false)
  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)
  const dispatch = useDispatch()

  const ARRAY_SETTER_9 = [
    setPositionTemporaireElement0,
    setPositionTemporaireElement1,
    setPositionTemporaireElement2, 
    setPositionTemporaireElement3,
    setPositionTemporaireElement4,
    setPositionTemporaireElement5,
    setPositionTemporaireElement6,
    setPositionTemporaireElement7,
    setPositionTemporaireElement8
  ]

  const ARRAY_SETTER_12 = ARRAY_SETTER_9.concat([
    setPositionTemporaireElement9,
    setPositionTemporaireElement10,
    setPositionTemporaireElement11
  ])

  const ARRAY_SETTER_16 = ARRAY_SETTER_12.concat([
    setPositionTemporaireElement12,
    setPositionTemporaireElement13,
    setPositionTemporaireElement14,
    setPositionTemporaireElement15
  ])

  const ARRAY_STATES_9 = [
    positionTemporaireElement0,
    positionTemporaireElement1,
    positionTemporaireElement2, 
    positionTemporaireElement3,
    positionTemporaireElement4,
    positionTemporaireElement5,
    positionTemporaireElement6,
    positionTemporaireElement7,
    positionTemporaireElement8
  ]

  const ARRAY_STATES_12 = ARRAY_STATES_9.concat([
    positionTemporaireElement9,
    positionTemporaireElement10,
    positionTemporaireElement11
  ])

  const ARRAY_STATES_16 = ARRAY_STATES_12.concat([
    positionTemporaireElement12,
    positionTemporaireElement13,
    positionTemporaireElement14,
    positionTemporaireElement15
  ])

  useEffect(()=> {
    if(levelMode){
      setLevel(0)
    }
    //fin  du mode aventure
  }, [levelMode, showUp])

  useEffect(()=> {
    if(levelMode){
      if(level !== 8){
        setImage(`taquin-${level+1}.png`)
      }
    }
    //fin  du mode aventure
  }, [level, levelMode, nextLevel])

  useEffect(()=> {
    if(levelMode){
      setEnd(false)
      if(nextLevel){
        setStart(false)
        setEnd(false)
        setPositionToSwitch({positionTemporaire: null, index: null})
        dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), getArrayOfNumbers(nbPieces))
      } else {
        setTimeout(()=> {
          const arrayShuffled: number[] = shuffleArrayPiece(getArrayOfNumbers(nbPieces))
          dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), arrayShuffled)
          setStart(true)
        }, 1000)
      }
    }
  }, [nextLevel, showUp])

  useEffect(()=> {
    if(!levelMode){
      setNextLevel(false)
      setStart(false)
      setEnd(false)
      setPositionToSwitch({positionTemporaire: null, index: null})
      dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), getArrayOfNumbers(nbPieces))
    
      setTimeout(()=> {
        const arrayShuffled: number[] = shuffleArrayPiece(getArrayOfNumbers(nbPieces))
        dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), arrayShuffled)
        setStart(true)
      }, 1000)
      
    }
  }, [showUp])

  useEffect(()=> {
    if(((positionToSwitch.positionTemporaire !== null) && positionToSwitch.index !== null) && ((targetPosition.positionTemporaire !== null) && targetPosition.index !== null)){      
      returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16)[positionToSwitch.index](targetPosition.positionTemporaire)
      returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16)[targetPosition.index](positionToSwitch.positionTemporaire)  
      setPositionToSwitch({positionTemporaire: null, index: null})
      setTargetPosition({positionTemporaire: null, index: null})

    }
  }, [targetPosition])

  const checkFinPuzzle = (arrayState: number[]): boolean=> {
    let checkingArray: boolean[] = []
    for (let i=0; i<arrayState.length; i++){
      if(arrayState[i] === i){
        checkingArray.push(true)
      } else {
        checkingArray.push(false)
      }
    }
    if(checkingArray.includes(false)){
      return false
    }
    return true
  }


  useEffect(()=> {
    //Le jeu se termine si la position temporaire de chaque pièce est égale à sa propriété position
    if(checkFinPuzzle(returnArrayStates(nbPieces, ARRAY_STATES_9, ARRAY_STATES_12, ARRAY_STATES_16)) && start){
      if(levelMode){
        console.log(level)
        if(level>6){
          setEnd(true)
        } else {
          setNextLevel(true)
        }    
      } else {
        setEnd(true)
      }
    }
  }, [checkFinPuzzle, start, levelMode, level, nextLevel])

  const resetPuzzle = ()=> {
    if(levelMode){
      setLevel(0)
      setNextLevel(false)
    }
    setPositionToSwitch({positionTemporaire: null, index: null})
    setTargetPosition({positionTemporaire: null, index: null})
    setEnd(false)
    setStart(false)
    dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), getArrayOfNumbers(nbPieces))

    setTimeout(()=> {
      const arrayShuffled: number[] = shuffleArrayPiece(getArrayOfNumbers(nbPieces))
      dealSetterArray(returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16), arrayShuffled)
      setStart(true)
    }, 2000)

  }

  useEffect(()=> {
    setMounted(true)
  }, [])

  const goToNextLevel = (event: any)=> {
    event.preventDefault()
    setLevel(prev=> prev+1)
    setStart(false)
    setNextLevel(false)
    
  }

  if(!mounted) return null

  return (
    <GameContainerLayout>
      <PuzzleSwitchStyle>
        <OptionsPanel onClickHandler={()=> dispatch(setShowUp(!showUp))}>
          <OptionsPuzzleSwitch setImage={setImage} image={image} setNbPieces={setNbPieces} nbPieces={nbPieces} levelMode={levelMode} setLevelMode={setLevelMode} />
        </OptionsPanel>
        <section className='img-container'>
        {
          nextLevel 
          ?
          <div className={roboto.className + ' next'} onClick={(event)=> goToNextLevel(event)}>
            Puzzle suivant &rsaquo;&rsaquo;
          </div>
        
          :
          end 
          ?
          <Bravo marginTop='0'/>
          :
          <Image src={`/images/puzzles/${image}`} alt="Image sélectionnée" width={240} height={240} placeholder="blur" blurDataURL={`/images/puzzles/mini-${image}`} />
        }
        </section>
        <Puzzle 
          image={image}
          arrayOfSetter={returnArraySetter(nbPieces, ARRAY_SETTER_9, ARRAY_SETTER_12, ARRAY_SETTER_16)} 
          arrayOfStates={returnArrayStates(nbPieces, ARRAY_STATES_9, ARRAY_STATES_12, ARRAY_STATES_16)} 
          positionToSwitch={positionToSwitch} 
          setPositionToSwitch={setPositionToSwitch} 
          targetPosition={targetPosition} 
          setTargetPosition={setTargetPosition}
          start={start}
          end={end}
          nbPieces={nbPieces}
          nextLevel={nextLevel}
        />
        <IconsFooter style={{pointerEvents: `${((level === 7 && end) || !levelMode) ? "auto": "none"}`, opacity: `${((level === 7 && end) || !levelMode)? "1" : "0.5"}` }} reset={()=>resetPuzzle()} marginTop='30px' />
      </PuzzleSwitchStyle>
    </GameContainerLayout>
  )
}

const PuzzleSwitchStyle = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 75px;

  .img-container{
    display: flex;
    justify-content: center;
    height: 240px;
  }

  .next{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    font-size: 50px;
    color: green;
    margin-top: 20px;
    font-weight: bold;
    border: 3px solid green;
    width: 400px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    margin: 20px auto 0;
  }
`

export default PuzzleSwitch
