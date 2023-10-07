import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useWindowDimensions from '../../../hooks/useWindowDimension'
import Mask from '@/components/nettoyage/Mask'
import { displayTrueBoolean } from '@/utils/displaySuccess'
import { easyPositionsMaskDatas } from '@/datas/nettoyage/eeasyPositionsMask'
import { PositionPiece } from '@/types/positionPiece'
import Bravo from '@/components/shared-UI/Bravo'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers'
import { pickRandomElement } from '@/utils/pickRandomElement'
import { colorsList } from '@/datas/nettoyage/colorsList'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import { blinkAnimation } from '@/styles/globalStyle'

const CleanImage: FC = () => {
  const [imagesLeft, setImagesLeft] = useState<number[]>(getArrayOfNumbers(11))
  const [selectedImage, setSelectedImage] = useState<number>(12)
  const [numberOfMasks, setNumberOfMasks] = useState<number>(50)
  const [colorMask, setColorMask] = useState<string>("grey")
  const [success, setSuccess] = useState<boolean>(false)
  const [level, setLevel] = useState<number>(0)
  const [end, setEnd] = useState<boolean>(false)

  const { widthDimension, heightDimension } = useWindowDimensions()

  //At start
  useEffect(()=> {
    const selected = pickRandomElement(imagesLeft)
    const color = pickRandomElement(colorsList)
    setSelectedImage(+selected)
    setColorMask(color.toString())
    
  }, [level])

  useEffect(()=> {
    const newList = imagesLeft.filter((number: number)=> number !== selectedImage)

    if(newList.length<1){
      setEnd(true)
    } else {
      setImagesLeft(newList)
    }

  }, [selectedImage])

  useEffect(()=> {
    if(numberOfMasks<1){
      displayTrueBoolean(setSuccess, true, 3000)
      setTimeout(()=> {
        setLevel(prev=> prev+1)
        setNumberOfMasks(50)
      }, 3000)
    }
  }, [numberOfMasks])

  const resetGame = (): void=> {
    setEnd(false)
    setImagesLeft(getArrayOfNumbers(11))
    setLevel(0)
  }

  return (
    <CleanImageStyle style={{height:`${heightDimension}px`}}>
      <div className='img-container' style={{width:`${widthDimension*0.9}px`, height:`${heightDimension*0.93}px`, cursor:`${end ? "auto": 'url("/images/clean-cursor.png"), auto'}`}}>
        {/* Loading all images */}
        {
          getArrayOfNumbers(11).map((number: number, index)=> (
            <Image 
              key={index}
              className="piled-images" 
              src={`/images/nettoyage/nettoyage-${number}.jpg`} 
              alt={`image numéro${number}`} 
              width={widthDimension*0.9} 
              height={heightDimension*0.93} 
              priority 
              style={{objectFit:"contain", zIndex:-1}}
            />
          ))
        }
        { 
          success &&
          <div className={`${success ? "success-blink" : "no-success"}`}>
            <Bravo marginTop='0'/> 
          </div>
        }
        {
          !success && end &&
          <div className="end">
            <Bravo message="C&apos;est fini !" marginTop='0'/> 
            <IconsFooter reset={()=> resetGame()}/>
          </div>
        }
        {
          end
          ? null
          :<Image src={`/images/nettoyage/nettoyage-${selectedImage}.jpg`} alt={`image numéro${selectedImage}`} width={widthDimension*0.9} height={heightDimension*0.93} priority style={{objectFit:"contain", zIndex:-1}}/>
        }
        
        {
          !end &&
          easyPositionsMaskDatas(widthDimension, heightDimension).map((element: PositionPiece, index: number)=> (
            <Mask 
              key={index}
              success={success} 
              setNumberOfMasks={setNumberOfMasks} 
              top={element.topPosition} 
              left={element.leftPosition} 
              imgSize={{width: widthDimension*0.9/10, height: heightDimension*0.93/5}}
              colorMask={colorMask}
            />
          ))
        }
      </div>
    </CleanImageStyle>
  )
}



const CleanImageStyle = styled.main`
  width: 100%;
  
  .img-container{
    margin: 0 auto;
    position: relative;
  }
  .no-success {
    display: none;
  }
  .success-blink {
    padding-top: 25%;
    left: 50%;
    transform: translateX(-50%);
    animation: ${blinkAnimation} 4s ease-in;
    position: absolute;
  }
  .end {
    padding-top: 25%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
  .piled-images{
    opacity: 0;
    position: absolute;
  }

`

export default CleanImage