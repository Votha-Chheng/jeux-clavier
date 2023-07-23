import { PositionPiece } from "@/types/positionPiece"

export const obstacleIsTouched = (awardPosition: PositionPiece, obstaclePosition: PositionPiece, tolerance: number): boolean=> {
  let result = false
  if((Math.abs(awardPosition.leftPosition - obstaclePosition.leftPosition) < tolerance) && (Math.abs(awardPosition.topPosition - obstaclePosition.topPosition) < tolerance)){
    return true
  }

  return result
}