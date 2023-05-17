import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { svgList16A } from "./svgList";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";

export const pieces16A: JigsawPiece[] = getArrayOfNumbers(16).map((number: number, index)=> (
  {
    position: number,
    path: svgList16A[index].path,
    viewBox: svgList16A[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList16A[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList16A[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList16A[index].positionOnFrame.x,
      y: svgList16A[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList16A[index].translateImage?.translateX ?? null,
      translateY: svgList16A[index].translateImage?.translateY ?? null,
    }
  }
))