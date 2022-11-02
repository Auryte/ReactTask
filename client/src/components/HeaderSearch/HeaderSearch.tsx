import Button, { ButtonStyles } from 'components/Button/Button';
import Header from 'components/Header/Header';
import SearchResultslist from 'components/SearchResultsList/SearchResultsList';
import LocationContext from 'contexts/LocationContext';
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { isInputValid } from 'utils/stringCorrections';
import styles from './HeaderSearch.module.scss';

const HeaderSearch: FC = () => {
  const { setCoordinates } = useContext(LocationContext);
  const [inputValue, setInputValue] = useState<string>('');
  const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(false);

  const handleInputFocus = (): void => {
    setDisplaySearchResults(true);
  };
  const handleInputBlur = (): void => {
    setInputValue('');
    setDisplaySearchResults(false);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDisplaySearchResults(true);
    if (isInputValid(event.target.value)) {
      setInputValue(event.target.value);
    }
  };
  const handleResultSelected = () => {
    setCoordinates(null);
    setInputValue('');
    setDisplaySearchResults(false);
  };

  return (
    <Header>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <SearchResultslist
        inputValue={inputValue}
        display={displaySearchResults}
        resultSelected={handleResultSelected}
      />
      <Button type="submit" className={ButtonStyles.IconBtn}>
        <VscSearch className={styles.icon} />
      </Button>
    </Header>
  );
};

export default HeaderSearch;
