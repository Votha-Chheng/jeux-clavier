import { Dispatch, SetStateAction } from "react"

export const displaySuccess = (setter: Dispatch<SetStateAction<boolean|undefined>>, trueOrFalse: boolean): void=> {
  setter(trueOrFalse)
  setTimeout(()=> {
    setter(undefined)
  }, 2000)
}