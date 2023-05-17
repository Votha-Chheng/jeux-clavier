import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { svgList9A } from "./svgLists";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";


export const pieces9A: JigsawPiece[] = getArrayOfNumbers(9).map((number: number, index)=> (
  {
    position: number,
    path: svgList9A[index].path,
    viewBox: svgList9A[index].viewBox,
    dimension: {
      width:returnWidthHeightViewBox(svgList9A[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList9A[index].viewBox).width.toString()
    },
    positionOnFrame: {
      x: svgList9A[index].positionOnFrame.x,
      y: svgList9A[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList9A[index].translateImage?.translateX ?? null,
      translateY: svgList9A[index].translateImage?.translateY ?? null,
    }
  }
))