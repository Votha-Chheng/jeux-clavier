import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction } from 'react'

export interface ObstacleProps{
  positionLeft: number;
  nbParrot: number;
  setParrotIsTouched: Dispatch<SetStateAction<boolean>>;
}

const StyledParrot: FC<ObstacleProps> = ({ positionLeft, setParrotIsTouched, nbParrot }) => {

  return (
    <Image
      style={{top: `75px`, left: `${positionLeft}px` }} 
      className={`obstacle-two-${nbParrot}`}
      src={`/images/trouve-chemin/obstacle-2.svg`}
      alt='obstacle' 
      width={125} 
      height={125}
      onMouseEnter={()=> {
        setParrotIsTouched(true)
        console.log("collision")
      }}
    />
  )
}


export default StyledParrot

