export const shuffleArrayPiece = (tableau: any[], startIndex: number = 0): any[]=>{
  let currentIndex: number = tableau.length - startIndex
  let randomIndex: number
  let newTableau : any[] = []
  let restTableau: any[] = []
  let finalTableau: any[] = []

  if(startIndex !== 0){
    for (let i=0; i<startIndex; i++){
      newTableau.push(tableau[i])
    }
    for (let i=startIndex; i<tableau.length; i++){
      restTableau.push(tableau[i])
    }
  } else {
    restTableau = [...tableau]
  }

  while(currentIndex !==0){
    randomIndex = Math.floor(Math.random()*currentIndex)
    currentIndex--

    [restTableau[currentIndex], restTableau[randomIndex]] = [restTableau[randomIndex], restTableau[currentIndex]]
  }

  if(newTableau.length>0){
    finalTableau = newTableau.concat(restTableau)
  } else {
    finalTableau = restTableau
  }
  return finalTableau
}