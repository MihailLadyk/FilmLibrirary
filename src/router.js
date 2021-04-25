import { lazy } from "react";

export const urls = {
  home: "/",
  movies: "/movies",
};

export const routes = [
  {
    path: urls.home,
    exact: true,
    component: lazy(() => import("./pages/HomePage")),
  },
  {
    path: urls.movies,
    exact: true,
    component: lazy(() => import("./pages/MoviesPage")),
  },
  {
    path: urls.movies + "/:movieId",
    exact: false,
    component: lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage.js")),
  },
  {
    path: urls.movies + "/:movieId" + '/cast',
    exact: false,
    component: lazy(() => import("./pages/Cast.js")),
  },
];
