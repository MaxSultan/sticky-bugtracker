
import Chart from 'react-apexcharts'
import React, { Component } from 'react'
import Axios from 'axios'
import { Loader } from 'semantic-ui-react';

export default class AllBugsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        colors:['#3f5164', '#4c5358', '#101c17'],
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'Number of active bugs',
        data: []
      }],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    Axios.get(`/api/projects`)
    .then(res => this.setState({options:{xaxis:{categories: res.data.map(bug => bug.name)}}}))
    .catch(err => console.log(err))

    Axios.get('/api/projects/getBugNumbers')
    .then(res => this.setState({series: [{data: res.data}]}))
    .catch(err => console.log(err))
    this.setState({loading: false})
  }

  render() {
  return this.state.loading ? <Loader/> : <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
  }
}

