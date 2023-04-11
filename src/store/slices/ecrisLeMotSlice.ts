import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface EcrisLeMot {
  lengthOptions: number;
  typeMot: "prénom"|"mot";
  customList: boolean;
  listePrenomsCustom: string[];
  listeMotsCustom: string[];
  uppercase : boolean;
  niveauMots: number;
  createList: boolean;
  modifyList: boolean;
}

const initialState: EcrisLeMot = {
  lengthOptions: 10,
  typeMot: 'prénom',
  customList: false,
  listePrenomsCustom: [],
  listeMotsCustom: [],
  uppercase: true,
  niveauMots: 1,
  createList: false,
  modifyList: false
}

export const ecrisLeMotSlice = createSlice({
  name: 'ecrisLeMot',
  initialState,
  reducers: {
    getWordsListLength: (state, action: PayloadAction<number>) => {
      state.lengthOptions = action.payload
    },
    getTypeOfWord: (state, action: PayloadAction<"prénom"|"mot">) => {
      state.typeMot = action.payload
    },
    chooseCustom :(state, action: PayloadAction<boolean>) => {
      state.customList = action.payload
    },
    getListePrenomsCustom : (state, action: PayloadAction<string[]>) => {
      state.listePrenomsCustom = action.payload
    },
    getListeMotsCustom : (state, action: PayloadAction<string[]>) => {
      state.listeMotsCustom = action.payload
    },
    getUppercase : (state, action: PayloadAction<boolean>) => {
      state.uppercase = action.payload
    },
    getNiveauMots: (state, action: PayloadAction<number>)=> {
      state.niveauMots =  action.payload
    },
    getCreateList: (state, action: PayloadAction<boolean>)=> {
      state.createList = action.payload
    },
    getModifyList: (state, action: PayloadAction<boolean>)=> {
      state.modifyList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getWordsListLength, getTypeOfWord, getUppercase, getListeMotsCustom, getListePrenomsCustom, chooseCustom, getNiveauMots, getCreateList, getModifyList } = ecrisLeMotSlice.actions

export default ecrisLeMotSlice.reducer