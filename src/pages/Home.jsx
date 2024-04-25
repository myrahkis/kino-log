/* eslint-disable react/prop-types */
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./_homeList.module.scss";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    ["popular"],
    ({ signal }) => fetchPopular(signal)
    // {
    //   enabled: false,
    // }
  );

  function clickHandle(film) {
    setSelected(film);
    navigate("/film-detail", { replace: true, state: { data: data } });
  }

  return (
    <>
      <h1>Популярное</h1>
      <ul className={styles["list"]}>
        {data?.map((film) => (
          <FilmCard film={film} onClick={clickHandle} key={film.id} />
        ))}
      </ul>
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
