import React, {Component, PropTypes} from 'react';
import {fetchCurrentWeather, fetchForecastWeather} from '../../actions/index';
import WeatherItem from "../WeatherItem/WeatherItem";
import {Grid} from 'semantic-ui-react';
import moment from 'moment';

import 'semantic-ui-grid/grid.min.css';
import './Weather.scss';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {weathers: []};
  }

  getStartEndDay = delta => {
    return {
      start: moment().locale('fr').add(delta, 'days').startOf('day').unix(),
      end: moment().locale('fr').add(delta, 'days').endOf('day').unix(),
      day: moment().locale('fr').add(delta, 'days').calendar().split(' ')[0]
    };
  }

  getWeatherData = ({start, end}, data) => {
    let min = 1000;
    let max = 0;
    let size = 0;
    let id = '';
    let avrTemp = 0;
    let avrHumidity = 0;
    let avrWind = 0;

    data.forEach(weather => {
      if (Number(weather.dt) >= start && Number(weather.dt) < end) {
        size++;
        avrTemp += weather.main.temp;
        avrHumidity += weather.main.humidity;
        avrWind += weather.wind.speed;

        if (weather.main.temp > max) {
          max = weather.main.temp;
        } else if (weather.main.temp > min) {
          min = weather.main.temp;
        }

        if ((weather.dt < (((start - end) / 2) + (60 * 1000) + start)) && (weather.dt > (((start - end) / 2) - (60 * 1000) + start))) {
          id = weather.weather[0].id;
        }
      }
    });

    return {
      min,
      max,
      temp: Math.round((avrTemp / size) - 273.15),
      humidity: Math.round(avrHumidity / size),
      wind: Math.round(avrWind / size),
      icon: id.toString()};
  }

  formatData = data => {
    return {
      icon: data.weather[0].id.toString(),
      temp: Math.round(data.main.temp - 273.15),
      humidity: Math.round(data.main.humidity),
      wind: Math.round(data.wind.speed)
    };
  }

  fetchData = () => {
    fetchCurrentWeather(this.props.city)
      .then(response => {
        const currentWeather = {...this.formatData(response.data), day: this.getStartEndDay(0).day};

        const weathers = this.state.weathers;
        if (this.state.weathers.length > 0) {
          weathers.shift();
          weathers.unshift(currentWeather);
        } else {
          weathers.push(currentWeather);
        }

        this.setState({weathers});
      });

    fetchForecastWeather(this.props.city)
      .then(response => {
        const dataList = response.data.list;

        const forecastWeather = [];
        for (let index = 0; index < 5; index++) {
          forecastWeather.push({...this.getWeatherData(this.getStartEndDay(index), dataList), day: this.getStartEndDay(index).day});
          if (index === 0) {
            if (this.state.weathers.length > 0) {
              forecastWeather[0] = {...forecastWeather[0], ...this.state.weathers[0]};
            } else {
              forecastWeather[0] = {...forecastWeather[0], ...this.formatData(dataList[0]), day: this.getStartEndDay(0).day};
            }
          }
        }
        this.setState({weathers: forecastWeather});
      });
  }

  componentDidMount = () => {
    this.fetchData();
    const _timer = setInterval(this.fetchData, (30 * 60 * 1000));
    this.setState({_timer});
  }

  componentWillUnmount = () => {
    clearInterval(this.state._timer);
  }

  render() {
    const weathers = this.state.weathers;
    const weatherItems = [];
    weathers.forEach((day, index) => {
      weatherItems.push(
        <Grid.Column key={index}>
          <WeatherItem key={index} {...day}/>
        </Grid.Column>
      );
    });

    return (
      <div>
        <Grid>
          <Grid.Row columns={5}>
            {weatherItems}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Weather.propTypes = {
  city: PropTypes.string.isRequired
};

export default Weather;
