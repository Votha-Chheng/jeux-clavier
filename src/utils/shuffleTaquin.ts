const generateChoices = (numberOfChoices: number) : number=> {
  return Math.floor(Math.random() * numberOfChoices)
}

const swapElements = (arrayNumber: number[], index1: number, index2: number): number[] => {
  const temp = arrayNumber[index1];
  arrayNumber[index1] = arrayNumber[index2];
  arrayNumber[index2] = temp;

  return [...arrayNumber]
}

export const returnNewOrder = (order: number[], pivotElement: number): number[] => {
  if(order.indexOf(pivotElement) === 0) {
    const random = generateChoices(2)
    console.log(random)
    if(random === 0){
      swapElements(order, 0, 1)
    } else {
      swapElements(order, 0, 3)
    }
  } else if(order.indexOf(pivotElement) === 1) {
    const random = generateChoices(3)

    if(random === 0){
      swapElements(order, 1, 0)
    } else if(random === 1) {
      swapElements(order, 1, 2)
    } else {
      swapElements(order, 1, 4)
    }
  } else if(order.indexOf(pivotElement) === 2) {
    const random = generateChoices(2)

    if(random === 0){
      swapElements(order, 2, 1)
    } else {
      swapElements(order, 2, 5)
    }
  } else if(order.indexOf(pivotElement) === 3) {
    const random = generateChoices(3)

    if(random === 0){
      swapElements(order, 3, 0)
    } else if(random === 1) {
      swapElements(order, 3, 4)
    } else {
      swapElements(order, 3, 6)
    }
  } else if(order.indexOf(pivotElement) === 4) {
    const random = generateChoices(4)

    if(random === 0){
      swapElements(order, 4, 1)
    } else if(random === 1) {
      swapElements(order, 4, 3)
    } else if(random === 2) {
      swapElements(order, 4, 5)
    } else {
      swapElements(order, 4, 7)
    }
  } else if(order.indexOf(pivotElement) === 5) {
    const random = generateChoices(3)
    if(random === 0){
      swapElements(order, 5, 2)
    } else if(random === 1) {
      swapElements(order, 5, 4)
    } else {
      swapElements(order, 5, 8)
    }
  } else if(order.indexOf(pivotElement) === 6) {
    const random = generateChoices(2)
    console.log(random)
    if(random === 0){
      swapElements(order, 6, 7)
    } else {
      swapElements(order, 6, 3)
    }
  } else if(order.indexOf(pivotElement) === 7){
    const random = generateChoices(3)

    if(random === 0){
      swapElements(order, 7, 8)
    } else if(random === 1){
      swapElements(order, 7, 4)
    } else {
      swapElements(order, 7, 6)
    }
  } else {
    const random = generateChoices(2)

    if(random === 0){
      swapElements(order, 8, 5)
    } else {
      swapElements(order, 8, 7)
    }
  }

  return order
}

export const shuffleTaquin = (arrayOfOrder: number[], numberOfMovements: number): number[] => {
  let finalShuffle: number[] = [...arrayOfOrder]

  for (let i = 0; i<numberOfMovements; i++){
    setTimeout(()=> {
      finalShuffle = [...returnNewOrder(finalShuffle, finalShuffle.indexOf(6))]
    }, 100)
    
  }

  return finalShuffle
}