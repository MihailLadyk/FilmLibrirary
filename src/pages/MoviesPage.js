// import PropTypes from "prop-types";
// import { React, Component } from "react";
// import queryString from "query-string";
// import Searchbar from "../Components/Searchbar";
// import { fetchMoviesByQuery } from "../services/movieApi";
// import { Box } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { ReactPaginate } from "react-paginate";
// import $ from "jquery";

// export class CommentList extends Component {
//   static propTypes = {
//     data: PropTypes.array.isRequired,
//   };

//   render() {
//     let commentNodes = this.props.data.map(function (comment, index) {
//       return <div key={index}>{comment.comment}</div>;
//     });

//     return (
//       <div id="project-comments" className="commentList">
//         <ul>{commentNodes}</ul>
//       </div>
//     );
//   }
// }

// export default class MoviesPage extends Component {
//   state = {
//     movies: [],
//     error: null,
//     loading: false,
//     data: [],
//     offset: 0,
//   };

//   loadCommentsFromServer() {
//     $.ajax({
//       url: this.props.url,
//       data: { limit: this.props.perPage, offset: this.state.offset },
//       dataType: "json",
//       type: "GET",

//       success: (data) => {
//         this.setState({
//           data: data.comments,
//           pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
//         });
//       },

//       error: (xhr, status, err) => {
//         console.error(this.props.url, status, err.toString()); // eslint-disable-line
//       },
//     });
//   }

//   componentDidMount() {
//     this.loadCommentsFromServer();
//     const { querry } = queryString.parse(this.props.location.search);

//     if (querry) {
//       this.setState({ loading: true });
//       fetchMoviesByQuery(querry)
//         .then((res) => this.setState({ movies: res.data.results }))
//         .catch((error) => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const prevSearch = prevProps.location.search;
//     const newSearch = this.props.location.search;

//     if (prevSearch !== newSearch) {
//       const { querry } = queryString.parse(newSearch);
//       console.log(querry);
//       this.setState({ loading: true });
//       fetchMoviesByQuery(querry)
//         .then((res) => this.setState({ movies: res.data.results }))
//         .catch((error) => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleSearch = (querry) => {
//     this.props.history.push({
//       ...this.props.location,
//       search: `?querry=${querry}`,
//     });
//   };

//   handlePageClick = (data) => {
//     let selected = data.selected;
//     let offset = Math.ceil(selected * this.props.perPage);

//     this.setState({ offset: offset }, () => {
//       this.loadCommentsFromServer();
//     });
//   };
//   render() {
//     const { movies, loading, error } = this.state;
//     return (
//       <div>
//         <div>
//           <Searchbar onSearch={this.handleSearch} />
//           {loading && <h2>Loading...</h2>}
//           {error && <h2>Error, {error.message}</h2>}
//           {movies.length > 0 && (
//             <ul>
//               {movies.map((movie) => (
//                 <li key={movie.id}>
//                   <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//           <ReactPaginate
//             previousLabel={"previous"}
//             nextLabel={"next"}
//             breakLabel={"..."}
//             breakClassName={"break-me"}
//             pageCount={this.state.pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={5}
//             onPageChange={this.handlePageClick}
//             containerClassName={"pagination"}
//             activeClassName={"active"}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// MoviesPage.propTypes = {
//   history: PropTypes.object,
//   location: PropTypes.object,
// };



import PropTypes from 'prop-types';
import { Component } from "react";
import queryString from "query-string";
import Searchbar from "../Components/Searchbar";
import { fetchMoviesByQuery } from "../services/movieApi";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default class MoviesPage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    const { querry } = queryString.parse(this.props.location.search);
    if (querry) {
      this.setState({ loading: true });
      fetchMoviesByQuery(querry)
        .then((res) => this.setState({ movies: res.data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));

    }
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.search;
    const newSearch = this.props.location.search;

    if (prevSearch !== newSearch) {
      const { querry } = queryString.parse(newSearch);
      console.log(querry);
      this.setState({ loading: true });
      fetchMoviesByQuery(querry)
        .then((res) => this.setState({ movies: res.data.results }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearch = (querry) => {
    this.props.history.push({
      ...this.props.location,
      search: `?querry=${querry}`,
    });
  };
  render() {
    const { movies, loading, error } = this.state;
    return (
      <Box bgColor=''>
      <div>
        <Searchbar onSearch={this.handleSearch}  />
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error, {error.message}</h2>}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
            
          </ul>
        )}
      </div>
      </Box>
    );
  }
}


MoviesPage.propTypes = {
history: PropTypes.object,
location: PropTypes.object
}