import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Rubik } from 'next/font/google'
import { ListeMotCustom, getCreateList, getModifyList, getOptions, getSelectedCustomListName } from '@/store/slices/ecrisLeMotSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import RadioInput from '@/components/shared-UI/RadioInput'
import SelectComponent from '../SelectComponent'
import { returnNamesFromList } from '@/utils/returnNamesFromList'
import { deleteCustomMotsList, deleteCustomPrenomList } from '@/store/slices/customListArray'

const rubik = Rubik({
  weight: '400',
  subsets: ['latin']
})

const CustomListRadio: FC = () => {
  const { customMotsListArray, customPrenomsListArray } = useSelector((state: RootState)=> state.customListArray)
  const { options, selectedCustomListName, selectedList } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { typeMot, customListTrue } = options

  const dispatch = useDispatch()

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>)=> {
    dispatch(getSelectedCustomListName(event.target.value))
  }

  const deleteList = (selectedNameList: string, customListArray: ListeMotCustom[]|undefined): void=> {
    const id = customListArray?.find((listmotsCustom: ListeMotCustom)=> listmotsCustom.nom === selectedNameList)?.id ?? ""
    if(id !== "") {
      const newCustomList = customListArray?.filter((listCustom: ListeMotCustom)=> listCustom.id === id) ?? []

      if(newCustomList.length>0){
        typeMot === "prénom" ? dispatch(deleteCustomPrenomList(newCustomList)) : dispatch(deleteCustomMotsList(newCustomList))
      } else {
        typeMot === "prénom" ? dispatch(deleteCustomPrenomList([])) : dispatch(deleteCustomMotsList([]))
        dispatch(getOptions({...options, customListTrue: false}))
      }
    }
  
    dispatch(getSelectedCustomListName(""))
  }

  return (
    <FieldsetStyle className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Liste de {typeMot}s : &nbsp;</legend>
      <RadioInput 
        handleClick={()=> dispatch(getOptions({...options, customListTrue: false}))}
        isChecked={!customListTrue}
        id="Par défaut" 
        value="Par défaut" 
      />

      <RadioInput 
        isChecked={customListTrue} 
        handleClick={()=>{dispatch(getOptions({...options, customListTrue: true}))}} 
        id="Personalisée" 
        value="Personnalisée" 
        disabled={(
          (typeMot === "prénom") && (customPrenomsListArray !== undefined && customPrenomsListArray.length<1) ) || ((typeMot === "mot") && (customMotsListArray !== undefined && customMotsListArray.length<1)
        )}
      /> 
      
      <button onClick={()=> dispatch(getCreateList(true))}>Créer une liste de {typeMot}s</button> 

      {
        (customPrenomsListArray !== undefined) && (typeMot === "prénom") && (customPrenomsListArray.length>0) &&
        <button disabled={!customListTrue || selectedCustomListName === ""} onClick={()=> dispatch(getModifyList(true))}>Modifier une liste séléctionnée</button> 
      }
      {
        (customMotsListArray !== undefined) && (typeMot === "mot") && (customMotsListArray.length>0) &&
        <button onClick={()=> dispatch(getModifyList(true))}>Modifier une liste de séléctionnée</button> 
      }
      {
        (typeMot === "prénom") &&
        <button  disabled={selectedCustomListName === ""} onClick={()=> deleteList(selectedCustomListName, customPrenomsListArray)}>Suppimer la liste séléctionnée</button> 
      }
      {
        (typeMot === "mot") &&
        <button  disabled={selectedCustomListName === ""} onClick={()=> deleteList(selectedCustomListName, customMotsListArray)}>Suppimer la liste séléctionnée</button> 
      }
      
      <h3 className={`${rubik.className}`}>Liste sélectionnée :</h3>
      <SelectComponent
        arrayListsName={typeMot ==="prénom" ? returnNamesFromList(customPrenomsListArray) : returnNamesFromList(customMotsListArray) } 
        disabled={typeMot==="prénom" ? ((customPrenomsListArray == undefined) || (!customListTrue)) : ((customMotsListArray == undefined) || (!customListTrue))} 
        title={`Choisir une liste de ${typeMot}s`}
        idForm='custom-list-prénom'
        handleChangeFunction={handleChangeSelect}
      />      
    </FieldsetStyle>
  )
}

const FieldsetStyle = styled.fieldset`
  h3{
    font-size: 13.5px;
    margin: 20px 0 5px;
    font-weight: bold;
  }
  button {
    margin: 5px 0;
  }
`

export default CustomListRadio