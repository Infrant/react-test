import PropTypes from 'prop-types';
import Group from './Group/Group';
import Search from './Search/Search';
import Sort from './Sort/Sort';
import style from './HeaderTable.module.scss';

const HeaderTable = ({
  filter,
  isActiveSort,
  setIsActiveSort,
  makeSort,
  isActiveGroup,
  setIsActiveGroup,
  makeGroup,
}) => {
  return (
    <div className={style.headerTableWrapper}>
      <Group
        isActiveGroup={isActiveGroup}
        setIsActiveGroup={setIsActiveGroup}
        makeGroup={makeGroup}
      />
      <Sort
        isActiveSort={isActiveSort}
        setIsActiveSort={setIsActiveSort}
        makeSort={makeSort}
        isActiveGroup={isActiveGroup}
      />
      <Search filter={filter} />
    </div>
  );
};

HeaderTable.propTypes = {
  isActiveSort: PropTypes.string,
  isActiveGroup: PropTypes.string,
  filter: PropTypes.func,
  setIsActiveSort: PropTypes.func,
  setIsActiveGroup: PropTypes.func,
  makeSort: PropTypes.func,
  makeGroup: PropTypes.func,
};

export default HeaderTable;
