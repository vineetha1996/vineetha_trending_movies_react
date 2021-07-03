import React, { useState } from 'react'
import TrendingMovie from './trendingMovie'
import TrendingMovieSkeletonLoading from './trendingMovieSkeletonLoading'

export default function TrendingMovieList({ lang, data, dataIsReady }) {
  const [topMovieCount] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 1 },
    { id: 3, value: 2 },
    { id: 4, value: 3 },
    { id: 5, value: 4 },
    { id: 6, value: 5 },
    { id: 7, value: 6 },
    { id: 8, value: 7 },
    { id: 9, value: 8 }
  ])

  return (
    <div className="bg-dark py-2">
      <p class="h1 text-light">Trending Movies</p>
      {dataIsReady ? (
        <div className="column">
          {topMovieCount.map((movie) => (
            <TrendingMovie key={movie.id} value={movie.value} data={data} />
          ))}
        </div>
      ) : (
        <div className="column">
          {topMovieCount.map((movie) => (
            <TrendingMovieSkeletonLoading key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}
