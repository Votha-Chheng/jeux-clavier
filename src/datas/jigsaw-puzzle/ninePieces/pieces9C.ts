import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { svgList9C } from "./svgLists";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";

export const pieces9C: JigsawPiece[] = getArrayOfNumbers(9).map((number: number, index: number)=> (
  {
    position: number,
    path: svgList9C[index].path,
    viewBox: svgList9C[index].viewBox,
    dimension: {
      width:returnWidthHeightViewBox(svgList9C[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList9C[index].viewBox).width.toString()
    },
    positionOnFrame: {
      x: svgList9C[index].positionOnFrame.x,
      y: svgList9C[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList9C[index].translateImage?.translateX ?? null,
      translateY: svgList9C[index].translateImage?.translateY ?? null,
    }
  }
))