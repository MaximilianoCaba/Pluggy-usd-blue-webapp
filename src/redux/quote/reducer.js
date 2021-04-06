import produce from 'immer';

import { getQuote } from './actions';

export const initialState = {
  loading: false,
  fetched: false,
  error: null,
  quotes: [],
};

const quotesReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case getQuote.REQUEST:
        draft.loading = true;

        break;

      case getQuote.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.quotes = payload;

        break;

      case getQuote.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;

        break;
    }
  });

export default quotesReducer;
