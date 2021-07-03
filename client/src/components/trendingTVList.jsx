import React, { useState } from 'react'
import TrendingTV from './trendingTV'
import TrendingMovieSkeletonLoading from './trendingMovieSkeletonLoading'

export default function TrendingTVList({ data, dataIsReady }) {
  const [topTVCount] = useState([
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
      <p class="h1 text-light">Trending TV Shows</p>
      {dataIsReady ? (
        <div>
          <div className="column">
            {topTVCount.map((tv) => (
              <TrendingTV
                key={tv.id}
                value={tv.value}
                data={data}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="column">
            {topTVCount.map((movie) => (
              <TrendingMovieSkeletonLoading key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
