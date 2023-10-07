import { cleanup, renderHook } from '@testing-library/react'


import {afterAll, describe, expect, it, vi} from 'vitest'
import { useGetList, useGetOne, useGetProvider } from '.';

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
})
