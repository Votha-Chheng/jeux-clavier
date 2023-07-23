import React, { FC, useEffect, useState } from 'react'
import RadioInput from '../../shared-UI/RadioInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { rubik } from '@/fonts/rubik'

interface NombreDeMotsProps {
  listeTotale: string[]
}

const NombreDeMots: FC<NombreDeMotsProps> = ({ listeTotale }) => {

  const [previousLength, setPreviousLength] = useState<number>(0)

  const { options } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { lengthOptions, customListTrue } = options

  const dispatch = useDispatch()

  useEffect(()=> {
    setPreviousLength(lengthOptions)
  }, [])

  useEffect(()=> {
    changeNumberAutomatically()
  }, [listeTotale])

  const changeNumberAutomatically = ()=> {
    if(previousLength === 0){
      dispatch(getOptions({...options, lengthOptions: listeTotale.length}))
    } else if(listeTotale.length>5 && listeTotale.length < previousLength){
      dispatch(getOptions({...options, lengthOptions: Math.floor(listeTotale.length/5)*5}))
      setPreviousLength(Math.floor(listeTotale.length/5)*5)
    } else if(listeTotale.length > previousLength){
      dispatch(getOptions({...options, lengthOptions: previousLength}))
    } else {
      dispatch(getOptions({...options, lengthOptions: listeTotale.length}))
    }
  }

  const handleLengthSelection = (valueLength: number): void=> {
    if(valueLength === 0){
      dispatch(getOptions({...options, lengthOptions: listeTotale.length}))
    } else {
      dispatch(getOptions({...options, lengthOptions: valueLength}))
    }
    setPreviousLength(valueLength)
  }


  console.log(listeTotale)

  return (
    <fieldset className='options-container' disabled={listeTotale.length < 1}>
      <legend className={`${rubik.className} legend`}> &nbsp; Nombre de mots : &nbsp;</legend>
      <RadioInput 
        isChecked={(lengthOptions === listeTotale.length)} 
        handleClick={()=>handleLengthSelection(0)} 
        id="Toute la liste" 
        value={`Toute la liste (${listeTotale.length} mots)`} 
        disabled={listeTotale.length === 5 || listeTotale.length === 10 || listeTotale.length === 15 || listeTotale.length === 20}
      />
      <RadioInput isChecked={lengthOptions === 5} handleClick={()=>handleLengthSelection(5)} id="5" value={5} disabled={!listeTotale || listeTotale.length < 5} />
      <RadioInput isChecked={lengthOptions === 10} handleClick={()=>handleLengthSelection(10)} id="10" value={10} disabled={!listeTotale|| listeTotale.length < 10} />
      <RadioInput isChecked={lengthOptions === 15} handleClick={()=>handleLengthSelection(15)} id="15" value={15} disabled={!listeTotale || listeTotale.length < 15} />
      <RadioInput isChecked={lengthOptions === 20} handleClick={()=>handleLengthSelection(20)} id="20" value={20} disabled={!listeTotale || listeTotale.length < 20}/>
    </fieldset>
  )
}

export default NombreDeMots