import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Header from './components/layouts/Header'
import NotFound from './pages/NotFound'
import IndexPage from './pages/index'
//import PortfoliosPage from './pages/portfolios'
import StocksPage from './pages/stocks'
import DividendsPage from './pages/dividends'

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
      {/** <Route path="/portfolio" component={PortfoliosPage} />*/}
      <Route path="/stocks" component={StocksPage} />
      <Route path="/dividends" component={DividendsPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Routes