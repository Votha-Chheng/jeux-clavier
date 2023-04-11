import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ListeMotCustom {
  listeMot: string[],
  niveau: 1|3,
  nom: string
}

export interface ListeMotsCustomState {
  prenomsCustom: ListeMotCustom[];
  motsCustom: ListeMotCustom[];
}

const initialState: ListeMotsCustomState = {
  prenomsCustom: [],
  motsCustom: []
}

export const listeMotsCustomSlice = createSlice({
  name: 'listeMotsCustom',
  initialState,
  reducers: {
    setPrenomsCustom: (state, action: PayloadAction<ListeMotCustom[]>) => {
      state.prenomsCustom = action.payload
    },
    setMotsCustom: (state, action: PayloadAction<ListeMotCustom[]>) => {
      state.motsCustom = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPrenomsCustom, setMotsCustom } = listeMotsCustomSlice.actions

export default listeMotsCustomSlice.reducer