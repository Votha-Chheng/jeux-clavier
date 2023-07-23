import { PositionPiece } from '@/types/positionPiece';
import Image from 'next/image';
import React, { FC } from 'react'


export interface ObstacleProps{
  position: PositionPiece;
  className?: string;
  name?: string;
}

const Obstacle: FC<ObstacleProps> = ({ position, name="obstacle-1", className="obstacle-one" }) => {
  
  return (
    <Image
      style={{top: `${position.topPosition}px`, left: `${position.leftPosition}px` }} 
      className={className}
      src={`/images/trouve-chemin/${name}.svg`}
      alt='obstacle' 
      width={125} 
      height={125}
    />
  )
}


export default Obstacle