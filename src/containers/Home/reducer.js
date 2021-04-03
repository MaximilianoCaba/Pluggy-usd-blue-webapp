import produce from 'immer';

import { getChange } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  change: {},
};

const showcasesReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getChange.REQUEST:
        draft.loading = true;

        break;

      case getChange.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.change = payload;

        break;

      case getChange.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;
    }
  });

export default showcasesReducer;
