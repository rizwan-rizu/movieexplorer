import { createContext, useState } from 'react'
import { iMovie } from '../Pages/home/interface'
import { getStorageItem } from '../utility'

export const StoreContext = createContext<any>({})

const StoreProvider = (props: any) => {
  const [favoriteMovies, setFavoriteMovies] = useState<iMovie[]>(getStorageItem("favoriteMovies") ? JSON.parse(getStorageItem("favoriteMovies") as string) : [])
  const [watchList, setWatchlist] = useState<iMovie[]>(getStorageItem("watchList") ? JSON.parse(getStorageItem("watchList") as string) : [])

  const store = {
    app: { favoriteMovies, setFavoriteMovies, watchList, setWatchlist },
  }

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export default StoreProvider