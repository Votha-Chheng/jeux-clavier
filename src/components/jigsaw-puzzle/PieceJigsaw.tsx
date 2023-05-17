import { JigsawPiece } from '@/types/jigsawPiece';
import { PositionPiece } from '@/types/positionPiece';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useMouseMove } from '../../../hooks/useMouseMove';
import { compensateLeftGapScreen } from '@/utils/compensateLeftGapScreen';
import useWindowDimensions from '../../../hooks/useWindowDimension';
import { positionOnFramePuzzle } from '@/utils/positionPuzzlePieces';
import { returnArrayPieces } from '@/utils/returnArrayPieces';

interface PieceJigsawProps {
  top: number;
  left: number;
  image: string;
  imgSize: {width: number, height: number};
  piece: JigsawPiece;
  index: number;
  imagePosition: PositionPiece;
  piecesZoneTopPosition: number;
  frameTopPosition: PositionPiece;
  setLockedArray: Dispatch<SetStateAction<boolean[]>>;
  lockedArray: boolean[];
  piecesType: "A"|"B"|"C";
  nbPieces: number;
}

const PieceJigsaw: FC<PieceJigsawProps> = ({ top, left, image, imgSize, index, imagePosition, piece, piecesZoneTopPosition, frameTopPosition, setLockedArray, lockedArray, piecesType, nbPieces }) => {
  const [grabbed, setGrabbed] = useState<boolean>(false)
  const [lockedPosition, setLockedPosition] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<PositionPiece>({leftPosition: 0, topPosition: 0})
  const [topPosition, setTopPosition] = useState<number>(0)
  const [leftPosition, setLeftPosition] = useState<number>(0)

  const { x, y } = useMouseMove()
  const { widthDimension } = useWindowDimensions()

  const ARRAY_SOLUTIONS: PositionPiece[] = returnArrayPieces(nbPieces, piecesType).map((piece: JigsawPiece)=> {
    let topPosition = 0
    let leftPosition = 0

    topPosition = positionOnFramePuzzle(piece.position, nbPieces, piece).topPosition + frameTopPosition.topPosition
    leftPosition = positionOnFramePuzzle(piece.position, nbPieces, piece).leftPosition + frameTopPosition.leftPosition

    return { topPosition, leftPosition }
  })

  const checkIfPieceIsOnTheRightPosition = (position: number): boolean=> {
    if(
      (topPosition < ARRAY_SOLUTIONS[position].topPosition + 60 ) && (topPosition > ARRAY_SOLUTIONS[position].topPosition - 60 )
      &&
      (leftPosition < ARRAY_SOLUTIONS[position].leftPosition + 60 ) && (leftPosition > ARRAY_SOLUTIONS[position].leftPosition - 60 )
      ){
      return true
    }
    return false
  }

  const conditionForImageReverseGapX = (pieceType: "A"|"B"|"C", nbPiece: number, piece: JigsawPiece): number => {
    let coeff: number = 1

    if(nbPiece === 16){
      if(pieceType === "B"){
        if(piece.position === 11){
          coeff = 1.15
        }
      }
    } else if(nbPiece === 9){
      if(pieceType === "B"){
        if(piece.position === 2){
          coeff = -1
        }
      }
    } else if(nbPiece === 12){
      if(pieceType === "A"){
        if(piece.position === 0){
          coeff = -15
        }
      }
    }
    return coeff
  }

  const conditionForImageReverseGapY = (pieceType: "A"|"B"|"C", nbPiece: number, piece: JigsawPiece): number =>{
    let coeff: number = 1

    if(nbPiece === 16){
      if(pieceType === "B"){
        if(piece.position === 11){
          coeff = -1
        }
      } else if(pieceType === "C"){
        if(piece.position === 6){
          coeff = -1.11
        }
      }
      
    } else if(nbPiece === 9){
      if(pieceType === "B"){
        if(piece.position === 3 || piece.position === 6 || piece.position === 7 || piece.position === 5 || piece.position === 8){
          coeff = -1
        }
      }
    } else if(nbPiece === 12){
      if(pieceType === "A"){
        if(piece.position === 0){
          coeff = -1
        }
      }
    }

    return coeff
  }

  const getOffsetCompensationOnFrame = (typePiece: "A"|"B"|"C", nbPiece: number, piece: JigsawPiece): PositionPiece => {
    let gap: PositionPiece = { leftPosition: 0, topPosition: 0}

    if(typePiece === "A"){
      if(nbPiece === 9){
        if(piece.position === 7 || piece.position === 8 ){
          gap.topPosition = -compensateHeightPiece(+piece.dimension.height)

          if(piece.position === 8){
            gap.leftPosition = -compensateWidthPiece(+piece.dimension.width)
          }

        } else if(piece.position === 1){
          gap.leftPosition = -compensateWidthPiece(+piece.dimension.width)/2
        }
      } else if(nbPiece === 16){
        if(piece.position > 0 && piece.position<4){
          gap.leftPosition = 127-(+piece.dimension.width)
        } else if(piece.position === 4 || piece.position === 5 || piece.position === 9) {
          gap.topPosition = -41
        } else if(piece.position === 6 || piece.position === 7 || piece.position === 10 || piece.position === 15) {
          gap.leftPosition = -41
        } else if(piece.position > 11 && piece.position !== 15) {
          gap.topPosition = -41
        } 
      } else if(nbPiece === 12){
        
      }
      
    } else if(typePiece === "B") {
      if(nbPiece === 9){
        if(piece.position === 1){
          gap.leftPosition = -23
        } else if(piece.position === 2){
          gap.leftPosition = 150 - 136
        } else if(piece.position === 3){
          gap.topPosition = 36
        } else if(piece.position === 4){
          gap.topPosition = -49
          gap.leftPosition = -44
        }  else if(piece.position === 5){
          gap.topPosition = 37
          gap.leftPosition = -4
        } else if(piece.position === 6){
          gap.topPosition = 20
        } else if(piece.position === 7){
          gap.topPosition = 25
          gap.leftPosition = -15
        } else if(piece.position === 8){
          gap.topPosition = 28
          gap.leftPosition = -15
        }
      } else if(nbPiece === 16){
        if(piece.position === 0){
          gap.topPosition = 0
        } else if(piece.position === 1){
          gap.leftPosition = -27
        } else if(piece.position === 2){
          gap.leftPosition = -16
        } else if(piece.position === 3){
          gap.leftPosition = -1
        } else if(piece.position === 4){
          gap.topPosition = 0
        } else if(piece.position === 5){
          gap.leftPosition = -41
          gap.topPosition = -13
        } else if(piece.position === 6){
          gap.topPosition = -14
        } else if(piece.position === 7){
          gap.leftPosition = -2
          gap.topPosition = -20
        } else if(piece.position === 8){
          gap.topPosition = -13
        } else if(piece.position === 9){
          gap.leftPosition = -10
          gap.topPosition = -10
        } else if(piece.position === 10){
          gap.leftPosition = -7
          gap.topPosition = -14
        } else if(piece.position === 11){
          gap.leftPosition = -6
          gap.topPosition = 10
        } else if(piece.position === 12){
          gap.leftPosition = 0
          gap.topPosition = -7
        } else if(piece.position === 14){
          gap.leftPosition = -15
          gap.topPosition = -14
        } else if(piece.position === 15){
          gap.leftPosition = -20
          gap.topPosition = -13
        } 
      }
    
    } else {
      if(nbPiece === 9){
        if(piece.position === 1){
          gap.leftPosition = -35
        } else if(piece.position === 4){
          gap.topPosition = -32
          gap.leftPosition = -1
        } else if(piece.position === 5){
          gap.topPosition = -29
          gap.leftPosition = -1
        } else if(piece.position === 7){
          gap.topPosition = -15
          gap.leftPosition = -26
        } else if(piece.position === 8){
          gap.topPosition = -1
          gap.leftPosition = -27
        }
      } else if(nbPiece === 16){
        if (piece.position === 1){
          gap.leftPosition = -18
        } else if (piece.position === 2 || piece.position === 3){
          gap.leftPosition = -9
        } else if (piece.position === 4){
          gap.topPosition = -13
        } else if (piece.position === 5){
          gap.topPosition = -15
          gap.leftPosition = -14
        } else if (piece.position === 6){
          gap.topPosition = 1
          gap.leftPosition = -16
        } else if (piece.position === 7 || piece.position === 8){
          gap.topPosition = -15
        } else if (piece.position === 9){
          gap.leftPosition = -15
        } else if (piece.position === 10){
          gap.leftPosition = -16
          gap.topPosition = -4
        } else if (piece.position === 11){
          gap.leftPosition = -11
          gap.topPosition = -8
        } else if (piece.position === 13){
          gap.topPosition = -8
        } else if (piece.position === 14){
          gap.topPosition = -16
          gap.leftPosition = -8
        } else if (piece.position === 15){
          gap.topPosition = -11
          gap.leftPosition = -13
        }
      } 
    }
    return gap
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
  }, [])

  useEffect(()=> {
    setTopPosition(top)
    setLeftPosition(left)
  }, [piecesZoneTopPosition])

  useEffect(() => {
  if(grabbed){
    moveTag()
  }
    
  }, [grabbed, x, y])
  
  const compensateHeightPiece = (totalHeight: number): number=> {
    return totalHeight-150
  }

  const compensateWidthPiece = (totalWidth: number): number=> {
    return totalWidth-150
  }

  return (
    <PieceJigsawStyle 
      onClick={()=> !lockedPosition && catchPiece()}
      style={{
        zIndex: `${grabbed ? 2 : 0}`,
        top: `${topPosition}px`, 
        left: `${leftPosition}px`, 
        transform: `
          translateY(${getOffsetCompensationOnFrame(piecesType, nbPieces, piece).topPosition.toString()}px) 
          translateX(${getOffsetCompensationOnFrame(piecesType, nbPieces, piece).leftPosition.toString()}px)
        `
      }} 
      width={`${piece.dimension.width}`}
      height={`${piece.dimension.height }`} 
      viewBox={piece.viewBox} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>   
        <clipPath id={`clipping-path-${index}`} > 
          <path 
            d={piece.path}
          />
        </clipPath> 
      </defs> 
      <image 
        xlinkHref={`/images/puzzles/${image}`} 
        height={imgSize.height} 
        width={imgSize.width} 
        x={
          -imagePosition.leftPosition 
          + (conditionForImageReverseGapX(piecesType, nbPieces, piece)
          * Math.abs(getOffsetCompensationOnFrame(piecesType, nbPieces, piece).leftPosition))
        } 
        y={
          -imagePosition.topPosition 
          + (conditionForImageReverseGapY(piecesType, nbPieces, piece) 
          * Math.abs(getOffsetCompensationOnFrame(piecesType, nbPieces, piece).topPosition))
        } 
        clipPath={`url(#clipping-path-${index})`}
      />
    </PieceJigsawStyle>
  )
}

const PieceJigsawStyle=styled.svg`
  position: absolute;

  &:hover {
    cursor: grab;
  }
`

export default PieceJigsaw