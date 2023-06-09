import { JigsawPiece } from "@/types/jigsawPiece";
import { PositionPiece } from "@/types/positionPiece";

const switchFunction = (left: number, first: number, second: number, third: number) : number=> {
  let index = 0;

  switch(left){
    case 0 : index = first
    break
    case 80 : index = second
    break
    case 160 : index = third
    break
  }

  return index
}

export const indexToPosition = (index: number): PositionPiece => {
  let topPosition: number = 0
  let leftPosition: number = (index%3)*150

  if(index<3){
    topPosition = 0

  } else if(index>=3 && index<6) {
    topPosition = 150

  } else {
    topPosition = 300

  }
  
  return {topPosition, leftPosition}
}

export const indexToPositionPuzzle = (index: number, nbPieces: number, piece?: JigsawPiece): PositionPiece => {
  let topPosition: number = 0
  let leftPosition: number = 0

  if(nbPieces === 9){
    topPosition = indexToPosition(index).topPosition
    leftPosition = indexToPosition(index).leftPosition

  } else if(nbPieces === 12) {
    leftPosition = (index%4)*125
    if(index<4){
      topPosition = 0
    } else if(index>=4 && index<8){
      topPosition = 150
    } else {
      topPosition = 300
    }
  } else {
    leftPosition = (index%4)*125
    if(index<4){
      topPosition = 0
    } else if(index>=4 && index<8){
      topPosition = 125
    } else if(index>=8 && index<12){
      topPosition = 250
    } else {
      topPosition = 375
    }
  } 
  return {topPosition, leftPosition}
}



export const positionToIndex = (position: PositionPiece): number => {
  let index: number = 0
  let top = position.topPosition
  let left = position.leftPosition


  if(top === 0){
    index = switchFunction(left, 0, 1, 2)
  } else if(top === 80){
    index = switchFunction(left, 3, 4, 5)
  } else {
    index = switchFunction(left, 6, 7, 8)
  }

  return index
}