import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import MovieDetailsWrapper from './movieDetailsWrapper'
import TVDetailsWrapper from './tvDetailsWrapper'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomepageWrapper} />
          <Route path="/movie/:id" component={MovieDetailsWrapper} />
          <Route path="/tv/:id" component={TVDetailsWrapper} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
