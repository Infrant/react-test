import { connect } from 'react-redux';
import Table from './Table';
import { markTableOpen, markTableClose } from '../../redux/tableReducer';

const MapStateToProps = store => ({
  tableDataFiltered: store.table.tableDataFiltered,
  isTableOpen: store.table.isTableOpen,
});

export default connect(MapStateToProps, { markTableOpen, markTableClose })(
  Table
);
