import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAverageDomain = state => state.average || initialState;

const selectAverage = () => createSelector(selectAverageDomain, subState => subState);

export { selectAverage, selectAverageDomain };
