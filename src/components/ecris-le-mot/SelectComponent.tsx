import { RootState } from '@/store/store';
import React, { ChangeEvent, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';

type SelectComponentProps = {
  arrayListsName: string[];
  disabled: boolean;
  title: string;
  idForm: string;
  handleChangeFunction: Function;
  value?: string;
}

const SelectComponent: FC<SelectComponentProps> = ({arrayListsName, disabled, title, idForm, handleChangeFunction, value}) => {
  const { selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const dispatch = useDispatch()

  return (
    <select value={value !== undefined ? value : selectedCustomListName} id={idForm} disabled={disabled} onChange={(event: ChangeEvent<HTMLSelectElement>)=> handleChangeFunction(event)}>
      <option value="">-- {title} --</option>
      { 
        arrayListsName !== undefined 
        ? 
        arrayListsName.map((nom: string, index: number)=> (
          <option key={index} value={nom}>{nom}</option>
        ))
        :
        null
      }
    </select>   
  )
}

export default SelectComponent