/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styles from "./_detailsPage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";
const KEY = "1e11912acc74b0709e04f81e2455dc84";

function Details({ selected, setSelected }) {
  const [genresList, setGenresList] = useState(null);
  const location = useLocation();
  const data = location.state.data;

  // работает только с VPN :c
  useEffect(function () {
    async function fetchGenres() {
      const data = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=ru&api_key=${KEY}`
      );

      setGenresList(data.data.genres);
    }

    fetchGenres();
  }, []);

  function clickHandle(film) {
    setSelected(film);
  }

  //   console.log(genresList);

  return (
    <div className={styles["container"]}>
      <ul className={styles["list"]}>
        {data?.map((film) => (
          <li
            className={styles["preview"]}
            key={film.id}
            onClick={() => clickHandle(film)}
          >
            <img
              className={styles["preview__poster"]}
              src={
                film.poster_path
                  ? `${POSTER_PATH}${film.poster_path}`
                  : "image_not_available.png"
              }
              alt="Не удалось загрузить постер."
            />
            <h3 className={styles["preview__title"]}>{film.title}</h3>
          </li>
        ))}
      </ul>
      <div className={styles["card"]}>
        <div className={styles["card__container"]}>
          <img
            className={styles["card__poster"]}
            src={
              selected?.poster_path
                ? `${POSTER_PATH}${selected?.poster_path}`
                : "image_not_available.png"
            }
            alt="Не удалось загрузить постер."
          />
          <div className={styles["card__info-wrapper"]}>
            <h3>{selected?.title}</h3>
            <div className={styles["card__genres"]}>
              <p>Жанры:</p>
              <div className={styles["card__genres__points"]}>
                {selected?.genre_ids.map((genre, id) =>
                  genresList?.map(
                    (g) =>
                      g.id === genre && (
                        <p key={id}>
                          • {g.name.charAt(0).toUpperCase()}
                          {g.name.slice(1)}
                        </p>
                      )
                  )
                )}
              </div>
            </div>
            <p>Рейтинг: {selected?.vote_average}</p>
          </div>
        </div>
        <p className={styles["card__overview"]}>{selected?.overview}</p>
        <button className={styles["card__btn"]}>Просмотрено</button>
      </div>
    </div>
  );
}

export default Details;
