/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./_homeList.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

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
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    ["popular"],
    ({ signal }) => fetchPopular(signal)
    // {
    //   enabled: false,
    // }
  );
  const [topList, setTopList] = useState(null);

  // работает только с VPN :c
  useEffect(
    function () {
      async function fetchTop() {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=ru&page=${page}&api_key=${KEY}`
        );

        setTopList(data.data.results);
      }

      fetchTop();
    },
    [page]
  );

  function clickHandle(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: data } });
  }
  function clickHandleTop(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: topList } });
  }


  function prevClickHandle() {
    if (page - 1 > 0) {
      setPage(() => page - 1);
    }
  }

  function nextClickHandle() {
    setPage(() => page + 1);
  }

  return (
    <>
      <div>
        <h1>Популярное</h1>
        <ul className={styles["list"]}>
          {data?.map((film) => (
            <FilmCard film={film} onClick={clickHandle} key={film.id} />
          ))}
        </ul>
      </div>
      <div className={styles['top-wrapper']}>
        <h1>Топ фильмов</h1>
        <div className={styles["btns-wrapper"]}>
          <button onClick={prevClickHandle}>prev</button>
          <p>{page}</p>
          <button onClick={nextClickHandle}>next</button>
        </div>
        <ul className={styles['top-list']}>
          {topList?.map((film) => (
            <li className={styles['top-card']} key={film.id} onClick={() => clickHandleTop(film)}>
              <img className={styles['top-card__poster']} src={`${POSTER_PATH}${film.poster_path}`} alt="poster" />
              <p>{film.title}</p>
              <p>{film.vote_average}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
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
      <h2 className={styles["card__title"]}>{film.title}</h2>
    </li>
  );
}

export default Home;
