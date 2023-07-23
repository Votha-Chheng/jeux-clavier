import { PositionPiece } from '@/types/positionPiece'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useMouseMove } from '../../../hooks/useMouseMove'
import { getRandomPosition } from '@/utils/getRandomPosition'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import { poppins } from '@/fonts/poppins'
import styled, { keyframes } from 'styled-components'
import Image from 'next/image'
import { obstacleIsTouched } from '@/utils/obstacleIsTouched'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'
import Obstacle from './Obstacle'
import StyledParrot from './StyledParrotOne'

interface LevelProps {
  grabbed: boolean;
  setGrabbed: Dispatch<SetStateAction<boolean>>;
  title: string;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setTouched: Dispatch<SetStateAction<boolean>>;
  setEnd: Dispatch<SetStateAction<boolean>>;
  level: number;
}

const LevelLayout: FC<LevelProps> = ({ grabbed, setGrabbed, setTouched, title, level, setEnd }) => {
  const [startAwardPosition, setStartAwardPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [awardPosition, setAwardPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [heroPosition, setHeroPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleOnePosition, setObstacleOnePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleTwoPosition, setObstacleTwoPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleThreePosition, setObstacleThreePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleFourPosition, setObstacleFourPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleFivePosition, setObstacleFivePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [obstacleSixPosition, setObstacleSixPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [wolfOnePosition, setWolfOnePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [wolfTwoPosition, setWolfTwoPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [wolfThreePosition, setWolfThreePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotOnePosition, setParrotOnePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotTwoPosition, setParrotTwoPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotThreePosition, setParrotThreePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotFourPosition, setParrotFourPosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotFivePosition, setParrotFivePosition] = useState<PositionPiece>({topPosition: 0, leftPosition: 0})
  const [parrotIsTouched, setParrotIsTouched] = useState<boolean>(false)

  const { widthDimension, heightDimension  } = useWindowDimensions()
  const { x, y } = useMouseMove()

  const LIMIT_LEVEL_FOR_CHANGE = 6

  useEffect(() => {
    const start = {topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(0, 75).leftPosition}
    setStartAwardPosition(start)
    setAwardPosition(start)
    setHeroPosition({topPosition: getRandomPosition(0, heightDimension - 200).topPosition, leftPosition: getRandomPosition(widthDimension-200, widthDimension-125).leftPosition})
    setObstacleOnePosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    if(level>1){
      setObstacleTwoPosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    } 
    if(level>2){
      setObstacleThreePosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>3){
      setObstacleFourPosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>4){
      setObstacleFivePosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>5){
      setObstacleSixPosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>11){
      setWolfOnePosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>12){
       setWolfTwoPosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>13){
       setWolfThreePosition({topPosition: getRandomPosition(0, heightDimension - 150).topPosition, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>14){
      setEnd(true)
    }
  }, [level])

  useEffect(()=> {
    if(level>LIMIT_LEVEL_FOR_CHANGE){
      setParrotOnePosition({topPosition: 100, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>LIMIT_LEVEL_FOR_CHANGE+1){
      setParrotTwoPosition({topPosition: 100, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>LIMIT_LEVEL_FOR_CHANGE+2){
      setParrotThreePosition({topPosition: 100, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>LIMIT_LEVEL_FOR_CHANGE+3){
      setParrotFourPosition({topPosition: 100, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
    if(level>LIMIT_LEVEL_FOR_CHANGE+4){
      setParrotFivePosition({topPosition: 100, leftPosition: getRandomPosition(200, widthDimension-250).leftPosition})
    }
  }, [level])
  
  //Grab balloon if mouseover
  useEffect(()=> {
    if(grabbed && level<LIMIT_LEVEL_FOR_CHANGE){
      setAwardPosition({topPosition: y-75, leftPosition: x-75})
    } else if(grabbed && level>=LIMIT_LEVEL_FOR_CHANGE){
      setAwardPosition({topPosition: y-50, leftPosition: x-50})
    }
  }, [y, x])

  //Ungrab balloon if balloon touches hero
  useEffect(()=> {
    if((Math.abs(awardPosition.leftPosition - heroPosition.leftPosition) <60) && (Math.abs(awardPosition.topPosition - heroPosition.topPosition) <60 )){
      setGrabbed(false)
      setAwardPosition(heroPosition)
      setTouched(true)
    }
  }, [y, x])

  //Go back to start position if obstacle is touched
  useEffect(()=> {
    if((level<=LIMIT_LEVEL_FOR_CHANGE && (
        (obstacleIsTouched(awardPosition, obstacleOnePosition, 75)) ||
        (obstacleIsTouched(awardPosition, obstacleTwoPosition, 75) && level>1) ||
        (obstacleIsTouched(awardPosition, obstacleThreePosition, 75) && level>2) ||
        (obstacleIsTouched(awardPosition, obstacleFourPosition, 75) && level>3) ||
        (obstacleIsTouched(awardPosition, obstacleFivePosition, 75) && level>4) ||
        (obstacleIsTouched(awardPosition, obstacleSixPosition, 75) && level>5)
      ))  
      ||
      (level>LIMIT_LEVEL_FOR_CHANGE && (
        (obstacleIsTouched(awardPosition, wolfOnePosition, 60) && level>11) ||
        (obstacleIsTouched(awardPosition, wolfTwoPosition, 60) && level>12) ||
        (obstacleIsTouched(awardPosition, wolfThreePosition, 60) && level>13)
      ))
    ){
      setGrabbed(false)
      setAwardPosition(startAwardPosition)
    }
  }, [y, x, level])

  useEffect(()=> {
    if(level>=5 && grabbed && parrotIsTouched){
      setGrabbed(false)
      setAwardPosition(startAwardPosition)
      setParrotIsTouched(false)
    }
  }, [y, x, level])

  const grabAward = (): void=> {
    setGrabbed(true)
  }

  const attributesForObstacles = (index: number): PositionPiece => {
    let statement: PositionPiece;

    switch(index){
      case 1: statement = obstacleOnePosition
        break
      case 2: statement = obstacleTwoPosition
        break
      case 3: statement = obstacleThreePosition
        break
      case 4: statement = obstacleFourPosition
        break
      case 5: statement = obstacleFivePosition
        break
      case 6: statement = obstacleSixPosition
        break
      default : statement = {topPosition: 0, leftPosition:0}
    }  
    return statement
  }

  return (
    <LevelLayoutStyle>
      <h1 className={poppins.className + ' title'} >{title}</h1>
      <Image 
        style={{top: `${heroPosition.topPosition}px`, left: `${heroPosition.leftPosition}px` }} 
        className='hero' 
        src={`/images/trouve-chemin/sprite-${level>LIMIT_LEVEL_FOR_CHANGE ? "2":"1"}.svg`} 
        alt='ballon' 
        width={level>LIMIT_LEVEL_FOR_CHANGE ? 175 :150} 
        height={level>LIMIT_LEVEL_FOR_CHANGE ? 175 :150}
      />
      <Image 
        onMouseEnter={()=> grabAward()}
        style={{top: `${awardPosition.topPosition}px`, left: `${awardPosition.leftPosition}px` }} 
        className='award' 
        src={`/images/trouve-chemin/award-${level>6 ? "2":"1"}.svg`}
        alt='ballon' 
        width={level>LIMIT_LEVEL_FOR_CHANGE ? 100 :150} 
        height={level>LIMIT_LEVEL_FOR_CHANGE ? 100 :150}
      />
      {
        level<7 &&
        getArrayOfNumbers(level).map((number: number)=> (
          <Obstacle
            key={number}
            position={attributesForObstacles(number+1)} 
          />
        ))
      }
      {
        level>=7 &&
        <StyledParrot
          positionLeft={parrotOnePosition.leftPosition}
          setParrotIsTouched={setParrotIsTouched}
          nbParrot={1}
        />
      }
      {
        level>8 &&
        <StyledParrot
          positionLeft={parrotTwoPosition.leftPosition}
          setParrotIsTouched={setParrotIsTouched}
          nbParrot={2}
        />
      }
      {
        level>9 &&
        <StyledParrot
          positionLeft={parrotThreePosition.leftPosition}
          setParrotIsTouched={setParrotIsTouched}
          nbParrot={3}
        />
      }
      {
        level>10 &&
        <StyledParrot
          positionLeft={parrotFourPosition.leftPosition}
          setParrotIsTouched={setParrotIsTouched}
          nbParrot={4}
        />
      }
      {
        level>11 &&
        <StyledParrot
          positionLeft={parrotFivePosition.leftPosition}
          setParrotIsTouched={setParrotIsTouched}
          nbParrot={5}
        />
      }
      {
        level>11 &&
        <Obstacle
          position={wolfOnePosition}
          name='obstacle-3'
          className=''
        />
      }
      {
        level>12 &&
        <Obstacle
          position={wolfTwoPosition}
          name='obstacle-3'
          className=''
        />
      }
      {
        level>13 &&
        <Obstacle
          position={wolfThreePosition}
          name='obstacle-3'
          className=''
        />
      }
    </LevelLayoutStyle>
  )
}

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100%{
    transform : translateY(700px)
  }
`

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg) };
  100% { transform: rotate(360deg) };
`

const LevelLayoutStyle = styled.div`
  h1{
    text-align: center;
    font-weight: bold;
  } 
  .award {
    cursor: grabbing;
  }
  .obstacle-one{
    transform-origin: center;
    animation: ${rotateAnimation} 3s linear infinite;
  } 
  .obstacle-two-1 {
    top: 120px;
    animation: ${moveVertically} 5s linear alternate infinite;
  }
  .obstacle-two-2 {
    top: 120px;
    animation: ${moveVertically} 4.5s 0.25s linear alternate infinite;
  }
  .obstacle-two-3 {
    top: 120px;
    animation: ${moveVertically} 4s 0.5s linear alternate infinite;
  }
  .obstacle-two-4 {
    top: 120px;
    animation: ${moveVertically} 3.5s 0.75s linear alternate infinite;
  }
  .obstacle-two-5 {
    top: 120px;
    animation: ${moveVertically} 3s 1s linear alternate infinite;
  }
`

export default LevelLayout