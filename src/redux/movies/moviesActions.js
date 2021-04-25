import { createAction } from '@reduxjs/toolkit';

export const fetchTrendingRequest = createAction('movies/fetchTrendingRequest');
export const fetchTrendingSuccess = createAction('movies/fetchTrendingSuccess');
export const fetchTrendingError = createAction('movies/fetchTrendingError');