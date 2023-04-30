import RadioInput from '@/components/shared-UI/RadioInput';
import { rubik } from '@/fonts/rubik';
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

interface OptionsPuzzleSwitchProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  setNbPieces: Dispatch<SetStateAction<number>>;
  nbPieces: number;
}
const IMAGES_CHOICES = getArrayOfNumbers(8)
const PIECES_CHOICES:  number[] = [9, 12, 16]

const OptionsPuzzleSwitch: FC<OptionsPuzzleSwitchProps> = ({ image, setImage, setNbPieces, nbPieces }) => {
  return (
    <OptionsTaquinStyle>
      <h1 className={rubik.className + " titre-options"}>Choix de l&apos;image :</h1>
      <section className='radio-image'>
        {
          IMAGES_CHOICES.map((number: number, index: number)=> (
            <RadioInput 
              key={index}
              width='190px'
              isChecked={image===`taquin-${number+1}.png`}
              id={image}
              handleClick={()=> setImage(`taquin-${number+1}.png`)}
              value={<Image src={`/images/mini-taquin-${number+1}.png`} width={150} height={150} alt={image} />}
            />
          ))
        }
      </section>
      <section>
        <h1 className={rubik.className + " titre-options"}>Nombre de pièces :</h1>
        <div className='nb-pieces'>
        {
          PIECES_CHOICES.map((pieces:number, index: number)=> (
            <RadioInput 
              key={index}
              width='100px'
              isChecked={pieces===nbPieces}
              id={image}
              handleClick={()=> setNbPieces(pieces)}
              value={`${pieces.toString()} pièces`}
            />
          ))
        }
        </div>
      </section>
    </OptionsTaquinStyle>

  )
}

const OptionsTaquinStyle = styled.main`
  padding:20px 10px;
  width: 950px;

  h1{
    margin: 25px auto;
    text-align: center;
    font-size: 27.5px;
    font-weight: bold;
  }
  section.radio-image {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height:100%;
    width: 920px;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .nb-pieces{
    margin-left: calc(50% - 90px)
  }
`

export default OptionsPuzzleSwitch