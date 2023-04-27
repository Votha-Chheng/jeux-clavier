import RadioInput from '@/components/shared-UI/RadioInput';
import { rubik } from '@/fonts/rubik';
import React, { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

interface OptionsRangeAlphabetProps {
  nbLettresARanger: number;
  setNbLettresARanger: Dispatch<SetStateAction<number>>;
}

const OptionsRangeAlphabet: FC<OptionsRangeAlphabetProps> = ({nbLettresARanger, setNbLettresARanger}) => {
  const ARRAY_VALUES = [26, 20, 15, 10, 5]

  return (
    <OptionsRangeAlphabetStyle>
      <h1 className={rubik.className + " titre-options"}>Nombre de lettres à ranger :</h1>
      <section className='radio-image'>
        {
          ARRAY_VALUES.map((value: number, index: number)=> (
          <RadioInput 
            key={index}
            width={`${value===26 ? "200px":"100px"}`}
            isChecked={nbLettresARanger === value}
            id={value.toString()}
            handleClick={()=> setNbLettresARanger(value)}
            value={`${value === 26 ? "Toutes les lettres (26)" : value.toString()}`}
          />
          ))
        }
      </section>
    </OptionsRangeAlphabetStyle>
  )
}

const OptionsRangeAlphabetStyle = styled.div`
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
    margin-top: 75px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 950px;
    flex-wrap: wrap;
  }
`
export default OptionsRangeAlphabet