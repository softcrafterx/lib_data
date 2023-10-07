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
