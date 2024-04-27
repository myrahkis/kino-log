/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styles from "./_detailsPage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const POSTER_PATH = "https://image.tmdb.org/t/p/original/";
const KEY = "1e11912acc74b0709e04f81e2455dc84";

function Details({ selected, setSelected, watchedList, onWatched }) {
  const [genresList, setGenresList] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const data = location.state.data;

  const collapseNumWords = 53;
  const overview_length = selected?.overview.split(" ").length;

  const isWatched = watchedList.map((film) => film.id).includes(selected?.id);

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
            <div className={styles["preview__info"]}>
              <h3 className={styles["preview__info__title"]}>{film.title}</h3>
              <p>{film.release_date.slice(0, 4)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles["card"]}>
        <div className={styles["card__container"]}>
          {selected ? (
            <>
              <div className={styles["card__poster-wrapper"]}>
                <p className={styles["card__rating"]}>
                  ★ {selected?.vote_average.toString().slice(0, 3)}
                </p>
                <img
                  className={styles["card__poster"]}
                  src={
                    selected?.poster_path
                      ? `${POSTER_PATH}${selected?.poster_path}`
                      : "image_not_available.png"
                  }
                  alt="Не удалось загрузить постер."
                />
                {!isWatched ? (
                  <button
                    className={styles["card__btn"]}
                    onClick={() => onWatched(selected)}
                  >
                    Просмотрено
                  </button>
                ) : (
                  <p className={styles["card__watched"]}>
                    <span>
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bca5af"
                      >
                        <path d="m17.5 11c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5zm-5.346 6.999c-.052.001-.104.001-.156.001-4.078 0-7.742-3.093-9.854-6.483-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 4.143 0 7.796 3.09 9.864 6.493.092.156.138.332.138.507 0 .179-.062.349-.15.516-.58-.634-1.297-1.14-2.103-1.472-1.863-2.476-4.626-4.544-7.749-4.544-3.465 0-6.533 2.632-8.404 5.5 1.815 2.781 4.754 5.34 8.089 5.493.09.529.25 1.034.471 1.506zm3.071-2.023 1.442 1.285c.095.085.215.127.333.127.136 0 .271-.055.37-.162l2.441-2.669c.088-.096.131-.217.131-.336 0-.274-.221-.499-.5-.499-.136 0-.271.055-.37.162l-2.108 2.304-1.073-.956c-.096-.085-.214-.127-.333-.127-.277 0-.5.224-.5.499 0 .137.056.273.167.372zm-3.603-.994c-2.031-.19-3.622-1.902-3.622-3.982 0-2.208 1.792-4 4-4 1.804 0 3.331 1.197 3.829 2.84-.493.146-.959.354-1.389.615-.248-1.118-1.247-1.955-2.44-1.955-1.38 0-2.5 1.12-2.5 2.5 0 1.363 1.092 2.472 2.448 2.499-.169.47-.281.967-.326 1.483z" />
                      </svg>
                    </span>
                    Просмотрено
                  </p>
                )}
              </div>
              <div className={styles["card__info-wrapper"]}>
                <h3 className={styles["card__title"]}>{selected?.title}</h3>
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
                <p>Релиз: {selected?.release_date}</p>
                {overview_length >= collapseNumWords
                  ? !isOpen && (
                      <>
                        <p className={styles["card__overview"]}>
                          {selected?.overview
                            .split(" ")
                            .slice(0, collapseNumWords)
                            .join(" ") + "..."}
                          <button
                            className={styles["card__overview__text-btn"]}
                            onClick={() => setIsOpen(true)}
                          >
                            Развернуть
                          </button>
                        </p>
                      </>
                    )
                  : !isOpen && (
                      <p className={styles["card__overview"]}>
                        {selected?.overview}
                      </p>
                    )}
                {isOpen && overview_length >= collapseNumWords && (
                  <>
                    <p className={styles["card__overview"]}>
                      {selected?.overview}
                      <button
                        className={styles["card__overview__text-btn"]}
                        onClick={() => setIsOpen(false)}
                      >
                        Свернуть
                      </button>
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            <h1>Выберите фильм из списка</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
