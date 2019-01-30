import React, { Component } from 'react';
// import { observable, action } from 'mobx';
// import { observer, Provider } from 'mobx-react';
import { API_KEY } from './constants/WeatherApiKey'; 

class DataDisplay1 extends Component {
    
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=London,us`
      )
      .then(response => {
        if(!response.ok) {
          throw Error("Network request failed")
        }
        return response

      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          githubData: d
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
      
  }

  render() {
  console.log(this.state.githubData)
    
    if (this.state.requestFailed) return <p>We failed :( ...</p>
    if (!this.state.githubData) return <p>Loading...</p>
    return (
      <div>
        <p>loading...</p>
        {<p>{this.state.githubData.city.coord.lat}</p>}
        
      </div>
    )
  }
}


export default DataDisplay1;