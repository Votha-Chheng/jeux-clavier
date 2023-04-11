import { getTypeOfWord } from '@/store/slices/ecrisLeMotSlice'
import { RootState } from '@/store/store'
import { Rubik } from 'next/font/google'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RadioInput from '../shared-UI/RadioInput'


const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const PrenomOrMot: FC = () => {
  const { typeMot } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()
  
  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Type de mots : &nbsp;</legend>
      <RadioInput checkingFunction={typeMot === "prénom" ? true:false} handleClick={()=>dispatch(getTypeOfWord("prénom"))} id="Prénoms" value="Prénoms" />
      <RadioInput checkingFunction={typeMot === "mot" ? true:false} handleClick={()=>dispatch(getTypeOfWord("mot"))} id="Mots" value="Mots" />          
    </fieldset>
  )
}

export default PrenomOrMot