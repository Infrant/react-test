import { tableAPI } from '../api/api';

const SET_INITIALIZED = 'tableReducer/SET_INITIALIZED';
const MARK_TABLE_OPEN = 'tableReducer/MARK_TABLE_OPEN';
const MARK_TABLE_CLOSE = 'tableReducer/MARK_TABLE_CLOSE';
const FILTER = 'tableReducer/FILTER';
const SET_IS_ACTIVE_SORT = 'tableReducer/SET_IS_ACTIVE_SORT';
const SORT = 'tableReducer/SORT';

const initialStore = {
  isInitialized: false,
  tableData: [],
  tableDataFiltered: [],
  isTableOpen: [],
  isActiveSort: '',
};

const tableReducer = (store = initialStore, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...store,
        tableData: action.data,
        tableDataFiltered: action.data,
        isInitialized: true,
      };

    case MARK_TABLE_OPEN:
      return {
        ...store,
        isTableOpen: [...store.isTableOpen, action.id],
      };

    case MARK_TABLE_CLOSE:
      return {
        ...store,
        isTableOpen: store.isTableOpen.filter(id => id !== action.id),
      };

    case FILTER:
      const regExp = new RegExp(action.searchValue, 'i');
      return {
        ...store,
        isActiveSort: '',
        tableDataFiltered: store.tableData.filter(car =>
          Object.values(car).some(el => regExp.test(el))
        ),
      };

    case SORT:
      const newData = [...store.tableData];
      if (action.sortField === '') {
        return {
          ...store,
          tableDataFiltered: [...store.tableData],
        };
      }
      return {
        ...store,
        tableDataFiltered: newData.sort(function (a, b) {
          if (a[action.sortField] > b[action.sortField]) return 1;
          if (a[action.sortField] === b[action.sortField]) return 0;
          if (a[action.sortField] < b[action.sortField]) return -1;
        }),
      };

    case SET_IS_ACTIVE_SORT:
      return {
        ...store,
        isActiveSort: action.id,
      };

    default:
      return store;
  }
};

export const makeSort = sortField => ({
  type: SORT,
  sortField,
});

export const setIsActiveSort = id => ({
  type: SET_IS_ACTIVE_SORT,
  id,
});

export const filter = searchValue => ({
  type: FILTER,
  searchValue,
});

export const markTableOpen = id => ({
  type: MARK_TABLE_OPEN,
  id,
});

export const markTableClose = id => ({
  type: MARK_TABLE_CLOSE,
  id,
});

const setInitialized = data => ({
  type: SET_INITIALIZED,
  data,
});

export const initializeApp = () => dispatch => {
  tableAPI.getTableData().then(data => {
    dispatch(setInitialized(data));
  });
};

export default tableReducer;
