import PropTypes from 'prop-types';
import style from './Table.module.scss';
import TableGroup from './TableGroup';

const Table = ({
  tableDataFiltered,
  isTableOpen,
  markTableOpen,
  markTableClose,
}) => {
  if (
    tableDataFiltered[0]?.parent === null &&
    tableDataFiltered[0]?.parent !== undefined
  ) {
    return (
      <TableGroup
        tableDataFiltered={tableDataFiltered}
        isTableOpen={isTableOpen}
        markTableOpen={markTableOpen}
        markTableClose={markTableClose}
      />
    );
  }
  const tableEl = tableDataFiltered.map(car => (
    <div
      key={car.ID}
      onClick={
        isTableOpen.some(id => id === car.ID)
          ? () => markTableClose(car.ID)
          : () => markTableOpen(car.ID)
      }
    >
      <div className={style.tableRow}>
        <div className={style.tableCell}>{car.mark}</div>
        <div className={style.tableCell}>{car.model}</div>
        <div className={style.tableCell}>{car.type}</div>
        <div className={style.tableCell}>{car.year}</div>
      </div>
      {isTableOpen.some(id => id === car.ID) && (
        <div className={style.tableRowHidden}>
          <div className={style.tableRowHiddenCell}>
            <span className={style.tableRowHiddenCellHeading}>Year</span>
            {car.year}
            <span className={style.tableRowHiddenCellHeading}>Options</span>
            {car.option}
          </div>
          <div className={style.tableRowHiddenCell}>
            <span className={style.tableRowHiddenCellHeading}>Color</span>
            {car.Color}
          </div>
          <div className={style.tableRowHiddenCell}>
            <span className={style.tableRowHiddenCellHeading}>Country</span>
            {car.country}
          </div>
        </div>
      )}
    </div>
  ));
  return <div>{tableEl}</div>;
};

Table.propTypes = {
  tableDataFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.string,
      mark: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.string,
      type: PropTypes.string,
      Color: PropTypes.string,
      country: PropTypes.string,
      option: PropTypes.string,
    })
  ),
  isTableOpen: PropTypes.arrayOf(PropTypes.string),
  markTableOpen: PropTypes.func,
  markTableClose: PropTypes.func,
};

export default Table;
