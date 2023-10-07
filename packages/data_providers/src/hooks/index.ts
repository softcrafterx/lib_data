import { useContext, useMemo } from "react";
import { dataContext } from "../context";

class NotImplementError extends Error{
  constructor(methodName: string, resource = ''){
    super(`${methodName} method not implemented in resource ${resource}`)
  }
}

export function useGetProvider(resource: string){
  const context = useContext(dataContext)

  if(!context)
    throw new Error('No data providers created')

  const provider = useMemo(
    ()=>context[resource], [resource]
  )

  if(!provider)
    throw new Error(`Provider with ${resource} name does not exist`)

  return provider
}

export function useGetOne<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<T> => {
    if(!provider.getOne)
      throw new NotImplementError('getOne', resource)

    return await provider.getOne()
  }
}


export function useGetList<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<T[]> => {
    if(!provider.getList)
      throw new NotImplementError('getList', resource)

    return await provider.getList()
  }
}

export function useCreateOne<T = any, DTO= any>(resource: string, payload?: DTO){
  const provider = useGetProvider(resource)

  return async (innerPayload?: DTO): Promise<Partial<T> | void> =>{
    if(!provider.createOne)
     throw new NotImplementError('createOne', resource)

    return await provider.createOne({
      ...payload,
      ...innerPayload
    })
  }
}

export function useCreateMany<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<Partial<T>[] | void> =>{
    if(!provider.createMany)
     throw new NotImplementError('createMany', resource)

    return await provider.createMany()
  }
}

export function useUpdateOne<T = any, DTO = any>(resource: string, payload?: Partial<DTO>){
  const provider = useGetProvider(resource)

  return async (innerPayload: Partial<DTO>): Promise<Partial<T> | void> => {
    if(!provider.updateOne)
      throw new NotImplementError('updateOne', resource)

    return await provider.updateOne({
      ...payload,
      ...innerPayload
    })
  }
}


export function useUpdateMany<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<Partial<T>[] | void> =>{
    if(!provider.updateMany)
      throw new NotImplementError('updateMany', resource)
  
    return await provider.updateMany()
  }
}

export function useDeleteOne<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<Partial<T> | void> => {
    if(!provider.deleteOne)
      throw new NotImplementError('deleteOne', resource)

    return await provider.deleteOne()
  }
}


export function useDeleteMany<T = any>(resource: string){
  const provider = useGetProvider(resource)

  return async (): Promise<Partial<T>[] | void> => {
    if(!provider.deleteMany)
      throw new NotImplementError('deleteMany', resource)

    return await provider.deleteMany()
  }
}

