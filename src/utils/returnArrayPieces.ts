import { pieces9A } from "@/datas/jigsaw-puzzle/ninePieces/pieces9A"
import { pieces9B } from "@/datas/jigsaw-puzzle/ninePieces/pieces9B"
import { pieces9C } from "@/datas/jigsaw-puzzle/ninePieces/pieces9C"
import { pieces16A } from "@/datas/jigsaw-puzzle/sixteenPieces/pieces16A"
import { pieces16B } from "@/datas/jigsaw-puzzle/sixteenPieces/pieces16B"
import { pieces16C } from "@/datas/jigsaw-puzzle/sixteenPieces/pieces16C"
import { pieces12A } from "@/datas/jigsaw-puzzle/twelvePieces/pieces12A"
import { pieces12B } from "@/datas/jigsaw-puzzle/twelvePieces/pieces12B"
import { pieces12C } from "@/datas/jigsaw-puzzle/twelvePieces/pieces12C"
import { JigsawPiece } from "@/types/jigsawPiece"

export const returnArrayPieces = (nbPieces: number, typePiece: "A"|"B"|"C"): JigsawPiece[]=> {
  let arrayPiece: JigsawPiece[] = []

  if(nbPieces===9){
    if(typePiece === "A"){
      arrayPiece = pieces9A
    } else if(typePiece === "B"){
      arrayPiece = pieces9B
    } else {
      arrayPiece = pieces9C
    }
  } else if(nbPieces === 12){
    if(typePiece === "A"){
      arrayPiece = pieces12A
    } else if(typePiece === "B"){
      arrayPiece = pieces12B
    } else {
      arrayPiece = pieces12C
    }
  } else if(nbPieces === 16){
    if(typePiece === "A"){
      arrayPiece = pieces16A
    } else if(typePiece === "B"){
      arrayPiece = pieces16B
    } else {
      arrayPiece = pieces16C
    }
  }
  return arrayPiece
}