import { Dispatch, SetStateAction } from "react"

export const returnArraySetter = (nbPieces: number, array9: Dispatch<SetStateAction<number>>[], array12: Dispatch<SetStateAction<number>>[], array16: Dispatch<SetStateAction<number>>[]): Dispatch<SetStateAction<number>>[]=> {
  let array: Dispatch<SetStateAction<number>>[] = []
  if(nbPieces === 9){
    array = array9
  } else if(nbPieces === 12){
    array = array12
  } else {
    array = array16
  }
  return array
}


export const returnArrayStates = (nbPieces: number, array9:  number[], array12:  number[], array16:  number[]): number[]=> {
  let array: number[] = []
  if(nbPieces === 9){
    array = array9
  } else if(nbPieces === 12){
    array = array12
  } else {
    array = array16
  }
  return array
}