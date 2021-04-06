import { takeLatest, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import { getSlippage } from './actions';
import { URL_API } from '../../constants/config';

export function* getSlippageRequest() {
  try {
    yield put(getSlippage.request());
    const slippages = yield call(request, URL_API + 'slippage');
    yield put(getSlippage.success(slippages));
  } catch (err) {
    yield put(getSlippage.failure(err));
  } finally {
    yield put(getSlippage.fulfill());
  }
}

export default function* dataSlippage() {
  yield takeLatest(getSlippage.TRIGGER, getSlippageRequest);
}
