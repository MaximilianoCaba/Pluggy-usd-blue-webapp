import produce from 'immer';

import { getSlippage } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  slippages: [],
};

const slippageReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getSlippage.REQUEST:
        draft.loading = true;

        break;

      case getSlippage.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.slippages = payload;

        break;

      case getSlippage.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;
    }
  });

export default slippageReducer;
