import { Rubik } from 'next/font/google'
import React, { FC } from 'react'
import RadioInput from '../shared-UI/RadioInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { getWordsListLength } from '@/store/slices/ecrisLeMotSlice'

type NombreDeMotsProps = {
  totaleListeMots: string[]
}
const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const NombreDeMots: FC<NombreDeMotsProps> = ({totaleListeMots}) => {
  const { lengthOptions } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()
  return (
    <fieldset className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Nombre de mots : &nbsp;</legend>
      <RadioInput checkingFunction={lengthOptions === totaleListeMots.length ? true:false} handleClick={()=>dispatch(getWordsListLength(totaleListeMots.length))} id="Toute la liste" value={`Toute la liste (${totaleListeMots.length} mots)`} />
      <RadioInput checkingFunction={lengthOptions === 5 ? true:false} handleClick={()=>dispatch(getWordsListLength(5))} id="5" value={5} />
      {
        (totaleListeMots.length>=10) && (totaleListeMots.length !== 10) && <RadioInput checkingFunction={lengthOptions === 10 ? true:false} handleClick={()=>dispatch(getWordsListLength(10))} id="10" value={10} />
      }
      {
        (totaleListeMots.length>=15) && (totaleListeMots.length !== 15) && <RadioInput checkingFunction={lengthOptions === 15 ? true:false} handleClick={()=>dispatch(getWordsListLength(15))} id="15" value={15} />
      }
      {
        (totaleListeMots.length>=20) && (totaleListeMots.length !== 20) && <RadioInput checkingFunction={lengthOptions === 20 ? true:false} handleClick={()=>dispatch(getWordsListLength(20))} id="20" value={20} />
      }
      
    </fieldset>
  )
}

export default NombreDeMots