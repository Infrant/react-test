import { useState } from 'react';
import style from './Search.module.scss';

const Search = ({ filter }) => {
  const [searchInput, setSearchInput] = useState('');

  const HandleInputValue = event => {
    setSearchInput(event.target.value);
    filter(event.target.value);
  };

  return (
    <input
      value={searchInput}
      onChange={HandleInputValue}
      placeholder='Find'
      className={style.inputSearch}
    />
  );
};

export default Search;
