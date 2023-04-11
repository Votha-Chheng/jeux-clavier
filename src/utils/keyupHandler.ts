import { Dispatch, SetStateAction } from "react"

export const keyupHandlerOnlyLetters = (event: KeyboardEvent, setter: Dispatch<SetStateAction<string>>): void => {
  console.log(event.key)
  if(event.key.length<2 && event.key !== " "){  
    setter(event.key)

  } else {
    setter("")

  }
}

export const returnOnlyLettersForKeyUp = (event: KeyboardEvent): string => {
  if(event.key.length<2 && event.key !== " "){  
    return event.key

  } else {
    return ""

  }
}