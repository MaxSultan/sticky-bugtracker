
import Chart from 'react-apexcharts'
import React, { Component } from 'react'
import Axios from 'axios'

export default class AllBugsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Number of active bugs',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 33]
      }],
    }
  }

  componentDidMount() {
    Axios.get(`/api/projects`)
    .then(res => this.setState({options:{xaxis:{categories: res.data.map(bug => bug.name)}}}))
    .catch(err => console.log(err))

    Axios.get('/api/projects/getBugNumbers')
    .then(res => this.setState({series: [{data: res.data}]
    }))
    .catch(err => console.log(err))
  }

render() {
  return <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
}
}

