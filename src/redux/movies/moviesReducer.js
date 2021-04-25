import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as actions from './moviesActions';

const moviesReducer = createReducer([], {
  [actions.fetchTrendingSuccess]: (state, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
  [actions.fetchTrendingRequest]: () => true,
  [actions.fetchTrendingSuccess]: () => false,
  [actions.fetchTrendingError]: () => false,
});

const errorReducer = createReducer(null, {});

export default combineReducers({
  movies: moviesReducer,
  loading: loadingReducer,
  error: errorReducer,
});