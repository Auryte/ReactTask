import { getLocationById } from 'API/get';
import { Loader } from 'components/Loader/Loader';
import React, { useState, useCallback, useEffect } from 'react';
import { LocationData } from 'types';
import styles from './SearchSavedLocation.module.scss';

interface SavedLocationsProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  savedSearch: string;
}
const SearchSavedLocations: React.FunctionComponent<SavedLocationsProps> = ({
  onClick,
  savedSearch
}) => {
  const [searchData, setSearchData] = useState<LocationData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getLocations = useCallback(async () => {
    try {
      const locationData = await getLocationById(savedSearch);
      setSearchData(locationData);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  }, [savedSearch]);

  useEffect(() => {
    if (savedSearch) {
      setIsLoading(true);
      getLocations();
    }
  }, [getLocations, savedSearch]);

  return (
    <div>
      {isLoading ? (
        <Loader className="searchContainer" />
      ) : errorMsg ? (
        <div>
          <p>{errorMsg}</p>
        </div>
      ) : (
        savedSearch &&
        searchData && (
          <li className={styles.listElement}>
            <a href={savedSearch} className={styles.locationName} onMouseDown={onClick}>
              {searchData?.name}, {searchData?.adminArea}, {searchData?.country}
            </a>
          </li>
        )
      )}
    </div>
  );
};

export default SearchSavedLocations;
