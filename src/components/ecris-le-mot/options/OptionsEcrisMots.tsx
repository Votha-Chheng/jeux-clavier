import { rubik } from '@/fonts/rubik'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import ListType from './ListType'
import TypeMotDefaut from './TypeMotDefaut'
import MajusculeRadio from './MajusculeRadio'
import NombreDeMots from './NombreDeMots'
import NiveauMots from './NiveauMots'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import CustomListHandler from './CustomListHandler'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'

interface OptionsEcrisLeMotProps {
  listeTotale: string[]
}

const OptionsEcrisMots: FC<OptionsEcrisLeMotProps> = ({ listeTotale }) => {

  const { customListArray } = useSelector((state: RootState)=> state.customListArray)
  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)

  const dispatch = useDispatch()

  useEffect(() => {
    if(!customListArray || customListArray.length<1){
      dispatch(getOptions({...options, customListTrue: false}))
    }
  }, [customListArray, selectedCustomListName])
  

  return (
    <OptionsEcrisLeMotStyle>
      <h1 className={rubik.className + " titre-options"}>Préférences</h1>
      <div className='form-container'>
        <ListType />
        <CustomListHandler/>
      </div>
      <div className='form-container'>
        <TypeMotDefaut/>
        <MajusculeRadio/>
        <NombreDeMots listeTotale={listeTotale} />
      </div>      
      <div className='form-container'>
        <NiveauMots/>
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
    margin: 25px auto;
    /* width: 250px; */
    padding: 7.5px;
    position: relative;

    .legend {
      font-size:20px;
      font-weight: bold;
    }

  }
`

export default OptionsEcrisMots