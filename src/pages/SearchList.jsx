/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./_searchList.module.scss";
import { useNavigate } from "react-router-dom";

const KEY = "1e11912acc74b0709e04f81e2455dc84";
const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

// работает только с VPN :c
async function fetchSearch(signal, query) {
  if (query !== "") {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?&language=ru&query=${query}&api_key=${KEY}`,
      {
        signal,
      }
    );

    if (data.total_results === 0) return data.total_results;

    return data.results;
  }
}

function SearchList({ query, setSearch, setSelected }) {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    ["film", query],
    ({ signal }) => fetchSearch(signal, query)
    // {
    //   enabled: false,
    // }
  );

  function clickHandle(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: data } });
    setSearch("");
  }

  return (
    <div className={styles["container"]}>
      {data === 0 ? (
        <p>По вашему запросу не удалось ничего найти.</p>
      ) : (
        <>
          <h1>Вот что удалось найти</h1>
          <ul className={styles["result-wrapper"]}>
            {data?.map((film) => (
              <FilmCard film={film} onClick={clickHandle} key={film.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function FilmCard({ film, onClick }) {
  return (
    <li className={styles["card"]} onClick={() => onClick(film)}>
      <img
        className={styles["card__poster"]}
        src={
          film.poster_path
            ? `${POSTER_PATH}${film.poster_path}`
            : "image_not_available.png"
        }
        alt="Не удалось загрузить постер."
      />
      <div className={styles["card__info-wrapper"]}>
        <h2 className={styles["card__title"]}>{film.title}</h2>
        {film.overview && (
          <p className={styles["card__overview"]}>{film.overview}</p>
        )}
        <p className={styles["card__release"]}>
          Дата выхода: {film.release_date}
        </p>
      </div>
    </li>
  );
}

export default SearchList;
