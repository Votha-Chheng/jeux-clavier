import RadioInput from '@/components/shared-UI/RadioInput'
import { rubik } from '@/fonts/rubik'
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';
import Image from 'next/image';
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

interface OptionsJigsawProps {
  levelMode: boolean;
  setLevelMode: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  nbPieces: number;
  setNbPieces: Dispatch<SetStateAction<number>>;
  precision: number;
  setPrecision: Dispatch<SetStateAction<number>>;
}

const IMAGES_CHOICES = getArrayOfNumbers(8)
const PIECES_CHOICES:  number[] = [9, 12, 16]

const OptionsJigsawPuzzle: FC<OptionsJigsawProps> = ({levelMode, setLevelMode, image, setImage, nbPieces, setNbPieces, precision, setPrecision}) => {
  return (
    <OptionsJigsawPuzzleStyle>
      <section style={{display:"flex", justifyContent:"center", gap: "50px"}}>
        <div>
          <h1 className={rubik.className + " titre-options"}>Mode de jeu :</h1>
          <div className='level-mode'>
            <RadioInput 
              width='250px'
              isChecked={!levelMode}
              id={image}
              handleClick={()=> setLevelMode(false)}
              value="Changement manuel"
            />
            <RadioInput 
              width='250px'
              isChecked={levelMode}
              id={image}
              handleClick={()=> {
                setLevelMode(true)
                setImage("taquin-1.png")
              }}
              value="Changement automatique"
            />
          </div>
        </div>
        <div>
          <h1 className={rubik.className + " titre-options"}>Précision :</h1>
          <div style={{display: "flex", gap: "10px"}}>
            <input type="range" name="precision" min={10} max={75} value={precision} onChange={(event: ChangeEvent<HTMLInputElement>)=> setPrecision(+event.target.value)}  />
            <span style={{alignSelf:"center"}}>{precision}px</span>
          </div>
        </div>
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
      <h1 className={rubik.className + " titre-options"}>Choix de l&apos;image :</h1>
      <section className='radio-image'>
        {
          IMAGES_CHOICES.map((number: number, index: number)=> (
            <RadioInput 
              disabled={levelMode}
              key={index}
              width='190px'
              isChecked={image===`puzzle-${number}.png`}
              id={image}
              handleClick={()=> setImage(`puzzle-${number}.png`)}
              value={<Image src={`/images/jigsaw/mini-puzzle-${number}.png`} width={150} height={150} alt={image} style={{opacity: `${levelMode ? "0.5": "1"}`}} />}
            />
          ))
        }
      </section>
    </OptionsJigsawPuzzleStyle>
  )
}

export default OptionsJigsawPuzzle

const OptionsJigsawPuzzleStyle = styled.main`
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
  }
  .nb-pieces{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

  }
  .level-mode{
    margin-bottom: 40px;
  }
`