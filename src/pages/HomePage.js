import { Component } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../services/movieApi";
import MovieList from "../Components/MovieList/MovieList";
import * as moviesOperations from "../redux/movies/moviesOperations";
import * as moviesSelectors from "../redux/movies/movieSelectors";
import { connect } from "react-redux";
import { Box } from "@chakra-ui/react";

class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetchTrendingMovies()
      .then((res) => this.setState({ movies: res.data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <Box margin-left="48%">
          <h1>Trending today</h1>
        </Box>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error, {error.message}</h2>}
        {movies.length > 0 && <MovieList movies={movies}></MovieList>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: moviesSelectors.getTrending(state),
  loading: moviesSelectors.getLoading(state),
});

const mapDispatchToProps = {
  fetchTrending: moviesOperations.fetchTrending,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
