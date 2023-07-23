import { PositionPiece } from "@/types/positionPiece";

export const getRandomPosition = (min: number, max: number): PositionPiece=> {
  let x : number = Math.floor(Math.random() * (max - min) + min);
  let y : number = Math.floor(Math.random() * (max - min) + min); 

  return { topPosition: x, leftPosition: y}
}