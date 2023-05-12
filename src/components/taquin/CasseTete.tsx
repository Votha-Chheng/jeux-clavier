import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import PieceImage from './PieceImage'
import { ImagePiece } from '@/types/imagePiece'
import { indexToPosition } from '@/utils/indexToPosition'
import { isClickable } from '@/utils/isClickable'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'

interface CasseTeteProps {
  setEnd: Dispatch<SetStateAction<boolean>>;
  start: boolean;
  end: boolean;
  image: string;
  arrayOfStates: number[];
  arrayOfSetter: Dispatch<SetStateAction<number>>[];
}
const CasseTete: FC<CasseTeteProps> = ({setEnd, start, end, image, arrayOfStates, arrayOfSetter}) => {

  const IMAGE_POSITIONS: ImagePiece[] = getArrayOfNumbers(9).map((pieceNumber: number, index: number)=> ({
    position: pieceNumber,
    top: indexToPosition(index).topPosition,
    left: indexToPosition(index).leftPosition
  }))


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
    if(checkFinPuzzle(arrayOfStates) && start){
      setEnd(true)
    }
  }, [checkFinPuzzle])


  const switchPosition = (positionTargetDiv: number, setterTarget: Dispatch<SetStateAction<number>>)=> {
    arrayOfSetter[6](positionTargetDiv)
    setterTarget(arrayOfStates[6])
  }

  return (
    <CasseTeteDivStyle>
      {
        IMAGE_POSITIONS.map((imagePiece: ImagePiece, index: number)=> (
          <PieceImage 
            key={index}
            positionTemporaire={arrayOfStates[index]}
            positionImage={IMAGE_POSITIONS[index]}
            handleClick={()=> (!start || index===6) ? null : switchPosition(arrayOfStates[index], arrayOfSetter[index])}
            isClickable={ (!start || index===6 || end) ? false : isClickable(arrayOfStates[6], arrayOfStates[index])}
            isEmpty={index===6}
            image={image}
          />
        ))
      }
    </CasseTeteDivStyle>
  )
}

const CasseTeteDivStyle = styled.div`
  margin: 25px auto 0;
  position: relative;
  width: 450px;
  height:450px;
  background-color: black;
  overflow: hidden;
`

export default CasseTete