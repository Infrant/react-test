import * as axios from 'axios';

const URL_PATH = '/data.json';

export const tableAPI = {
  getTableData: () => axios.get(URL_PATH).then(data => data.data),
};
