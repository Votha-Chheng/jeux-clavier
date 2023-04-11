import React, { FC } from 'react'
import RadioInput from '../shared-UI/RadioInput'
import { Rubik } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getNiveauMots, getUppercase } from '@/store/slices/ecrisLeMotSlice'

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const NiveauMots: FC = () => {
  const { niveauMots } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()

  const handleClickForNiveau = (niveau: number)=> {
    dispatch(getNiveauMots(niveau))
    dispatch(getUppercase(false))
  }
  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Niveau des mots : &nbsp;</legend>
      <RadioInput checkingFunction={niveauMots === 1 ? true:false} handleClick={()=>dispatch(getNiveauMots(1))} id="1" value= "1" />
      <RadioInput checkingFunction={niveauMots === 2 ? true:false} handleClick={()=>dispatch(getNiveauMots(2))} id="2" value="2" />    
      <RadioInput checkingFunction={niveauMots === 3 ? true:false} handleClick={()=>handleClickForNiveau(3)} id="3" value="3 (contient des é, è)" />    
      <RadioInput checkingFunction={niveauMots === 4 ? true:false} handleClick={()=>dispatch(getNiveauMots(4))} id="4" value="4 (contient des é, è, ç)" />    
    </fieldset>
  )
}

export default NiveauMots