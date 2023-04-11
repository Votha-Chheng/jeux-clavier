import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OptionsPanelState {
  showUp: boolean;
}

const initialState: OptionsPanelState = {
  showUp: false
}

export const optionsPanelSlice = createSlice({
  name: 'optionsPanel',
  initialState,
  reducers: {
    setShowUp: (state, action: PayloadAction<boolean>) => {
      state.showUp = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setShowUp } = optionsPanelSlice.actions

export default optionsPanelSlice.reducer