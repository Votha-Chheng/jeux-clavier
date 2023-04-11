import { RootState } from '@/store/store'
import { Roboto, Rubik } from 'next/font/google'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PrenomOrMot from './PrenomOrMot'
import NombreDeMots from './NombreDeMots'
import CustomListRadio from './CustomListRadio'
import MajusculeRadio from './MajusculeRadio'
import NiveauMots from './NiveauMots'
import CustomListComponent from './CreateListComponent'

type OptionsEcrisLeMotProps = {
  totaleListeMots: string[]
}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})
const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

const Options: FC<OptionsEcrisLeMotProps> = ({totaleListeMots}) => {

  const { typeMot, customList } = useSelector((state: RootState)=>  state.ecrisLeMot)

  return (
    <OptionsEcrisLeMot>
      <h1 className={rubik.className + " titre-options"}>Préférences</h1>
      <div className='form-container'>
        <PrenomOrMot />
        <CustomListRadio/>
        <NombreDeMots totaleListeMots={totaleListeMots} />

      </div>
      <div className='form-container'>
      {
        !customList && typeMot === "mot" && <NiveauMots/>
      }
        <MajusculeRadio/>
      </div>
    </OptionsEcrisLeMot>
  )
}

const OptionsEcrisLeMot = styled.div`
  padding-top: 50px;

  .titre-options{
    font-size: 50px;
    font-weight: bold;
    text-align: center;
  }

  .form-container {
    display: flex;
    flex-wrap: wrap;
  }

  .options-container{
    margin: 50px auto;
    width: 250px;
    padding: 7.5px;
    position: relative;

    .legend {
      font-size:20px;
      font-weight: bold;
    }

  }
`

export default Options