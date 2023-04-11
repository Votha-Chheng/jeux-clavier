import { ListeMotCustom } from '@/store/slices/listeMotsCustom';
import React, { FC } from 'react'

type SelectComponentProps = {
  optionsList: ListeMotCustom[];
  disabled: boolean;
  title: string;
  idForm: string
}

const SelectComponent: FC<SelectComponentProps> = ({optionsList, disabled, title, idForm}) => {
  return (
    <select id={idForm} disabled={disabled}>
      <option value="">-- {title} --</option>
      { 
        optionsList !== undefined && optionsList.map((listMots: ListeMotCustom, index: number)=> (
          <option key={index} value={listMots.nom}>{listMots.nom}</option>
        ))
      }
    </select>   
  )
}

export default SelectComponent