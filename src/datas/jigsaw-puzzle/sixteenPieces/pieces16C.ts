import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";
import { svgList16C } from "./svgList";

export const pieces16C: JigsawPiece[] = getArrayOfNumbers(16).map((number: number, index)=> (
  {
    position: number,
    path: svgList16C[index].path,
    viewBox: svgList16C[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList16C[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList16C[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList16C[index].positionOnFrame.x,
      y: svgList16C[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList16C[index].translateImage?.translateX ?? null,
      translateY: svgList16C[index].translateImage?.translateY ?? null,
    }
  }
))