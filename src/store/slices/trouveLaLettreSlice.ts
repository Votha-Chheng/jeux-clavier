import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TrouveLaLettreState {
  typeLettre: "capitale"|"minuscule"
}

const initialState: TrouveLaLettreState = {
  typeLettre: "capitale"
}

export const trouveLaLettreSlice = createSlice({
  name: 'trouveLaLettre',
  initialState,
  reducers: {
    changeTypeLettre: (state, action: PayloadAction<"capitale"|"minuscule">) => {
      state.typeLettre = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeTypeLettre } = trouveLaLettreSlice.actions

export default trouveLaLettreSlice.reducer