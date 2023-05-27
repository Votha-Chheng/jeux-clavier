export const pickRandomElement = (arrayLetter: string[]|number[]): string|number=> {
  let selectedItem: string|number = ""

  const randomNumber: number = Math.floor(Math.random()*arrayLetter.length)

  selectedItem = arrayLetter[randomNumber]

  return selectedItem
}