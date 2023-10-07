import RadioInput from '@/components/shared-UI/RadioInput'
import { roboto } from '@/fonts/roboto'
import { rubik } from '@/fonts/rubik'
import { OptionsMemoryProps } from '@/pages/memory'
import React, { FC } from 'react'
import styled from 'styled-components'


const OptionsMemory : FC<OptionsMemoryProps> = ({ numberOfCards, setNumberOfCards, setProgression, progression }) => {
  return (
    <SectionStyle>
      <h1 className={rubik.className + " titre-options"}>Préférences</h1>
      <h1 className={roboto.className + " label-options"}>Changement de niveau</h1>
      <div className='input-container gap'>
        <RadioInput 
          width='75px'
          isChecked={progression === "manual"}
          id="manual"
          handleClick={()=> setProgression("manual")}
          value="Manuel"
        />
        <RadioInput 
          width='75px'
          isChecked={progression === "automatic"}
          id="automatic"
          handleClick={()=> setProgression("automatic")}
          value="Automatique"
        />
      </div>
      <h1 className={roboto.className + " label-options"}>Nombre de cartes</h1>
      <div className='input-container'>
        <RadioInput 
          width='75px'
          isChecked={numberOfCards === 12}
          id="12"
          handleClick={()=> setNumberOfCards(12)}
          value="12"
        />
        <RadioInput 
          width='75px'
          isChecked={numberOfCards === 16}
          id="16"
          handleClick={()=> setNumberOfCards(16)}
          value="16"
        />
        <RadioInput 
          width='75px'
          isChecked={numberOfCards === 20}
          id="20"
          handleClick={()=> setNumberOfCards(20)}
          value="20"
        />
        <RadioInput 
          width='75px'
          isChecked={numberOfCards === 24}
          id="24"
          handleClick={()=> setNumberOfCards(24)}
          value="24"
        />
      </div>
    </SectionStyle>
  )
}

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  h1{
    text-align: center;
  }
  .input-container{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  .gap{
    gap: 60px;
  }
  .titre-options{
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
  }
  .label-options{
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: bold;
  }
`

export default OptionsMemory