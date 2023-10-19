import React, { PropsWithChildren } from "react";
import { dataSyncContext } from './context'
import { IDataSyncProvider } from "./types/index";

interface DataProviderProps{
  providers: Record<string, IDataSyncProvider>
}

export default function DataProvider({children, providers}:PropsWithChildren<DataProviderProps>){
  return (
    <dataSyncContext.Provider value={providers}>
      {children}
    </dataSyncContext.Provider>
  )
}
