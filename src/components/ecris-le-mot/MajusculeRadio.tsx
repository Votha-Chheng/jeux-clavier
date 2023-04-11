import React, { FC } from 'react'
import RadioInput from '../shared-UI/RadioInput'
import { Rubik } from 'next/font/google'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { getUppercase } from '@/store/slices/ecrisLeMotSlice'

type MajusculeRadioProps = {

}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const MajusculeRadio: FC<MajusculeRadioProps> = () => {

  const { uppercase, niveauMots } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()
  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Majuscules : &nbsp;</legend>
      <RadioInput checkingFunction={uppercase} handleClick={()=>dispatch(getUppercase(true))} id="Oui" value="Oui" disabled={(niveauMots === 3) || (niveauMots === 4) ? true : false} />
      <RadioInput checkingFunction={!uppercase} handleClick={()=>dispatch(getUppercase(false))} id="Non" value="Non" />    
      <figcaption>
        Les listes de mots de niveau 3 et 4 ne peuvent pas être en majuscules.
      </figcaption>      
    </fieldset>
  )
}

export default MajusculeRadio