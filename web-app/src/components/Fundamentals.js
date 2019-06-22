import React from 'react'

import { ChartLabel, LineSeriesCanvas,LineMarkSeries, FlexibleXYPlot, FlexibleWidthXYPlot, FlexibleHeightXYPlot, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import _ from 'lodash';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap'

class Fundamentals extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: [],
      dividends: [
        {
          "stockId": "BME:ENG",
          "date": "2018-12-19",
          "period": 2018,
          "amount": 0.6120,
          "currencyId": "EUR" 
        },
        {
          "stockId": "BME:ENG",
          "date": "2018-07-05",
          "period": 2017,
          "amount": 0.8760,
          "currencyId": "EUR" 
        },
        {
          "stockId": "BME:ENG",
          "date": "2017-12-21",
          "period": 2017,
          "amount": 0.5840,
          "currencyId": "EUR" 
        },
        {
          "stockId": "BME:ENG",
          "date": "2017-07-05",
          "period": 2016, 
          "amount": 0.8340,
          "currencyId": "EUR" 
        }
      ]
    }

    this.handleUngrouped = this.handleUngrouped.bind(this)
    this.handleByYear = this.handleByYear.bind(this)
    this.handleByPeriod = this.handleByPeriod.bind(this)
  }
  render() {

  const stock = {
    "stockId": "BME:ENG",
    "sectorId": 1,
    "countryId": "ES"
  }
      

  
  return (
    <Container>
      <Row  className="justify-content-md-center">
        <Col md={9}>
        <ButtonGroup className='text-center'>
          <Button variant="secondary" onClick={this.handleUngrouped}>Ungrouped</Button>
          <Button variant="secondary" onClick={this.handleByYear}>Grouped by period</Button>
          <Button variant="secondary" onClick={this.handleByPeriod}>Grouped by year</Button>
        </ButtonGroup>
        <FlexibleWidthXYPlot xType="time" height={700}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis  />
          <YAxis  />
          <LineSeries data={this.state.data} />
        </FlexibleWidthXYPlot>
        </Col>
      </Row>
    </Container>
    )
  }

  handleUngrouped() {
    this.setState({data: noGrouped(this.state.dividends)});
  }

  handleByYear() {
    this.setState({data: byYear(this.state.dividends)});
  }

  handleByPeriod() {
    this.setState({data: byPeriod(this.state.dividends)});
  }
}

const noGrouped = (dividends) => dividends
  .map(dividend => ({"x": new Date(dividend.date).getTime(), "y": dividend.amount}))

const byYear = (dividends) => _.chain(dividends)
  .groupBy(d => new Date(d.date).getFullYear())
  .map((objs, key) => ({"x": new Date(key).getTime(), "y": _.sumBy(objs, 'amount')}) )
  .value()

const byPeriod = (dividends) => _.chain(dividends)
  .groupBy("period")
  .map((objs, key) => ({"x": new Date(key).getTime(), "y": _.sumBy(objs, 'amount')}) )
  .value(); 

export default Fundamentals
