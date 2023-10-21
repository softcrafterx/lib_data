import { createContext } from "react";
import { IDataProvider, IDataSyncProvider } from "./types/index";

interface DataProviders{
  providers?: Record<string, IDataProvider>;
  syncProviders?: Record<string, IDataSyncProvider>
}

export const dataContext = createContext<DataProviders>({
  providers: undefined,
  syncProviders: undefined
})


