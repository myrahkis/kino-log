/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./_searchList.module.scss";

const KEY = "1e11912acc74b0709e04f81e2455dc84";
const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

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
    <div className={styles["container"]}>
      <p>---результат поиска---</p>
      <ul className={styles["result-wrapper"]}>
        {data?.map((film, id) => (
          <FilmCard key={id} film={film} />
        ))}
      </ul>
    </div>
  );
}

function FilmCard({ film }) {
  return (
    <li className={styles["card"]}>
      <img
        className={styles["card__poster"]}
        src={
          film.poster_path
            ? `${POSTER_PATH}${film.poster_path}`
            : "image_not_available.png"
        }
        alt="Не удалось загрузить постер."
      />
      <div className={styles['card__info-wrapper']}>
        <h2 className={styles["card__title"]}>{film.original_title}</h2>
        {film.overview && (
          <p className={styles["card__overview"]}>{film.overview}</p>
        )}
        <p className={styles["card__release"]}>Дата выхода: {film.release_date}</p>
      </div>
    </li>
  );
}

export default SearchList;
