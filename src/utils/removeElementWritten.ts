export const removeElementWritten = (startArray: string[], elementToRemove:string): string[]=> {
  const newArray = startArray.filter((letter: string)=> letter !== elementToRemove)
  return newArray
}