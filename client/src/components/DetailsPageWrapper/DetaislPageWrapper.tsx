import { getCurrentWeather, getDailyWeather, getHourlyWeather } from 'API/get';
import { Loader } from 'components/Loader/Loader';
import MainView from 'components/MainView/MainView';
import useGetData from 'hooks/useGetData';
import React, { FC } from 'react';
import { GeolocationCoordinates, LocationData } from 'types';
import styles from '../Loader/Loader.module.scss';

type DetailsPageWrapperData = {
  locationData: LocationData | undefined;
  statusMsg: string | null;
  coordinates: GeolocationCoordinates | null;
};
const DetaislPageWrapper: FC<DetailsPageWrapperData> = ({
  locationData,
  statusMsg,
  coordinates
}) => {
  const {
    currentWeather,
    forecast,
    errorMsg,
    hourlyForecast,
    setHourlyForecast,
    isLoading
  } = useGetData({ getCurrentWeather, getDailyWeather, getHourlyWeather, coordinates });

  if (isLoading) {
    return statusMsg || errorMsg ? (
      <div className={styles.loaderContainer}>{statusMsg || errorMsg}</div>
    ) : (
      <Loader />
    );
  }
  return locationData ? (
    <MainView
      setHourlyForecast={setHourlyForecast}
      statusMsg={statusMsg}
      currentWeather={currentWeather}
      locationData={locationData}
      forecast={forecast}
      hourlyForecast={hourlyForecast}
    />
  ) : null;
};

export default DetaislPageWrapper;
