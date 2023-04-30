import { ImagePiece } from '@/types/imagePiece';
import { indexToPosition, indexToPositionPuzzle } from '@/utils/indexToPosition'
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

interface PuzzlePieceProps{
  positionTemporaire: number;
  positionImage: ImagePiece;
  image: string;
  setPositionToSwitch: Dispatch<SetStateAction<{positionTemporaire: number|null, index: number|null}>>;
  positionToSwitch: {positionTemporaire: number|null, index: number|null};
  targetPosition: {positionTemporaire: number|null, index: number|null};
  setTargetPosition: Dispatch<SetStateAction<{positionTemporaire: number|null, index: number|null}>>;
  index:number;
  end: boolean;
  nbPieces: number;
  nextLevel: boolean;
}

const PuzzlePiece: FC<PuzzlePieceProps> = ( {positionTemporaire, positionImage, image, setPositionToSwitch, positionToSwitch, setTargetPosition, index, end, nbPieces, nextLevel }) => {

  const selectPosition = (positionToSwitch: number|null, positionTemporaire: number)=> {
    if(positionToSwitch === positionTemporaire){
      setPositionToSwitch({positionTemporaire: null, index: null})
    } else if(positionToSwitch === null){
      setPositionToSwitch({positionTemporaire, index})
    } else {
      setTargetPosition({positionTemporaire, index})
    }
  }

  return (
    <PiecePuzzleStyle 
      className={`${positionToSwitch.positionTemporaire === positionTemporaire ? "selected": "unselected"} ${end || nextLevel ? " end":""}`}
      onClick={()=>selectPosition(positionToSwitch.positionTemporaire, positionTemporaire)} 
      style={{
        width: `${nbPieces === 9 ? "150px" : "125px"}`,
        height:`${nbPieces === 16 ? "125px" : "150px"}`,
        top:`${indexToPositionPuzzle(positionTemporaire, nbPieces).topPosition}px`, 
        left:`${indexToPositionPuzzle(positionTemporaire, nbPieces).leftPosition}px`,
      }}
    >
      <Image 
        src={`/images/${image}`} 
        alt= "image sélectionnnée" 
        width={nbPieces === 9 ?  450: 500} height={nbPieces === 16 ? 500 : 450} style={{transform: `translate(${-positionImage.left}px, ${-positionImage.top}px)`, transition:"all 0.4s ease-out"}}
      />
    </PiecePuzzleStyle>
    
  )
}

const PiecePuzzleStyle= styled.div`
  border:2px solid black;
  position: absolute;
  overflow: hidden;
  z-index:3;
  height: 150px;
  width: 150px;
  transition: top 0.25s linear, left 0.25s linear, border 0.1s linear;
  transform-origin: top left;

  &.end{
    pointer-events: none;
    border:none;
  }

  &.unselected:hover {
    border: 4px solid orange;
    filter : brightness(1.15);
    cursor: pointer;
  }
  &.selected{
    border: 5px solid green;
    cursor: pointer;
  }
  
`

export default PuzzlePiece