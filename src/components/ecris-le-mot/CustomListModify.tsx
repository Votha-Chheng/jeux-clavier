import { RootState } from '@/store/store'
import { Rubik } from 'next/font/google'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import SelectComponent from './SelectComponent'
import { ListeMotCustom } from '@/store/slices/listeMotsCustom'

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"]
})

const CustomListModify: FC = () => {
  const [listeMots, setListeMots] = useState<ListeMotCustom[]>([])
  const [nomListe, setNomListe] = useState<string>("")
  const [motInput, setMotInput] = useState<string>("")

  const { typeMot } = useSelector((state: RootState)=> state.ecrisLeMot) 
  const { prenomsCustom, motsCustom } = useSelector((state: RootState)=> state.listeMotsCustom)

  const dispatch = useDispatch()

  useEffect(()=> {
    if((prenomsCustom.length>0) && (typeMot === "prénom")){
      setListeMots(prenomsCustom)
    }
    if((motsCustom !== undefined) && (typeMot === "mot")){
      setListeMots(motsCustom)
    }

  }, [typeMot, nomListe])

  return (
    <ModifyListStyle className={rubik.className}>
      <h2>Modifier une liste de {typeMot}s personnalisée existante</h2>
      {/* {
        typeMot === "prénom" &&
        <SelectComponent optionsList={listeMots} disabled={prenomsCustom === undefined} title="Choisir une liste à modifier" idForm="custom-list" />
      }
      {
        typeMot === "mot" &&
        <SelectComponent optionsList={listeMots} disabled={motsCustom === undefined} title="Choisir une liste à modifier" idForm="custom-list" />
      } */}

    </ModifyListStyle>
  )
}

const ModifyListStyle = styled.div`
  margin-top: 20px;

  h2{
    letter-spacing: 2.5px;
    color: white;
    text-align: center;
    margin: 20px auto;
  }
`

export default CustomListModify