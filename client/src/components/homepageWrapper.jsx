import React, { useState, useEffect, useCallback } from 'react'
import TrendingMovieList from './trendingMovieList'
import TrendingTVList from './trendingTVList'

export default function HomepageWrapper() {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)

  const [dataTV, setDataTv] = useState(null)
  const [dataIsReadyTV, setDataIsReadyTV] = useState(false)

  const getTmdbApi = useCallback(async () => {
    try {
      const response = await fetch('/api/trending')
      const json = await response.json()
      setData(json)
      setDataIsReady(true)

      const tvResponse = await fetch('/api/trendingTV')
      const tvJson = await tvResponse.json()
      setDataTv(tvJson)
      setDataIsReadyTV(true)
    } catch (e) {
      console.error(e)
    }
  })

  useEffect(() => {
    getTmdbApi()
  }, [getTmdbApi])

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)'
        }}
      >
        <div>
          <TrendingTVList data={dataTV} dataIsReady={dataIsReadyTV} />
        </div>
        <div>
          <TrendingMovieList data={data} dataIsReady={dataIsReady} />
        </div>
      </div>
    </div>
  )
}
