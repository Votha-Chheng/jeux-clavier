import { PositionPiece } from "@/types/positionPiece";
import { getRandomNumbers } from "./getRandomNumbers";
import { JigsawPiece } from "@/types/jigsawPiece";

export const positionPuzzlePieces = (min: number, max: number): PositionPiece => {
  let leftPosition = getRandomNumbers(min, max);
  let topPosition = getRandomNumbers(min, max);

  return {topPosition, leftPosition}
}

export const positionOnFramePuzzle = (position: number, nbPieces: number, piece : JigsawPiece): PositionPiece => {
  let leftPosition = 0;
  let topPosition = 0;

  if(nbPieces === 9){
    leftPosition = 150*(position%3);
    topPosition = 0;
  
    if(position>2 && position<6){
      topPosition = 150
    } else if(position>5){
      topPosition = 150*2
    }
  } else if(nbPieces === 12){
    leftPosition = 125*(position%4)
    topPosition = 0
    
    if(position>3 && position<8){
      topPosition = 150
    } else if(position>7 ){
      topPosition = 150*2
    }
  } else {
    leftPosition = 125*(position%4)
    topPosition = 0

    if(position>3 && position<8){
      topPosition = 125
    } else if(position>7 && position<12){
      topPosition = 125*2
    } else if(position>11){
      topPosition = 125*3
    }
  }

  return {topPosition, leftPosition}
}