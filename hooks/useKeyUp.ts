import { useEffect, useState } from 'react'

export const useKeyUp = (): string => {
  const [touche, setTouche] = useState<string>("")

  const returnNull = (): void=> {
    setTouche("")
  }

  useEffect(()=> {
    window.addEventListener("keyup", event => setTouche(event.key))
    window.addEventListener("keydown", event => returnNull())

    return () => {
      window.removeEventListener("keyup",  event => setTouche(event.key))
      window.removeEventListener("keydown", () => returnNull())
    }
  }, [])

  return touche
}