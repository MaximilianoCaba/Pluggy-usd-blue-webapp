import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSlippageDomain = state => state.slippages || initialState;

const selectSlippage = () => createSelector(selectSlippageDomain, subState => subState);

export { selectSlippage, selectSlippageDomain };
