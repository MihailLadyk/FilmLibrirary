import { Component } from "react";

import { fetchMovieDetails } from "../services/movieApi";

const baseImageUrl = "https://image.tmdb.org/t/p/original";
const movieId = 272;

export default class ImageDemo extends Component {
  state = {
    movieData: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: false });

    fetchMovieDetails(movieId)
      .then((res) => this.setState({ movieData: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movieData, loading, error } = this.state;

    return (
      <div>
        {loading && <h3>Loading...</h3>}
        {error && <pre>{error.message || "Error"}</pre>}

        {movieData && (
          <div>
            <h2>{movieData.title}</h2>
            {movieData.backdrop_path && (
              <img
                src={baseImageUrl + movieData.backdrop_path}
                alt={movieData.title}
                width={640}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
