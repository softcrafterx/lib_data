import { useContext, useMemo } from 'react';
import { dataContext } from '../context';
import { IDataProvider, IDataSyncProvider, IGetListParams, IGetOneParams, Meta } from '../types';

class NotImplementError extends Error {
  constructor(methodName: string, resource = '') {
    super(`${methodName} method not implemented in resource ${resource}`);
  }
}

export function useGetProvider<T extends IDataProvider = IDataProvider>(
  resource: string
) {
  const context = useContext(dataContext);

  
  const provider = useMemo(() => {
    if (!context.providers)
      throw new Error('No data providers created or context not provided');

    return context.providers[resource]
  }, [resource]);


  if (!provider)
    throw new Error(`Provider with ${resource} name does not exist`);

  return provider as T;
}

export function useSyncGetProvider<T extends IDataSyncProvider = IDataSyncProvider>(
  resource: string
) {
  const context = useContext(dataContext);

 

  const provider = useMemo(() => {
    if (!context.syncProviders)
      throw new Error('No data providers created or context not provided');

    return context.syncProviders[resource]
  }, [resource]);

  if (!provider)
    throw new Error(`Provider with ${resource} name does not exist`);

  return provider as T;
}

export function useGetOne<T = any>(
  resource: string,
  options?: { payload?: IGetOneParams; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (innerPayload?: IGetOneParams, meta?: Meta): Promise<T> => {
    if (!provider.getOne) throw new NotImplementError('getOne', resource);

    return await provider.getOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useSyncGetOne<T = any>(
  resource: string,
  options?: { payload?: IGetOneParams; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (innerPayload?: IGetOneParams, meta?: Meta) => {
    if (!provider.getOne) throw new NotImplementError('getOne', resource);

    return provider.getOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useGetList<T = any>(
  resource: string,
  options?: { payload?: IGetListParams; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (innerPayload?: IGetListParams, meta?: Meta): Promise<T[]> => {
    if (!provider.getList) throw new NotImplementError('getList', resource);

    return await provider.getList(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

/**
 * 
 *Exposes the createOne method of the provider for convenience

Let's see an example.

Imagine that you have a premium service for creating report and a free
version of it, and for premium reports is a must to pass the userId

```tsx
interface ReportPetitionCreateDTO{
  userId?: string;
  name: string;
  isComplete: boolean;
}

const AskForReportFormFree = ()=>{
  const createOne = useCreateOne<ReportPetitionCreateDTO>('report')

  const onSubmit = (event)=>{
    event.preventDefault()
    const formData = new FormData(event.target)

    const payload =  Object.fromEntries([...formData.entries()])

    createOne(payload)
  }

  return (<form onSubmit={onSubmit}>
      <input name='name' />
      <input name='isComplete' />
      <button type='submit' />
    </form>)
}

const AskForReportPremium = ()=>{
  // This hook is not part of the library, could your custom hook or
  // one provided by a lib
  const user = useUser()

  const createOne = useCreateOne<ReportPetitionCreateDTO>('report', {
    userId: user.id
  })

  const onSubmit = (event)=>{
   event.preventDefault()
    const formData = new FormData(event.target)

    const payload = Object.fromEntries([...formData.entries()])

    createOne(payload)
  }

  return (<form onSubmit={onSubmit}>
      <input name='name' />
      <input name='isComplete' />
      <button type='submit' />
    </form>)
}
```

 */

export function useCreateOne<T = any, DTO = T>(
  resource: string,
  options?: { payload?: Partial<DTO>; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    innerPayload?: Partial<DTO>,
    meta?: Meta
  ): Promise<Partial<T> | void> => {
    if (!provider.createOne) throw new NotImplementError('createOne', resource);

    return await provider.createOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useSyncCreateOne<T = any, DTO = T>(
  resource: string,
  options?: { payload?: Partial<DTO>; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    innerPayload?: Partial<DTO>,
    meta?: Meta
  ): Partial<T> | void => {
    if (!provider.createOne) throw new NotImplementError('createOne', resource);

    return provider.createOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}


export function useCreateMany<T = any, SaveDTO = T>(
  resource: string,
  options?: { payload?: Partial<SaveDTO>[]; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    innerPayload?: Partial<SaveDTO>[],
    meta?: Meta
  ): Promise<Partial<T>[] | void> => {
    if (!provider.createMany)
      throw new NotImplementError('createMany', resource);

    return await provider.createMany(
      [...(options?.payload ?? []), ...(innerPayload ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useSyncCreateMany<T = any, SaveDTO = T>(
  resource: string,
  options?: { payload?: Partial<SaveDTO>[]; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    innerPayload?: Partial<SaveDTO>[],
    meta?: Meta
  ): Partial<T>[] | void => {
    if (!provider.createMany)
      throw new NotImplementError('createMany', resource);

    return provider.createMany(
      [...(options?.payload ?? []), ...(innerPayload ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useUpdateOne<T = any, DTO = any>(
  resource: string,
  options?: { payload?: Partial<DTO>; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    innerPayload: Partial<DTO>,
    meta?: Meta
  ): Promise<Partial<T> | void> => {
    if (!provider.updateOne) throw new NotImplementError('updateOne', resource);

    return await provider.updateOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useSyncUpdateOne<T = any, DTO = any>(
  resource: string,
  options?: { payload?: Partial<DTO>; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    innerPayload: Partial<DTO>,
    meta?: Meta
  ): Partial<T> | void => {
    if (!provider.updateOne) throw new NotImplementError('updateOne', resource);

    return provider.updateOne(
      {
        ...options?.payload,
        ...innerPayload,
      },
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useUpdateMany<T = any, DTO = T>(
  resource: string,
  options?: { payload?: Partial<DTO>[]; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    payload?: Partial<DTO>[],
    meta?: Meta
  ): Promise<Partial<T>[] | void> => {
    if (!provider.updateMany)
      throw new NotImplementError('updateMany', resource);

    return await provider.updateMany(
      [...(options?.payload ?? []), ...(payload ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useSyncUpdateMany<T = any, DTO = T>(
  resource: string,
  options?: { payload?: Partial<DTO>[]; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    payload?: Partial<DTO>[],
    meta?: Meta
  ): Partial<T>[] | void => {
    if (!provider.updateMany)
      throw new NotImplementError('updateMany', resource);

    return provider.updateMany(
      [...(options?.payload ?? []), ...(payload ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}

export function useDeleteOne<T = any>(
  resource: string,
  options?: { payload?: string | number; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    payload?: string | number,
    meta?: Meta
  ): Promise<Partial<T> | void> => {
    if (!provider.deleteOne) throw new NotImplementError('deleteOne', resource);
    const data = options?.payload ?? payload;

    if (!data && data !== 0) throw new Error('id not provided');

    return await provider.deleteOne(data, { ...options?.meta, ...meta });
  };
}

export function useSyncDeleteOne<T = any>(
  resource: string,
  options?: { payload?: string | number; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    payload?: string | number,
    meta?: Meta
  ): Partial<T> | void => {
    if (!provider.deleteOne) throw new NotImplementError('deleteOne', resource);
    const data = options?.payload ?? payload;

    if (!data && data !== 0) throw new Error('id not provided');

    return provider.deleteOne(data, { ...options?.meta, ...meta });
  };
}

export function useDeleteMany<T = any>(
  resource: string,
  options?: { ids?: (string | number)[]; meta?: Meta }
) {
  const provider = useGetProvider(resource);

  return async (
    ids?: (string | number)[],
    meta?: Meta
  ): Promise<Partial<T>[] | void> => {
    if (!provider.deleteMany)
      throw new NotImplementError('deleteMany', resource);

    return await provider.deleteMany(
      [...(options?.ids ?? []), ...(ids ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}


export function useSyncDeleteMany<T = any>(
  resource: string,
  options?: { ids?: (string | number)[]; meta?: Meta }
) {
  const provider = useSyncGetProvider(resource);

  return (
    ids?: (string | number)[],
    meta?: Meta
  ): Partial<T>[] | void => {
    if (!provider.deleteMany)
      throw new NotImplementError('deleteMany', resource);

    return provider.deleteMany(
      [...(options?.ids ?? []), ...(ids ?? [])],
      {
        ...options?.meta,
        ...meta,
      }
    );
  };
}
