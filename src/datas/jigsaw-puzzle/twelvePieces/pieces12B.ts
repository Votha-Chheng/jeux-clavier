import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";
import { svgList12B } from "./svgLists";

export const pieces12B: JigsawPiece[] = getArrayOfNumbers(12).map((number: number, index: number)=> (
  {
    position: number,
    path: svgList12B[index].path,
    viewBox: svgList12B[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList12B[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList12B[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList12B[index].positionOnFrame.x,
      y: svgList12B[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList12B[index].translateImage?.translateX ?? null,
      translateY: svgList12B[index].translateImage?.translateY ?? null,
    }
  }
))