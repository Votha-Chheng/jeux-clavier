export const pickRandomLetter = (arrayLetter: string[]): string=> {
  let selectedLetter: string = ""

  const randomNumber: number = Math.floor(Math.random()*arrayLetter.length)

  selectedLetter = arrayLetter[randomNumber]

  return selectedLetter
}