import React, { FC } from 'react';
import { DailyWeather } from 'types';
import { getSymbol } from 'utils/getWeatherSymbol';
import styles from './styles.module.scss';

interface DayForecast {
  dayWeather: DailyWeather;
  onClick: () => void;
}

const DailyWeatherCard: FC<DayForecast> = ({ dayWeather, onClick }) => {
  return (
    <div className={styles.dayWeatherBox} onClick={onClick} onKeyDown={onClick}>
      <h5>{dayWeather.date}</h5>
      <img className={styles.symbol} src={getSymbol(dayWeather.symbol)} alt={dayWeather.symbol} />
      <h2 className={styles.temperature}>{dayWeather.maxTemp}&deg;C </h2>
      <h5>{dayWeather.symbolPhrase}</h5>
    </div>
  );
};

export default DailyWeatherCard;