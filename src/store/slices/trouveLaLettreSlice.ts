import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TrouveLaLettreState {
  typeLettre: "capitale"|"minuscule";
  ordreAlphabetique: boolean;
}

const initialState: TrouveLaLettreState = {
  typeLettre: "capitale",
  ordreAlphabetique: true
}

export const trouveLaLettreSlice = createSlice({
  name: 'trouveLaLettre',
  initialState,
  reducers: {
    changeTypeLettre: (state, action: PayloadAction<"capitale"|"minuscule">) => {
      state.typeLettre = action.payload
    },
    changeOrdreAlphabetique: (state, action: PayloadAction<boolean>) => {
      state.ordreAlphabetique = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTypeLettre, changeOrdreAlphabetique } = trouveLaLettreSlice.actions

export default trouveLaLettreSlice.reducer