# Data Providers

## hooks

### useCreateOne

Exposes the createOne method of the provider for convenience

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

## Axios and React Query

We love axios api and React Query, here is an example of an implementation with axios

```tsx

export class ReportService implements IDataProvider{
  constructor(private client: AxiosInstance){}

  appendToken(token: string){
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  getOne(params: IGetOneParams){
    const { data } = await this.client.get<IResponseReports>('/reports', {params: {
      id: params.id
    }})

    return data
  }

  getList(params: IGetListParams){
    const { page = 0, limit = 10 } = params?.pagination ?? {}

    const { data } = await this.client.get<IResponseReports[]>('/reports', {params: {
      offset: page*limit,
      limit,
    }})

    return data
  }
}

export class RulesService implements IDataProvider{
  constructor(private client: AxiosInstance){}

  getOne(params: IGetOneParams){
    const { data }  = await this.client.get<IResponseRules>('/rules', {params :{
      name: params.filter.name
    }})

    return data
  }
}

```

Yes, there should be a single front door, but let's imagine that those microservices actually
do not have a front door.

```tsx
export const reportsClient = axios.create({
  baseURL: import.meta.env.VITE_API_REPORTS_URL
})

export const rulesClient = axios.create({
  baseURL: import.meta.env.VITE_API_RULES_URL
})

export const reportsProvider = new ReportService(reportsClient)

export const rulesProvider = new RulesService(rulesClient)

```

```tsx
const providers = {
  reportsProvider,
  rulesProvider
}

export function App(){
  return (
    <DataProvider providers={providers}>
      <ReportsTable />
    </DataProvider>
  )
}
```

```tsx
export function ReportsTable(){
  const [ pagination, setPagination ] = useState({
    page: 0,
    limit: 10
  })

  const getReports = useGetList('reportsProvider');


  const { data } = useQuery({
    queryKey: ['reports', pagination.page],
    queryFn: ()=> getReports({pagination})
  })

  return (
    <ul>
      data?.map(({id, name})=>
        <li key={id}>
          {name}
        </li>)
    </ul>
  )
}
```

```tsx
import { type ReportService } from '@/services'

const Login = ()=>{
  const login = useLogin()
  const provider = useGetProvider<ReportService>('reportsProvider')

  const { mutateAsync } = useMutation(async (payload: <{username: string; password: string;}>)=>{
    const { token } = await login(payload)

    provider.appendToken(token)
  })
  const onSubmit = (event)=>{
    event.preventDefault()
    const formData = new FormData(event.target)

    const payload = Object.fromEntries([...formData.entries()])

    mutateAsync(payload)
  }
  return (<form>
    <input name="username" >
    <input name="password" >
  </form>)
}
```
