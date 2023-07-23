import RadioInput from '@/components/shared-UI/RadioInput'
import { rubik } from '@/fonts/rubik'
import { getOptions } from '@/store/slices/ecrisLeMotSlice'
import { RootState } from '@/store/store'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const ListType: FC = () => {
  const { customListArray } = useSelector((state: RootState)=> state.customListArray)
  const { options, selectedCustomListName } = useSelector((state: RootState)=> state.ecrisLeMot)
  const { customListTrue } = options
  
  const dispatch = useDispatch()

  return (
    <FieldsetStyle className='options-container'>
      <legend className={`${rubik.className} legend`}> &nbsp; Type de liste : &nbsp;</legend>

      <RadioInput 
        handleClick={()=> dispatch(getOptions({...options, customListTrue: false}))}
        isChecked={!customListTrue || !selectedCustomListName}
        id="Par défaut" 
        value="Par défaut" 
      />

      <RadioInput 
        isChecked={customListTrue} 
        handleClick={()=>{dispatch(getOptions({...options, customListTrue: true}))}} 
        id="Personalisée" 
        value="Personnalisée" 
        disabled={!selectedCustomListName || customListArray.length<1 || !customListArray}
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

export default ListType