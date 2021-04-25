import { configureStore } from '@reduxjs/toolkit';

import moviesReducer from './movies/moviesReducer';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;