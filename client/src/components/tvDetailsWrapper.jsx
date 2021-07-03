import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import TVDetails from './tvDetails'

export default function TVDetailsWrapper() {
  const { id } = useParams()
  return <Fragment>{id ? <TVDetails selectedTv={id} /> : null}</Fragment>
}
