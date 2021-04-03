import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectChangeDomain = state => state.change || initialState;

const selectChange = () => createSelector(selectChangeDomain, subState => subState);

export { selectChange, selectChangeDomain };
