import { Loader } from 'components/Loader/Loader';
import SearchSavedLocations from 'components/SearchSavedLocations/SearchSavedLocations';
import DarkLightThemeContext from 'contexts/ThemeContext';
import { useDebounce } from 'hooks/useDebounce';
import useGetSearchRequest from 'hooks/useGetSearchRequest';
import React, { useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveSearches } from 'redux/actionsSearch';
import { prevSearchSelector } from 'redux/searchReducer';
import styles from './SearchResultsList.module.scss';

const SearchResultslist = ({ inputValue, display, resultSelected }) => {
  const { darkMode } = useContext(DarkLightThemeContext);
  const prevSearches = useSelector(prevSearchSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedInputValue: string = useDebounce(inputValue);
  const { searchData, isLoading, setSearchData } = useGetSearchRequest(debouncedInputValue);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const target = event.target as HTMLAnchorElement;
      const location = target.href.split('/')[3];
      resultSelected();
      navigate(`/details/${location}`);
      dispatch(saveSearches(location));
      setSearchData(undefined);
    },
    [dispatch, navigate, resultSelected, setSearchData]
  );

  if (!display) return <> </>;

  return (
    <ul className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      {isLoading ? (
        <Loader className="searchContainer" />
      ) : (
        searchData?.locations?.slice(0, 10).map(({ id, name, adminArea, country }) => {
          return (
            <li className={styles.listElement} key={id}>
              <a href={id.toString()} className={styles.locationName} onMouseDown={handleClick}>
                {name}, {adminArea}, {country}
              </a>
            </li>
          );
        })
      )}
      <li>
        <div className={styles.previousSearches}>Previous searches:</div>
        <hr />
      </li>
      {prevSearches ? (
        prevSearches.map((savedSearch: string) => {
          return (
            <SearchSavedLocations
              onClick={handleClick}
              savedSearch={savedSearch}
              key={savedSearch}
            />
          );
        })
      ) : (
        <li className={styles.listElement}>
          <div className={styles.locationName}>No saved locations</div>
        </li>
      )}
    </ul>
  );
};

export default SearchResultslist;
