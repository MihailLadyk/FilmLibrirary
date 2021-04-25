import React from "react";
import { Link, GridItem, Image, Box, Grid } from "@chakra-ui/react";
import { urls } from "../../router";
import { Link as LinkReact } from "react-router-dom";

export default function MovieList({ movies }) {
  return (
    <Grid templateColumns='repeat(4, 1fr)'  bgGradient="linear(to-t, #414141,#000000)">
      {movies.map((movie) => (
        <GridItem marginTop='20px' border='2px solid black' borderRightRadius='10%' borderLeftRadius='10%'  ml='10px' mb="75px" key={movie.id} bgColor='#212622' textAlign='center'>
          <Link as={LinkReact}  to={`${urls.movies}/${movie.id}`} color='white'>
            {movie.title}
          </Link>
          <Box h='400px' w='300px' pl='80px' >
            <Image
              h="90%"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            ></Image>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}
