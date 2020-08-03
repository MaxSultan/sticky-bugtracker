import React from 'react'
import ReactApexChart from 'react-apexcharts'
import Axios from 'axios'

export default class BugsByDateChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          // i need an axios call that will return a number of all bugs where the 
          // date work began is less than 7 days away from today 
            series: [{
              name: '< 1 week of work',
              data: [44, 55, 57, 56, 61, 58, 63]
            }, {
              name: '7-30 days of work',
              data: [76, 85, 101, 98, 87, 105, 91]
            }, {
              name: '30+ days of work',
              data: [35, 41, 0, 26, 45, 48, 52]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: [],
              },
              yaxis: {
                title: {
                  text: '# of bugs'
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return  val + " bugs"
                  }
                }
              }
        },
        };
    }

    componentDidMount() {
        Axios.get(`/api/projects`)
        .then(res => this.setState({options:{xaxis:{categories: res.data.map(bug => bug.name)}}}))
        .catch(err => console.log(err))
        
        Axios.get('/api/projects/bugsByDaysWorked')
        .then(res => {
            console.log(res.data)
            this.setState({series: [{data: res.data.seven_less},{data: res.data.seven_thirty},{data: res.data.thirty_more}]})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </div>
        );
    }
}
    
