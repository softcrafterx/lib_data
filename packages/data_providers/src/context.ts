import { createContext } from "react";
import { IDataProvider } from "./types/index";

export const dataContext = createContext<Record<string, IDataProvider> | undefined>(undefined)

