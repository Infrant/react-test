import { connect } from 'react-redux';
import HeaderTable from './HeaderTable';
import { filter, setIsActiveSort, makeSort } from '../../redux/tableReducer';

const mapStateToProps = store => ({
  isActiveSort: store.table.isActiveSort,
});

export default connect(mapStateToProps, { filter, setIsActiveSort, makeSort })(
  HeaderTable
);
