import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectQuoteDomain = state => state.quotes || initialState;

const selectQuote = () => createSelector(selectQuoteDomain, subState => subState);

export { selectQuote, selectQuoteDomain };
