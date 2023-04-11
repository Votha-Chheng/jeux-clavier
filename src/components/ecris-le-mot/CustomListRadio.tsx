import React, { FC } from 'react'
import RadioInput from '../shared-UI/RadioInput'
import styled from 'styled-components'
import { Rubik } from 'next/font/google'
import { chooseCustom, getCreateList, getModifyList } from '@/store/slices/ecrisLeMotSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import SelectComponent from './SelectComponent'

type CustomListRadioProps = {

}

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const CustomListRadio: FC<CustomListRadioProps> = ({}) => {

  const { typeMot, customList } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { prenomsCustom, motsCustom } = useSelector((state: RootState)=> state.listeMotsCustom)
  const dispatch = useDispatch()

  return (
    <FieldsetStyle className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Liste de {typeMot}s : &nbsp;</legend>
      <RadioInput checkingFunction={!customList} handleClick={()=>dispatch(chooseCustom(false))} id="Par défaut" value="Par défaut" />
      {
        (prenomsCustom !== undefined || motsCustom !== undefined ) && 
        <RadioInput checkingFunction={customList} handleClick={()=>dispatch(chooseCustom(true))} id="Personalisée" value="Personnalisée" /> 
      } 
      {
        typeMot === "prénom" 
        ? <SelectComponent optionsList={prenomsCustom} disabled={prenomsCustom == undefined} title="Choisir une liste de prénoms" idForm='custom-list-prénom' />
        : <SelectComponent optionsList={motsCustom} disabled={motsCustom == undefined} title="Choisir une liste de mots" idForm='custom-list-mots' />
      }

      <button onClick={()=> dispatch(getCreateList(true))}>Créer une liste de {typeMot}s</button> 
      {
        prenomsCustom !== undefined && typeMot === "prénom" &&
        <button onClick={()=> dispatch(getModifyList(true))}>Modifier une liste de {typeMot}s</button> 
      }
      {
        motsCustom !== undefined && typeMot === "mot" &&
        <button onClick={()=> dispatch(getModifyList(true))}>Modifier une liste de {typeMot}s</button> 
      }
      
    </FieldsetStyle>
  )
}

const FieldsetStyle = styled.fieldset`
  button {
    margin: 5px 0;
  }
`

export default CustomListRadio