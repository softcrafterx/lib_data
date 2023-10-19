export type Meta = Record<string, unknown>

export interface IDataProvider<ResponseDTO = any, SaveDTO = ResponseDTO>{
  getOne?(params:IGetOneParams, meta?: Meta ): Promise<ResponseDTO>;
  getList?(params: IGetListParams, meta?: Meta): Promise<ResponseDTO[]>;
  getMany?(ids: (string | number)[], meta?: Meta): Promise<ResponseDTO[]>;
  createOne?(payload: SaveDTO, meta?: Meta): Promise<Partial<ResponseDTO> | void>;
  createMany?(payload: SaveDTO[], meta?: Meta): Promise<Partial<ResponseDTO>[] | void>;
  deleteOne?(id: string | number, meta?: Meta): Promise<ResponseDTO | void>;
  deleteMany?(ids: (string | number)[], meta?: Meta): Promise<ResponseDTO[] | void>;
  updateOne?(payload: Partial<SaveDTO>, meta?: Meta): Promise<ResponseDTO |void>;
  updateMany?(payload: Partial<SaveDTO>[], meta?: Meta): Promise<ResponseDTO[] |void>;
}

export interface IDataSyncProvider<ResponseDTO = any, SaveDTO = ResponseDTO>{
  getOne?(params:IGetOneParams, meta?: Meta ): ResponseDTO;
  getList?(params: IGetListParams, meta?: Meta): ResponseDTO[];
  getMany?(ids: (string | number)[], meta?: Meta): ResponseDTO[];
  createOne?(payload: SaveDTO, meta?: Meta): Partial<ResponseDTO> | void;
  createMany?(payload: SaveDTO[], meta?: Meta): Partial<ResponseDTO>[] | void;
  deleteOne?(id: string | number, meta?: Meta): ResponseDTO | void;
  deleteMany?(ids: (string | number)[], meta?: Meta): ResponseDTO[] | void;
  updateOne?(payload: Partial<SaveDTO>, meta?: Meta): ResponseDTO |void;
  updateMany?(payload: Partial<SaveDTO>[], meta?: Meta): ResponseDTO[] |void;
}

export interface IGetOneParams<FilterDTO = any>{
  id?: string | number;
  filter?: FilterDTO
}


export interface PaginationParams{
  page?: number;
  limit?: number;
}

export interface IGetListParams<T = any, FilterDTO = T>{
  pagination?: PaginationParams;
  sort?: Record<keyof T, 'desc' | 'asc'>;
  filter?: FilterDTO;
}
