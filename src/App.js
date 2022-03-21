import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import searchIcon from "./components/search.svg";
import carrete from "./components/carrete.jpeg";
export const API_KEY = "887101d1";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
`;

const SearchBox = styled.div`
  width: 80%;
  margin: 5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.5rem 1.75rem;
  border-radius: 3rem;
  background: #1f2123;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 15px;
`;
const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: 1.5rem;

  font-weight: 500;
  padding-right: 1rem;

  outline: none;
  color: #a1a1a1;
  background: #1f2123;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <MovieImage src={carrete} />

      <SearchBox>
        <SearchIcon src={searchIcon} />
        <SearchInput
          placeholder="Search Movie"
          value={searchQuery}
          onChange={onTextChange}
        />
      </SearchBox>

      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src={carrete} />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
