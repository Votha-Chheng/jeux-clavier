import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";
import { svgList12C } from "./svgLists";

export const pieces12C: JigsawPiece[] = getArrayOfNumbers(12).map((number: number, index: number)=> (
  {
    position: number,
    path: svgList12C[index].path,
    viewBox: svgList12C[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList12C[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList12C[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList12C[index].positionOnFrame.x,
      y: svgList12C[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList12C[index].translateImage?.translateX ?? null,
      translateY: svgList12C[index].translateImage?.translateY ?? null,
    }
  }
))