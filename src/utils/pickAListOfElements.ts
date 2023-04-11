export const pickAListOfElements = (elementsList: string[], qty: number): string[]=> {
  let result: string[] = []
  let newElementsList: string[] = [...elementsList]

  for (let i = 0; i<qty; i++){
    const index = Math.floor(Math.random()*(newElementsList.length))
    const temp = newElementsList.filter((mot:string)=> mot !== newElementsList[index])
    result = [...result, newElementsList[index]]
    newElementsList = [...temp]
  }

  return result
}