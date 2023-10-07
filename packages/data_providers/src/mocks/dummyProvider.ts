import { IDataProvider } from "../types";

export class DummyProvider implements IDataProvider{
  getList(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  getMany(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  createOne(payload: any): Promise<void | Partial<any>> {
    throw new Error("Method not implemented.");
  }
  createMany(): Promise<void | Partial<any>[]> {
    throw new Error("Method not implemented.");
  }
  deleteOne(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteMany(): Promise<void | any[]> {
    throw new Error("Method not implemented.");
  }
  updateOne(payload: Partial<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateMany(): Promise<void | any[]> {
    throw new Error("Method not implemented.");
  }
  getOne(): Promise<any> {
      return Promise.resolve()
  }
}
