import React, { useState, useEffect, Fragment, useCallback } from 'react'

export default function MovieDetails({ selectedMovie }) {
  const [data, setData] = useState(null)
  const [dataIsReady, setDataIsReady] = useState(false)
  const [id] = useState(selectedMovie)

  const getTmdbApi = useCallback(async () => {
    try {
      const response = await fetch(`/api/movieDetails/${id}`)
      const json = await response.json()
      // issue: #83; docs: https://www.themoviedb.org/documentation/api/status-codes
      if (json.status_code > 1)
        throw new Error('The resource you requested could not be found.')
      setData(json)
      setDataIsReady(true)
    } catch (e) {
      console.error(e)
    }
  }, [id])

  useEffect(() => {
    getTmdbApi()
  }, [getTmdbApi])

  // component candidates:
  const getTitle = () => {
    const title = data.name
    return title
  }

  const getGenres = () => {
    const genresArray = data.genres
    const genres = genresArray.map((genreElement, index) => (
      <span key={index + 1}>{(index ? ', ' : '') + genreElement.name}</span>
    ))
    return genres
  }

  const getOverview = () => {
    const overView = data.overview
    return overView
  }

  const getVotes = () => {
    const votes = data.vote_average
    return votes
  }

  const getVoteCount = () => {
    const vote_count = data.vote_count
    return vote_count
  }

  const getPoster = () => {
    const poster = 'https://image.tmdb.org/t/p/w342' + data.poster_path
    return poster
  }

  return (
    <Fragment>
      {dataIsReady ? (
        <div className="container">
          <header border-bottom="1px" solid="#000">
            <h2
              className="display-4 mt-2 heading-line"
              id="movieDetailsLabel"
              display="inline"
            >
              {getTitle()}
            </h2>
          </header>

          <div className="row text-white">
            <div className="col-md-3 my-3">
              <img src={getPoster()} alt="poster" className="poster-width" />
            </div>
            <div className="col m-4">
              <div>
                <p className="mb-2 text-dark">{getOverview()}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 my-3">
              <strong>{getGenres()}</strong>
              <br />
              <strong>★{getVotes()}/10</strong>
              <br />
              <strong>Number of votes: </strong>
              {getVoteCount()}
              <br />
              <a
                href={`https://www.youtube.com/results?search_query=${getTitle()}+trailer`}
                className="button">
                Watch trailer
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}
