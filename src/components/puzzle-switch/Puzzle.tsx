import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import PuzzlePiece from './PuzzlePiece'
import { ImagePiece } from '@/types/imagePiece'
import { indexToPosition, indexToPositionPuzzle } from '@/utils/indexToPosition'

interface PuzzleProps {
  nbPieces: number;
  arrayOfStates: number[];
  arrayOfSetter: Dispatch<SetStateAction<number>>[];
  positionToSwitch: {positionTemporaire: number|null, index: number|null};
  setPositionToSwitch: Dispatch<SetStateAction<{positionTemporaire: number|null, index: number|null}>>;
  targetPosition: {positionTemporaire: number|null, index: number|null};
  setTargetPosition: Dispatch<SetStateAction<{positionTemporaire: number|null, index: number|null}>>;
  start: boolean;
  end: boolean;
  image: string;
  nextLevel: boolean;
}

const Puzzle: FC<PuzzleProps> = ({ arrayOfStates, positionToSwitch, setPositionToSwitch, targetPosition, setTargetPosition, start, end, image, nbPieces, nextLevel }) => {
  
  const IMAGE_POSITIONS: ImagePiece[] = Array.from(Array(nbPieces).keys()).map((pieceNumber: number, index: number)=> ({
    position: pieceNumber,
    top: indexToPositionPuzzle(index, nbPieces).topPosition,
    left: indexToPositionPuzzle(index, nbPieces).leftPosition
  }))

  console.log(IMAGE_POSITIONS)


  return (
    <PuzzleStyle 
      className={`${end || !start ? "end" : ""}`}
      style={nbPieces === 9 ?{ width:"450px", height: "450px" } : nbPieces === 12 ?{ height: "450px", width: "500px"} : { height: "500px", width: "500px" }}>
      {
        IMAGE_POSITIONS.map((imagePiece: ImagePiece, index: number)=> (
          <PuzzlePiece 
            end={end}
            key={index}
            index={index}
            positionTemporaire={arrayOfStates[index]}
            positionImage={IMAGE_POSITIONS[index]}
            image={image}
            positionToSwitch={positionToSwitch} 
            setPositionToSwitch={setPositionToSwitch}
            targetPosition={targetPosition}
            setTargetPosition={setTargetPosition}
            nbPieces={nbPieces}
            nextLevel={nextLevel}
          />
        ))
      }
    </PuzzleStyle>
  )
}

const PuzzleStyle = styled.div`
  margin: 25px auto 0;
  position: relative;
  background-color: black;
  overflow: hidden;

  &.end{
    pointer-events: none
  }
`
export default Puzzle