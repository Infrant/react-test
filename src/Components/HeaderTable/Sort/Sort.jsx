import { useState } from 'react';
import style from './Sort.module.scss';

const Sort = ({ isActiveSort, setIsActiveSort, makeSort }) => {
  const [sort, setSort] = useState([
    { id: '1', sortName: 'mark' },
    { id: '2', sortName: 'type' },
    { id: '3', sortName: 'year' },
  ]);

  const handleSort = event => {
    const id = event.target.dataset.id;
    const sortName = event.target.dataset.sortname;
    if (id === isActiveSort) {
      setIsActiveSort('');
      makeSort('');
    } else {
      setIsActiveSort(id);
      makeSort(sortName);
    }
  };

  const sortEl = sort.map(({ id, sortName }) => (
    <button
      data-id={id}
      data-sortname={sortName}
      key={id}
      className={`${isActiveSort === id ? style.active : ''} ${style.sortBtn}`}
      onClick={handleSort}
    >
      {sortName}
    </button>
  ));
  return (
    <div>
      <span className={style.sortHeading}>Sort by: </span>
      {sortEl}
    </div>
  );
};

export default Sort;
