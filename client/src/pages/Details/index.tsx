import { getLocationById } from 'API/get';
import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GeolocationCoordinates, LocationData } from 'types';
import DetaislPageWrapper from 'components/DetailsPageWrapper/DetaislPageWrapper';
import LocationContext from 'contexts/LocationContext';

const Details: React.FC = () => {
  const { setCoordinates, statusMsg } = useContext(LocationContext);
  const { location } = useParams();
  const [locationData, setLocationData] = useState<LocationData | undefined>(undefined);
  const [detailsCoords, setDetailsCoords] = useState<GeolocationCoordinates | null>(null);

  const getLocationData = useCallback(async () => {
    try {
      if (location) {
        const searchLocationData = await getLocationById(location);
        if (searchLocationData) {
          const searchLocationCoords = {
            lat: searchLocationData?.lat,
            lon: searchLocationData?.lon
          };
          setLocationData(searchLocationData);
          setCoordinates(searchLocationCoords);
          setDetailsCoords(searchLocationCoords);
        }
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, [location, setCoordinates]);

  useEffect(() => {
    getLocationData();
  }, [getLocationData]);

  return (
    <DetaislPageWrapper
      locationData={locationData}
      statusMsg={statusMsg}
      coordinates={detailsCoords}
    />
  );
};

export default Details;
