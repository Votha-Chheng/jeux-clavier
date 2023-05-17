import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";
import { svgList12A } from "./svgLists";

export const pieces12A: JigsawPiece[] = getArrayOfNumbers(12).map((number: number, index: number)=> (
  {
    position: number,
    path: svgList12A[index].path,
    viewBox: svgList12A[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList12A[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList12A[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList12A[index].positionOnFrame.x,
      y: svgList12A[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList12A[index].translateImage?.translateX ?? null,
      translateY: svgList12A[index].translateImage?.translateY ?? null,
    }
  }
))