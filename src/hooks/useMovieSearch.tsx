import { useEffect, useState } from "react"
import { apiService } from "../apiService"
import { iMovie } from "../Pages/home/interface"

export const useMovieSearch = (endPoint: string, page: number, keyword: string | undefined) => {
  const [search, setSearch] = useState<iMovie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => { setSearch([]) }, [keyword])

  useEffect(() => {
    if (keyword !== '') {
      setLoading(true)
      setError(false)
      const params: { [key: string]: string | number } = { page }
      if (keyword !== undefined) {
        params.query = keyword
      }
      apiService({ method: "GET", url: endPoint, params })
        .then(res => {
          if (res.status === 200) {
            if (endPoint === `/search/multi`) {
              setSearch((prev: iMovie[]) => ([...prev, ...res.data.results.filter((x: iMovie) => ['tv', 'movie'].includes(x.media_type) && x.poster_path !== null)]));
            } else {
              setSearch((prev: iMovie[]) => ([...prev, ...res.data.results]));
            }
            setLoading(false)
            setHasMore(res.data.results.length > 0)
          }
        }).catch(err => {
          setError(true)
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [keyword, page, endPoint])

  return { search, loading, error, setError, hasMore }
}