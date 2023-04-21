import { ListeMotCustom } from "@/store/slices/ecrisLeMotSlice"

export const returnNamesFromList = (customList: ListeMotCustom[]|undefined): string[] => {
  let finalArray: string[] = []
  finalArray = customList?.map((listeMots: ListeMotCustom)=> listeMots.nom) ?? []
  return finalArray
}