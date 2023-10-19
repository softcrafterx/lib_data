import { createContext } from "react";
import { IDataProvider, IDataSyncProvider } from "./types/index";

export const dataContext = createContext<Record<string, IDataProvider> | undefined>(undefined)

export const dataSyncContext = createContext<Record<string, IDataSyncProvider> | undefined>(undefined)
