import { Component } from "react";
import { fetchMovieActors } from "../services/movieApi";
import { Box, SimpleGrid, GridItem, Image, Text } from "@chakra-ui/react";
export default class Cast extends Component {
  state = {
    moviesActors: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });

    fetchMovieActors(this.props.movDetail.id)
      .then((res) => this.setState({ moviesActors: res.data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.moviesActors !== null && (
          <SimpleGrid columns={5} spacing={10} marginTop="20px" align="center">
            {/* {console.log(this.state.moviesActors.cast)} */}
            {this.state.moviesActors.cast.map((actor) => (
              <GridItem key={actor.id}>
                <Image
                  borderRadius="5px"
                  src={
                    actor.profile_path != null
                      ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                      : "https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg"
                  }
                  w={140}
                  h={200}
                ></Image>
                <Box marginTop="5px">
                  <Text>{actor.name}</Text>
                  <Text>Character: {actor.character}</Text>
                </Box>
              </GridItem>
            ))}
          </SimpleGrid>
        )}
      </div>
    );
  }
}
