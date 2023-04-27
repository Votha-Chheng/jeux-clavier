import { josefinSans } from '@/fonts/josefinSans'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import Link from 'next/link'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

type CardMenuGameProps = {
  title: string;
  link: string;
}

const CardMenuGame: FC<CardMenuGameProps> = ({title, link}) => {
  const dispatch = useDispatch()

  return (
    <Link href={`/${link}`} onClick={()=> dispatch(setShowUp(true))}>
      <Card className={josefinSans.className}>
        {title}
      </Card>
    </Link>
  )
}

const Card = styled.div`
  width: 200px;
  height: 150px;
  border : 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  font-size: 20px;

  &:hover {
    background-color: yellow;
    font-size: 17.5px;
    color: green;
    transition: font-size 0.25s;
  }
    
`

export default CardMenuGame