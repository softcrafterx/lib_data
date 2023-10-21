import React, { PropsWithChildren } from "react";
import {dataContext} from './context'
import { IDataProvider, IDataSyncProvider } from "./types/index";

interface DataProviderProps{
  providers: Record<string, IDataProvider>;
  syncProviders?: Record<string, IDataSyncProvider>;
}

export default function DataProvider({children, providers}:PropsWithChildren<DataProviderProps>){
  return (
    <dataContext.Provider value={providers}>
      {children}
    </dataContext.Provider>
  )
}
