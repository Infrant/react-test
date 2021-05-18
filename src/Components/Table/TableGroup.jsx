import style from './Table.module.scss';

const TableGroup = ({
  tableDataFiltered,
  isTableOpen,
  markTableOpen,
  markTableClose,
}) => {
  const tableEl = tableDataFiltered.map(el =>
    el.children.map(car => (
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
    ))
  );
  return <div>{tableEl}</div>;
};
export default TableGroup;
