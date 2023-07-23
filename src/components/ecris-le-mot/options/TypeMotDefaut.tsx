import RadioInput from '@/components/shared-UI/RadioInput'
import { rubik } from '@/fonts/rubik'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { RootState } from '@/store/store'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TypeMotDefaut: FC = () => {
  const [customise, setCustomise] = useState<boolean>(false)
  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { customListTrue } = options 
  const { typeMot } = options

  const dispatch = useDispatch()

  useEffect(()=> {
    setCustomise(customListTrue)
  }, [customListTrue])
  
  return (
    <fieldset className='options-container' disabled={customise && selectedCustomListName !== ""}>
      <legend className={`${rubik.className} legend`}> &nbsp; Type de mots : &nbsp;</legend>
      <RadioInput isChecked={typeMot === "prénom"} handleClick={()=>dispatch(getOptions({...options, typeMot:"prénom"}))} id="Prénoms" value="Prénoms" />
      <RadioInput isChecked={typeMot === "mot"} handleClick={()=>dispatch(getOptions({...options, typeMot:"mot"}))} id="Mots" value="Mots" />          
    </fieldset>
  )
}

export default TypeMotDefaut