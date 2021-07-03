import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import MovieDetails from './movieDetails'

export default function MovieDetailsWrapper() {
  const { id } = useParams()
  return <Fragment>{id ? <MovieDetails selectedMovie={id} /> : null}</Fragment>
}
