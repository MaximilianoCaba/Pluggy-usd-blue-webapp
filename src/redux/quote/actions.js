import { createRoutine } from 'redux-saga-routines';

import { GET_QUOTE } from '../constants';

export const getQuote = createRoutine(GET_QUOTE);
