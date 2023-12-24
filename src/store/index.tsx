import { createContext, useState } from 'react'

export const StoreContext = createContext<any>({})

const StoreProvider = (props: any) => {
  const [favoriteMovies, setFavoriteMovies] = useState<{ [key: string]: any }>()

  const store = {
    app: { favoriteMovies, setFavoriteMovies },
  }

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export default StoreProvider