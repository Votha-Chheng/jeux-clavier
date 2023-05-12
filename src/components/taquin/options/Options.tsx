import RadioInput from '@/components/shared-UI/RadioInput'
import { rubik } from '@/fonts/rubik';
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

interface OptionsTaquin {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Options: FC<OptionsTaquin> = ({image, setImage}) => {
  return (
    <OptionsTaquinStyle>
      <h1 className={rubik.className + " titre-options"}>Choix de l&apos;image :</h1>
      <section className='radio-image'>
        <RadioInput 
          width='300px'
          isChecked={image==='taquin-1.png'}
          id={image}
          handleClick={()=> setImage("taquin-1.png")}
          value={<Image src={`/images/puzzles/mini-taquin-1.png`} width={200} height={200} alt={image} />}
        />
        <RadioInput 
          width='300px'
          isChecked={image==='taquin-2.png'}
          id={image}
          handleClick={()=> setImage("taquin-2.png")}
          value={<Image src={`/images/puzzles/mini-taquin-2.png`} width={200} height={200} alt={image} />}
        />
        <RadioInput 
          width='300px'
          isChecked={image==='taquin-3.png'}
          id={image}
          handleClick={()=> setImage("taquin-3.png")}
          value={<Image src={`/images/puzzles/mini-taquin-3.png`} width={200} height={200} alt={image} />}
        />
        <RadioInput 
          width='300px'
          isChecked={image==='taquin-4.png'}
          id={image}
          handleClick={()=> setImage("taquin-4.png")}
          value={<Image src={`/images/puzzles/mini-taquin-4.png`} width={200} height={200} alt={image} />}
        />
      </section>
    </OptionsTaquinStyle>

  )
}

const OptionsTaquinStyle = styled.main`
  padding:20px 10px;
  width: 950px;
  height: 90vh;

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
    width: 950px;
    gap: 30px;
    flex-wrap: wrap;
  }
`

export default Options