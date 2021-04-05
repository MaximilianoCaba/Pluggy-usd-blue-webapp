import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'utils/request';

import { getChange } from './actions';

export function* getChangeRequest() {
  const BASE_URL = 'https://6e6ca4d5a522.ngrok.io/api/';

  try {
    yield put(getChange.request());

    const quotes = yield call(request, BASE_URL + 'quotes');
    const average = yield call(request, BASE_URL + 'average');
    const slippages = yield call(request, BASE_URL + 'slippage');

    yield put(getChange.success({ quotes, average, slippages }));
  } catch (err) {
    yield put(getChange.failure(err));
  } finally {
    yield put(getChange.fulfill());
  }
}

export default function* dataChange() {
  yield takeLatest(getChange.TRIGGER, getChangeRequest);
}
