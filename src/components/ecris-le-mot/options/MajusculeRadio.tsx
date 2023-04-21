import React, { FC } from 'react'
import RadioInput from '../../shared-UI/RadioInput'
import { Rubik } from 'next/font/google'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'

type MajusculeRadioProps = {

}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const MajusculeRadio: FC<MajusculeRadioProps> = () => {

  const { options } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { uppercase } = options
  const dispatch = useDispatch()

  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Majuscules : &nbsp;</legend>
      <RadioInput isChecked={uppercase} handleClick={()=>dispatch(getOptions({...options, uppercase: true}))} id="Oui" value="Oui"/>
      <RadioInput isChecked={!uppercase} handleClick={()=>dispatch(getOptions({...options, uppercase: false}))} id="Non" value="Non" />       
    </fieldset>
  )
}

export default MajusculeRadio