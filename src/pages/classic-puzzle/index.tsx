import JigsawPuzzleFrame from '@/components/jigsaw-puzzle/JigsawPuzzleFrame'
import PiecesZone from '@/components/jigsaw-puzzle/PiecesZone'
import GameContainerLayout from '@/components/layouts/GameContainerLayout'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { JigsawPiece } from '@/types/jigsawPiece'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { PositionPiece } from '@/types/positionPiece'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'
import { RootState } from '@/store/store'
import OptionsJigsawPuzzle from '@/components/jigsaw-puzzle/options/OptionsJigsawPuzzle'
import { returnArrayPieces } from '@/utils/returnArrayPieces'
import Piece from '@/components/classic-puzzle/Piece'
import { pickRandomElement } from '@/utils/pickRandomElement'
import Head from 'next/head'

const JigsawPuzzle: FC = () => {
  const [level, setLevel] = useState<number>(0)
  const [nbPieces, setNbPieces] = useState<number>(16)
  const [image, setImage] = useState<string>("puzzle-0.png")
  const [frameTopPosition, setFrameTopPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [piecesZonePosition, setPiecesZonePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [lockedArray, setLockedArray] = useState<boolean[]>(getArrayOfNumbers(16).map(()=> false))
  const [end, setEnd] = useState<boolean>(false)
  const [levelMode, setLevelMode] = useState<boolean>(false)
  const [piecesType, setPiecesType] = useState<"A"|"B"|"C">("A")
  const [nextLevel, setNextLevel] = useState<boolean>(false)
  const [resetGame, setResetGame] = useState<number>(0)
  const [precision, setPrecision] = useState<number>(30)

  const [mount, setMount] = useState<boolean>(false)

  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)

  const dispatch = useDispatch()

  useEffect(() => {
    setMount(true)
  }, [])

  useEffect(()=> {
    setEnd(false)
    setNextLevel(false)
    setLockedArray(getArrayOfNumbers(nbPieces).map(()=> false))
    const type: "A"|"B"|"C" = pickRandomElement(["A", "B", "C"]) as "A"|"B"|"C"
    setPiecesType(type)
    
  }, [showUp, mount, level, resetGame])

  useEffect(()=> {
    if(levelMode){
      if(level !== 8){
        setImage(`puzzle-${level}.png`)
      }
    }
    //fin  du mode aventure
  }, [level, levelMode, nextLevel, resetGame])
  

  useEffect(()=> {
    if(lockedArray.length<1){
      if(levelMode && level<7){
        setNextLevel(true)
      } else {
        setEnd(true)
      }
    }
  }, [lockedArray, levelMode, setNextLevel, setEnd, resetGame])

  
  const goToNextLevel = ()=> {
    setLevel(prev=> prev+1)
    setNextLevel(false)
  }
  
  if(!mount) return null

  return (
    <GameContainerLayout >
      <ScreenContainer>
        <Head>
          <title>Puzzles en ligne</title>
        </Head>
        <OptionsPanel onClickHandler={()=> dispatch(setShowUp(!showUp)) }>
          <OptionsJigsawPuzzle
            precision={precision}
            setPrecision={setPrecision}
            image={image}
            setImage={setImage}
            levelMode={levelMode}
            setLevelMode={setLevelMode}
            nbPieces={nbPieces}
            setNbPieces={setNbPieces}
          />
        </OptionsPanel>
        <div className='puzzle-container'>
          <JigsawPuzzleFrame
            nbPieces={nbPieces}
            image={image}
            setFramePosition={setFrameTopPosition}
          />
        </div>
        {
          returnArrayPieces(nbPieces, piecesType).map((piece: JigsawPiece, index: number)=> (
            <Piece
              level={level}
              key={index}
              image={image}
              piece={piece}
              piecesZonePosition={piecesZonePosition}
              leftImage={piece.positionOnFrame.x }
              topImage={piece.positionOnFrame.y}
              lockedArray={lockedArray}
              setLockedArray={setLockedArray}
              nbPieces={nbPieces}
              piecesType={piecesType}
              frameTopPosition={frameTopPosition}
              piecesZoneTopPosition={piecesZonePosition}
              resetGame={resetGame}
              precision={precision}
            />
          ))
        }
        <PiecesZone setPiecesZonePosition={setPiecesZonePosition} end={end} nextLevel={nextLevel} goToNextLevel={goToNextLevel} />
        <IconsFooter marginTop='10px' reset={()=> setResetGame(prev => prev+1)} />
      </ScreenContainer>
    </GameContainerLayout>
  )
}

const ScreenContainer = styled.div`
  position: relative;
  
  .puzzle-container {
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: grey;
  }
`

export default JigsawPuzzle