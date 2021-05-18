import { tableAPI } from '../api/api';

const SET_INITIALIZED = 'tableReducer/SET_INITIALIZED';
const MARK_TABLE_OPEN = 'tableReducer/MARK_TABLE_OPEN';
const MARK_TABLE_CLOSE = 'tableReducer/MARK_TABLE_CLOSE';
const FILTER = 'tableReducer/FILTER';
const SET_IS_ACTIVE_SORT = 'tableReducer/SET_IS_ACTIVE_SORT';
const SORT = 'tableReducer/SORT';
const SET_IS_ACTIVE_GROUP = 'tableReducer/SET_IS_ACTIVE_GROUP';
const GROUP = 'tableReducer/GROUP';

const initialStore = {
  isInitialized: false,
  tableData: [],
  tableDataFiltered: [],
  isTableOpen: [],
  isActiveSort: '',
  isActiveGroup: '',
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
        isActiveGroup: '',
        tableDataFiltered: store.tableData.filter(car =>
          Object.values(car).some(el => regExp.test(el))
        ),
      };

    case SORT:
      let newData = [];
      if (store.isActiveGroup) {
        newData = [...store.tableDataFiltered];
        for (let i = 0; i < newData.length; i++) {
          newData[i].children.sort((a, b) => {
            if (a[action.sortField] > b[action.sortField]) return 1;
            if (a[action.sortField] === b[action.sortField]) return 0;
            if (a[action.sortField] < b[action.sortField]) return -1;
          });
        }
        return {
          ...store,
          tableDataFiltered: [...newData],
        };
      }

      if (action.sortField === '') {
        return {
          ...store,
          tableDataFiltered: [...store.tableData],
        };
      }

      newData = [...store.tableData];
      return {
        ...store,
        tableDataFiltered: newData.sort((a, b) => {
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

    case SET_IS_ACTIVE_GROUP:
      return {
        ...store,
        isActiveGroup: action.id,
        isActiveSort: '',
      };

    case GROUP:
      if (action.groupField === '') {
        return {
          ...store,
          tableDataFiltered: [...store.tableData],
        };
      }

      const set = Array.from(
        new Set(store.tableData.map(car => car[action.groupField]))
      );
      const parents = set.map((el, idx) =>
        Object.assign({ id: idx, name: el, parent: null })
      );
      const dataWithParent = store.tableData.map(car =>
        Object.assign(car, { parent: car[action.groupField] })
      );
      const newTableData = [...parents, ...dataWithParent];
      const tableDataTree = newTableData.filter(item => {
        item.children = newTableData.filter(i => i.parent === item.name);
        return item.parent == null;
      });
      console.log(tableDataTree);
      return {
        ...store,
        tableDataFiltered: tableDataTree,
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

export const setIsActiveGroup = id => ({
  type: SET_IS_ACTIVE_GROUP,
  id,
});

export const makeGroup = groupField => ({
  type: GROUP,
  groupField,
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
