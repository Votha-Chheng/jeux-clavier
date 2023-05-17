import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { svgList9B } from "./svgLists";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";

export const pieces9B: JigsawPiece[] = getArrayOfNumbers(9).map((number: number, index)=> (
  {
    position: number,
    path: svgList9B[index].path,
    viewBox: svgList9B[index].viewBox,
    dimension: {
      width:returnWidthHeightViewBox(svgList9B[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList9B[index].viewBox).width.toString()
    },
    positionOnFrame: {
      x: svgList9B[index].positionOnFrame.x,
      y: svgList9B[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList9B[index].translateImage?.translateX ?? null,
      translateY: svgList9B[index].translateImage?.translateY ?? null,
    }
  }
))