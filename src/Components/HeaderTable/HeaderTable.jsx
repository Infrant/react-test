import PropTypes from 'prop-types';
import Group from './Group/Group';
import Search from './Search/Search';
import Sort from './Sort/Sort';
import style from './HeaderTable.module.scss';

const HeaderTable = ({ filter, isActiveSort, setIsActiveSort, makeSort }) => {
  return (
    <div className={style.headerTableWrapper}>
      <Group />
      <Sort
        isActiveSort={isActiveSort}
        setIsActiveSort={setIsActiveSort}
        makeSort={makeSort}
      />
      <Search filter={filter} />
    </div>
  );
};

HeaderTable.propTypes = {
  isActiveSort: PropTypes.string,
  filter: PropTypes.func,
  setIsActiveSort: PropTypes.func,
  makeSort: PropTypes.func,
};

export default HeaderTable;
