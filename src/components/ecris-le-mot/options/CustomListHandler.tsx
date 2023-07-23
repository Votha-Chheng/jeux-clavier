import React, { ChangeEvent, FC, useEffect } from 'react'
import styled from 'styled-components'
import SelectComponent from '../SelectComponent'
import { rubik } from '@/fonts/rubik'
import { ListeMotCustom, getCreateList, getModifyList, getOptions, getSelectedCustomListName } from '@/store/slices/ecrisLeMotSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { deleteCustomList } from '@/store/slices/customListArray'

const CustomListHandler: FC = () => {
  const { customListArray } = useSelector((state: RootState)=> state.customListArray)
  const { selectedCustomListName, options } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>)=> {
    dispatch(getSelectedCustomListName(event.target.value))
  }

  const deleteCustomListSelected = (nomListe: string) => {
    if(confirm(`Voulez-vous vraiment supprimer la liste ${nomListe} ?`)){
      dispatch(deleteCustomList(nomListe))
      dispatch(getSelectedCustomListName(""))
      dispatch(getOptions({...options, customListTrue: false}))
  
      
    }
  }

  return(
    <FieldsetStyle className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Liste de mots : &nbsp;</legend>
      <div className='btn-container'>
        <button onClick={()=> dispatch(getCreateList(true))} className='optionnal' >Créer une liste de mots</button> 
        <button onClick={()=> dispatch(getModifyList(true))} disabled={selectedCustomListName === "" || customListArray.length<1} className={`${selectedCustomListName ? "optionnal":""}`} >Modifier la liste de mots sélectionnée</button> 
        <button onClick={()=> deleteCustomListSelected(selectedCustomListName)} disabled={selectedCustomListName === "" || customListArray.length<1} className={`${selectedCustomListName ? "optionnal":""}`}>Supprimer la liste de mots sélectionnée</button> 
      </div>

      <h3 className={`${rubik.className}`}>Liste de mots sélectionnée :</h3>
      <SelectComponent
        arrayListsName={customListArray?.map((liste: ListeMotCustom)=> liste.nom) ?? []}
        disabled={!customListArray}
        title="Aucune"
        idForm="Liste Personnalisée"
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
  .btn-container{
    display: flex;
    gap: 7.5px;
  }
  
  button {
    margin: 10px 0 0;
    height : 40px;
    cursor: pointer;
    padding: 0 5px;
    border-radius: 10px;

    &.optionnal:hover {
      background-color: yellow; 
    }
  }
`

export default CustomListHandler