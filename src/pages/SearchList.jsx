/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const KEY = "1e11912acc74b0709e04f81e2455dc84";

// работает только с VPN :c
async function fetchSearch(signal, query) {
  if (query !== "") {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${KEY}`,
      {
        signal,
      }
    );

    return data.results;
  }
}

function SearchList({ query }) {
  const { data, isLoading, isError } = useQuery(
    ["film", query],
    ({ signal }) => fetchSearch(signal, query)
    // {
    //   enabled: false,
    // }
  );

  return (
    <div>
      <p>---результат поиска---</p>
      <ul>
        {data?.map((film, id) => (
          <FilmCard key={id} film={film} />
        ))}
      </ul>
    </div>
  );
}

function FilmCard({ film }) {
  return (
    <li style={{padding: '2rem'}}>
      <img src={film.poster_path} alt=":(((" />
      <h2>{film.original_title}</h2>
      <p>{film.overview}</p>
      <p>{film.release_date}</p>
    </li>
  );
}

export default SearchList;
