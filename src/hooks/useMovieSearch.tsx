import { useEffect, useState } from "react"
import { apiService } from "../apiService"
import { iMovie } from "../Pages/home/interface"
import axios from "axios"

export const useMovieSearch = (keyword: string, page: number) => {
  const [search, setSearch] = useState<iMovie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  useEffect(() => { setSearch([]) }, [keyword])

  useEffect(() => {
    let cancel: any
    setLoading(true)
    setError(false)

    apiService({
      method: "GET",
      url: `/search/multi`,
      params: { query: keyword, page },
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        if (res.status === 200) {
          setSearch((prev: iMovie[]) => ([...prev, ...res.data.results]));
          setLoading(false)
          setHasMore(res.data.results.length > 0)
        }
      }).catch(err => {
        if (axios.isCancel(err)) return null
        setError(true)
      }).finally(() => {
        setLoading(false)
      })

    return () => { cancel() }
  }, [keyword, page])

  return { search, loading, error, hasMore }
}