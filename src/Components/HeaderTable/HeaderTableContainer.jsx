import { connect } from 'react-redux';
import HeaderTable from './HeaderTable';
import {
  filter,
  setIsActiveSort,
  makeSort,
  setIsActiveGroup,
  makeGroup,
} from '../../redux/tableReducer';

const mapStateToProps = store => ({
  isActiveSort: store.table.isActiveSort,
  isActiveGroup: store.table.isActiveGroup,
});

export default connect(mapStateToProps, {
  filter,
  setIsActiveSort,
  makeSort,
  setIsActiveGroup,
  makeGroup,
})(HeaderTable);
