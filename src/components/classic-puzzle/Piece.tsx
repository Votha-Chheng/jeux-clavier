import { JigsawPiece } from '@/types/jigsawPiece';
import { PositionPiece } from '@/types/positionPiece';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMouseMove } from '../../../hooks/useMouseMove';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { returnArrayPieces } from '@/utils/returnArrayPieces';
import { compensateLeftGapScreen } from '@/utils/compensateLeftGapScreen';
import { positionPuzzlePieces } from '@/utils/positionPuzzlePieces';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface PieceProps {
  piecesZonePosition: PositionPiece;
  image: string;
  piece: JigsawPiece;
  leftImage: number;
  topImage: number;
  nbPieces: number;
  piecesType: "A"|"B"|"C";
  frameTopPosition: PositionPiece;
  piecesZoneTopPosition: PositionPiece;
  lockedArray: boolean[];
  setLockedArray: Dispatch<SetStateAction<boolean[]>>;
  level: number;
  resetGame: number;
  precision: number;
}

const Piece: FC<PieceProps> = ({ image, piece, leftImage, topImage, nbPieces, piecesType, frameTopPosition, piecesZoneTopPosition, lockedArray, setLockedArray, piecesZonePosition, resetGame, level, precision }) => {
  const [grabbed, setGrabbed] = useState<boolean>(false)
  const [lockedPosition, setLockedPosition] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<PositionPiece>({leftPosition: 0, topPosition: 0})
  const [topPosition, setTopPosition] = useState<number>(0)
  const [leftPosition, setLeftPosition] = useState<number>(0)

  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)
  const { x, y } = useMouseMove()
  const { widthDimension } = useWindowDimensions()

  const ARRAY_SOLUTIONS: PositionPiece[] = returnArrayPieces(nbPieces, piecesType).map((piece: JigsawPiece)=> {
    let topPosition = piece.positionOnFrame.y + frameTopPosition.topPosition
    let leftPosition = piece.positionOnFrame?.x + frameTopPosition.leftPosition

    return { topPosition, leftPosition }
  })

  const checkIfPieceIsOnTheRightPosition = (position: number): boolean=> {
    if(
      (topPosition < ARRAY_SOLUTIONS[position].topPosition + precision ) && (topPosition > ARRAY_SOLUTIONS[position].topPosition - precision)
      &&
      (leftPosition < ARRAY_SOLUTIONS[position].leftPosition + precision ) && (leftPosition > ARRAY_SOLUTIONS[position].leftPosition - precision)
      ){
      return true
    }
    return false
  }

  const catchPiece = (): void=> {
    if(!grabbed){
      setGrabbed(true)
      setStartPosition({ leftPosition, topPosition})
    } else {
      if(checkIfPieceIsOnTheRightPosition(piece.position)){
        setTopPosition(ARRAY_SOLUTIONS[piece.position].topPosition)
        setLeftPosition(ARRAY_SOLUTIONS[piece.position].leftPosition)
        setLockedPosition(true)
        let temp = [...lockedArray]
        temp.shift()
        setLockedArray(temp)
      } else {
        setTopPosition(startPosition.topPosition)
        setLeftPosition(startPosition.leftPosition)
      }
      setGrabbed(false)
    }
  } 

  const moveTag = ()=> {
    setTopPosition(y-((+piece.dimension.height)/2))
    setLeftPosition(compensateLeftGapScreen(x, widthDimension, (+piece.dimension.width)/2))
  }

  useEffect(()=> {
    setLockedPosition(false)
  }, [showUp, level, resetGame])

  useEffect(()=> {
    setTopPosition(positionPuzzlePieces(piecesZonePosition.topPosition+20, piecesZonePosition.topPosition + 120).topPosition)
    setLeftPosition(positionPuzzlePieces(piecesZonePosition.leftPosition, piecesZonePosition.leftPosition + 800).leftPosition)
  }, [piecesZoneTopPosition, level, showUp, resetGame])

  useEffect(() => {
  if(grabbed){
    moveTag()
  }
    
  }, [grabbed, x, y])

  return (
    <PieceJigsawStyle 
      onClick={()=> !lockedPosition && catchPiece()}
      style={{
        zIndex: `${grabbed ? 2 : 0}`,
        top: `${topPosition}px`, 
        left: `${leftPosition}px`, 
      }} 
      width={piece.dimension.width.toString()}
      height={piece.dimension.height.toString()} 
      viewBox={piece.viewBox} 
    //  xmlns="http://www.w3.org/2000/svg"
    >
      <defs>   
        <clipPath id={`clipping-path-${piece.position}`} > 
          <path 
            d={piece.path}
          />
        </clipPath> 
      </defs> 
      <image 
        height={500}
        width={500}
        href={`/images/jigsaw/${image}`} 
        x={piece.translateImage?.translateX !== null ? piece.translateImage?.translateX : -leftImage} 
        y={piece.translateImage?.translateY !== null ? piece.translateImage?.translateY : -topImage} 
        clipPath={`url(#clipping-path-${piece.position})`}
      />
    </PieceJigsawStyle>
  )
}


export default Piece

const PieceJigsawStyle=styled.svg`
  position: absolute;

  &:hover {
    cursor: grab;
  }
`
