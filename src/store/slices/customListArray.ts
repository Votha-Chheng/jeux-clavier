import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListeMotCustom } from "./ecrisLeMotSlice";

export interface CustomListArray {
  customListArray : ListeMotCustom[];
}

const initialState : CustomListArray = {
  customListArray : []
}

export const customListArraySlice = createSlice({
  name: 'customListArray',
  initialState,
  reducers: {
    addCustomList: (state, action: PayloadAction<ListeMotCustom> ) => {
      if(state.customListArray === undefined ){
        state.customListArray = [action.payload]
      } else {
        state.customListArray.push(action.payload)
      }
      
    },
    deleteCustomList: (state, action: PayloadAction<string>)=> {
      const newList = state.customListArray.filter((listeMotsCustom: ListeMotCustom)=> listeMotsCustom.nom !== action.payload)
      state.customListArray = newList
    },
    modifyCustomList: (state, action: PayloadAction<{customListToModify: ListeMotCustom, newList: ListeMotCustom}>)=> {
      const temp = state.customListArray.find((liste: ListeMotCustom)=> liste.id === action.payload.customListToModify.id)

      if(temp !== undefined){
        const index = state.customListArray.indexOf(temp)
        state.customListArray[index] = action.payload.newList
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addCustomList, deleteCustomList, modifyCustomList } = customListArraySlice.actions

export default customListArraySlice.reducer