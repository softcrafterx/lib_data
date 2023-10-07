export interface IDataProvider<Response = any, DTO = any>{
  getOne?(): Promise<Response>;
  getList?(): Promise<Response[]>;
  getMany?(): Promise<Response[]>;
  createOne?(payload: DTO): Promise<Partial<Response> | void>;
  createMany?(): Promise<Partial<Response>[] | void>;
  deleteOne?(): Promise<Response | void>;
  deleteMany?(): Promise<Response[] | void>;
  updateOne?(payload: Partial<DTO>): Promise<Response |void>;
  updateMany?(): Promise<Response[] |void>;
}
