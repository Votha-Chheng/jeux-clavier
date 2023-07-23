import { roboto } from '@/fonts/roboto';
import { rubik } from '@/fonts/rubik';
import { changeOrdreAlphabetique, changeTypeLettre } from '@/store/slices/trouveLaLettreSlice';
import { RootState } from '@/store/store';
import { Roboto, Rubik } from 'next/font/google'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

const Options: FC = () => {

  const { typeLettre, ordreAlphabetique } = useSelector((state: RootState) => state.trouveLaLettre) 

  const dispatch = useDispatch()

  return (
    <OptionsTrouveLettre>
      <h1 className={rubik.className + " titre-options"}>Préférences</h1>
      <fieldset className='options-container'>
        <legend className={`${rubik.className} legend`}> &nbsp; Type de lettres : &nbsp;</legend>
        <div className={`${roboto.className} radio`}  >
          <input readOnly type="radio" id="capitale" onClick={()=> dispatch(changeTypeLettre("capitale"))} value={typeLettre} checked={typeLettre === "capitale"}/>
          <label htmlFor="capitale">Capitale</label>
        </div>
        <div className={`${roboto.className} radio`}>
          <input readOnly type="radio" id="minuscule" onClick={()=> dispatch(changeTypeLettre("minuscule"))} value={typeLettre} checked={typeLettre === "minuscule"}/>
          <label htmlFor="minuscule">Minuscule</label>
        </div>
      </fieldset>
      <fieldset className='options-container'>
        <legend className={`${rubik.className} legend`}> &nbsp; Ordre alphabétique : &nbsp;</legend>
        <div className={`${roboto.className} radio`}  >
          <input readOnly type="radio" id="capitale" onClick={()=> dispatch(changeOrdreAlphabetique(true))} value={typeLettre} checked={ordreAlphabetique}/>
          <label htmlFor="Oui">Oui</label>
        </div>
        <div className={`${roboto.className} radio`}>
          <input readOnly type="radio" id="minuscule" onClick={()=> dispatch(changeOrdreAlphabetique(false))} value={typeLettre} checked={!ordreAlphabetique}/>
          <label htmlFor="Non">Non</label>
        </div>
      </fieldset>
    </OptionsTrouveLettre>
  )
}

const OptionsTrouveLettre = styled.div`
  padding-top: 50px;

  .titre-options{
    font-size: 50px;
    font-weight: bold;
  }

  .options-container{
    margin: 50px auto;
    width: 250px;
    padding: 7.5px;

    .legend {
      font-size:20px;
      font-weight: bold;
    }

    .radio{
      margin: 10px;

      label {
        margin-left: 10px;
      }
    }
  }
`

export default Options