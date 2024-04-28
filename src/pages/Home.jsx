/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./_homeList.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PagesNav from "../components/PagesNav.jsx";

const KEY = "1e11912acc74b0709e04f81e2455dc84";
const POSTER_PATH = "https://image.tmdb.org/t/p/original/";

// работает только с VPN :c
async function fetchPopular(signal) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=ru&page=1&api_key=${KEY}`,
    {
      signal,
    }
  );

  return data.results;
}

function Home({ setSelected }) {
  const [page, setPage] = useState(1);
  const [isLoadingTop, setIsLoadingTop] = useState(false);
  const [error, setError] = useState("");
  const popularUl = useRef(null);
  const navigate = useNavigate();

  // получение популярных фильмов
  const { data, isLoading, isError } = useQuery(
    ["popular"],
    ({ signal }) => fetchPopular(signal),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [topList, setTopList] = useState(null);

  const maxPages = 467;

  // работает только с VPN :c
  // получение топа фильмов
  useEffect(
    function () {
      async function fetchTop() {
        try {
          setIsLoadingTop(true);
          setError("");

          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?language=ru&page=${page}&api_key=${KEY}`
          );

          if (!res.status === 200)
            throw new Error("Что-то пошло не так с загрузкой топа фильмов!");

          setTopList(res.data.results);
          setError("");
        } catch (e) {
          // console.error(e.message);
          setError(e.message);
        } finally {
          setIsLoadingTop(false);
        }
      }

      fetchTop();
    },
    [page]
  );

  // переход на страницу Details по клику на популярный фильм
  function clickHandle(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: data } });
  }
  // переход на страницу Details по клику на фильм из топа
  function clickHandleTop(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: topList } });
  }

  // прокрутка кнопками блока с популярными фильмами
  function scrollNext() {
    popularUl.current.scrollLeft += 1300;
    console.log("next");
  }
  function scrollBack() {
    popularUl.current.scrollLeft -= 1300;
    console.log("back");
  }

  return (
    <>
      <div>
        <h1>Популярное</h1>
        <div className={styles["list__wrapper"]}>
          <button className={styles["list__wrapper__btn"]} onClick={scrollBack}>
            <svg
              width="7rem"
              height="7rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#bca5af"
            >
              <path d="m22 12.002c0-5.517-4.48-9.997-9.998-9.997-5.517 0-9.997 4.48-9.997 9.997 0 5.518 4.48 9.998 9.997 9.998 5.518 0 9.998-4.48 9.998-9.998zm-1.5 0c0 4.69-3.808 8.498-8.498 8.498s-8.497-3.808-8.497-8.498 3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497zm-6.711-4.845c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591zm-.289 7.564v-5.446l-3.522 2.718z" />
            </svg>
          </button>
          {isLoading && <h3>Загружаем популярные фильмы...</h3>}
          {!isLoading && isError && (
            <h3>Что-то пошло не так с загрузкой популярных фильмов!</h3>
          )}
          {!isLoading && !isError && (
            <ul className={styles["list"]} ref={popularUl}>
              {data?.map((film) => (
                <PopularFilmCard
                  film={film}
                  onClick={clickHandle}
                  key={film.id}
                />
              ))}
            </ul>
          )}
          <button className={styles["list__wrapper__btn"]} onClick={scrollNext}>
            <svg
              width="7rem"
              height="7rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#bca5af"
            >
              <path d="m2.009 12.002c0-5.517 4.48-9.997 9.998-9.997s9.998 4.48 9.998 9.997c0 5.518-4.48 9.998-9.998 9.998s-9.998-4.48-9.998-9.998zm1.5 0c0 4.69 3.808 8.498 8.498 8.498s8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497-8.498 3.807-8.498 8.497zm6.711-4.845c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591zm.289 7.564v-5.446l3.523 2.718z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles["top-wrapper"]}>
        <h1>Топ фильмов</h1>
        <PagesNav page={page} setPage={setPage} maxPages={maxPages} />
        {isLoadingTop && <h3>Загружаем топ фильмов...</h3>}
        {!isLoadingTop && error !== "" && <h3>{error}</h3>}
        {!isLoadingTop && error === "" && (
          <ul className={styles["top-list"]}>
            {topList?.map((film) => (
              <TopFilmCard
                film={film}
                key={film.id}
                onCardClick={clickHandleTop}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function PopularFilmCard({ film, onClick }) {
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
      <h4 className={styles["card__title"]}>{film.title}</h4>
    </li>
  );
}

function TopFilmCard({ film, onCardClick }) {
  return (
    <li
      className={styles["top-card"]}
      key={film.id}
      onClick={() => onCardClick(film)}
    >
      <div className={styles['top-card__img-rating-wrapper']}>
        <p className={styles["top-card__rating"]}>
          ★ {film.vote_average.toString().slice(0, 3)}
        </p>
        <img
          className={styles["top-card__poster"]}
          src={
            film.poster_path
              ? `${POSTER_PATH}${film.poster_path}`
              : "image_not_available.png"
          }
          alt="Не удалось загрузить постер."
        />
      </div>
      <h3>{film.title}</h3>
    </li>
  );
}

export default Home;
