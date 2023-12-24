import { createContext, useState } from 'react'

export const StoreContext = createContext<any>({})

const StoreProvider = (props: any) => {
  const [user, setUser] = useState<{ [key: string]: any }>()

  const store = {
    app: { user, setUser },
  }

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export default StoreProvider