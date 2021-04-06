import { takeLatest, put, call } from 'redux-saga/effects';
import request from 'utils/request';
import { getAverage } from './actions';
import { URL_API } from '../../constants/config';

export function* getAverageRequest() {
  try {
    yield put(getAverage.request());
    const average = yield call(request, URL_API + 'average');
    yield put(getAverage.success(average));
  } catch (err) {
    yield put(getAverage.failure(err));
  } finally {
    yield put(getAverage.fulfill());
  }
}

export default function* dataAverage() {
  yield takeLatest(getAverage.TRIGGER, getAverageRequest);
}
