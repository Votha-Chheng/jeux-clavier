import { JigsawPiece } from "@/types/jigsawPiece";
import { getArrayOfNumbers } from "@/utils/getArrayOfNumbers";
import { svgList16B } from "./svgList";
import { returnWidthHeightViewBox } from "@/utils/returnWidthHeightViewBox";

export const pieces16B: JigsawPiece[] = getArrayOfNumbers(16).map((number: number, index)=> (
  {
    position: number,
    path: svgList16B[index].path,
    viewBox: svgList16B[index].viewBox,
    dimension: {
      width: returnWidthHeightViewBox(svgList16B[index].viewBox).width.toString(),
      height: returnWidthHeightViewBox(svgList16B[index].viewBox).height.toString()
    },
    positionOnFrame: {
      x: svgList16B[index].positionOnFrame.x,
      y: svgList16B[index].positionOnFrame.y
    },
    translateImage: {
      translateX: svgList16B[index].translateImage?.translateX ?? null,
      translateY: svgList16B[index].translateImage?.translateY ?? null,
    }
  }
))