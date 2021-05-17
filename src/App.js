import { useEffect } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import './App.scss';
import HeaderTableContainer from './Components/HeaderTable/HeaderTableContainer';
import TableContainer from './Components/Table/TableContainer';
import { initializeApp } from './redux/tableReducer';

const App = ({ isInitialized, initializeApp }) => {
  useEffect(() => initializeApp(), []);
  {
    return !isInitialized ? (
      <div className='container'>
        <CircularProgress className='loader' />
      </div>
    ) : (
      <div className='container'>
        <HeaderTableContainer />
        <TableContainer />
      </div>
    );
  }
};

App.propTypes = {
  isInitialized: PropTypes.bool,
  initializeApp: PropTypes.func,
};

const mapStateToProps = store => ({
  isInitialized: store.table.isInitialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
