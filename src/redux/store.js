import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import tableReducer from './tableReducer';

const reducers = combineReducers({
  table: tableReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
