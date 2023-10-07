import React, { PropsWithChildren } from "react";
import {dataContext} from './context'
import { IDataProvider } from "./types/index";

interface DataProviderProps{
  providers: Record<string, IDataProvider>
}

export default function DataProvider({children, providers}:PropsWithChildren<DataProviderProps>){
  return (
    <dataContext.Provider value={providers}>
      {children}
    </dataContext.Provider>
  )
}
