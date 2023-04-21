import { arrayMots } from '@/datas/ecris-le-mot/mots';
import { prenoms } from '@/datas/ecris-le-mot/prenoms';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    getOptions: (state, action: PayloadAction<EcrisLeMotOptions>) => {
      state.options = action.payload
    },
    getCreateList: (state, action: PayloadAction<boolean>)=> {
      state.createList = action.payload
    },
    getModifyList: (state, action: PayloadAction<boolean>)=> {
      state.modifyList = action.payload
    },
    getSelectedCustomListName: (state: any, action: PayloadAction<string>) => {
      state.selectedCustomListName = action.payload
    },
    getSelectedList: (state, action: PayloadAction<{listeMotCustom :ListeMotCustom[]|undefined, customListTrue: boolean}>)=> {
      if(action.payload.customListTrue){
        const temp: ListeMotCustom[]|undefined = action.payload.listeMotCustom?.filter((listeCustomPrenom: ListeMotCustom)=> listeCustomPrenom.nom === state.selectedCustomListName)
        if(temp !== undefined && temp.length>0){
          state.selectedList = [...temp[0].listeMot]
          state.options.lengthOptions = [...temp[0].listeMot].length
        } else {
          state.selectedList = state.options.typeMot === "prénom" ? prenoms : arrayMots[(state.options?.niveauMots ?? 1)-1]
          state.options.lengthOptions = 0
        }  
      } else {
        state.selectedList = state.options.typeMot === "prénom" ? prenoms : arrayMots[(state.options?.niveauMots ?? 1)-1]
        state.options.lengthOptions = state.options.typeMot === "prénom" ? prenoms.length : arrayMots[(state.options?.niveauMots ?? 1)-1]?.length ?? []
      }

    }
  }
})

// Action creators are generated for each case reducer function
export const { getSelectedList, getCreateList, getModifyList, getOptions, getSelectedCustomListName} = ecrisLeMotSlice.actions

export default ecrisLeMotSlice.reducer