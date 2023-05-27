import { PositionPiece } from "@/types/positionPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";

const easyPositionsMask = (totalWidth: number, totalHeight: number, index: number): PositionPiece => {
  let topPosition = 0
  let leftPosition = totalWidth*0.9*(index%10)/10

  if(index>9 && index<20){
    topPosition = totalHeight*0.93/5

  } else if(index>19 && index<30){
    topPosition = totalHeight*0.93*2/5

  } else if(index>29 && index<40){
    topPosition = totalHeight*0.93*3/5

  } else if(index>39){
    topPosition = totalHeight*0.93*4/5

  }

  return { leftPosition, topPosition}
}

export const easyPositionsMaskDatas = (totalWidth: number, totalHeight: number): PositionPiece[]=> {
  return getArrayOfNumbers(50).map((number: number)=> (
    {
      leftPosition: easyPositionsMask(totalWidth, totalHeight, number).leftPosition,
      topPosition: easyPositionsMask(totalWidth, totalHeight, number).topPosition
    }
  ))
}