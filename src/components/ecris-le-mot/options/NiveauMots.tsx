import React, { FC, MouseEvent, useEffect } from 'react'
import RadioInput from '../../shared-UI/RadioInput'
import { Rubik } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'

interface NiveauMotProps  {
  disabled: boolean;
}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const NiveauMots: FC<NiveauMotProps> = ({disabled}) => {
  const { options } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { niveauMots, typeMot } = options

  const dispatch = useDispatch()

  useEffect(() => {
    if(typeMot === "prénom"){
      dispatch(getOptions({...options, niveauMots: undefined}))
    } else {
      dispatch(getOptions({...options, niveauMots: 1}))
    }
  
  }, [typeMot])
  

  const handleClickForNiveau = (niveau: number)=> {
    dispatch(getOptions({...options, niveauMots: niveau}))

  }
  return (
    <fieldset className='options-container' disabled={disabled}>
      <legend className={`${rubik.className} legend`}> &nbsp; Niveau des mots : &nbsp;</legend>
      <RadioInput isChecked={niveauMots === 1} handleClick={()=>handleClickForNiveau(1)} id="1" value= "1" disabled={disabled} />
      <RadioInput isChecked={niveauMots === 2} handleClick={()=>handleClickForNiveau(2)} id="2" value="2" disabled={disabled} />    
      <RadioInput isChecked={niveauMots === 3} handleClick={()=>handleClickForNiveau(3)} id="3" value="3 (contient des é, è)" disabled={disabled} />    
      <RadioInput isChecked={niveauMots === 4} handleClick={()=>handleClickForNiveau(4)} id="4" value="4 (contient des é, è, ç)" disabled={disabled}  />    
    </fieldset>
  )
}

export default NiveauMots