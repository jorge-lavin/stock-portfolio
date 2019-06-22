import React from 'react'

import { ChartLabel, LineSeriesCanvas,LineMarkSeries, FlexibleXYPlot, FlexibleWidthXYPlot, FlexibleHeightXYPlot, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries} from 'react-vis';
import _ from 'lodash';
import { Button, ButtonGroup, Col, Container, ListGroup, Row } from 'react-bootstrap'

class Fundamentals extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: []
    }

    this.handleUngrouped = this.handleUngrouped.bind(this)
    this.handleByYear = this.handleByYear.bind(this)
    this.handleByPeriod = this.handleByPeriod.bind(this)
  }
  render() {
    const { loading, dividends } = this.props;
    
    if (loading) {
      return <div>loading ...</div>
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
            <FlexibleWidthXYPlot xType="time" height={500}>
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis  />
              <YAxis  />
              <LineSeries data={this.state.data} />
            </FlexibleWidthXYPlot>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>Consecutive years: {consecutiveYears(dividends)}</ListGroup.Item>
              <ListGroup.Item>Growth rate: {growthRate(dividends)}%</ListGroup.Item>
              <ListGroup.Item>Last 5 years growth rate: {growthRate(dividends)}%</ListGroup.Item>
              <ListGroup.Item>Payout: {growthRate(dividends)}%</ListGroup.Item>
            </ListGroup>          
          </Col>
        </Row>
      </Container>
    )
  }

  handleUngrouped() {
    this.setState({data: noGrouped(this.props.dividends)});
  }

  handleByYear() {
    this.setState({data: byYear(this.props.dividends)});
  }

  handleByPeriod() {
    this.setState({data: byPeriod(this.props.dividends)});
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

const consecutiveYears = (dividends) => byYear(dividends).length

const growthRate = (dividends) => {
  if (dividends.length < 2) return NaN

  const grouped = byYear(dividends)
  console.log(grouped)
  const first = grouped[0].y
  const last = grouped[grouped.length - 1].y
  const years = grouped.length

  return parseFloat(100 * ((last/first) ** (1 / years) -1)).toFixed(2)
}

export default Fundamentals