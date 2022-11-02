import { useState, useEffect, useCallback } from 'react';
import {
  DailyWeather,
  HourlyWeather,
  LocationData,
  CurrentWeatherData,
  GeolocationCoordinates
} from 'types';

type UseGetData = {
  getCurrentWeather: (coordinates: GeolocationCoordinates | null) => Promise<CurrentWeatherData>;
  getDailyWeather: (coordinates: GeolocationCoordinates | null) => Promise<DailyWeather[]>;
  getHourlyWeather: (coordinates: GeolocationCoordinates | null) => Promise<HourlyWeather[]>;
  getLocation?: (coordinates: GeolocationCoordinates | null) => Promise<LocationData>;
  coordinates: GeolocationCoordinates | null;
};

const useGetData = (params: UseGetData) => {
  const { getCurrentWeather, getDailyWeather, getHourlyWeather, getLocation, coordinates } = params;
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [locationData, setLocationData] = useState<LocationData | undefined>(undefined);
  const [forecast, setForecast] = useState<DailyWeather[] | undefined>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyWeather[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getData = useCallback(async () => {
    try {
      if (getLocation) {
        const locationResult: LocationData = await getLocation(coordinates);
        setLocationData(locationResult);
      }
      const data: CurrentWeatherData = await getCurrentWeather(coordinates);
      const dailyWeather: DailyWeather[] = await getDailyWeather(coordinates);
      const hourlyWeather: HourlyWeather[] = await getHourlyWeather(coordinates);
      setCurrentWeather(data);
      setForecast(dailyWeather);
      const first24Hours: HourlyWeather[] = hourlyWeather?.slice(0, 24);
      setHourlyForecast(first24Hours);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  }, [
    coordinates,
    getCurrentWeather,
    getDailyWeather,
    getHourlyWeather,
    getLocation,
    setIsLoading
  ]);

  useEffect(() => {
    setCurrentWeather(null);
    setLocationData(undefined);
    setForecast([]);
    setHourlyForecast([]);
    setIsLoading(true);
    if (coordinates) {
      getData();
    }
  }, [coordinates, getData]);

  return {
    currentWeather,
    locationData,
    forecast,
    hourlyForecast,
    setHourlyForecast,
    isLoading,
    errorMsg
  };
};

export default useGetData;
