export const pickRandomElement = (arrayLetter: string[]): string=> {
  let selectedItem: string = ""

  const randomNumber: number = Math.floor(Math.random()*arrayLetter.length)

  selectedItem = arrayLetter[randomNumber]

  return selectedItem
}