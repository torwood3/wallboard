import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import './weather-icons/sass/weather-icons.min.scss';
import './WeatherItem.scss';

class WeatherItem extends Component {

  render() {
    const {icon, temp, humidity, wind, day} = this.props;
    const weatherClass = classNames(`wi wi-owm-${icon}`);
    let bgColorClass = 'weather-day '; // very-warm, warm, normal, cold, very-cold

    if (temp >= 30) {
      bgColorClass += 'very-warm';
    } else if (temp > 20 && temp < 30) {
      bgColorClass += 'warm';
    } else if (temp > 10 && temp <= 20) {
      bgColorClass += 'normal';
    } else if (temp > 0 && temp <= 10) {
      bgColorClass += 'cold';
    } else if (temp <= 0) {
      bgColorClass += 'very-cold';
    }

    return (
      <div className={classNames(bgColorClass)}>
        <h1 className="day">{day}</h1>

        <div className="weather-icon">
          <i className={weatherClass}></i>
        </div>
        <section className="weather-details">
          <div className="temp"><span className="temp-number">{temp}</span><span className="wi wi-degrees"></span></div>
          <div className="humidity"><i className="wi wi-raindrop"></i>{humidity}%</div>
          <div className="wind">
            <i className="wi wi-small-craft-advisory"></i>
            {wind}
            <span className="vel">Km/h</span>
          </div>
        </section>
      </div>
    );
  }
}

WeatherItem.propTypes = {
  icon: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
};

export default WeatherItem;
