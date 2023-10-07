import { Dispatch, SetStateAction } from "react"

export const displaySuccess = (setter: Dispatch<SetStateAction<boolean|undefined>>, trueOrFalse: boolean, timeSpan: number = 2000): void=> {
  setter(trueOrFalse)
  setTimeout(()=> {
    setter(undefined)
  }, timeSpan)
}

export const toggleBooleanState = (setter: Dispatch<SetStateAction<boolean>>, trueOrFalse: boolean, timeSpan: number = 2000): void=> {
  setter(trueOrFalse)
  setTimeout(()=> {
    setter(!trueOrFalse)
  }, timeSpan)
}

export const displayTrueBoolean = (setter: Dispatch<SetStateAction<boolean>>, temporaryTrueOrFalse: boolean, timeSpan: number = 2000): void=> {
  setter(temporaryTrueOrFalse)
  setTimeout(()=> {
    setter(!temporaryTrueOrFalse)
  }, timeSpan)
}