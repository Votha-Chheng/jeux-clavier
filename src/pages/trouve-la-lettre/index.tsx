import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { displaySuccess } from '@/utils/displaySuccess'
import { Roboto } from 'next/font/google'
import ListLettres from '@/components/trouve-la-lettre/ListLettres'
import { letters } from '@/datas/trouve-la-lettre/letters'
import { pickRandomElement } from '@/utils/pickRandomElement'
import { removeElementWritten } from '@/utils/removeElementWritten'
import Bravo from '@/components/shared-UI/Bravo'
import IconsFooter from '@/components/shared-UI/IconsFooter'
import LettreInput from '@/components/trouve-la-lettre/LettreInput'
import { useKeyUpForLettersOnly } from '../../../hooks/useKeyUpForLettersOnly'
import OptionsPanel from '@/components/shared-UI/OptionsPanel'
import Options from '@/components/trouve-la-lettre/Options'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setShowUp } from '@/store/slices/optionsPanelSlice'
import { roboto } from '@/fonts/roboto'

const FindTheLetter: FC = () => {
  const [success, setSuccess] = useState<boolean|undefined>(undefined)
  const [end, setEnd] = useState<boolean>(false)
  const [letterInput, setLetterInput] = useState<string>("")
  const [letterModel, setLetterModel] = useState<string>("")
  const [lettersLeft, setLettersLeft] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client
  
  const LETTERS = letters
  const { typeLettre, ordreAlphabetique } = useSelector((state: RootState)=> state.trouveLaLettre)
  const { showUp } = useSelector((state: RootState)=> state.optionsPanel)
  const letterPressed =  useKeyUpForLettersOnly()
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(success !== undefined){
      null
    } else {
      setLetterInput(letterPressed)
    }
  }, [letterPressed])

  const handlePressedLetter = (letterInput: string): void=> {
    if((letterModel.toUpperCase() === letterInput.toUpperCase()) && letterInput !== "" && lettersLeft.length>0){
      displaySuccess(setSuccess, true)
      setTimeout(()=> {
        setLetterInput("")
        const newArray: string[] = removeElementWritten(lettersLeft, letterModel)
        if(newArray.length<1){
          setLettersLeft(newArray)
          setEnd(true)
        } else {
          setLettersLeft(newArray)
          setLetterModel(ordreAlphabetique ? newArray[0] : pickRandomElement(newArray) as string)
        }
      }, 2000)

    } else if((letterModel.toUpperCase() !== letterInput.toUpperCase()) && letterInput !== "" && lettersLeft.length>0){
      displaySuccess(setSuccess, false)
      setTimeout(()=> {
        setLetterInput("")
      }, 2000)
    }
  }

  useEffect(()=> {
    setLettersLeft(LETTERS)
    setLetterModel(ordreAlphabetique ? LETTERS[0] : pickRandomElement(LETTERS) as string)  
  }, [showUp])

  useEffect(()=> {
    success === undefined && handlePressedLetter(letterInput)
        
  }, [letterInput, success])

  const resetGame = ()=> {
    setEnd(false)
    setLetterInput("")
    setLettersLeft(LETTERS)
    setLetterModel(ordreAlphabetique ? LETTERS[0] : pickRandomElement(LETTERS) as string)  
  }

  if (!mounted) return null

  return (
    <MainStyle>
      <OptionsPanel  onClickHandler={()=> dispatch(setShowUp(!showUp))}>
        <Options/>
      </OptionsPanel>
      <ListLettres lettersSuccess={lettersLeft}/>
      <div>
        {
          end
          ?
          <Bravo/>
          :
          <div className='display-container'>
            <h1 className={roboto.className}>
              {typeLettre === "capitale" ? letterModel.toUpperCase() : letterModel.toLowerCase()}
            </h1>
            <div className='input-container'>
              <LettreInput typeLettres={typeLettre} letterInput={letterInput} success={success} />
            </div>
          </div>
        }
      </div>
      <IconsFooter end={end} reset={resetGame} />
    </MainStyle>
  )
}

const MainStyle = styled.main`
  margin:0 auto;
  overflow: hidden;
  min-height: 100vh;
  width:950px;

  .home-button {
    margin-top: 50px;
  }

  h1 {
    margin-top: 25px;
    color: black;
    font-size: 150px;
    text-align: center;
  }

  .display-container {
    width: 100%;

    .input-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }

  }
  
`

export default FindTheLetter