import { Dispatch, SetStateAction } from "react"

export const dealSetterArray = (setterArray: Dispatch<SetStateAction<number>>[], shuffleArray: number[]): void=> {
  for (let i=0; i<setterArray.length; i++){
    setterArray[i](shuffleArray[i])
  }
}