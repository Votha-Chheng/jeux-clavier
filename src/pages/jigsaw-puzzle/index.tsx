import JigsawPuzzleFrame from '@/components/jigsaw-puzzle/JigsawPuzzleFrame'
import PiecesZone from '@/components/jigsaw-puzzle/PiecesZone'
import GameContainerLayout from '@/components/layouts/GameContainerLayout'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const JigsawPuzzle: FC = () => {
  const [nbPieces, setNbPieces] = useState<number>(9)
  const [image, setImage] = useState<string>("taquin-1.png")

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(setShowUp(false))
  }, [])

  return (
    <GameContainerLayout>
      <ScreenContainer>
        <OptionsPanel>
          <div></div>
        </OptionsPanel>
        <div className='puzzle-container'>
          <JigsawPuzzleFrame
            nbPieces={nbPieces}
            image={image}
          />
          <PiecesZone/>
        </div>
        <IconsFooter marginTop='10px' reset={()=> console.log("reset")} />
      </ScreenContainer>
    </GameContainerLayout>
  )
}

const ScreenContainer = styled.div`
  .puzzle-container {
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export default JigsawPuzzle