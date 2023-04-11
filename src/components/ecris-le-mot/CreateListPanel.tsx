import React, { FC } from 'react'
import styled from 'styled-components'
import CustomListComponent from './CreateListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CustomListModify from './CustomListModify';

type CreateListPanelProps = {

}

const CreateListPanel: FC<CreateListPanelProps> = ({}) => {
  const { createList, modifyList } = useSelector((state: RootState)=> state.ecrisLeMot)
  console.log(modifyList)
  const dispatch = useDispatch()

  return (
    <CreateListeMain style={{transform: `translateY(${createList || modifyList ? "0":"100vh" })`}}>
      {
        createList ? <CustomListComponent/> : null
      }
      {
        modifyList ? <CustomListModify/> : null
      }

    </CreateListeMain>
  )
}

const CreateListeMain = styled.main`
  height:calc(100vh - 5px);
  margin: 0px auto;
  width: 950px;
  position: fixed;
  left: calc((100% - 950px)/2);
  z-index: 8;
  outline: 5px solid black;
  background-color: #313638;
  transition: transform 0.55s ease-out;
  padding:15px;
  border-radius: 10px;

.back {
  position: absolute;
  bottom: 5px;
  left: 450px;

  img{
    cursor: pointer;
  }
}
`

export default CreateListPanel