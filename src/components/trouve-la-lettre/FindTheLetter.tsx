import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { letters } from '../../data/letters'
import { pickRandomLetter } from '@/utils/pickRandomLetter'
import { displaySuccess } from '@/utils/displaySuccess'
import { removeLetterWritten } from '@/utils/removeLetterWritten'
import ListLettres from './components/ListLettres'
import { Inter } from 'next/font/google'
import { Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const FindTheLetter: FC = () => {
  const [success, setSuccess] = useState<boolean|undefined>(undefined)
  const [end, setEnd] = useState<boolean>(false)
  const [letterInput, setLetterInput] = useState<string>("")
  const [letterModel, setLetterModel] = useState<string>("")
  const [lettersLeft, setLettersLeft] = useState<string[]>([])
  const [mounted, setMounted] = useState(false);

  const inputLetter = useRef<HTMLInputElement>(null)
  
  const LETTERS = letters
  
  const handleChangeLetter = (event: any):void=> {
    if(event.key.length<2 && event.key.length>0 && event.key !== " "){
      setLetterInput(event.key)
    }
  }
  useEffect(() => { setMounted(true) }, []);  // avoid hydration issues - run on client

  useEffect(()=> {
    if(inputLetter.current){
      inputLetter.current.focus()
    }
  }, [])

  useEffect(()=> {
    setLettersLeft(LETTERS)
    setLetterModel(pickRandomLetter(LETTERS))  
  }, [])

  useEffect(()=> {
    if((letterModel.toUpperCase() === letterInput.toUpperCase()) && letterInput !== "" && lettersLeft.length>0){
      displaySuccess(setSuccess, true)
      setTimeout(()=> {
        setLetterInput("")
        const newArray = removeLetterWritten(lettersLeft, letterModel)
        if(newArray.length<1){
          setLettersLeft(newArray)
          setEnd(true)
        } else {
          setLettersLeft(newArray)
          setLetterModel(pickRandomLetter(newArray))
        }
      }, 2000)

    } else if((letterModel.toUpperCase() !== letterInput.toUpperCase()) && letterInput !== "" && lettersLeft.length>0){
      displaySuccess(setSuccess, false)
      setTimeout(()=> {
        setLetterInput("")
      }, 2000)
    }
        
  }, [letterInput, success])

  if (!mounted) return null

  return (
    <MainStyle>
      <ListLettres lettersSuccess={lettersLeft}/>
      {
        end
        ?
        <h1 className='bravo'>
          Bravo
        </h1>
        :
        <div className='display-container'>
          <h1 className={roboto.className}>
            {letterModel.toUpperCase()}
          </h1>
          <div className='input-container'>
            <input 
              readOnly
              maxLength={1}
              style={success === true ? {border: "15px solid green"} : success === false ? {border: "15px solid red"} : {border: "2px solid black"}}
              autoFocus={true} 
              ref={inputLetter} 
              onKeyUp={(event:any)=> success === undefined ? handleChangeLetter(event): null} 
              value={letterInput.toUpperCase()}
            />
          </div>
        </div>
      }
    </MainStyle>
  )
}

const MainStyle = styled.main`
  margin:auto;
  width:950px;
  padding:7.5px;
  overflow: hidden;
  height: 100vh;

  h1 {
    color: black;
    font-size: 150px;
    text-align: center;

    &.bravo {
      margin-top: 75px;
      color: green;
      font-size: 250px;
    }
  }

  .display-container {
    width: 100%;

    .input-container {
      width: 100%;
      display: flex;
      justify-content: center;

      input {
        font-size: 150px;
        width: 250px;
        text-align: center;
        color: #313638;
        border-radius: 10px;
        margin: 20px auto;
        outline:0;
      }
    }

  }
  
`

const Input = styled.input`
  
`

export default FindTheLetter