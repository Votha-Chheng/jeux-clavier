import { arrayMots } from '@/datas/ecris-le-mot/mots';
import { prenoms } from '@/datas/ecris-le-mot/prenoms';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CustomListArray } from './customListArray';

export interface EcrisLeMotOptions {
  lengthOptions: number;
  typeMot: "prénom"|"mot";
  customListTrue: boolean;
  uppercase : boolean;
  niveauMots: number;
}

export interface ListeMotCustom {
  listeMot: string[],
  nom: string,
  id: string
}

export interface EcrisLeMot {
  options: EcrisLeMotOptions;
  createList: boolean;
  modifyList: boolean;
  selectedCustomListName: string;
  selectedList : string[];
}

const initialState: EcrisLeMot = {
  options: {
    lengthOptions: 10,
    typeMot: "prénom",
    customListTrue: false,
    uppercase : true,
    niveauMots: 1,
  },  

  createList: false,
  modifyList: false,
  selectedCustomListName: '',
  selectedList: prenoms
}

export const ecrisLeMotSlice = createSlice({
  name: 'ecrisLeMot',
  initialState,
  reducers: {
    resetOptions: (state) => {
      state.options.lengthOptions = 10,
      state.options.niveauMots = 1,
      state.options.typeMot = "prénom",
      state.options.uppercase = true,
      state.options.customListTrue = false
    },
    getOptions: (state, action: PayloadAction<EcrisLeMotOptions>) => {
      state.options = action.payload
    },
    getCreateList: (state, action: PayloadAction<boolean>)=> {
      state.createList = action.payload
    },
    getModifyList: (state, action: PayloadAction<boolean>)=> {
      state.modifyList = action.payload
    },
    getSelectedCustomListName: (state: any, action: PayloadAction<string|"">) => {
      state.selectedCustomListName = action.payload
    },
    getSelectedList: (state, action: PayloadAction<string[]>)=> {
      state.selectedList = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getSelectedList, getCreateList, getModifyList, getOptions, getSelectedCustomListName, resetOptions } = ecrisLeMotSlice.actions

export default ecrisLeMotSlice.reducer