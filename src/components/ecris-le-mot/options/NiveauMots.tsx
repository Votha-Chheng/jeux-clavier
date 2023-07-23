import React, { FC, useEffect, useState } from 'react'
import RadioInput from '../../shared-UI/RadioInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { rubik } from '@/fonts/rubik'

const NiveauMots: FC = () => {
  const [tempLevel, setTempLevel] = useState<number>(0)
  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { niveauMots, typeMot, customListTrue } = options

  const dispatch = useDispatch()

  useEffect(() => {
    if(typeMot === "prénom"){
      dispatch(getOptions({...options, niveauMots: 0}))
    } else {
      tempLevel === 0 ? dispatch(getOptions({...options, niveauMots: 1})) : dispatch(getOptions({...options, niveauMots: tempLevel}))
    }
  
  }, [typeMot])
  

  const handleClickForNiveau = (niveau: number)=> {
    dispatch(getOptions({...options, niveauMots: niveau}))
    setTempLevel(niveau)
  }
  return (
    <fieldset className='options-container' disabled={typeMot !== "mot" || customListTrue}>
      <legend className={`${rubik.className} legend`}> &nbsp; Niveau des mots : &nbsp;</legend>
      <RadioInput isChecked={niveauMots === 1} handleClick={()=>handleClickForNiveau(1)} id="1" value= "1 (mots transparents)" />
      <RadioInput isChecked={niveauMots === 2} handleClick={()=>handleClickForNiveau(2)} id="2" value="2 (mots non-transparents)"/>    
      <RadioInput isChecked={niveauMots === 3} handleClick={()=>handleClickForNiveau(3)} id="3" value="3 (contient des é, è)" />    
      <RadioInput isChecked={niveauMots === 4} handleClick={()=>handleClickForNiveau(4)} id="4" value="4 (contient des é, è, ç)" />    
    </fieldset>
  )
}

export default NiveauMots