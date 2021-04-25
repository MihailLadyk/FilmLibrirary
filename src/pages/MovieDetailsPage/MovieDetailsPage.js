import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";
import { fetchMovieDetails } from "../../services/movieApi";
import { Component } from "react";
import Cast from "../Cast";
import Reviews from "../Reviews";
import {
  Box,
  Image,
  Button,
  Flex,
  Tag,
  Grid,
  GridItem,
  Divider,
  Text,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  ColorModeScript,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
export default class MovieDetailsPage extends Component {
  state = {
    moviesDetails: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });

    fetchMovieDetails(this.props.match.params.movieId)
      .then((res) => this.setState({ moviesDetails: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }
  goBackFunc = () => {
    this.props.history.goBack();
  };

  render() {
    const { moviesDetails } = this.state;
    return (
     <Box  height='100%'>
        <Flex align="center" bgColor="black" color="whiteAlpha.600" p="20px">
          {/* {console.log(this.state.moviesDetails)} */}
          {moviesDetails !== null && (
            <div>
              <Grid
                paddingRight="100px"
                h="318px"
                templateRows="repeat(7, 1fr)"
                templateColumns="repeat(18, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1}>
                  <IconButton
                    color="white"
                    onClick={this.goBackFunc}
                    colorScheme="teal"
                    size="sm"
                    icon={<ArrowBackIcon />}
                  ></IconButton>
                </GridItem>
                <GridItem colSpan={7}>
                  <Image
                    width={640}
                    alt="MovieImage"
                    src={`https://image.tmdb.org/t/p/original${moviesDetails.backdrop_path}`}
                  />
                </GridItem>
                <GridItem colSpan={10}>
                  <Text fontSize="5xl" mb="1px">
                    {this.state.moviesDetails.title}
                  </Text>
                  <Flex justify="left">
                    <Text fontSize="3xl" mb="10px">
                      Date: {this.state.moviesDetails.release_date}
                    </Text>
                    <Box marginLeft="20px">
                      {/* user score: */}
                      <CircularProgress value={40} color="green.400">
                        <CircularProgressLabel>
                          {this.state.moviesDetails.vote_average * 10}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Box>
                  </Flex>
                  <Text fontSize="2xl" marginTop="10px" mb="10px">
                    Overview
                  </Text>
                  <p>{this.state.moviesDetails.overview}</p>
                  <Text fontSize="2xl" marginTop="10px" mb="10px">
                    Genres
                  </Text>
                  <Flex>
                    {this.state.moviesDetails.genres.map((obj) => (
                      <Tag m="5px" key={obj.id}>
                        {obj.name}
                      </Tag>
                    ))}
                  </Flex>
                </GridItem>
              </Grid>

              <Box w="100%" p="100px" marginTop="10px">
                <Divider />
                <Grid templateColumns="repeat(10, 1fr)" gap={4} w="50%">
                  <GridItem colSpan={7}>
                    <Text fontSize="3xl">Additional information:</Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Link
                      to={
                        this.props.location.pathname.includes("cast")
                          ? this.props.match.url
                          : this.props.match.url + "/cast"
                      }
                    >
                      {" "}
                      <Button colorScheme="teal" size="sm">
                        <Text>Cast</Text>
                      </Button>
                    </Link>

                    <Link
                      to={
                        this.props.location.pathname.includes("reviews")
                          ? this.props.match.url
                          : this.props.match.url + "/reviews"
                      }
                    >
                      <Button marginLeft="15px" colorScheme="teal" size="sm">
                        <Text>Reviews</Text>
                      </Button>
                    </Link>
                  </GridItem>
                </Grid>
                <Route
                  path={this.props.match.url + "/reviews"}
                  render={() => (
                    <Reviews movDetail={this.state.moviesDetails} />
                  )}
                />
                <Route
                  path={this.props.match.url + "/cast"}
                  render={() => <Cast movDetail={this.state.moviesDetails} />}
                />
                <div></div>
              </Box>
            </div>
          )}
        </Flex>
        </Box>
    );
  }
}

MovieDetailsPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};
