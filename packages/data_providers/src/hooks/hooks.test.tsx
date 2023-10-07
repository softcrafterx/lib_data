import { cleanup, renderHook } from '@testing-library/react'


import {afterAll, describe, expect, it, vi} from 'vitest'
import { useCreateOne, useGetList, useGetOne, useGetProvider } from '.';

import { DummyProvider } from '../mocks/dummyProvider';
import React, { PropsWithChildren } from 'react';
import DataProvider from '../provider';

const dummyProvider = new DummyProvider()

const WrapperWithDummy = ({ children }:PropsWithChildren)=> <DataProvider providers={{
  dummyProvider,
}}>
  {children}
</DataProvider>


afterAll(()=> cleanup())

describe('Hooks',()=>{
 
  it('useGetProvider', ()=>{
   const { result } = renderHook(()=>useGetProvider('dummyProvider'), {
    wrapper: WrapperWithDummy,
   })

   expect(result.current).toBeInstanceOf(DummyProvider)
  })

  it('useGetOne', async ()=>{
    const spy = vi.spyOn(dummyProvider, 'getOne')
      .mockImplementationOnce(()=> Promise.resolve({fakeResponse: true}))

    const { result } = renderHook(()=>useGetOne('dummyProvider')(), {
      wrapper: WrapperWithDummy,
     })

   
     expect(spy).toBeCalled()
     expect(await result.current).toEqual({fakeResponse: true})
  })

  it('useGetList', async ()=>{
    const spy = vi.spyOn(dummyProvider, 'getList')
      .mockImplementationOnce(()=> Promise.resolve([{fakeResponse: true}]))

    const { result } = renderHook(()=>useGetList('dummyProvider')(), {
      wrapper: WrapperWithDummy,
    })

   
    expect(spy).toBeCalled()

    const response = await result.current
     
    response.forEach(element => {
      expect(element).toEqual({fakeResponse: true})
    })
  })

  interface IDummyCreateOne{
    isFakeDTO:boolean;
    name: string;
  }

  it('useCreateOne', async ()=>{
    const dummyResponse = {
      isFakeDTO: true,
      name: 'dummy'
    }

    const spy = vi.spyOn(dummyProvider, 'createOne')
      .mockImplementationOnce(()=> Promise.resolve(dummyResponse))

    const { result } = renderHook(()=> {
      const createOne = useCreateOne<IDummyCreateOne>('dummyProvider', {payload: {
        isFakeDTO: true
      }})

      return createOne({
        name: 'dummy'
      })
    }, {
      wrapper: WrapperWithDummy
    })

    const response = await result.current

    expect(response).toEqual(dummyResponse)

    expect(spy).toBeCalled()

    expect(spy).toBeCalledWith(dummyResponse)
  })
})
