import { RootState } from '@/store/store'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RadioInput from '../../shared-UI/RadioInput'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { rubik } from '@/fonts/rubik'

const PrenomOrMot: FC = () => {
  const { options } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { typeMot } = options

  const dispatch = useDispatch()
  
  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Type de mots : &nbsp;</legend>
      <RadioInput isChecked={typeMot === "prénom"} handleClick={()=>dispatch(getOptions({...options, customListTrue: false, typeMot:"prénom"}))} id="Prénoms" value="Prénoms" />
      <RadioInput isChecked={typeMot === "mot"} handleClick={()=>dispatch(getOptions({...options,customListTrue: false, typeMot:"mot"}))} id="Mots" value="Mots" />          
    </fieldset>
  )
}

export default PrenomOrMot