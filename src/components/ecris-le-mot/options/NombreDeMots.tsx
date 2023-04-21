import { Rubik } from 'next/font/google'
import React, { FC, useEffect, useState } from 'react'
import RadioInput from '../../shared-UI/RadioInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { type } from 'os'

type NombreDeMotsProps = {
  disabled: boolean;
}
const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const NombreDeMots: FC<NombreDeMotsProps> = ({disabled}) => {
  const [startLength, setStartLength] = useState<number>(0)
  const { options, selectedList, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { lengthOptions, customListTrue, typeMot } = options

  const dispatch = useDispatch()

  useEffect(()=> {

  }, [selectedCustomListName, selectedList])


  return (
    <fieldset className='options-container' disabled={disabled}>
      <legend className={`${rubik.className} legend`}> &nbsp; Nombre de mots : &nbsp;</legend>
      <RadioInput 
        isChecked={(lengthOptions === selectedList.length)} 
        handleClick={()=>dispatch(getOptions({...options, lengthOptions: selectedList.length}))} 
        id="Toute la liste" 
        value={`Toute la liste (${selectedList.length} mots)`} 
        disabled={selectedList === undefined || selectedList.length === 0}
      />
      {
        (selectedList.length>5) && (selectedList.length !== 5) && 
        <RadioInput isChecked={lengthOptions === 5} handleClick={()=>dispatch(getOptions({...options, lengthOptions: 5}))} id="5" value={5} disabled={selectedList === undefined || selectedList.length === 0} />
      }
      {
        (selectedList.length>=10) && (selectedList.length !== 10) && 
        <RadioInput isChecked={lengthOptions === 10} handleClick={()=>dispatch(getOptions({...options, lengthOptions: 10}))} id="10" value={10} disabled={selectedList === undefined || selectedList.length === 0} />
      }
      {
        (selectedList.length>=15) && (selectedList.length !== 15) && 
        <RadioInput isChecked={lengthOptions === 15} handleClick={()=>dispatch(getOptions({...options, lengthOptions: 15}))} id="15" value={15} disabled={selectedList === undefined || selectedList.length === 0} />
      }
      {
        (selectedList.length>=20) && (selectedList.length !== 20) && 
        <RadioInput isChecked={lengthOptions === 20} handleClick={()=>dispatch(getOptions({...options, lengthOptions: 20}))} id="20" value={20} disabled={selectedList === undefined || selectedList.length === 0}/>
      }
      
    </fieldset>
  )
}

export default NombreDeMots