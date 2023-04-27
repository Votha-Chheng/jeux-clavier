import { useEffect, useState } from 'react'

export const useMouseMove = (): {x: number, y: number} => {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  const setPosition = (event: MouseEvent)=> {
    setX(event.clientX)
    setY(event.clientY)
  }

  useEffect(()=> {
    window.addEventListener("mousemove", (event: MouseEvent )=> setPosition(event) )

    return () => {
      window.removeEventListener("mousemove",  (event: MouseEvent )=> setPosition(event))
    }
  }, [])

  return {x, y}
}