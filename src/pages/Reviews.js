import { Component } from "react";
import { fetchMovieReviews } from "../services/movieApi";
import { Box, Text, Avatar, Stack, Flex } from "@chakra-ui/react";
export default class Reviews extends Component {
  state = {
    movieReviews: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: false });

    fetchMovieReviews(this.props.movDetail.id)
      .then((res) => this.setState({ movieReviews: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.movieReviews !== null && (
          <div>
            {this.state.movieReviews.results.length > 0 ? (
              <div>
                {this.state.movieReviews.results.map((review) => (
                  <Box key={review.id}>
                    {
                      <Flex marginTop="20px" marginBottom="5px">
                        <Avatar src="https://bit.ly/broken-link" Size="lg" />
                        <Text
                          fontSize="2xl"
                          textAlign="center"
                          marginTop="5px"
                          marginBottom="5px"
                          marginLeft="15px"
                        >
                          {review.author}
                        </Text>
                      </Flex>
                    }
                    <Text>{review.content}</Text>
                  </Box>
                ))}
              </div>
            ) : (
              <Text fontSize="2xl" marginTop="10px" mb="10px" align="center">
                There is no reviews
              </Text>
            )}
          </div>
        )}
      </div>
    );
  }
}
