import produce from 'immer';

import { getAverage } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  average: {},
};

const averageReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getAverage.REQUEST:
        draft.loading = true;

        break;

      case getAverage.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.average = payload;

        break;

      case getAverage.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;
    }
  });

export default averageReducer;
