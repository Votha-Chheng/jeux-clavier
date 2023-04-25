export const isClickable = (positionOfEmptyPiece: number, positionPiece: number): boolean=>{
  let isClickable = false
  if(positionPiece !== positionOfEmptyPiece && (Math.abs(positionOfEmptyPiece - positionPiece) !== 6)){
    if(positionOfEmptyPiece%3 === 0){
      if((positionPiece === positionOfEmptyPiece + 1) || ((positionPiece%3 === 0))){
        isClickable = true
      }
    } else if(positionOfEmptyPiece%3 === 1) {
      if((positionPiece === positionOfEmptyPiece - 1) || (positionPiece === positionOfEmptyPiece + 1) || ((positionPiece%3 === 1))){
        isClickable = true
      }
    } else if(positionOfEmptyPiece%3 === 2) {
      if((positionPiece === positionOfEmptyPiece - 1) || ((positionPiece%3 === 2))){
        isClickable = true
      }
    }

  }
  return isClickable
}