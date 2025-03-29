import React, { useEffect, useState } from "react";
import "./App.css";
import ViewScreen from "./components/ViewScreen";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import MovieBox from "./components/Movie/MovieBox";
import Movie from "./components/Movie/Movie";
import DataProvider from "./components/DataProvider";
import Basket from "./components/Basket";

function App() {
  const [movie, setMovie] = useState<{
    page: number;
    total_pages: number;
    total_results: number;
    results: [
      {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: Date;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
      }
    ];
  } | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=${page}`
      );
      setMovie(await res.json());
    };
    fetchData();
  }, [query, page]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  const increasePage = () => {
    setPage(
      page >= Number(movie?.total_pages) ? movie?.total_pages ?? 1 : page + 1
    );
  };
  const decreasePage = () => {
    setPage(page <= 1 ? 1 : page - 1);
  };
  const firstPage = () => {
    setPage(1);
  };
  const lastPage = () => {
    setPage(movie?.total_pages ?? 1);
  };

  return (
      <ViewScreen color="bg-gray-700">
        <SearchBar setQuery={setQuery} />
        <MovieBox>
          {movie?.results?.map((m) => {
            return <Movie key={m.id} title={m.title} image={m.poster_path} />;
          })}
        </MovieBox>
        <div className="w-full flex place-content-center">
          <Pagination
            currentPage={page}
            allPage={movie?.total_pages}
            increase={increasePage}
            decrease={decreasePage}
            first={firstPage}
            last={lastPage}
          />
        </div>
        <Basket />
      </ViewScreen>
  );
}

export default App;

// https://api.themoviedb.org/3/search/movie?api_key=3413b87c3d47aec816091881e8dfda19&query=a
// https://image.tmdb.org/t/p/w220_and_h330_face/6AtoMpHvs9pxd30KsyK8QmJ9W9M.jpg poster path
