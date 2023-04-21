import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListeMotCustom } from "./ecrisLeMotSlice";

export interface CustomListArray {
  customPrenomsListArray : ListeMotCustom[]|undefined;
  customMotsListArray : ListeMotCustom[]|undefined;
}

const initialState : CustomListArray = {
  customPrenomsListArray : [],
  customMotsListArray : []
}

export const customListArraySlice = createSlice({
  name: 'customListArray',
  initialState,
  reducers: {
    addCustomList: (state, action: PayloadAction<{typeMots: "prénom"|"mot", listMotCustom: ListeMotCustom}> ) => {
      if(action.payload.typeMots === "prénom"){
        if(state.customPrenomsListArray !== undefined){
          state.customPrenomsListArray.push(action.payload.listMotCustom)
        } else {
          state.customPrenomsListArray = [action.payload.listMotCustom]
        }
      } else {
        if(state.customMotsListArray !== undefined){
          state.customMotsListArray.push(action.payload.listMotCustom)
        } else {
          state.customMotsListArray = [action.payload.listMotCustom]
        }
      }
    },
    deleteCustomPrenomList: (state, action: PayloadAction<ListeMotCustom[]>)=> {
      state.customPrenomsListArray = action.payload
    
    },
    deleteCustomMotsList: (state, action: PayloadAction<ListeMotCustom[]>)=> {
      state.customMotsListArray = action.payload
    },
    modifyCustomListMots: (state, action: PayloadAction<{customListArray: ListeMotCustom[]|undefined, typeMot: "prénom"|"mot"}>)=> {
      if(action.payload.typeMot === "prénom"){
        state.customPrenomsListArray = action.payload.customListArray
      } else {
        state.customMotsListArray = action.payload.customListArray
        
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addCustomList, deleteCustomPrenomList, deleteCustomMotsList, modifyCustomListMots } = customListArraySlice.actions

export default customListArraySlice.reducer