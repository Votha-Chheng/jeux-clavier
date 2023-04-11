import { keyupHandlerOnlyLetters } from '@/utils/keyupHandler'
import { useEffect, useState } from 'react'

export const useKeyUpForLettersOnly = (): string => {
  const [letter, setLetter] = useState<string>("")

  const returnNull = (event: globalThis.KeyboardEvent): void=> {
    event.key === "Tab" && event.preventDefault()
    setLetter("")
  }

  useEffect(()=> {
    window.addEventListener("keyup", event => keyupHandlerOnlyLetters(event, setLetter))
    window.addEventListener("keydown", event => returnNull(event))
    

    return () => {
      window.removeEventListener("keyup", event => keyupHandlerOnlyLetters(event, setLetter))
      window.removeEventListener("keydown",  event => returnNull(event))
    }
  }, [])

  return letter
}
