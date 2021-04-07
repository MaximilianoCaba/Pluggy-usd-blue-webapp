import { takeLatest, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import { getSlippage } from './actions';

export function* getSlippageRequest() {
  try {
    yield put(getSlippage.request());
    const slippages = yield call(request, process.env.NEXT_PUBLIC_URL_API + 'slippage');
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
