import { RootState } from '@/store/store'
import { Roboto, Rubik } from 'next/font/google'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PrenomOrMot from './PrenomOrMot'
import NombreDeMots from './NombreDeMots'
//import CustomListRadio from './CustomListRadio'
import MajusculeRadio from './MajusculeRadio'
import NiveauMots from './NiveauMots'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import CustomListRadio from './CustomListRadio'
import { rubik } from '@/fonts/rubik'


const OptionsWriteWords: FC = () => {
  const { options, selectedList } = useSelector((state: RootState)=>  state.ecrisLeMot)
  const { typeMot, customListTrue } = options

  const dispatch = useDispatch()

  useEffect(()=> {
    !customListTrue && dispatch(getOptions({...options, niveauMots : 0}))
    customListTrue && dispatch(getOptions({...options, niveauMots : 0}))
  }, [customListTrue])

  return (
    <OptionsEcrisLeMotStyle>
      <h1 className={rubik.className + " titre-options"}>Préférences</h1>
      <div className='form-container'>
        <PrenomOrMot />
        <MajusculeRadio/>
        <NombreDeMots disabled={selectedList === undefined || (selectedList !== undefined && selectedList.length<1)} />
      </div>
      <div className='form-container'>
        <CustomListRadio/>
        <NiveauMots disabled={customListTrue || typeMot === "prénom"}/>
      </div>      
      
    </OptionsEcrisLeMotStyle>
  )
}

const OptionsEcrisLeMotStyle = styled.div`
  padding-top: 50px;

  .titre-options{
    font-size: 50px;
    font-weight: bold;
    text-align: center;
  }

  .form-container {
    display: flex;
    justify-content: flex-start;
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

export default OptionsWriteWords