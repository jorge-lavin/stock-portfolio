import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Header from './components/layouts/Header'
import NotFound from './pages/NotFound'
import IndexPage from './pages/index'

import Countries from './containers/Countries'
import Currencies from './containers/Currencies'
import Dividends from './containers/Dividends'
import Portfolios from './containers/Portfolios'
import Sectors from './containers/Sectors'
import Stocks from './containers/Stocks'


// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
  <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/countries" component={Countries} />
      <Route path="/currencies" component={Currencies} />
      <Route path="/dividends" component={Dividends} />
      <Route path="/portfolios" component={Portfolios} />
      <Route path="/sectors" component={Sectors} />
      <Route path="/stocks" component={Stocks} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Routes