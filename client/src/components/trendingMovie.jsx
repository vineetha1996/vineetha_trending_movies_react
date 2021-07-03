import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function TrendingMovie({ value, data }) {
  const getPoster = () => {
    const poster =
      'https://image.tmdb.org/t/p/w342' + data.results[value].poster_path
    return poster
  }

  const getTitle = () => {
    const title = data.results[value].title
    return title
  }

  const getOverview = () => {
    const overview = ''
    return overview
  }

  const getRating = () => {
    const rating = data.results[value].vote_average
    return rating
  }

  const getRank = () => {
    const rank = value + 1
    return rank
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Row className="no-gutters">
        <Col md={5} lg={5}>
          <Card.Img variant="top" src={getPoster()} />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{getTitle()}</Card.Title>
            <Card.Text>
              <p>{getRating()}</p>
              <p>{getRank()}</p>
              <p>{getOverview()}</p>
              <a href={`/movie/${data.results[value].id}`} className="button">
                Info
              </a>
              <br/>
              <a
                href={`https://www.youtube.com/results?search_query=${data.results[value].title}+trailer`}
                className="button">
                Watch trailer
              </a>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}
