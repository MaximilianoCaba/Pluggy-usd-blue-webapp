import { takeLatest, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import { getQuote } from './actions';
import { URL_API } from '../../constants/config';

export function* getQuoteRequest() {
  try {
    yield put(getQuote.request());
    const quotes = yield call(request, URL_API + 'quotes');
    yield put(getQuote.success(quotes));
  } catch (err) {
    yield put(getQuote.failure(err));
  } finally {
    yield put(getQuote.fulfill());
  }
}

export default function* dataQuote() {
  yield takeLatest(getQuote.TRIGGER, getQuoteRequest);
}
